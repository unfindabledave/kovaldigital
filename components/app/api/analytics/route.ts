import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type AnalyticsPayload = {
  eventName?: string;
  path?: string;
  meta?: Record<string, unknown>;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as AnalyticsPayload;
  const eventName = payload.eventName?.trim();

  if (!eventName) {
    return NextResponse.json({ error: "eventName is required." }, { status: 400 });
  }

  const db = await getDb();
  await db.run(
    "INSERT INTO analytics_events (event_name, path, meta) VALUES (?, ?, ?)",
    eventName,
    payload.path ?? "",
    payload.meta ? JSON.stringify(payload.meta) : null,
  );

  return NextResponse.json({ ok: true });
}
