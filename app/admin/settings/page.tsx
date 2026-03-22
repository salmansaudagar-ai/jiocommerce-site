import { Metadata } from 'next';
import { FiSave } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Settings | Admin',
  description: 'Admin settings and configuration',
};

export default function SettingsPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jio-navy mb-2">Settings</h1>
        <p className="text-gray-600">Manage your platform settings and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* API Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-jio-navy mb-6">API Configuration</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="password"
                defaultValue="sk_live_••••••••••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jio-purple"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL
              </label>
              <input
                type="text"
                defaultValue="https://yourapi.com/webhooks/jio"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jio-purple"
              />
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-jio-navy mb-6">Email Configuration</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Server
              </label>
              <input
                type="text"
                defaultValue="smtp.sendgrid.net"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jio-purple"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Port
                </label>
                <input
                  type="number"
                  defaultValue="587"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jio-purple"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Email
                </label>
                <input
                  type="email"
                  defaultValue="noreply@jiocommerce.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jio-purple"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-jio-navy mb-6">Notifications</h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
              />
              <span className="text-sm text-gray-700">Email alerts for errors</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
              />
              <span className="text-sm text-gray-700">Daily digest emails</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
              />
              <span className="text-sm text-gray-700">Weekly performance reports</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-jio-purple text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all">
            <FiSave className="w-5 h-5" />
            Save Settings
          </button>
          <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
