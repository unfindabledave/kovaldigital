import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  const name = payload.name?.trim();
  const email = payload.email?.trim().toLowerCase();
  const message = payload.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
  }

  const db = await getDb();
  await db.run(
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
    name,
    email,
    message,
  );

  return NextResponse.json({ ok: true });
}
