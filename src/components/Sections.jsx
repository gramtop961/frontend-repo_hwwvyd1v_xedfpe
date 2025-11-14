import { motion, useScroll, useTransform } from 'framer-motion'
import { Cpu, Network, Recycle, LayoutDashboard, Satellite, CloudCog, Waves, Gauge, Route, Droplets, ShieldCheck, Leaf } from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' } })
}

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-2 gap-10">
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">About Anthurium</h2>
            <p className="mt-4 text-neutral-700 dark:text-neutral-300">
              Anthurium is a unified operating layer connecting urban and rural systems. We integrate IoT telemetry, environmental signals, transport flows, and utility data into one real‑time graph to power automation, analytics, and policy.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { icon: Cpu, title: 'Automated', text: 'Closed‑loop orchestration with rules, AI agents, and safe human oversight.' },
                { icon: Network, title: 'Networked Technologies', text: 'Interoperable APIs link devices, platforms, and jurisdictions.' },
                { icon: Recycle, title: 'Holistic Integration', text: 'Urban–rural feedback loops align resources and demand.' },
                { icon: LayoutDashboard, title: 'Unified Management', text: 'One command surface with granular roles and auditability.' },
              ].map((c, i) => (
                <motion.div key={c.title} custom={i} variants={fadeIn} className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <div className="flex items-center gap-3">
                    <c.icon className="text-emerald-600" size={20} />
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white">{c.title}</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{c.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="relative">
            <Infographic />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Infographic(){
  // Simple SVG loop with animated flow lines
  return (
    <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950">
      <svg viewBox="0 0 600 420" className="w-full h-auto">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#10b981"/>
            <stop offset="100%" stopColor="#34d399"/>
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* City and Rural nodes */}
        <g>
          <rect x="60" y="60" width="160" height="90" rx="12" fill="#111827" />
          <text x="140" y="115" textAnchor="middle" fill="white" fontSize="14">Urban Systems</text>

          <rect x="380" y="260" width="160" height="90" rx="12" fill="#111827" />
          <text x="460" y="315" textAnchor="middle" fill="white" fontSize="14">Rural Systems</text>
        </g>

        {/* Flowing paths */}
        {[0,1,2,3].map((i)=> (
          <g key={i}>
            <path d={`M220 ${95+i*8} C 300 ${80+i*8}, 340 ${280-i*8}, 380 ${305-i*6}`} fill="none" stroke="url(#g)" strokeWidth="3" opacity="0.6"/>
            <circle>
              <animateMotion dur={`${4 + i}s`} repeatCount="indefinite" path={`M220 ${95+i*8} C 300 ${80+i*8}, 340 ${280-i*8}, 380 ${305-i*6}`}/>
              <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/>
            </circle>
          </g>
        ))}

        {/* Central hub */}
        <g filter="url(#glow)">
          <circle cx="300" cy="200" r="38" fill="url(#g)" />
          <text x="300" y="205" textAnchor="middle" fill="white" fontSize="12">Anthurium</text>
        </g>
      </svg>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">Animated feedback loop connects urban telemetry to rural assets through a central orchestrator.</p>
    </div>
  )
}

export function Capabilities(){
  const items = [
    { icon: Satellite, title: 'IoT Ingestion', text: 'High‑throughput ingestion from edge devices and gateways with schema registry.' },
    { icon: Waves, title: 'Env. Intelligence', text: 'Predictive models for air, water, soil and microclimate signals.' },
    { icon: Route, title: 'Mobility Modeling', text: 'Real‑time routing and flow optimization across regions.' },
    { icon: Droplets, title: 'Utility Optimization', text: 'Dynamic balancing for water and energy networks.' },
    { icon: LayoutDashboard, title: 'Governance Dashboards', text: 'KPIs, SLAs, and role‑aware command surfaces.' },
    { icon: ShieldCheck, title: 'Secure by Design', text: 'Zero‑trust APIs, audit logs, and encryption in transit/at rest.' },
  ]
  return (
    <section id="capabilities" className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">Platform Capabilities</motion.h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i)=> (
            <motion.div key={it.title} initial={{opacity:0, y:20, scale:0.98}} whileInView={{opacity:1, y:0, scale:1}} viewport={{once:true}} transition={{duration:0.5, delay: i*0.08}} className="group p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-lg transition-all">
              <div className="h-10 w-10 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 grid place-items-center">
                <it.icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold text-neutral-900 dark:text-white">{it.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Solutions(){
  const data = [
    { title: 'Smart Agriculture', text: 'Soil‑aware irrigation, pest risk alerts, and yield forecasting.', accent: 'from-emerald-500 to-green-400' },
    { title: 'Urban Mobility', text: 'Adaptive signals, demand‑responsive transit, and curb orchestration.', accent: 'from-sky-500 to-blue-400' },
    { title: 'Disaster Response', text: 'Unified incident graph with automated playbooks and comms.', accent: 'from-amber-500 to-orange-400' },
    { title: 'Water & Energy Grids', text: 'Leak detection, load shifting, and resilience analytics.', accent: 'from-indigo-500 to-violet-400' },
    { title: 'Market Linkages', text: 'Transparent logistics bridging producers and urban demand.', accent: 'from-fuchsia-500 to-pink-400' },
  ]
  return (
    <section id="solutions" className="py-20 md:py-28 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">Solutions & Use Cases</motion.h2>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((s, i)=> (
            <motion.div key={s.title} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, delay:i*0.07}} className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
              <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${s.accent} opacity-20 blur-2xl pointer-events-none`} />
              <h3 className="font-semibold text-neutral-900 dark:text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TechStack(){
  const items = [
    { icon: CloudCog, title: 'Cloud Orchestration' },
    { icon: Satellite, title: 'Edge Devices' },
    { icon: Gauge, title: 'Data Pipelines' },
    { icon: Cpu, title: 'AI Models' },
    { icon: LayoutDashboard, title: 'Governance APIs' },
    { icon: Network, title: 'Interoperability' },
  ]
  return (
    <section id="tech" className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">Technology Stack</motion.h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i)=> (
            <motion.div key={it.title} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, delay:i*0.08}} className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="h-10 w-10 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 grid place-items-center">
                <it.icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold text-neutral-900 dark:text-white">{it.title}</h3>
              <div className="mt-3 h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <motion.div initial={{width: '0%'}} whileInView={{width: '100%'}} viewport={{once:true}} transition={{duration:1.2}} className="h-full bg-emerald-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
