import { useEffect, useMemo, useRef } from 'react'

// Animated network graph using canvas
export default function NetworkGraph(){
  const ref = useRef(null)
  const nodes = useMemo(()=> Array.from({length: 28}, (_,i)=> ({
    id:i,
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random()-0.5)*0.003,
    vy: (Math.random()-0.5)*0.003,
    r: 2 + Math.random()*2,
    type: i%7===0 ? 'hub' : (i%3===0 ? 'urban' : 'rural')
  })),[])

  useEffect(()=>{
    const cnv = ref.current
    const ctx = cnv.getContext('2d')
    let raf

    function resize(){
      const dpr = window.devicePixelRatio||1
      const {clientWidth:w, clientHeight:h} = cnv
      cnv.width = w*dpr
      cnv.height= h*dpr
      ctx.setTransform(dpr,0,0,dpr,0,0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cnv)

    function step(){
      const w = cnv.clientWidth, h = cnv.clientHeight
      ctx.clearRect(0,0,w,h)

      // physics
      nodes.forEach(n=>{
        n.x += n.vx; n.y += n.vy
        if (n.x<0||n.x>1) n.vx*=-1
        if (n.y<0||n.y>1) n.vy*=-1
      })

      // links by proximity
      for (let i=0;i<nodes.length;i++){
        for (let j=i+1;j<nodes.length;j++){
          const a = nodes[i], b = nodes[j]
          const dx = (a.x-b.x), dy = (a.y-b.y)
          const dist = Math.hypot(dx,dy)
          if (dist < 0.18){
            const alpha = 1 - dist/0.18
            ctx.strokeStyle = `rgba(16,185,129,${0.25+alpha*0.5})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x*w, a.y*h)
            ctx.lineTo(b.x*w, b.y*h)
            ctx.stroke()
          }
        }
      }

      // nodes
      nodes.forEach(n=>{
        if (n.type==='hub') ctx.fillStyle = '#10b981'
        else if (n.type==='urban') ctx.fillStyle = '#0ea5e9'
        else ctx.fillStyle = '#8b5cf6'
        ctx.beginPath()
        ctx.arc(n.x*w, n.y*h, n.r, 0, Math.PI*2)
        ctx.fill()
      })

      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    return ()=>{ cancelAnimationFrame(raf); ro.disconnect() }
  },[nodes])

  return <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Urban–Rural Network</p>
      <div className="text-xs text-neutral-500">Simulated</div>
    </div>
    <div className="h-56 w-full"><canvas ref={ref} className="w-full h-full"/></div>
  </div>
}
