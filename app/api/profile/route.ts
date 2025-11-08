import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const { id, display_name } = JSON.parse(body || '{}')
  if (!id) return NextResponse.json({ ok:false, error:'no id' }, { status:400 })
  const { error } = await supabase.from('profiles').upsert({ id, display_name })
  if (error) return NextResponse.json({ ok:false, error:error.message }, { status:400 })
  return NextResponse.json({ ok:true })
}
