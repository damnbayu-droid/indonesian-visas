import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* =========================
   SUPABASE CLIENT
========================= */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* =========================
   TEST GET (BIAR TIDAK ERROR)
========================= */
export async function GET() {
  return NextResponse.json({ status: "API OK" });
}

/* =========================
   POST — FORM SUBMIT MASUK SINI
========================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      country,
      visa_type,
      applicants,

      first_name,
      last_name,
      email,
      whatsapp,
      passport_num,
      date_of_birth,

      emergency_n,
      emergency_c,

      arrival_date,
      notes,

      status,
      payment_stat,
    } = body;

    /* WAJIB ADA */
    if (!country || !visa_type || !email) {
      return NextResponse.json(
        { error: "Required data missing" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("applications")
      .insert([
        {
          country,
          visa_type,
          applicants,

          first_name,
          last_name,
          email,
          whatsapp,
          passport_num,
          date_of_birth,

          emergency_n,
          emergency_c,

          arrival_date,
          notes,

          status,
          payment_stat,
        },
      ]);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
