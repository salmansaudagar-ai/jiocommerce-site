'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const BLOG_POSTS = [
  {
    id: '1',
    title: 'AI-Powered Personalization: The Future of eCommerce',
    excerpt: 'Discover how machine learning is revolutionizing product recommendations and customer experiences.',
    date: 'Mar 22, 2026',
    category: 'AI & ML',
    image: '🤖',
  },
  {
    id: '2',
    title: 'Omnichannel Retail: Breaking Down Silos',
    excerpt: 'Learn how to create seamless shopping experiences across online and offline channels.',
    date: 'Mar 20, 2026',
    category: 'Strategy',
    image: '🛍️',
  },
  {
    id: '3',
    title: 'Warehouse Automation: Scaling Operations Efficiently',
    excerpt: 'Best practices for automating warehouse operations and reducing fulfillment time.',
    date: 'Mar 18, 2026',
    category: 'Operations',
    image: '🏭',
  },
];

export default function BlogPreviewSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0F172A' }}>
            Unlock Commerce Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Stay updated with insights, best practices, and industry trends
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {BLOG_POSTS.map((post) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all hover:shadow-lg"
              style={{ borderColor: 'rgb(229, 231, 235)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(99, 91, 255, 0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgb(229, 231, 235)'; }}
            >
              {/* Image */}
              <div className="aspect-video flex items-center justify-center text-6xl group-hover:scale-105 transition-transform overflow-hidden" style={{ background: 'linear-gradient(to bottom right, rgba(99, 91, 255, 0.1), rgba(16, 185, 129, 0.1))' }}>
                {post.image}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="inline-block mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: '#635BFF', backgroundColor: 'rgba(99, 91, 255, 0.1)' }}>
                    {post.category}
                  </span>
                </div>

                {/* Date */}
                <p className="text-xs text-gray-500 mb-3">{post.date}</p>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 transition-colors line-clamp-2" style={{ color: '#0F172A' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#635BFF'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#0F172A'; }}>
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* CTA */}
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all group/link"
                  style={{ color: '#635BFF' }}
                >
                  Read article →
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Explore More Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-semibold text-lg hover:gap-3 transition-all group/btn"
            style={{ color: '#635BFF' }}
          >
            Explore all articles →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
