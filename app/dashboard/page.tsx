'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { levelFromXP } from '@/lib/xp'

type Activity = { id:number; category:string; minutes:number; intensity:number; xp:number; created_at:string }

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [totalXP, setTotalXP] = useState(0)

  // Kullanıcıyı çek
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  // Kullanıcı varsa aktiviteleri al
  useEffect(() => {
    if (!user) return
    supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending:false })
      .then(({ data }) => {
        if (data) {
          setActivities(data as Activity[])
          const sum = data.reduce((a:any,b:any)=>a + (b.xp||0), 0)
          setTotalXP(sum)
        }
      })
  }, [user])

  // Kullanıcı giriş yapmamışsa
  if (!user) {
    return (
      <main className="container">
        <div className="card center" style={{height:200}}>
          <div>
            <p>Devam etmek için giriş yap.</p>
            <div className="center" style={{gap:10, marginTop:10}}>
              <Link className="btn" href="/login">Giriş</Link>
              <Link className="btn" href="/signup" style={{background:'#20263a'}}>Kayıt</Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // XP'den level hesapla
  const { level, progress, next } = levelFromXP(totalXP)

  return (
    <main className="container">
      <div className="grid">
        <div className="card">
          <h2>Merhaba 👋</h2>
          <p style={{color:'var(--muted)'}}>
            Toplam XP: <b>{totalXP}</b> — Level: <b>{level}</b> — Sonraki levele: <b>{next - Math.floor((progress/100)*next)} XP</b>
          </p>

          {/* İlerleme barı */}
          <div style={{marginTop:10, background:'#20263a', borderRadius:10, overflow:'hidden'}}>
            <div style={{height:12, width:progress+'%', background:'linear-gradient(90deg, #6C63FF, #8A7CFF)'}} />
          </div>

          {/* Aktivite ekleme */}
          <div style={{marginTop:14}}>
            <Link className="btn" href="/log">+ Aktivite Ekle</Link>
          </div>
        </div>

        <div className="card">
          <h3>Son Aktiviteler</h3>
          <div className="hr" />
          {activities.length === 0 && <p style={{color:'var(--muted)'}}>Henüz aktivite yok.</p>}
          <div className="grid">
            {activities.map(a => (
              <div key={a.id} className="card">
                <div className="badge">{new Date(a.created_at).toLocaleString()}</div>
                <h4 style={{margin:'8px 0'}}>{a.category} · {a.minutes} dk · Int {a.intensity}</h4>
                <p style={{color:'var(--muted)'}}>XP: {a.xp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
