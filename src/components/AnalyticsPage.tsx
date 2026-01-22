import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/stats`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-400">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Market Analytics</h2>
        <p className="text-gray-400">Deep insights into USA remote job market trends</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Experience Distribution */}
        <AnalyticsCard
          title="Experience Distribution"
          icon={PieChart}
          data={stats?.experience_distribution}
          type="distribution"
        />

        {/* Company Distribution */}
        <AnalyticsCard
          title="Top Companies"
          icon={BarChart3}
          data={stats?.top_companies}
          type="companies"
        />
      </div>

      {/* Market Trends */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <h3 className="text-xl font-bold text-white">Market Trends</h3>
        </div>

        <div className="space-y-4">
          <TrendItem label="Job Growth" value="+5.2%" positive />
          <TrendItem label="Avg Salary Growth" value="+3.8%" positive />
          <TrendItem label="Remote Job % Growth" value="+2.1%" positive />
          <TrendItem label="Python Demand" value="Increasing" positive />
          <TrendItem label="Go Demand" value="Increasing" positive />
          <TrendItem label="Java Demand" value="Stable" neutral />
        </div>
      </div>

      {/* Salary Analysis */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Salary Analysis</h3>
        <div className="space-y-4">
          <SalaryAnalysisRow
            title="Entry Level Average"
            salary={60000}
            trend="+4.2%"
          />
          <SalaryAnalysisRow
            title="Mid-Level Average"
            salary={100000}
            trend="+3.5%"
          />
          <SalaryAnalysisRow
            title="Senior Level Average"
            salary={150000}
            trend="+2.8%"
          />
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={fetchAnalytics}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Refresh Analytics
        </button>
      </div>
    </div>
  );
}

interface AnalyticsCardProps {
  title: string;
  icon: any;
  data: any;
  type: 'distribution' | 'companies';
}

function AnalyticsCard({ title, icon: Icon, data, type }: AnalyticsCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon className="w-5 h-5 text-blue-500" />
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      <div className="space-y-3">
        {type === 'distribution' && data?.map((item: any, idx: number) => (
          <div key={idx}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300 capitalize">{item.level}</span>
              <span className="text-white font-semibold">{item.count}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                style={{ width: `${Math.random() * 100}%` }}
              />
            </div>
          </div>
        ))}

        {type === 'companies' && data?.slice(0, 5).map((item: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-700 rounded">
            <span className="text-white font-medium">{item.name}</span>
            <span className="text-cyan-400">{item.count} jobs</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendItem({ label, value, positive, neutral }: any) {
  const color = positive ? 'text-green-400' : neutral ? 'text-yellow-400' : 'text-red-400';
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
      <span className="text-gray-300">{label}</span>
      <span className={`${color} font-semibold`}>{value}</span>
    </div>
  );
}

function SalaryAnalysisRow({ title, salary, trend }: any) {
  return (
    <div className="p-4 bg-gray-700 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">${salary.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-green-400 font-semibold">{trend}</p>
          <p className="text-gray-400 text-sm">This month</p>
        </div>
      </div>
    </div>
  );
}
