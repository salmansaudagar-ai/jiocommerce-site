'use client';

import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const FEATURES = [
  {
    title: 'All-Purpose Commerce',
    color: '#635BFF',
    bgColor: '#635BFF',
    points: [
      'B2B/B2C/D2C commerce',
      'Cross-border enabled',
      'Online + Offline seamless',
    ],
  },
  {
    title: 'Scalable Solution',
    color: '#10B981',
    bgColor: '#10B981',
    points: [
      'No-code headless architecture',
      'Plug-and-play extensions',
      'Scales with your business',
    ],
  },
  {
    title: 'Growth Friendly',
    color: '#F59E0B',
    bgColor: '#F59E0B',
    points: [
      'SEO-optimized by default',
      'Lightning-fast loading',
      'Conversion-focused design',
    ],
  },
];

export default function FeatureCardsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-jio-navy">
            Platform Capabilities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enterprise-grade features designed to scale your commerce operations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="rounded-2xl p-8 md:p-10 text-white flex flex-col h-full overflow-hidden relative group shadow-lg hover:shadow-2xl transition-all duration-300"
              style={{ backgroundColor: feature.bgColor }}
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-300">
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-white rounded-full blur-3xl opacity-50"></div>
              </div>

              <div className="relative z-10">
                {/* Icon Area */}
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-8 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                  <div className="text-3xl">
                    {index === 0 && '🛍️'}
                    {index === 1 && '⚙️'}
                    {index === 2 && '🚀'}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{feature.title}</h3>

                {/* Divider */}
                <div className="h-1 w-12 bg-white/40 rounded-full mb-6"></div>

                {/* Points */}
                <ul className="space-y-3 mb-8">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <FiCheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-90" />
                      <span className="text-white/90 text-sm md:text-base">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* CTA Link */}
                <button className="text-white font-semibold flex items-center gap-2 hover:gap-3 transition-all group/link text-sm md:text-base">
                  Learn more
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

              {/* Image Placeholder on right */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 opacity-15 group-hover:opacity-25 transition-opacity rounded-xl ml-4"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
