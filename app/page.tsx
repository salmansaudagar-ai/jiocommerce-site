import { Metadata } from 'next';
import HeroSection from '@/components/hero/HeroSection';
import EcosystemSection from '@/components/hero/EcosystemSection';
import FeatureCardsSection from '@/components/features/FeatureCardsSection';
import TabbedProductsSection from '@/components/features/TabbedProductsSection';
import CentralServicesSection from '@/components/features/CentralServicesSection';
import ExtensionsSection from '@/components/features/ExtensionsSection';
import BlogPreviewSection from '@/components/blog/BlogPreviewSection';
import NewsletterSection from '@/components/newsletter/NewsletterSection';

export const metadata: Metadata = {
  title: 'Jio Commerce Platform | The Future of Retail Commerce',
  description:
    'Enterprise-scale commerce platform powering D2C, Marketplace, B2B, and Omnichannel retail. Built for scale, designed for innovation.',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <EcosystemSection />
      <FeatureCardsSection />
      <TabbedProductsSection />
      <CentralServicesSection />
      <ExtensionsSection />
      <BlogPreviewSection />
      <NewsletterSection />
    </>
  );
}
