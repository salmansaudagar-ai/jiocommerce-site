import { Metadata } from 'next';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { notFound } from 'next/navigation';

const SOLUTIONS: Record<
  string,
  {
    title: string;
    description: string;
    longDescription: string;
    benefits: string[];
    useCases: string[];
    icon: string;
  }
> = {
  'd2c': {
    title: 'Direct-to-Consumer (D2C)',
    description: 'Sell directly to consumers and build brand loyalty',
    longDescription:
      'Scale your D2C brand with a platform built for direct customer relationships. From storefront to customer data, control every touchpoint.',
    benefits: [
      'Own your customer relationships',
      'Control pricing and margins',
      'Build brand loyalty',
      'Direct customer feedback',
      'Data-driven marketing',
      'Flexible business model',
      'Premium margins',
      'Customer lifetime value optimization',
    ],
    useCases: [
      'Fashion & Apparel brands',
      'Beauty & Cosmetics',
      'Electronics & Tech',
      'Home & Lifestyle',
      'Sports & Fitness',
    ],
    icon: '👕',
  },
  'marketplace': {
    title: 'Multi-Vendor Marketplace',
    description: 'Build a thriving ecosystem of sellers and buyers',
    longDescription:
      'Launch and scale a multi-vendor marketplace. Onboard sellers, manage commissions, and create a thriving ecosystem.',
    benefits: [
      'Multiple revenue streams',
      'Scalable seller network',
      'Commission management',
      'Seller portal',
      'Quality control tools',
      'Dispute resolution',
      'Analytics for sellers',
      'Payment splitting',
    ],
    useCases: [
      'General marketplaces',
      'Vertical marketplaces',
      'Regional platforms',
      'B2B marketplaces',
      'Logistics networks',
    ],
    icon: '🏬',
  },
  'b2b': {
    title: 'Business-to-Business (B2B)',
    description: 'Streamline B2B commerce and procurement',
    longDescription:
      'Simplify B2B transactions with bulk ordering, custom pricing, and business workflows tailored for B2B operations.',
    benefits: [
      'Bulk order capabilities',
      'Custom pricing tiers',
      'Business account management',
      'Invoice-based payments',
      'Catalog customization',
      'Order history',
      'Role-based access',
      'EDI integration',
    ],
    useCases: [
      'Wholesale platforms',
      'Supplier networks',
      'Corporate procurement',
      'Distributor channels',
      'Bulk resellers',
    ],
    icon: '🤝',
  },
  'omnichannel': {
    title: 'Omnichannel Retail',
    description: 'Seamless experience across all channels',
    longDescription:
      'Unify online and offline channels to create a seamless shopping experience. Online inventory visibility, in-store pickup, and more.',
    benefits: [
      'Unified inventory',
      'Click & collect',
      'Buy online return in-store',
      'Consistent pricing',
      'Unified customer data',
      'Channel agnostic',
      'Real-time visibility',
      'Flexible fulfillment',
    ],
    useCases: [
      'Fashion retailers',
      'Department stores',
      'Electronics chains',
      'Grocery retailers',
      'Specialty stores',
    ],
    icon: '🛍️',
  },
  'global-selling': {
    title: 'Global Selling',
    description: 'Expand internationally with ease',
    longDescription:
      'Go global with built-in support for multiple currencies, languages, tax compliance, and international logistics.',
    benefits: [
      'Multi-currency support',
      'Multi-language storefronts',
      'Tax compliance tools',
      'International shipping',
      'Localized payment methods',
      'Regional compliance',
      'Currency conversion',
      'Import/export optimization',
    ],
    useCases: [
      'Cross-border sellers',
      'International brands',
      'Regional expansions',
      'Export-focused businesses',
      'Global retailers',
    ],
    icon: '🌍',
  },
  'hyperlocal': {
    title: 'Hyperlocal Commerce',
    description: 'Serve customers in your local area',
    longDescription:
      'Build hyperlocal commerce capabilities with location-based ordering, real-time delivery tracking, and local inventory management.',
    benefits: [
      'Location-based search',
      'Real-time delivery tracking',
      'Local inventory management',
      'Quick commerce support',
      'Pickup scheduling',
      'Customer geofencing',
      'Local fulfillment',
      'Area-based pricing',
    ],
    useCases: [
      'Grocery delivery',
      'Food delivery',
      'Quick commerce',
      'Local retailers',
      'Pharmacy networks',
    ],
    icon: '📍',
  },
};

export function generateStaticParams() {
  return Object.keys(SOLUTIONS).map((slug) => ({
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
  const solution = SOLUTIONS[slug];

  if (!solution) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${solution.title} Solution | Jio Commerce Platform`,
    description: solution.longDescription,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS[slug];

  if (!solution) {
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
              <div className="text-5xl mb-6">{solution.icon}</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {solution.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {solution.longDescription}
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 style={{ backgroundColor: '#635BFF' }} text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                  Get Started
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all">
                  Schedule Call
                </button>
              </div>
            </div>

            {/* Illustration */}
            <div className="aspect-square style={{ background: 'linear-gradient(to bottom right, rgba(99, 91, 255, 0.2), rgba(16, 185, 129, 0.2))' }} rounded-2xl border border-white/10 flex items-center justify-center text-8xl">
              {solution.icon}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold style={{ color: '#0F172A' }} mb-16">
            Key Benefits
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solution.benefits.map((benefit, index) => (
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
                  <p className="text-lg font-semibold style={{ color: '#0F172A' }}">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold style={{ color: '#0F172A' }} mb-16">
            Ideal For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl border border-gray-200 hover:style={{ borderColor: '#635BFF' }}/30 transition-all"
              >
                <p className="text-lg font-semibold style={{ color: '#0F172A' }}">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 text-white" style={{ background: 'linear-gradient(to right, #635BFF, #3B82F6)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start your {solution.title} journey today
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Talk to our experts about how to implement this solution
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-white style={{ color: '#635BFF' }} rounded-lg font-semibold hover:shadow-lg transition-all group">
            Schedule a Demo
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
