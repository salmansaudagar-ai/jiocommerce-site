'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const TABS = [
  {
    id: 'ecommerce',
    label: 'eCommerce',
    title: 'Complete eCommerce Solution',
    description:
      'Everything you need to build and scale a high-performance online store. From product catalog to checkout, we handle it all.',
    features: [
      'Multi-vendor marketplace support',
      'Advanced inventory management',
      'Flexible pricing and promotions',
      'Mobile-first storefront',
      'Real-time analytics dashboard',
      'SEO optimization tools',
    ],
  },
  {
    id: 'brick-mortar',
    label: 'Brick & Mortar',
    title: 'Unified Store Management',
    description:
      'Manage physical stores with a modern POS system integrated with your online presence for true omnichannel retail.',
    features: [
      'Cloud-based POS system',
      'Inventory sync across channels',
      'Customer data unification',
      'Sales analytics',
      'Staff management',
      'Receipt customization',
    ],
  },
  {
    id: 'order-management',
    label: 'Order Management',
    title: 'Streamlined Order Processing',
    description:
      'Automate order fulfillment across all channels with intelligent routing, tracking, and customer communication.',
    features: [
      'Automated order routing',
      'Real-time order tracking',
      'Multi-fulfillment center support',
      'Return and RMA management',
      'Customer notifications',
      'Integration with logistics partners',
    ],
  },
  {
    id: 'catalog',
    label: 'Catalog Management',
    title: 'Intelligent Product Data',
    description:
      'Centralize all product information with rich content, variants, and cross-channel publishing capabilities.',
    features: [
      'Bulk product operations',
      'Variant management',
      'Rich media support',
      'Multi-language support',
      'Category hierarchies',
      'Attribute management',
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing & Promotions',
    title: 'Drive Sales with Smart Campaigns',
    description:
      'Create targeted promotions, manage campaigns, and analyze performance with built-in marketing tools.',
    features: [
      'Coupon management',
      'Flash sales and deals',
      'Customer segmentation',
      'Email campaign integration',
      'A/B testing',
      'Performance analytics',
    ],
  },
];

export default function TabbedProductsSection() {
  const [activeTab, setActiveTab] = useState('ecommerce');
  const activeTabContent = TABS.find((tab) => tab.id === activeTab);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-jio-purple/5 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-jio-navy">
            Core Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Modular, scalable, and integrated solutions for modern commerce
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 border-b-2 border-gray-200 pb-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-all relative whitespace-nowrap text-sm rounded-lg ${
                activeTab === tab.id
                  ? 'text-jio-purple bg-jio-purple/10'
                  : 'text-gray-600 hover:text-jio-navy hover:bg-gray-50'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-jio-purple to-jio-blue"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTabContent && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-jio-navy leading-tight">
                  {activeTabContent.title}
                </h3>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                  {activeTabContent.description}
                </p>

                {/* Features List */}
                <ul className="space-y-4 mb-10">
                  {activeTabContent.features.map((feature, idx) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-jio-purple/20 border border-jio-purple/40">
                        <FiCheck className="w-4 h-4 text-jio-purple font-bold" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm md:text-base">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-3 font-semibold text-jio-purple hover:gap-4 transition-all group text-base"
                >
                  Explore {activeTabContent.label}
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </motion.a>
              </motion.div>

              {/* Right - Illustration Placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="aspect-square rounded-3xl border-2 border-jio-purple/20 flex items-center justify-center bg-gradient-to-br from-jio-purple/15 via-jio-blue/5 to-jio-teal/10 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-center">
                  <div className="text-7xl mb-4 scale-90 hover:scale-100 transition-transform">
                    {activeTab === 'ecommerce' && '🛒'}
                    {activeTab === 'brick-mortar' && '🏪'}
                    {activeTab === 'order-management' && '📦'}
                    {activeTab === 'catalog' && '📚'}
                    {activeTab === 'marketing' && '📊'}
                  </div>
                  <p className="text-gray-500 text-sm font-medium">{activeTabContent.label}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
