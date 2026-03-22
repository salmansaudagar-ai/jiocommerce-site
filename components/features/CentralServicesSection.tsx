'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const SERVICES = [
  {
    title: 'Unified Customer Data Platform',
    description: 'Build a 360-degree view of your customers with integrated data collection and analytics.',
    icon: '👥',
  },
  {
    title: 'Seller Central',
    description: 'Empower sellers with a comprehensive dashboard for business management and analytics.',
    icon: '🏢',
  },
  {
    title: 'Commerce Control Tower',
    description: 'Monitor and manage your entire commerce operation from a single, unified dashboard.',
    icon: '🎛️',
  },
  {
    title: 'Catalog Cloud',
    description: 'Manage product data at scale with AI-powered enrichment and multi-channel syndication.',
    icon: '☁️',
  },
  {
    title: 'Real-time Unified Inventory',
    description: 'Synchronize inventory across all channels in real-time to prevent stockouts and overselling.',
    icon: '📦',
  },
  {
    title: 'Master Data Hub',
    description: 'Centralize product, customer, and business data with governance and quality controls.',
    icon: '🔗',
  },
];

export default function CentralServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
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
            How Jio Commerce Platform<br />
            <span className="text-jio-purple">Makes Business Easy</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Integrated services that work together to simplify commerce operations
          </p>
        </motion.div>

        {/* Master Data Hub - Featured Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 bg-white rounded-2xl border border-jio-purple/20 overflow-hidden hover:border-jio-purple/50 transition-all group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Text */}
            <div className="p-10 lg:p-12">
              <h3 className="text-3xl font-bold text-jio-navy mb-4">Master Data Hub</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The central repository for all your product, customer, and business data. With built-in governance, quality controls, and multi-channel syndication capabilities.
              </p>
              <button className="inline-flex items-center gap-2 text-jio-purple font-semibold hover:gap-3 transition-all group/btn">
                Learn about Master Data Hub →
              </button>
            </div>

            {/* Illustration */}
            <div className="aspect-square bg-gradient-to-br from-jio-purple/20 to-jio-blue/20 flex items-center justify-center p-10">
              <div className="text-7xl">🗄️</div>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:border-jio-purple/30 transition-all group cursor-pointer hover:shadow-lg"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h4 className="text-lg font-semibold text-jio-navy mb-2 group-hover:text-jio-purple transition-colors">
                {service.title}
              </h4>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <button className="text-jio-purple text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <FiArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
