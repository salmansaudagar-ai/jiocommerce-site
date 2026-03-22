import { Metadata } from 'next';
import Link from 'next/link';
import { FiHome, FiFileText, FiUpload, FiBarChart2, FiList, FiSettings, FiMenu } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Jio Commerce Platform',
  description: 'Content management and platform administration',
};

const NAV_ITEMS = [
  { icon: FiHome, label: 'Dashboard', href: '/admin' },
  { icon: FiFileText, label: 'Content Queue', href: '/admin/queue' },
  { icon: FiUpload, label: 'Upload', href: '/admin/upload' },
  { icon: FiBarChart2, label: 'Health', href: '/admin/health' },
  { icon: FiList, label: 'Audit', href: '/admin/audit' },
  { icon: FiSettings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 text-white flex-col border-r border-gray-700" style={{ backgroundColor: '#0F172A' }}>
        {/* Logo */}
        <Link href="/admin" className="flex items-center gap-2 p-6 border-b border-gray-700">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: '#635BFF' }}>
            JC
          </div>
          <span className="font-semibold">Admin</span>
        </Link>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium group"
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <div className="text-xs text-gray-400">
            <p className="font-semibold mb-1">Jio Commerce</p>
            <p>Admin v1.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 lg:hidden flex items-center gap-4">
          <FiMenu className="w-6 h-6" />
          <h1 className="font-semibold">Admin Dashboard</h1>
        </header>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
