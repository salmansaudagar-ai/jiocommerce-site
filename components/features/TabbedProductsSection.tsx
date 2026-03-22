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
            Products Built for Every Need
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Modular, scalable, and integrated solutions for modern commerce
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-gray-200 pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-all relative whitespace-nowrap text-sm ${
                activeTab === tab.id
                  ? 'text-jio-purple'
                  : 'text-gray-600 hover:text-jio-navy'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-jio-purple rounded-full"
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
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Content */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-jio-navy mb-4">
                  {activeTabContent.title}
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {activeTabContent.description}
                </p>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {activeTabContent.features.map((feature) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-jio-purple/10 rounded-full flex items-center justify-center">
                        <FiCheck className="w-4 h-4 text-jio-purple" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-jio-purple font-semibold hover:gap-3 transition-all group"
                >
                  Explore {activeTabContent.label} →
                </a>
              </div>

              {/* Right - Illustration Placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="aspect-square bg-gradient-to-br from-jio-purple/10 to-jio-teal/10 rounded-2xl border border-jio-purple/20 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">
                    {activeTab === 'ecommerce' && '🛒'}
                    {activeTab === 'brick-mortar' && '🏪'}
                    {activeTab === 'order-management' && '📦'}
                    {activeTab === 'catalog' && '📚'}
                    {activeTab === 'marketing' && '📊'}
                  </div>
                  <p className="text-gray-500 text-sm">{activeTabContent.label} Illustration</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
