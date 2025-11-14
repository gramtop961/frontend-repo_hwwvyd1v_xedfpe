import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-[90vh] md:h-[92vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-white/70 dark:bg-neutral-900/70 text-neutral-700 dark:text-neutral-200 shadow-sm backdrop-blur pointer-events-none">Automated Networked Technologies for Holistic Urban-Rural Integration and Unified Management</span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Anthurium Project
            </h1>
            <p className="mt-4 text-base md:text-lg text-neutral-700 dark:text-neutral-300">
              A next‑generation platform unifying urban and rural infrastructure data, automation, and governance into one intelligent network.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#about" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">Learn More</a>
              <a href="#capabilities" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white/80 dark:bg-neutral-900/80 text-neutral-900 dark:text-white font-semibold hover:bg-white dark:hover:bg-neutral-800 transition-colors">Explore Platform</a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-neutral-950 opacity-90" />
    </section>
  )
}
