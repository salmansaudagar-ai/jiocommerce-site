import { Metadata } from 'next';
import { FiBarChart2, FiAlertCircle, FiCheck, FiClock } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Dashboard | Admin',
  description: 'Admin dashboard overview',
};

const STAT_CARDS = [
  {
    label: 'Queue Items',
    value: '24',
    icon: FiBarChart2,
    color: 'text-blue-500',
  },
  {
    label: 'Health Score',
    value: '98.5%',
    icon: FiCheck,
    color: 'text-green-500',
  },
  {
    label: 'Last Ingest',
    value: '2m ago',
    icon: FiClock,
    color: 'text-amber-500',
  },
  {
    label: 'Total Changes',
    value: '1,247',
    icon: FiAlertCircle,
    color: 'text-purple-500',
  },
];

const ACTIVITY = [
  {
    action: 'Content Ingest',
    status: 'Completed',
    time: '10:32 AM',
    result: '✓ 156 items processed',
  },
  {
    action: 'Data Research',
    status: 'In Progress',
    time: '10:15 AM',
    result: '↻ 42% complete',
  },
  {
    action: 'Scout Analysis',
    status: 'Completed',
    time: '9:45 AM',
    result: '✓ 89 insights generated',
  },
  {
    action: 'System Check',
    status: 'Completed',
    time: '9:00 AM',
    result: '✓ All systems healthy',
  },
];

export default function AdminDashboard() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jio-navy">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{card.label}</h3>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className="text-3xl font-bold text-jio-navy">{card.value}</div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button className="bg-jio-purple text-white py-3 px-6 rounded-lg hover:bg-opacity-90 font-semibold">
          Run Ingest
        </Button>
        <Button className="bg-jio-blue text-white py-3 px-6 rounded-lg hover:bg-opacity-90 font-semibold">
          Run Research
        </Button>
        <Button className="bg-jio-teal text-white py-3 px-6 rounded-lg hover:bg-opacity-90 font-semibold">
          Run Scout
        </Button>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-jio-navy">Recent Activity</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {ACTIVITY.map((item, index) => (
            <div
              key={index}
              className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-jio-navy">{item.action}</h4>
                <p className="text-sm text-gray-600">{item.result}</p>
              </div>
              <div className="text-right">
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded-full mb-2 ${
                    item.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {item.status}
                </div>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
