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
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-jio-navy leading-tight">
            How Jio Commerce Platform
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-jio-purple to-jio-teal">
              Makes Business Easy
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Integrated services that simplify and accelerate commerce operations at scale
          </p>
        </motion.div>

        {/* Master Data Hub - Featured Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 bg-white rounded-3xl overflow-hidden transition-all group border-2 border-jio-purple/20 hover:border-jio-purple/40 hover:shadow-2xl shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Text */}
            <div className="p-10 lg:p-16">
              <div className="inline-block mb-4 px-4 py-2 rounded-full bg-jio-purple/10 border border-jio-purple/20">
                <span className="text-xs font-semibold uppercase tracking-wide text-jio-purple">Featured Service</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-jio-navy leading-tight">Master Data Hub</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                The central repository for all your product, customer, and business data. With built-in governance, quality controls, and multi-channel syndication capabilities.
              </p>
              <motion.button
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-3 font-semibold text-jio-purple hover:gap-4 transition-all group/btn text-base"
              >
                Learn about Master Data Hub
                <span className="text-xl group-hover/btn:translate-x-1 transition-transform">→</span>
              </motion.button>
            </div>

            {/* Illustration */}
            <div className="aspect-square flex items-center justify-center p-10 bg-gradient-to-br from-jio-purple/20 via-jio-blue/10 to-jio-teal/10 group-hover:from-jio-purple/30 group-hover:via-jio-blue/20 transition-all duration-300">
              <div className="text-8xl scale-90 group-hover:scale-100 transition-transform duration-300">🗄️</div>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200/50 transition-all group cursor-pointer hover:shadow-xl hover:border-jio-purple/40 hover:-translate-y-1"
            >
              <div className="text-5xl mb-6 scale-90 group-hover:scale-100 transition-transform duration-300 origin-left">{service.icon}</div>
              <h4 className="text-lg font-bold mb-3 text-jio-navy group-hover:text-jio-purple transition-colors">
                {service.title}
              </h4>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{service.description}</p>
              <motion.button
                whileHover={{ x: 4 }}
                className="text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all text-jio-purple"
              >
                Explore <FiArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
