import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const FOOTER_SECTIONS = [
  {
    title: 'Products',
    links: [
      { label: 'eCommerce', href: '/platform/core-commerce' },
      { label: 'Marketplace', href: '/solutions/marketplace' },
      { label: 'Brick & Mortar', href: '/platform/in-store' },
      { label: 'Order Management', href: '/platform/order-management' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'D2C', href: '/solutions/d2c' },
      { label: 'B2B', href: '/solutions/b2b' },
      { label: 'Global Selling', href: '/solutions/global-selling' },
      { label: 'Omnichannel', href: '/solutions/omnichannel' },
    ],
  },
  {
    title: 'Digital Platforms',
    links: [
      { label: 'JioMart', href: '#' },
      { label: 'AJIO', href: '#' },
      { label: 'Tira', href: '#' },
      { label: 'Netmeds', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="text-white bg-jio-navy">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg bg-jio-purple">
                JC
              </div>
              <span className="text-lg font-semibold">Jio Commerce</span>
            </Link>
            <p className="text-sm text-gray-400">
              Powering the future of commerce across Reliance Retail.
            </p>
          </div>

          {/* Links Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-6 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <FiArrowRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-gray-700/50"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-sm text-gray-400">
            © 2026 Shopsense Retail Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
