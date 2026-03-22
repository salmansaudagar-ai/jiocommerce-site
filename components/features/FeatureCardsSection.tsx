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
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="rounded-2xl p-8 md:p-10 text-white flex flex-col h-full overflow-hidden relative group"
              style={{ backgroundColor: feature.bgColor }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                {/* Icon Area */}
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all">
                  <div className="text-3xl">
                    {index === 0 && '🛍️'}
                    {index === 1 && '⚙️'}
                    {index === 2 && '🚀'}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-6">{feature.title}</h3>

                {/* Points */}
                <ul className="space-y-3 mb-8">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <FiCheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* CTA Link */}
                <button className="text-white font-semibold flex items-center gap-2 hover:gap-3 transition-all group/link">
                  Learn more
                  <span className="text-lg">→</span>
                </button>
              </div>

              {/* Image Placeholder on right */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 opacity-20 group-hover:opacity-30 transition-opacity rounded-xl ml-4"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
