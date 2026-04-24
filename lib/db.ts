import fs from "fs/promises";
import path from "path";
import sqlite3 from "sqlite3";
import { open, type Database } from "sqlite";

declare global {
  var __kvd_db: Promise<Database> | undefined;
}

const defaultDbPath = path.join(process.cwd(), "data", "kovaldigital.sqlite");

async function initDb() {
  const dbPath = process.env.DATABASE_URL ?? defaultDbPath;
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_name TEXT NOT NULL,
      path TEXT,
      meta TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
}

export function getDb() {
  if (!global.__kvd_db) {
    global.__kvd_db = initDb();
  }

  return global.__kvd_db;
}
