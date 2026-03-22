'use client';

import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';

const BLOG_POSTS = [
  {
    id: '1',
    title: 'AI-Powered Personalization: The Future of eCommerce',
    excerpt:
      'Discover how machine learning is revolutionizing product recommendations and customer experiences. Learn best practices for implementation.',
    date: 'Mar 22, 2026',
    category: 'AI & ML',
    image: '🤖',
    content:
      'Artificial intelligence is transforming how retailers engage with customers...',
  },
  {
    id: '2',
    title: 'Omnichannel Retail: Breaking Down Silos',
    excerpt:
      'Learn how to create seamless shopping experiences across online and offline channels. Integrate inventory, orders, and customer data.',
    date: 'Mar 20, 2026',
    category: 'Strategy',
    image: '🛍️',
    content:
      'Omnichannel retail is no longer optional. Customers expect seamless experiences...',
  },
  {
    id: '3',
    title: 'Warehouse Automation: Scaling Operations Efficiently',
    excerpt:
      'Best practices for automating warehouse operations and reducing fulfillment time. Explore robotics and automation technologies.',
    date: 'Mar 18, 2026',
    category: 'Operations',
    image: '🏭',
    content:
      'Warehouse automation is critical for modern eCommerce operations...',
  },
  {
    id: '4',
    title: 'The Rise of Quick Commerce: Trends and Opportunities',
    excerpt:
      'Understand the hyperlocal commerce boom and how to capitalize on the quick commerce trend. Build delivery networks in minutes.',
    date: 'Mar 15, 2026',
    category: 'Trends',
    image: '⚡',
    content:
      'Quick commerce is reshaping retail. Here is what you need to know...',
  },
  {
    id: '5',
    title: 'Data Privacy in eCommerce: Compliance Made Easy',
    excerpt:
      'Navigate GDPR, CCPA, and other regulations. Learn how to build privacy-first commerce platforms.',
    date: 'Mar 12, 2026',
    category: 'Compliance',
    image: '🔒',
    content:
      'Data privacy is a top concern for modern retailers...',
  },
  {
    id: '6',
    title: 'Conversions at Scale: Optimizing Your Checkout Flow',
    excerpt:
      'Reduce cart abandonment and improve conversion rates. Proven strategies for checkout optimization.',
    date: 'Mar 10, 2026',
    category: 'Optimization',
    image: '📈',
    content:
      'Your checkout flow is critical to conversion rates...',
  },
];

export default function BlogPage() {
  const categories = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="py-20 lg:py-24 text-white" style={{ background: 'linear-gradient(to bottom, #0F172A, #0F172A, #1E293B)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Unlock Commerce Excellence
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Stay updated with insights, best practices, and industry trends
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search Bar */}
          <div className="mb-12 flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3 max-w-md">
            <FiSearch className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-16 flex flex-wrap gap-2">
            <button className="px-4 py-2 rounded-full text-white text-sm font-medium" style={{ backgroundColor: '#635BFF' }}>
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full bg-gray-200 text-sm font-medium hover:bg-gray-300 transition-colors"
                style={{ color: '#0F172A' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
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
                  <div className="font-semibold text-sm group-hover:gap-3 flex items-center gap-1 transition-all" style={{ color: '#635BFF' }}>
                    Read article →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <button className="px-8 py-4 border-2 rounded-lg font-semibold transition-all" style={{ borderColor: '#635BFF', color: '#635BFF' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(99, 91, 255, 0.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
