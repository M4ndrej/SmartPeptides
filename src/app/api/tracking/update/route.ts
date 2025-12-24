import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const headers = new Headers(request.headers);

    headers.set("Content-Type", "application/json; charset=utf-8");
    headers.delete("Content-Length");

    const username = process.env.DEV_USERNAME;
    const password = process.env.DEV_PASSWORD;
    if (username && password) {
      headers.append(
        `Authorization`,
        `Basic ${btoa(`${username}:${password}`)}`
      );
    }

    const trackingUpdate = await fetch(
      `${process.env.API_URL}/mytracking/v2/tracking_update`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    const trackingData = await trackingUpdate.json();
    return NextResponse.json(trackingData, { status: trackingUpdate.status });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
