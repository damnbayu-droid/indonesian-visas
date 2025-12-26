import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      passport_number,
      date_of_birth,
      emergency_name,
      emergency_contact,
      arrival_date,
      notes,
    } = body;

    const { error } = await supabase.from("applications").insert([
      {
        country,
        visa_type,
        applicants,
        first_name,
        last_name,
        email,
        whatsapp,
        passport_number,
        date_of_birth,
        emergency_name,
        emergency_contact,
        arrival_date,
        notes,
        status: "new",
      },
    ]);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 500 }
    );
  }
}
