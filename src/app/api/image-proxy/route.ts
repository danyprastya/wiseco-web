import { NextRequest, NextResponse } from "next/server";

// Proxy R2 images through our server to bypass SSL issues
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL parameter required" }, { status: 400 });
  }

  // Only allow R2 URLs
  if (!url.includes("r2.dev")) {
    return NextResponse.json({ error: "Only R2 URLs are allowed" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        // Accept any image type
        Accept: "image/*",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "image/png";
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy image" },
      { status: 500 }
    );
  }
}
