import { generateNarrativeAnchor } from "@/app/agents/narrativeanchor";
import { createClient } from "@/lib/supabase/server";
import type { IntakePayload } from "@/types/narrative-anchor";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { intake?: IntakePayload };

    if (!body.intake) {
      return NextResponse.json({ error: "Missing intake payload" }, { status: 400 });
    }

    const nao = await generateNarrativeAnchor(body.intake, user.id);
    return NextResponse.json({ nao });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}