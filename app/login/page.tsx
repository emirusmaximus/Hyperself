'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState<string|null>(null)
  const router = useRouter()

  const onSubmit = async (e:any) => {
    e.preventDefault()
    setErr(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return setErr('Giriş başarısız. Şifre hatalı olabilir veya e-posta doğrulanmamış olabilir.')
    router.push('/dashboard') // ✅ kesin doğru rota
  }

  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 420, margin:'0 auto' }}>
        <h2>Giriş Yap</h2>
        <form onSubmit={onSubmit} className="grid">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} type="email" required/>
          <input className="input" placeholder="Şifre" value={password} onChange={e=>setPassword(e.target.value)} type="password" required/>
          <button className="btn" type="submit">Giriş</button>
        </form>
        <div className="hr" />
        <p>Hesabın yok mu? <a className="btn" href="/signup" style={{background:'#20263a'}}>Kayıt Ol</a></p>
      </div>
    </main>
  )
}
