'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function EcosystemSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-green-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 text-jio-navy leading-tight">
            Powering Commerce across
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-jio-purple to-jio-teal">
              Reliance Retail Ecosystem
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unified platform trusted by 50+ leading retail brands and digital platforms
          </p>
        </motion.div>

        {/* Ecosystem Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200/30">
            <Image
              src="/assets/scraped/images/685900d34dcd1f95db20e2de_670e46458e4cd99b019ee19c_Eco-systems.webp"
              alt="Reliance Retail Ecosystem Diagram"
              width={1200}
              height={800}
              quality={95}
              priority
              className="w-full h-auto"
            />
          </div>

          {/* Background glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-jio-purple/10 via-jio-teal/10 to-jio-blue/10 rounded-3xl -z-10 blur-3xl"></div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-jio-purple/10 to-transparent border border-jio-purple/20">
            <div className="text-3xl font-bold text-jio-purple mb-2">50+</div>
            <div className="text-sm text-gray-600">Retail Brands</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-jio-teal/10 to-transparent border border-jio-teal/20">
            <div className="text-3xl font-bold text-jio-teal mb-2">10M+</div>
            <div className="text-sm text-gray-600">SKUs Managed</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-jio-blue/10 to-transparent border border-jio-blue/20">
            <div className="text-3xl font-bold text-jio-blue mb-2">500+</div>
            <div className="text-sm text-gray-600">Cities Covered</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-jio-amber/10 to-transparent border border-jio-amber/20">
            <div className="text-3xl font-bold text-jio-amber mb-2">99.9%</div>
            <div className="text-sm text-gray-600">Uptime SLA</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
