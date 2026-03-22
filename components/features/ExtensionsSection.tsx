'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const EXTENSIONS = [
  {
    title: 'Gamified Shopping',
    description: 'Engage customers with loyalty points, badges, and rewards to increase repeat purchases.',
    icon: '🎮',
    color: 'from-jio-purple',
  },
  {
    title: 'AR Try-On',
    description: 'Let customers virtually try products before buying with augmented reality technology.',
    icon: '👓',
    color: 'from-jio-blue',
  },
  {
    title: 'AI Product Suggestions',
    description: 'Smart recommendations powered by machine learning to boost average order value.',
    icon: '🤖',
    color: 'from-jio-teal',
  },
  {
    title: 'Coupons & Loyalty',
    description: 'Manage promotional campaigns and customer loyalty programs with ease.',
    icon: '🎟️',
    color: 'from-jio-amber',
  },
  {
    title: 'Live Shopping',
    description: 'Host interactive live shopping events to increase engagement and sales.',
    icon: '📺',
    color: 'from-jio-purple',
  },
  {
    title: 'Social Commerce',
    description: 'Sell directly through social media platforms with seamless integration.',
    icon: '📱',
    color: 'from-jio-blue',
  },
];

export default function ExtensionsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, EXTENSIONS.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-jio-navy mb-6">
            Extend & Enhance with <span className="text-jio-purple">JCP Extensions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful add-ons to supercharge your commerce experience
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -currentIndex * (100 / itemsPerView) + '%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {EXTENSIONS.map((ext, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                >
                  <div className={`bg-gradient-to-br ${ext.color} to-opacity-10 rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow group cursor-pointer h-full`}>
                    {/* Header with color */}
                    <div className={`bg-gradient-to-r ${ext.color} to-opacity-80 h-32 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <div className="text-6xl">{ext.icon}</div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h4 className="text-xl font-bold text-jio-navy mb-3">
                        {ext.title}
                      </h4>
                      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                        {ext.description}
                      </p>
                      <button className="text-jio-purple font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all group/btn">
                        Explore →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full border-2 transition-all ${
                currentIndex === 0
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-jio-purple text-jio-purple hover:bg-jio-purple/10'
              }`}
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-3 rounded-full border-2 transition-all ${
                currentIndex >= maxIndex
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-jio-purple text-jio-purple hover:bg-jio-purple/10'
              }`}
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
