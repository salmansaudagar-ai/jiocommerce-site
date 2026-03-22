'use client';

import { motion } from 'framer-motion';

const BRANDS = [
  { name: 'JioMart', category: 'Marketplace' },
  { name: 'AJIO', category: 'Fashion' },
  { name: 'Tira', category: 'Beauty' },
  { name: 'Netmeds', category: 'Healthcare' },
  { name: '7-Eleven', category: 'Convenience' },
  { name: 'Urban Ladder', category: 'Furniture' },
  { name: 'Freshpik', category: 'Groceries' },
  { name: 'Azorte', category: 'Tech' },
  { name: 'Clovia', category: 'Innerwear' },
  { name: 'Zivame', category: 'Innerwear' },
  { name: 'Steve Madden', category: 'Fashion' },
  { name: 'SHEIN', category: 'Fashion' },
];

export default function EcosystemSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0F172A' }}>
            Powering Commerce across<br />
            <span style={{ color: '#635BFF' }}>Reliance Retail Ecosystem</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by India's leading retail brands and platforms
          </p>
        </motion.div>

        {/* Brand Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {BRANDS.map((brand) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              className="group"
            >
              <div className="border rounded-2xl px-6 py-8 flex flex-col items-center justify-center h-full transition-all duration-300 cursor-pointer hover:shadow-lg" style={{ background: 'linear-gradient(to bottom right, rgba(99, 91, 255, 0.05), rgba(16, 185, 129, 0.05))', borderColor: 'rgba(99, 91, 255, 0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(99, 91, 255, 0.3)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(99, 91, 255, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(99, 91, 255, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div className="text-center">
                  <div className="text-lg font-bold mb-2 group-hover:transition-colors" style={{ color: '#0F172A' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#635BFF'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#0F172A'; }}>
                    {brand.name}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {brand.category}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
