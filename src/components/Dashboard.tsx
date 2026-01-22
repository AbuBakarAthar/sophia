import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Briefcase, Users } from 'lucide-react';
import { API_BASE_URL, MOCK_STATS } from '../config';
import StatCard from './StatCard';
import TopSkillsCard from './TopSkillsCard';
import CompanyChart from './CompanyChart';

interface DashboardStats {
  total_jobs: number;
  avg_salary: number;
  top_companies: string[];
  top_skills: string[];
  avg_salary_by_experience: Record<string, number>;
  remote_job_percentage: number;
  job_growth_rate: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${API_BASE_URL}/api/jobs/stats`, { 
        signal: controller.signal 
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats({
        total_jobs: data.total_jobs || MOCK_STATS.total_jobs,
        avg_salary: data.average_salary || MOCK_STATS.average_salary,
        top_companies: data.top_companies?.map((c: any) => c.name) || MOCK_STATS.top_companies.map(c => c.name),
        top_skills: data.top_skills?.map((s: any) => s.skill) || MOCK_STATS.top_skills.map(s => s.skill),
        avg_salary_by_experience: data.salary_by_experience || { 'Entry': 85000, 'Mid': 125000, 'Senior': 165000 },
        remote_job_percentage: data.remote_percentage || MOCK_STATS.remote_percentage,
        job_growth_rate: data.growth_rate || MOCK_STATS.growth_rate
      });
      setIsUsingMockData(false);
    } catch (err) {
      // Use mock data as fallback
      setStats({
        total_jobs: MOCK_STATS.total_jobs,
        avg_salary: MOCK_STATS.average_salary,
        top_companies: MOCK_STATS.top_companies.map(c => c.name),
        top_skills: MOCK_STATS.top_skills.map(s => s.skill),
        avg_salary_by_experience: { 'Entry': 85000, 'Mid': 125000, 'Senior': 165000 },
        remote_job_percentage: MOCK_STATS.remote_percentage,
        job_growth_rate: MOCK_STATS.growth_rate
      });
      setIsUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;
  if (!stats) return <EmptyState />;

  return (
    <div className="space-y-6">
      {/* Backend Status Banner */}
      {isUsingMockData && (
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 text-blue-300">
          <p className="text-sm"><strong>Demo Mode:</strong> Using sample data. Start the Python backend to see live data.</p>
          <p className="text-xs text-blue-400 mt-2">Run: <code>cd backend && python main.py</code></p>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
        <p className="text-gray-400">Real-time insights into USA remote job market</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Briefcase}
          title="Total Jobs"
          value={stats.total_jobs}
          change="+12%"
          color="blue"
        />
        <StatCard
          icon={DollarSign}
          title="Avg Salary"
          value={`$${Math.round(stats.avg_salary / 1000)}K`}
          change="+5%"
          color="green"
        />
        <StatCard
          icon={Users}
          title="Remote Jobs"
          value={`${stats.remote_job_percentage.toFixed(1)}%`}
          change="+3%"
          color="cyan"
        />
        <StatCard
          icon={TrendingUp}
          title="Growth Rate"
          value={`${stats.job_growth_rate.toFixed(1)}%`}
          change="This month"
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stats.top_skills && <TopSkillsCard skills={stats.top_skills} />}
        {stats.top_companies && <CompanyChart companies={stats.top_companies} />}
      </div>

      {/* Salary by Experience */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Salary by Experience Level</h3>
        <div className="space-y-4">
          {Object.entries(stats.avg_salary_by_experience).map(([level, salary]) => (
            <SalaryBar key={level} label={level} salary={salary as number} />
          ))}
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={fetchStats}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}

function SalaryBar({ label, salary }: { label: string; salary: number }) {
  const maxSalary = 150000;
  const percentage = (salary / maxSalary) * 100;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 capitalize">{label}</span>
        <span className="text-white font-semibold">${salary.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading dashboard...</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-400">No data available</p>
    </div>
  );
}
