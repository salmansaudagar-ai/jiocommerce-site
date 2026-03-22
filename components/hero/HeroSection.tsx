'use client';

import { Button } from '@/components/ui/Button';
import { FiPlay } from 'react-icons/fi';
import MetricCounter from './MetricCounter';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-jio-navy via-jio-navy to-jio-navy-light">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Tag */}
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-jio-amber bg-jio-amber/10">
            <span className="text-sm font-semibold uppercase tracking-wide text-jio-amber">
              Powering India's Largest Retail Ecosystem
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            The Commerce Platform<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-jio-purple via-jio-blue to-jio-teal">
              Behind Reliance Retail
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Enterprise-scale commerce infrastructure powering D2C, Marketplace, B2B, and Omnichannel retail. Built for scale, designed for innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button
              onClick={() => {}}
              className="bg-jio-purple text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all font-semibold text-base"
            >
              Request a Demo
            </Button>
            <button
              onClick={() => {}}
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all font-semibold"
            >
              <FiPlay className="w-5 h-5" />
              Watch Intro
            </button>
          </div>

          {/* Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 pt-12 border-t border-white/10"
          >
            <MetricCounter value={2} suffix="B+" label="GMV" />
            <MetricCounter value={5} suffix="M+" label="Daily Orders" />
            <MetricCounter value={50} suffix="+" label="Brands" />
            <MetricCounter value={99.9} suffix="%" label="Uptime" />
            <MetricCounter value={500} suffix="+" label="Cities" />
          </motion.div>
        </motion.div>

        {/* Illustration Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 relative"
        >
          <div className="aspect-video rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden bg-gradient-to-br from-jio-purple/20 to-jio-teal/20">
            <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-jio-purple/30 via-transparent to-jio-teal/30"></div>
            <div className="relative z-10 text-center">
              <div className="text-6xl font-bold text-white/20 mb-2">Isometric Commerce</div>
              <p className="text-white/40 text-sm">Illustration Area</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
