import fs from "fs/promises";
import path from "path";
import initSqlJs, { type Database as SqlJsDatabase } from "sql.js";

declare global {
  var __kvd_db: Promise<DbAdapter> | undefined;
  var __kvd_sqljs: Awaited<ReturnType<typeof initSqlJs>> | undefined;
}

const defaultLocalPath = path.join(/* turbopackIgnore: true */ process.cwd(), "data", "kovaldigital.sqlite");

export type DbAdapter = {
  run: (sql: string, ...args: unknown[]) => Promise<void>;
  exec: (sql: string) => Promise<void>;
};

function resolveDbPath(): string {
  const fromEnv = process.env.DATABASE_URL;
  if (fromEnv) {
    if (path.isAbsolute(fromEnv)) return fromEnv;
    return path.resolve(/* turbopackIgnore: true */ process.cwd(), fromEnv);
  }
  if (process.env.VERCEL) {
    return path.join("/tmp", "kovaldigital.sqlite");
  }
  return defaultLocalPath;
}

async function loadSqlJs() {
  if (global.__kvd_sqljs) {
    return global.__kvd_sqljs;
  }
  const wasmPath = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "node_modules",
    "sql.js",
    "dist",
    "sql-wasm.wasm",
  );
  const file = await fs.readFile(wasmPath);
  const wasmBinary = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
  const SQL = await initSqlJs({ wasmBinary });
  global.__kvd_sqljs = SQL;
  return SQL;
}

function createAdapter(db: SqlJsDatabase, dbPath: string): DbAdapter {
  const persist = async () => {
    const data = db.export();
    await fs.writeFile(dbPath, Buffer.from(data));
  };

  return {
    async exec(sql: string) {
      db.exec(sql);
      await persist();
    },
    async run(sql: string, ...args: unknown[]) {
      if (args.length) {
        db.run(sql, args as (string | number | Uint8Array | null)[]);
      } else {
        db.run(sql);
      }
      await persist();
    },
  };
}

async function initDb(): Promise<DbAdapter> {
  const dbPath = resolveDbPath();
  await fs.mkdir(path.dirname(dbPath), { recursive: true });

  const SQL = await loadSqlJs();
  let db: SqlJsDatabase;
  try {
    const file = await fs.readFile(dbPath);
    db = new SQL.Database(new Uint8Array(file));
  } catch {
    db = new SQL.Database();
  }

  const adapter = createAdapter(db, dbPath);
  await adapter.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_name TEXT NOT NULL,
      path TEXT,
      meta TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return adapter;
}

export function getDb() {
  if (!global.__kvd_db) {
    global.__kvd_db = initDb();
  }
  return global.__kvd_db;
}
