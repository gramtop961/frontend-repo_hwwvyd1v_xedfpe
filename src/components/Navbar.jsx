import { useEffect, useState } from 'react'
import { Menu, X, Sun, Moon, Leaf } from 'lucide-react'

export default function Navbar({ onToggleTheme, theme }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const nav = document.getElementById('site-nav')
      if (!nav) return
      if (window.scrollY > 8) nav.classList.add('backdrop-blur', 'bg-white/70', 'dark:bg-neutral-900/70', 'shadow-sm')
      else nav.classList.remove('backdrop-blur', 'bg-white/70', 'dark:bg-neutral-900/70', 'shadow-sm')
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: 'About' },
    { href: '#capabilities', label: 'Capabilities' },
    { href: '#insights', label: 'Live Insights' },
    { href: '#solutions', label: 'Solutions' },
    { href: '#tech', label: 'Technology' },
    { href: '#contact', label: 'Contact' },
  ]

  const handleClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <header id="site-nav" className="fixed top-0 left-0 right-0 z-50 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" onClick={(e)=>handleClick(e,'#home')} className="flex items-center gap-2 font-semibold">
            <div className="h-8 w-8 rounded-md bg-emerald-500 grid place-items-center text-white shadow">
              <Leaf size={18} />
            </div>
            <span className="text-neutral-900 dark:text-neutral-100">Anthurium</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={(e)=>handleClick(e,l.href)} className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">{l.label}</a>
            ))}
            <button aria-label="Toggle theme" onClick={onToggleTheme} className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          <button className="md:hidden p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={()=>setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={(e)=>handleClick(e,l.href)} className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{l.label}</a>
            ))}
            <button onClick={()=>{onToggleTheme(); setOpen(false)}} className="mt-2 inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} Toggle theme
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
