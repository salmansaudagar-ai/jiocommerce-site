import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiArrowRight, FiShare2 } from 'react-icons/fi';

const BLOG_POSTS: Record<
  string,
  {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
    author: string;
    readTime: string;
    content: string;
  }
> = {
  '1': {
    title: 'AI-Powered Personalization: The Future of eCommerce',
    excerpt:
      'Discover how machine learning is revolutionizing product recommendations and customer experiences.',
    date: 'Mar 22, 2026',
    category: 'AI & ML',
    image: '🤖',
    author: 'Sarah Chen',
    readTime: '8 min read',
    content: `
      <p>Artificial intelligence is transforming how retailers engage with customers. The days of one-size-fits-all product pages are over. Today's consumers expect personalized experiences tailored to their preferences, behavior, and purchase history.</p>

      <h2>The Power of AI Recommendations</h2>
      <p>Machine learning algorithms analyze vast amounts of customer data to predict what products a customer is most likely to purchase. This goes far beyond simple "customers who bought X also bought Y" recommendations.</p>

      <p>Modern AI systems consider:</p>
      <ul>
        <li>Browsing history and time spent on products</li>
        <li>Similar customer cohorts and their preferences</li>
        <li>Seasonal and trend data</li>
        <li>Product attributes and characteristics</li>
        <li>Real-time inventory availability</li>
      </ul>

      <h2>Implementation Best Practices</h2>
      <p>Implementing AI personalization requires more than just deploying an algorithm. You need:</p>
      <ul>
        <li>Clean, comprehensive customer data</li>
        <li>Proper data governance and privacy measures</li>
        <li>Continuous testing and optimization</li>
        <li>Integration with your eCommerce platform</li>
        <li>Monitoring and performance tracking</li>
      </ul>

      <h2>Results You Can Expect</h2>
      <p>Retailers implementing AI personalization report:</p>
      <ul>
        <li>15-30% increase in average order value</li>
        <li>20-40% improvement in conversion rates</li>
        <li>25-35% reduction in bounce rates</li>
        <li>Improved customer lifetime value</li>
      </ul>

      <p>The future of eCommerce is personalized, intelligent, and AI-powered. Start your journey today.</p>
    `,
  },
  '2': {
    title: 'Omnichannel Retail: Breaking Down Silos',
    excerpt:
      'Learn how to create seamless shopping experiences across online and offline channels.',
    date: 'Mar 20, 2026',
    category: 'Strategy',
    image: '🛍️',
    author: 'James Mitchell',
    readTime: '10 min read',
    content: `
      <p>Omnichannel retail is no longer optional. Customers expect seamless experiences whether they shop online, on mobile, or in physical stores. Retailers who fail to integrate these channels risk losing market share to competitors who do.</p>

      <h2>What is Omnichannel Retail?</h2>
      <p>Omnichannel retail integrates all customer touchpoints into a single, cohesive experience. Unlike multichannel retail where channels operate independently, omnichannel unifies:</p>
      <ul>
        <li>Inventory across all channels</li>
        <li>Customer data and purchase history</li>
        <li>Pricing and promotions</li>
        <li>Order fulfillment and logistics</li>
      </ul>

      <h2>Key Capabilities</h2>
      <p>A true omnichannel platform enables:</p>
      <ul>
        <li>Buy Online, Pick Up In Store (BOPIS)</li>
        <li>Buy Online, Return In Store</li>
        <li>Unified inventory visibility</li>
        <li>Consistent pricing across channels</li>
        <li>Single customer view</li>
      </ul>

      <h2>Implementation Roadmap</h2>
      <p>Start with inventory unification, then move to customer data integration, followed by unified pricing and promotions, and finally order fulfillment orchestration.</p>
    `,
  },
  '3': {
    title: 'Warehouse Automation: Scaling Operations Efficiently',
    excerpt:
      'Best practices for automating warehouse operations and reducing fulfillment time.',
    date: 'Mar 18, 2026',
    category: 'Operations',
    image: '🏭',
    author: 'Michael Rodriguez',
    readTime: '9 min read',
    content: `
      <p>Warehouse automation is critical for modern eCommerce operations. As order volumes grow exponentially, manual processes become inefficient and error-prone. Automation reduces costs, improves accuracy, and accelerates fulfillment.</p>

      <h2>Types of Warehouse Automation</h2>
      <p>There are several levels of warehouse automation:</p>
      <ul>
        <li>Software automation (WMS, OMS)</li>
        <li>Conveyor systems and sortation</li>
        <li>Robotic systems and AMRs</li>
        <li>Automated storage and retrieval (AS/RS)</li>
        <li>Fully autonomous warehouses</li>
      </ul>

      <h2>ROI Considerations</h2>
      <p>Before investing in automation, consider:</p>
      <ul>
        <li>Current order volume and growth projections</li>
        <li>Available capital and financing options</li>
        <li>Space constraints and facility flexibility</li>
        <li>Labor availability and costs</li>
        <li>Technology integration requirements</li>
      </ul>

      <h2>Getting Started</h2>
      <p>Most retailers start with software automation through a modern Warehouse Management System (WMS). This provides immediate benefits before investing in physical automation.</p>
    `,
  },
  '4': {
    title: 'The Rise of Quick Commerce: Trends and Opportunities',
    excerpt:
      'Understand the hyperlocal commerce boom and how to capitalize on the quick commerce trend.',
    date: 'Mar 15, 2026',
    category: 'Trends',
    image: '⚡',
    author: 'Emma Taylor',
    readTime: '7 min read',
    content:
      '<p>Quick commerce is reshaping retail delivery expectations...</p>',
  },
  '5': {
    title: 'Data Privacy in eCommerce: Compliance Made Easy',
    excerpt:
      'Navigate GDPR, CCPA, and other regulations. Learn how to build privacy-first commerce platforms.',
    date: 'Mar 12, 2026',
    category: 'Compliance',
    image: '🔒',
    author: 'David Lee',
    readTime: '12 min read',
    content:
      '<p>Data privacy is a top concern for modern retailers...</p>',
  },
  '6': {
    title: 'Conversions at Scale: Optimizing Your Checkout Flow',
    excerpt:
      'Reduce cart abandonment and improve conversion rates. Proven strategies for checkout optimization.',
    date: 'Mar 10, 2026',
    category: 'Optimization',
    image: '📈',
    author: 'Lisa Anderson',
    readTime: '6 min read',
    content:
      '<p>Your checkout flow is critical to conversion rates...</p>',
  },
};

