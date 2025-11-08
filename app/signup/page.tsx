'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Signup() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [displayName,setDisplayName] = useState('')
  const [err,setErr] = useState<string|null>(null)
  const [ok,setOk] = useState(false)

  const onSubmit = async (e:any) => {
    e.preventDefault()
    setErr(null)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return setErr(error.message)
    const user = data.user
    if (user) {
      await fetch('/api/profile', { method:'POST', body: JSON.stringify({ id: user.id, display_name: displayName }) })
      setOk(true)
    }
  }

  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
        <h2>Kayıt Ol</h2>
        <form onSubmit={onSubmit} className="grid">
          <input className="input" placeholder="Adın (kartta gözükecek)" value={displayName} onChange={e=>setDisplayName(e.target.value)} required/>
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} type="email" required/>
          <input className="input" placeholder="Şifre" value={password} onChange={e=>setPassword(e.target.value)} type="password" required/>
          <button className="btn" type="submit">Hesap Oluştur</button>
        </form>
        {ok && <p style={{color:'#89f7b1', marginTop:10}}>Hesap oluşturuldu. <a href="/(app)/dashboard">Dashboard</a></p>}
        {err && <p style={{color:'#ff8a8a', marginTop:10}}>{err}</p>}
        <div className="hr" />
        <p>Hesabın var mı? <a href="/(auth)/login">Giriş yap</a></p>
      </div>
    </main>
  )
}
