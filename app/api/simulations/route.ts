import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/supabase-server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log('SIMULATION BODY:', body);

    if (
      !body.consent ||
      !body.name ||
      !body.city ||
      !body.whatsapp
    ) {
      console.error('SIMULATION VALIDATION ERROR:', {
        consent: body.consent,
        name: body.name,
        city: body.city,
        whatsapp: body.whatsapp
      });

      return NextResponse.json(
        {
          ok: false,
          error: 'Dados obrigatórios ausentes.'
        },
        { status: 400 }
      );
    }

    const db = adminDb();

    if (!db) {
      console.error(
        'SUPABASE ERROR: adminDb() retornou null. Verifique as variáveis de ambiente.'
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            'Supabase não configurado corretamente no servidor.'
        },
        { status: 500 }
      );
    }

    const payload = {
      nome: body.name,
      estado: body.uf,
      cidade: body.city,
      whatsapp: body.whatsapp,
      tipo_projeto: body.type,
      tipo_residencial: body.floors,
      metragem: body.totalArea,
      faixa_metragem: String(body.area),
      quartos: body.rooms,
      banheiros: body.baths,
      suites: body.suites,
      estilo_fachada: body.facadeStyle,
      garagem_inclusa: body.garage,
      edicula: body.edicula,
      faixa_edicula: body.ediculaBand,
      piscina: body.pool,
      mezanino: body.mezz,
      faixa_mezanino: body.mezzBand,
      valor_calculado_interno: body.value,
      valor_minimo_exibido: body.range?.min,
      valor_maximo_exibido: body.range?.max,
      clicou_whatsapp: false,
      consentimento: true
    };

    console.log('SUPABASE INSERT PAYLOAD:', payload);

    const { data, error } = await db
      .from('simulations')
      .insert(payload)
      .select('id,created_at')
      .single();

    if (error) {
      console.error('SUPABASE INSERT ERROR:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });

      return NextResponse.json(
        {
          ok: false,
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        },
        { status: 500 }
      );
    }

    console.log('SIMULATION SAVED:', data);

    return NextResponse.json({
      ok: true,
      ...data
    });
  } catch (e: any) {
    console.error('SIMULATION API UNEXPECTED ERROR:', e);

    return NextResponse.json(
      {
        ok: false,
        error: e?.message || String(e),
        stack: e?.stack || null
      },
      { status: 500 }
    );
  }
}
