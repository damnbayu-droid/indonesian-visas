import { NextResponse } from "next/server";

/**
 * ROOT /api
 * ⚠️ JANGAN import Supabase di sini
 * ⚠️ JANGAN ada logic apa pun
 * Ini cuma health check agar build TIDAK crash
 */

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    status: "OK",
    message: "API root alive",
  });
}
