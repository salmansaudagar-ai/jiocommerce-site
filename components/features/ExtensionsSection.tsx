'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight as FiChevronRightIcon } from 'react-icons/fi';

const EXTENSIONS = [
  {
    title: 'Gamified Shopping',
    description: 'Engage customers with loyalty points, badges, and rewards to increase repeat purchases.',
    icon: '🎮',
    color: '#635BFF',
  },
  {
    title: 'AR Try-On',
    description: 'Let customers virtually try products before buying with augmented reality technology.',
    icon: '👓',
    color: '#3B82F6',
  },
  {
    title: 'AI Product Suggestions',
    description: 'Smart recommendations powered by machine learning to boost average order value.',
    icon: '🤖',
    color: '#10B981',
  },
  {
    title: 'Coupons & Loyalty',
    description: 'Manage promotional campaigns and customer loyalty programs with ease.',
    icon: '🎟️',
    color: '#F59E0B',
  },
  {
    title: 'Live Shopping',
    description: 'Host interactive live shopping events to increase engagement and sales.',
    icon: '📺',
    color: '#635BFF',
  },
  {
    title: 'Social Commerce',
    description: 'Sell directly through social media platforms with seamless integration.',
    icon: '📱',
    color: '#3B82F6',
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
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-jio-navy">
            Extend & Enhance with
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-jio-purple to-jio-blue">
              JCP Extensions
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful add-ons to supercharge your commerce experience and engage customers
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
                  <div className="rounded-3xl overflow-hidden hover:shadow-2xl transition-all group cursor-pointer h-full border-2 border-gray-200/50 hover:border-gray-300 hover:-translate-y-2" style={{ background: `linear-gradient(to bottom right, ${ext.color}10, transparent)` }}>
                    {/* Header with color */}
                    <div className="h-40 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: `linear-gradient(135deg, ${ext.color}, ${ext.color}dd)` }}>
                      <div className="text-7xl">{ext.icon}</div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h4 className="text-xl font-bold mb-4 text-jio-navy">
                        {ext.title}
                      </h4>
                      <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                        {ext.description}
                      </p>
                      <motion.button
                        whileHover={{ x: 4 }}
                        className="font-semibold text-sm flex items-center gap-3 hover:gap-4 transition-all group/btn text-jio-purple"
                      >
                        Explore
                        <FiChevronRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
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
                  ? 'border-gray-300 text-gray-400'
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
                  ? 'border-gray-300 text-gray-400'
                  : 'border-jio-purple text-jio-purple hover:bg-jio-purple/10'
              }`}
            >
              <FiChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