export function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((id) => ({
    id,
  }));
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = BLOG_POSTS[id];

  if (!post) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${post.title} | Jio Commerce Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = BLOG_POSTS[id];

  if (!post) {
    notFound();
  }

  const postIds = Object.keys(BLOG_POSTS);
  const currentIndex = postIds.indexOf(id);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[postIds[currentIndex - 1]] : null;
  const nextPost = currentIndex < postIds.length - 1 ? BLOG_POSTS[postIds[currentIndex + 1]] : null;

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-jio-purple font-semibold mb-6 hover:gap-3 transition-all group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold text-jio-navy mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{post.author}</span>
            </div>
            <span>•</span>
            <span className="text-sm">{post.date}</span>
            <span>•</span>
            <span className="text-sm">{post.readTime}</span>
            <span>•</span>
            <span className="text-xs font-semibold text-jio-purple bg-jio-purple/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="bg-gradient-to-br from-jio-purple/20 to-jio-teal/20 py-16 flex items-center justify-center">
        <div className="text-9xl">{post.image}</div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-16">
          <div
            className="text-gray-700 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </article>

        {/* Share */}
        <div className="flex items-center gap-4 py-8 border-t border-gray-200">
          <span className="text-sm font-semibold text-gray-700">Share:</span>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <FiShare2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Author Bio */}
        <div className="bg-jio-purple/10 rounded-lg p-8 mb-16">
          <h3 className="font-semibold text-jio-navy mb-2">About the Author</h3>
          <p className="text-gray-700">
            {post.author} is a commerce expert with deep knowledge in platform architecture,
            retail technology, and digital transformation.
          </p>
        </div>

        {/* Related Articles */}
        <div>
          <h3 className="text-2xl font-bold text-jio-navy mb-8">Next Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost && (
              <Link
                href={`/blog/${postIds[currentIndex - 1]}`}
                className="group p-6 border border-gray-200 rounded-lg hover:border-jio-purple/30 hover:bg-jio-purple/5 transition-all"
              >
                <div className="flex items-center gap-2 text-jio-purple font-semibold text-sm mb-3">
                  <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Previous
                </div>
                <p className="font-bold text-jio-navy group-hover:text-jio-purple transition-colors">
                  {prevPost.title}
                </p>
              </Link>
            )}

            {nextPost && (
              <Link
                href={`/blog/${postIds[currentIndex + 1]}`}
                className="group p-6 border border-gray-200 rounded-lg hover:border-jio-purple/30 hover:bg-jio-purple/5 transition-all text-right"
              >
                <div className="flex items-center justify-end gap-2 text-jio-purple font-semibold text-sm mb-3">
                  Next
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="font-bold text-jio-navy group-hover:text-jio-purple transition-colors">
                  {nextPost.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
