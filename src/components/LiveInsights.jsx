import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Lightweight custom line chart using canvas for performance
function LineChart({ data, color = '#10b981' }) {
  const ref = useRef(null)

  useEffect(() => {
    const cnv = ref.current
    const ctx = cnv.getContext('2d')

    const dpr = window.devicePixelRatio || 1
    const width = cnv.clientWidth
    const height = cnv.clientHeight
    cnv.width = width * dpr
    cnv.height = height * dpr
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, width, height)

    const max = Math.max(...data, 1)
    const min = Math.min(...data, 0)
    const pad = 8

    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * (width - pad * 2) + pad
      const y = height - pad - ((v - min) / (max - min || 1)) * (height - pad * 2)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()

    // gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, height)
    grad.addColorStop(0, color + '33')
    grad.addColorStop(1, color + '00')
    ctx.fillStyle = grad
    ctx.lineTo(width - pad, height - pad)
    ctx.lineTo(pad, height - pad)
    ctx.closePath()
    ctx.fill()
  }, [data, color])

  return <canvas ref={ref} className="w-full h-28" />
}

function StatCard({ label, value, unit, color }){
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">
        {value}
        <span className="text-sm font-normal text-neutral-500 ml-1">{unit}</span>
      </p>
      <div className="mt-3 h-1 w-full rounded-full bg-neutral-100 dark:bg-neutral-800">
        <div className="h-full rounded-full" style={{ width: `${Math.min(100, Number(value))}%`, background: color }} />
      </div>
    </div>
  )
}

export default function LiveInsights(){
  const [tick, setTick] = useState(0)
  const [stats, setStats] = useState({ energy: 42, water: 30, traffic: 58, connectivity: 76 })
  const [series, setSeries] = useState(Array.from({length: 50}, (_,i)=> 50 + Math.sin(i/4)*10))

  useEffect(() => {
    const iv = setInterval(() => {
      setTick(t => t + 1)
      setStats(s => ({
        energy: Math.max(0, Math.min(100, s.energy + (Math.random()*6-3))),
        water: Math.max(0, Math.min(100, s.water + (Math.random()*6-3))),
        traffic: Math.max(0, Math.min(100, s.traffic + (Math.random()*6-3))),
        connectivity: Math.max(0, Math.min(100, s.connectivity + (Math.random()*6-3))),
      }))
      setSeries(prev => {
        const next = prev.slice(1).concat(50 + Math.sin((tick+1)/4)*10 + (Math.random()*8-4))
        return next
      })
    }, 2000)
    return () => clearInterval(iv)
  }, [tick])

  return (
    <section id="insights" className="py-20 md:py-28 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">Live Insight Simulation</motion.h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Energy Load" value={stats.energy.toFixed(0)} unit="%" color="#22c55e" />
          <StatCard label="Water Usage" value={stats.water.toFixed(0)} unit="%" color="#06b6d4" />
          <StatCard label="Traffic Density" value={stats.traffic.toFixed(0)} unit="%" color="#f59e0b" />
          <StatCard label="Connectivity Score" value={stats.connectivity.toFixed(0)} unit="%" color="#8b5cf6" />
        </div>

        <div className="mt-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">System Health Over Time</p>
            <div className="text-xs text-neutral-500">Simulated</div>
          </div>
          <div className="mt-3">
            <LineChart data={series} />
          </div>
        </div>
      </div>
    </section>
  )
}
