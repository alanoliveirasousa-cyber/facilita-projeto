import {NextResponse} from 'next/server';import {adminDb} from '@/lib/supabase-server';
export async function POST(req:Request){try{const b=await req.json();const db=adminDb();if(db&&b.id)await db.from('simulations').update({clicou_whatsapp:true}).eq('id',b.id);return NextResponse.json({ok:true})}catch{return NextResponse.json({ok:true})}}
