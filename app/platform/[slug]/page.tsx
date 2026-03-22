import { Metadata } from 'next';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';

// Platform features data
const PLATFORM_FEATURES: Record<
  string,
  {
    title: string;
    description: string;
    longDescription: string;
    features: string[];
    icon: string;
  }
> = {
  'core-commerce': {
    title: 'eCommerce Platform',
    description: 'Full-featured online store platform',
    longDescription:
      'Build and scale your online store with our comprehensive eCommerce platform. From product catalog to checkout, payment processing to analytics, everything is built-in.',
    features: [
      'Multi-currency & multi-language support',
      'Flexible product catalog management',
      'Advanced checkout experience',
      'Multiple payment gateway integration',
      'Real-time inventory sync',
      'Mobile-first design',
      'SEO optimization built-in',
      'Analytics and reporting dashboard',
    ],
    icon: '🛒',
  },
  'in-store': {
    title: 'Brick & Mortar Solution',
    description: 'Unified POS and inventory management',
    longDescription:
      'Connect your physical stores with a modern cloud-based POS system. Manage inventory, sales, and customers seamlessly across all locations.',
    features: [
      'Cloud-based POS system',
      'Real-time inventory synchronization',
      'Unified customer database',
      'Sales analytics by location',
      'Staff management tools',
      'Receipt and billing customization',
      'Offline mode support',
      'Integration with online channel',
    ],
    icon: '🏪',
  },
  'order-management': {
    title: 'Order Management System',
    description: 'Streamlined order processing',
    longDescription:
      'Automate and optimize your order fulfillment process. Route orders intelligently, track shipments, and manage returns with ease.',
    features: [
      'Intelligent order routing',
      'Real-time order tracking',
      'Multi-fulfillment center support',
      'Return and RMA management',
      'Automated customer notifications',
      'Logistics partner integration',
      'Order splitting capabilities',
      'Performance analytics',
    ],
    icon: '📦',
  },
  'catalog-management': {
    title: 'Catalog Management',
    description: 'Intelligent product data hub',
    longDescription:
      'Manage all product information from a single source of truth. Create rich product content, manage variants, and syndicate to multiple channels.',
    features: [
      'Bulk product import/export',
      'Variant management',
      'Rich media support',
      'Multi-language content',
      'Category hierarchies',
      'Attribute management',
      'Dynamic pricing',
      'Product enrichment tools',
    ],
    icon: '📚',
  },
  'marketing': {
    title: 'Marketing & Promotions',
    description: 'Drive sales with targeted campaigns',
    longDescription:
      'Create and manage promotional campaigns that drive sales. From coupons to flash sales, segment customers and measure ROI.',
    features: [
      'Coupon and code management',
      'Flash sales and limited-time deals',
      'Customer segmentation',
      'Email campaign builder',
      'A/B testing capabilities',
      'Performance analytics',
      'Discount rules engine',
      'Loyalty program integration',
    ],
    icon: '📊',
  },
  'ai-commerce': {
    title: 'AI Commerce Engine',
    description: 'Intelligent commerce automation',
    longDescription:
      'Leverage machine learning to personalize experiences, optimize pricing, and predict customer behavior.',
    features: [
      'AI-powered product recommendations',
      'Dynamic pricing optimization',
      'Customer behavior prediction',
      'Churn prevention',
      'Personalization engine',
      'Inventory forecasting',
      'Demand prediction',
      'Fraud detection',
    ],
    icon: '🤖',
  },
};

export function generateStaticParams() {
  return Object.keys(PLATFORM_FEATURES).map((slug) => ({
    slug,
  }));
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = PLATFORM_FEATURES[slug];

  if (!feature) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${feature.title} | Jio Commerce Platform`,
    description: feature.longDescription,
  };
}

export default async function PlatformPage({ params }: Props) {
  const { slug } = await params;
  const feature = PLATFORM_FEATURES[slug];

  if (!feature) {
    notFound();
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 text-white" style={{ background: 'linear-gradient(to bottom, #0F172A, #0F172A, #1E293B)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {feature.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {feature.longDescription}
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 style={{ backgroundColor: '#635BFF' }} text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                  Get Started
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all">
                  Learn More
                </button>
              </div>
            </div>

            {/* Illustration */}
            <div className="aspect-square style={{ background: 'linear-gradient(to bottom right, rgba(99, 91, 255, 0.2), rgba(16, 185, 129, 0.2))' }} rounded-2xl border border-white/10 flex items-center justify-center text-8xl">
              {feature.icon}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold style={{ color: '#0F172A' }} mb-16">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {feature.features.map((feat, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-xl border border-gray-200 hover:style={{ borderColor: '#635BFF' }}/30 hover:style={{ backgroundColor: '#635BFF' }}/5 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full style={{ backgroundColor: '#635BFF' }}/20">
                    <FiCheck className="w-4 h-4 style={{ color: '#635BFF' }}" />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold style={{ color: '#0F172A' }}">{feat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 text-white" style={{ background: 'linear-gradient(to right, #635BFF, #3B82F6)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to transform your commerce?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Join leading retailers who trust Jio Commerce Platform
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-white style={{ color: '#635BFF' }} rounded-lg font-semibold hover:shadow-lg transition-all group">
            Request a Demo
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
