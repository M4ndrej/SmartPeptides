import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("imageUrl");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "Image URL is required" },
      { status: 400 }
    );
  }

  try {
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      throw new Error("Failed to fetch the image");
    }

    const contentType =
      imageResponse.headers.get("Content-Type") || "application/octet-stream";
    const imageBuffer = await imageResponse.arrayBuffer();

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      `attachment; filename="${imageUrl.split("/").pop()}"`
    );

    return new Response(Buffer.from(imageBuffer), { headers });
  } catch (error: any) {
    console.error("Error fetching image:", error.message);
    return NextResponse.json(
      { error: "Failed to download the image" },
      { status: 500 }
    );
  }
}
