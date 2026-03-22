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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-jio-navy">
            Unlock Commerce Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with insights, best practices, and industry trends shaping the future of commerce
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {BLOG_POSTS.map((post) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              className="group bg-white rounded-3xl overflow-hidden border-2 border-gray-200/50 transition-all hover:shadow-2xl hover:border-jio-purple/40 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="aspect-video flex items-center justify-center text-6xl group-hover:scale-110 transition-transform overflow-hidden bg-gradient-to-br from-jio-purple/15 via-jio-blue/10 to-jio-teal/10">
                {post.image}
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Category */}
                <div className="inline-block mb-4">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full text-jio-purple bg-jio-purple/15 border border-jio-purple/20 uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>

                {/* Date */}
                <p className="text-xs text-gray-500 mb-4 font-medium">{post.date}</p>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4 transition-colors line-clamp-2 text-jio-navy group-hover:text-jio-purple leading-tight">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-8 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* CTA */}
                <motion.div whileHover={{ x: 4 }}>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-3 font-semibold text-sm hover:gap-4 transition-all group/link text-jio-purple"
                  >
                    Read article
                    <span className="text-lg group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </motion.div>
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
            className="inline-flex items-center gap-2 font-semibold text-lg hover:gap-3 transition-all group/btn text-jio-purple"
          >
            Explore all articles →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
