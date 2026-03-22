'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

const NAV_ITEMS = [
  {
    label: 'Platform',
    href: '#',
    submenu: [
      {
        category: 'Core',
        items: [
          { label: 'eCommerce', href: '/platform/core-commerce', desc: 'Full-featured online store' },
          { label: 'Brick & Mortar', href: '/platform/in-store', desc: 'POS and inventory management' },
          { label: 'Order Management', href: '/platform/order-management', desc: 'Unified order processing' },
        ],
      },
      {
        category: 'Advanced',
        items: [
          { label: 'Catalog Management', href: '/platform/catalog-management', desc: 'Product data management' },
          { label: 'Marketing', href: '/platform/marketing', desc: 'Promotions and campaigns' },
          { label: 'AI Commerce', href: '/platform/ai-commerce', desc: 'Intelligent recommendations' },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    href: '#',
    submenu: [
      {
        category: 'By Model',
        items: [
          { label: 'D2C', href: '/solutions/d2c', desc: 'Direct-to-consumer brands' },
          { label: 'Marketplace', href: '/solutions/marketplace', desc: 'Multi-vendor marketplaces' },
          { label: 'B2B', href: '/solutions/b2b', desc: 'Business-to-business commerce' },
          { label: 'Omnichannel', href: '/solutions/omnichannel', desc: 'Seamless multi-channel' },
        ],
      },
      {
        category: 'By Use Case',
        items: [
          { label: 'Global Selling', href: '/solutions/global-selling', desc: 'International expansion' },
          { label: 'Hyperlocal', href: '/solutions/hyperlocal', desc: 'Local delivery networks' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    href: '/blog',
    submenu: [
      {
        category: 'Learn',
        items: [
          { label: 'Blog', href: '/blog', desc: 'Latest insights and updates' },
          { label: 'Documentation', href: '#', desc: 'API and integration guides' },
          { label: 'Webinars', href: '#', desc: 'Live sessions and workshops' },
        ],
      },
    ],
  },
];

interface NavItem {
  label: string;
  href: string;
  submenu?: Array<{
    category: string;
    items: Array<{
      label: string;
      href: string;
      desc: string;
    }>;
  }>;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg backdrop-blur-sm'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg bg-jio-purple">
            JC
          </div>
          <span className="text-lg font-semibold hidden sm:inline text-jio-navy">
            Jio Commerce
          </span>
          <span className="ml-2 px-2 py-1 text-xs font-medium rounded bg-jio-purple/10 text-jio-purple">
            Platform
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item: NavItem) => (
            <div key={item.label} className="relative group">
              <button
                onClick={() => item.submenu && handleDropdown(item.label)}
                className="px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 text-jio-navy hover:text-jio-purple"
              >
                {item.label}
                {item.submenu && <FiChevronDown className="w-4 h-4" />}
              </button>

              {/* Mega Menu Dropdown */}
              {item.submenu && (
                <div className="absolute left-0 mt-0 w-screen max-w-5xl bg-white shadow-2xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                  <div className="grid grid-cols-2 gap-8 p-8">
                    {item.submenu.map((section) => (
                      <div key={section.category}>
                        <h3 className="text-xs font-semibold uppercase tracking-wide mb-4 text-jio-navy">
                          {section.category}
                        </h3>
                        <ul className="space-y-3">
                          {section.items.map((subitem) => (
                            <li key={subitem.label}>
                              <Link
                                href={subitem.href}
                                className="text-sm transition-colors text-jio-navy hover:text-jio-purple"
                              >
                                <div className="font-medium">{subitem.label}</div>
                                <div className="text-xs text-gray-600">{subitem.desc}</div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-6">
          <Button
            onClick={() => {}}
            className="bg-jio-purple text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all font-medium text-sm"
          >
            Request a Demo
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-jio-navy"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-6 py-4 space-y-4">
            {NAV_ITEMS.map((item: NavItem) => (
              <div key={item.label}>
                <button
                  onClick={() =>
                    item.submenu && handleDropdown(item.label)
                  }
                  className="w-full text-left font-medium flex items-center justify-between py-2 text-jio-navy hover:text-jio-purple"
                >
                  {item.label}
                  {item.submenu && (
                    <FiChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === item.label
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  )}
                </button>

                {/* Mobile Submenu */}
                {item.submenu && activeDropdown === item.label && (
                  <div className="pl-4 space-y-3 mt-2 border-l-2 border-jio-purple">
                    {item.submenu.map((section) => (
                      <div key={section.category}>
                        <h4 className="text-xs font-semibold uppercase mb-2 text-jio-purple">
                          {section.category}
                        </h4>
                        <ul className="space-y-2">
                          {section.items.map((subitem) => (
                            <li key={subitem.label}>
                              <Link
                                href={subitem.href}
                                className="text-sm text-gray-700 transition-colors hover:text-jio-purple"
                              >
                                {subitem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Button
              onClick={() => {}}
              className="w-full bg-jio-purple text-white py-3 rounded-lg hover:bg-opacity-90 transition-all font-medium mt-4"
            >
              Request a Demo
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
