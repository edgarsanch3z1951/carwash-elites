import { NextResponse } from "next/server";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

export async function POST(request: Request) {
  if (!WEBHOOK_URL) {
    return NextResponse.json(
      { error: "Booking webhook is not configured." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { error: `Webhook responded with ${response.status}`, detail: text },
        { status: response.status },
      );
    }

    return NextResponse.json({ ok: true, detail: text || null });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach booking webhook." },
      { status: 502 },
    );
  }
}
