'use client';

import { FiCheck, FiX, FiEye } from 'react-icons/fi';

const QUEUE_ITEMS = [
  {
    id: '1',
    source: 'Email Campaign',
    action: 'Create',
    confidence: 94,
    preview: 'Spring collection launch email...',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    source: 'Blog Post',
    action: 'Update',
    confidence: 87,
    preview: 'AI Commerce Trends 2026...',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    source: 'Product Feed',
    action: 'Create',
    confidence: 92,
    preview: 'New winter collection - 45 items...',
    timestamp: '8 hours ago',
  },
  {
    id: '4',
    source: 'Social Media',
    action: 'Update',
    confidence: 78,
    preview: 'Instagram post - Flash sale announcement...',
    timestamp: '12 hours ago',
  },
  {
    id: '5',
    source: 'Landing Page',
    action: 'Create',
    confidence: 88,
    preview: 'New feature announcement page...',
    timestamp: '1 day ago',
  },
];

export default function QueuePage() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#0F172A' }}>Content Queue</h1>
        <p className="text-gray-600">Review and manage pending content items</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Source</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Confidence</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Preview</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {QUEUE_ITEMS.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {item.source}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.action === 'Create'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {item.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: '#635BFF', width: `${item.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-700 font-semibold">{item.confidence}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 line-clamp-1">{item.preview}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.timestamp}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" style={{ color: 'rgb(75, 85, 99)' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#0F172A'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'rgb(75, 85, 99)'; }}>
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-green-100 rounded-lg transition-colors text-gray-600 hover:text-green-600">
                      <FiCheck className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-colors text-gray-600 hover:text-red-600">
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
