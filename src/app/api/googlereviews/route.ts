import { NextResponse } from "next/server";

const PLACE_ID = "ChIJrfAuqyU50i0REn_MEcapJx4";
const API_KEY = process.env.GOOGLE_MAPS_API_KEY!;

export async function GET() {
  try {
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;

    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
