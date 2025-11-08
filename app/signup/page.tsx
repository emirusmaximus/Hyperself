'use client'
import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const [ok, setOk] = useState(false)

  const onSubmit = async (e: any) => {
    e.preventDefault()
    setErr(null)
    setOk(false)

    // 1) Hesap oluştur
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setErr(error.message)
      return
    }

    // 2) E-posta doğrulama açıkken user/session hemen gelmeyebilir.
    // Bu yüzden profil kaydını login sonrası yapacağız.
    // (İstersen burada /api/profile çağrısını denemeyelim.)
    setOk(true)
  }

  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
        <h2>Kayıt Ol</h2>

        <form onSubmit={onSubmit} className="grid">
          <input
            className="input"
            placeholder="Adın (kartta gözükecek)"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="input"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <button className="btn" type="submit">Hesap Oluştur</button>
        </form>

        {ok && (
          <div style={{ marginTop: 12 }}>
            <p style={{ color: '#89f7b1' }}>
              Hesap oluşturuldu. Eğer e-posta doğrulama açıksa, gelen kutunu kontrol et.
            </p>
            <p style={{ marginTop: 8 }}>
              Devam etmek için <Link href="/login" className="btn" style={{ background: '#20263a' }}>Giriş yap</Link>
              {/* Giriş yaptıktan sonra displayName’i kaydetmek istersen, dashboard'ta /api/profile'a upsert atacağız. */}
            </p>
          </div>
        )}

        {err && <p style={{ color: '#ff8a8a', marginTop: 10 }}>{err}</p>}

        <div className="hr" />
        <p>Hesabın var mı? <Link href="/login">Giriş yap</Link></p>
      </div>
    </main>
  )
}
