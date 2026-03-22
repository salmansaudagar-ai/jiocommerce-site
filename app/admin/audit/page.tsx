import { Metadata } from 'next';
import { FiFilter } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Audit Log | Admin',
  description: 'System audit log and activity history',
};

const AUDIT_LOG = [
  {
    id: '1',
    user: 'Sarah Admin',
    action: 'Content Published',
    target: 'Blog: "AI Commerce Trends"',
    timestamp: '2026-03-22 14:32:00',
    status: 'success',
  },
  {
    id: '2',
    user: 'James Editor',
    action: 'Content Updated',
    target: 'Product: SKU-2847',
    timestamp: '2026-03-22 13:15:00',
    status: 'success',
  },
  {
    id: '3',
    user: 'Sarah Admin',
    action: 'User Role Changed',
    target: 'User: michael@jio.com',
    timestamp: '2026-03-22 12:00:00',
    status: 'success',
  },
  {
    id: '4',
    user: 'API System',
    action: 'Data Sync',
    target: 'Inventory Sync',
    timestamp: '2026-03-22 11:30:00',
    status: 'success',
  },
  {
    id: '5',
    user: 'James Editor',
    action: 'Content Deleted',
    target: 'Promotion: Spring2026',
    timestamp: '2026-03-22 10:45:00',
    status: 'warning',
  },
  {
    id: '6',
    user: 'Sarah Admin',
    action: 'Settings Changed',
    target: 'Email Configuration',
    timestamp: '2026-03-22 09:20:00',
    status: 'success',
  },
  {
    id: '7',
    user: 'API System',
    action: 'Backup Completed',
    target: 'Database Backup',
    timestamp: '2026-03-22 08:00:00',
    status: 'success',
  },
  {
    id: '8',
    user: 'Support User',
    action: 'Access Granted',
    target: 'Support: Case #2847',
    timestamp: '2026-03-21 16:30:00',
    status: 'success',
  },
];

export default function AuditPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#0F172A' }}>Audit Log</h1>
        <p className="text-gray-600">Track all system activities and changes</p>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
          <FiFilter className="w-5 h-5 text-gray-400" />
          <select className="outline-none text-sm font-medium text-gray-700 bg-transparent">
            <option>All Actions</option>
            <option>Published</option>
            <option>Updated</option>
            <option>Deleted</option>
            <option>Settings</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search by user or action..."
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm flex-1"
        />
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Target</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Timestamp</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {AUDIT_LOG.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {log.user}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {log.action}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {log.target}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {log.timestamp}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      log.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {log.status === 'success' ? '✓ Success' : '⚠ Warning'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing 1 to 8 of 2,847 entries
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 text-white rounded-lg text-sm font-medium" style={{ backgroundColor: '#635BFF' }}>
            1
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            3
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </>
  );
}
