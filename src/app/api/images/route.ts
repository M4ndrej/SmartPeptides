import { hfetch } from "@/helpers/fetchers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get("imageUrl");

  if (!imageUrl) {
    return new Response("Image URL must be provided.", { status: 400 });
  }

  try {
    // Fetch the image with necessary authorization headers
    const imageRes = await hfetch(imageUrl);

    if (!imageRes.ok) {
      throw new Error(`Failed to fetch the image: ${imageRes.statusText}`);
    }

    // Stream the image back to the client
    const imageBuffer = await imageRes.arrayBuffer();
    return new Response(imageBuffer, {
      headers: {
        "Content-Type":
          imageRes.headers.get("Content-Type") || "application/octet-stream",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching image.", { status: 500 });
  }
}
