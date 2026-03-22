import { Metadata } from 'next';
import { FiCheck, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Health | Admin',
  description: 'System health and diagnostics',
};

const ISSUES = [
  {
    severity: 'warning',
    title: 'Cache Hit Rate Below Threshold',
    description: 'API cache hit rate dropped to 87% (target: 95%)',
    autoFixed: true,
    timestamp: '1 hour ago',
  },
  {
    severity: 'info',
    title: 'Database Optimization Completed',
    description: 'Monthly optimization routine completed successfully',
    autoFixed: false,
    timestamp: '2 hours ago',
  },
  {
    severity: 'success',
    title: 'System Performance Optimized',
    description: 'Query performance improved by 12% after index optimization',
    autoFixed: true,
    timestamp: '3 hours ago',
  },
];

export default function HealthPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jio-navy mb-2">System Health</h1>
        <p className="text-gray-600">Monitor system status and performance</p>
      </div>

      {/* Health Score Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <h2 className="text-lg font-semibold text-jio-navy mb-6">Overall Health Score</h2>

        <div className="flex items-center gap-8">
          {/* Gauge */}
          <div className="relative w-40 h-40 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
            <div
              className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-500 border-r-green-500 border-b-gray-200"
              style={{
                transform: 'rotate(-90deg)',
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-jio-navy">98.5</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Uptime</span>
              <span className="font-semibold text-jio-navy">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Response Time</span>
              <span className="font-semibold text-jio-navy">145ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Error Rate</span>
              <span className="font-semibold text-jio-navy">0.02%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">CPU Usage</span>
              <span className="font-semibold text-jio-navy">34%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Issue Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <FiAlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-semibold text-jio-navy">Critical</h3>
          </div>
          <div className="text-3xl font-bold text-red-600">0</div>
          <p className="text-sm text-gray-600">issues</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <FiAlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-semibold text-jio-navy">Warning</h3>
          </div>
          <div className="text-3xl font-bold text-amber-600">1</div>
          <p className="text-sm text-gray-600">issue</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiCheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-jio-navy">Healthy</h3>
          </div>
          <div className="text-3xl font-bold text-green-600">28</div>
          <p className="text-sm text-gray-600">systems</p>
        </div>
      </div>

      {/* Recent Auto-Fixes */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-jio-navy">Recent Activity</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {ISSUES.map((issue, index) => (
            <div
              key={index}
              className={`p-6 flex items-start gap-4 ${
                issue.severity === 'success' ? 'bg-green-50' : 'hover:bg-gray-50'
              } transition-colors`}
            >
              <div className="flex-shrink-0 mt-1">
                {issue.severity === 'warning' && (
                  <FiAlertCircle className="w-5 h-5 text-amber-600" />
                )}
                {issue.severity === 'info' && (
                  <FiAlertCircle className="w-5 h-5 text-blue-600" />
                )}
                {issue.severity === 'success' && (
                  <FiCheck className="w-5 h-5 text-green-600" />
                )}
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-jio-navy mb-1">{issue.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{issue.description}</p>

                {issue.autoFixed && (
                  <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block">
                    ✓ Auto-fixed
                  </span>
                )}
              </div>

              <div className="flex-shrink-0 text-sm text-gray-500 text-right">
                {issue.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
