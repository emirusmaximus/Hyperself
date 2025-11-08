'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { computeXP } from '@/lib/xp'
const CATS = ['Sleep','Sport','Social','Learn','Build','Rest']

export default function LogPage() {
  const [user,setUser] = useState<any>(null)
  const [category,setCategory] = useState('Learn')
  const [minutes,setMinutes] = useState(30)
  const [intensity,setIntensity] = useState(3)
  const [xp, setXp] = useState(0)
  const [ok,setOk] = useState<string|null>(null)
  const [err,setErr] = useState<string|null>(null)

  useEffect(()=>{ supabase.auth.getUser().then(({data})=>setUser(data.user)) },[])
  useEffect(()=>{ setXp(computeXP(category, minutes, intensity)) },[category, minutes, intensity])

  const save = async (e:any) => {
    e.preventDefault()
    setErr(null); setOk(null)
    if (!user) return setErr('Önce giriş yap.')
    const { error } = await supabase.from('activities').insert({
      user_id: user.id, category, minutes, intensity, xp
    })
    if (error) setErr(error.message); else setOk('Kaydedildi ✓')
  }

  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 520, margin:'0 auto' }}>
        <h2>Aktivite Ekle</h2>
        <form onSubmit={save} className="grid">
          <select className="select" value={category} onChange={e=>setCategory(e.target.value)}>
            {CATS.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          <input className="input" type="number" min={0} max={1440} value={minutes} onChange={e=>setMinutes(parseInt(e.target.value||'0'))} placeholder="Dakika"/>
          <input className="input" type="number" min={1} max={5} value={intensity} onChange={e=>setIntensity(parseInt(e.target.value||'3'))} placeholder="Yoğunluk (1-5)"/>
          <div className="card">Hesaplanan XP: <b>{xp}</b></div>
          <button className="btn" type="submit">Kaydet</button>
        </form>
        {ok && <p style={{color:'#89f7b1', marginTop:10}}>{ok} — <a href="/(app)/dashboard">Dashboard</a></p>}
        {err && <p style={{color:'#ff8a8a', marginTop:10}}>{err}</p>}
      </div>
    </main>
  )
}
