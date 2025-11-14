import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { About, Capabilities, Solutions, TechStack } from './components/Sections'
import LiveInsights from './components/LiveInsights'
import NetworkGraph from './components/NetworkGraph'

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })

  useEffect(()=>{
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Navbar onToggleTheme={toggleTheme} theme={theme} />
      <main>
        <Hero />
        <About />
        <section className="bg-neutral-50 dark:bg-neutral-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <NetworkGraph />
          </div>
        </section>
        <Capabilities />
        <LiveInsights />
        <Solutions />
        <TechStack />
        <Contact />
      </main>
      <footer className="py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Anthurium Project. All rights reserved.
      </footer>
    </div>
  )
}

function Contact(){
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try{
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/contact`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      const data = await res.json()
      if (res.ok) setStatus('Thanks, we\'ll be in touch!')
      else setStatus(data.detail || 'Something went wrong')
      setForm({ name:'', email:'', message:''})
    }catch(err){
      setStatus('Unable to send right now.')
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold">Get in touch</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">Tell us about your region or use case and we\'ll reach out.</p>
        <form onSubmit={onSubmit} className="mt-8 grid gap-4 max-w-2xl">
          <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="px-4 py-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800" />
          <input required type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="px-4 py-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800" />
          <textarea required rows={5} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} placeholder="Message" className="px-4 py-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800" />
          <div className="flex items-center gap-3">
            <button className="px-5 py-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">Send Message</button>
            {status && <p className="text-sm text-neutral-600 dark:text-neutral-400">{status}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default App
