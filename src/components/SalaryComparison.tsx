import { TrendingUp, DollarSign, Users } from 'lucide-react';

interface ComparisonJob {
  title: string;
  company: string;
  salary: number;
  match: number;
  experience: string;
}

const comparisonData: ComparisonJob[] = [
  { title: 'Senior Frontend Engineer', company: 'Google', salary: 185000, match: 92, experience: 'Senior' },
  { title: 'Full Stack Developer', company: 'Amazon', salary: 165000, match: 85, experience: 'Mid' },
  { title: 'React Developer', company: 'Stripe', salary: 175000, match: 88, experience: 'Senior' },
  { title: 'JavaScript Developer', company: 'Netflix', salary: 195000, match: 90, experience: 'Senior' },
];

export default function SalaryComparison() {
  const avgSalary = Math.round(comparisonData.reduce((a, b) => a + b.salary, 0) / comparisonData.length);
  const maxSalary = Math.max(...comparisonData.map(j => j.salary));

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Salary Comparison</h2>
          <p className="text-lg text-gray-600">See how different roles compare in the remote job market</p>
        </div>

        {/* Comparison Table */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-600 to-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Position</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Company</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Salary</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Match</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonData.map((job, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{job.company}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <div
                            className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                            style={{ width: `${(job.salary / maxSalary) * 100}px` }}
                          />
                          <span className="text-sm font-bold text-gray-900 w-24 text-right">
                            ${(job.salary / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                          {job.match}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Average Salary</p>
                  <p className="text-3xl font-bold text-gray-900">${(avgSalary / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="w-12 h-12 text-green-500 opacity-20" />
              </div>
              <p className="text-xs text-gray-500">Based on 2,847 remote positions</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Highest Paying</p>
                  <p className="text-3xl font-bold text-gray-900">$195K</p>
                </div>
                <TrendingUp className="w-12 h-12 text-blue-500 opacity-20" />
              </div>
              <p className="text-xs text-gray-500">Netflix - Senior Frontend Engineer</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Best Match for You</p>
                  <p className="text-3xl font-bold text-gray-900">92%</p>
                </div>
                <Users className="w-12 h-12 text-purple-500 opacity-20" />
              </div>
              <p className="text-xs text-gray-500">Senior Frontend @ Google - $185K</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
              <p className="text-sm font-medium mb-2 opacity-90">💡 Pro Tip</p>
              <p className="text-sm leading-relaxed">
                Salaries vary by timezone and experience level. Skills in AI/ML can add 20-30% to your salary potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
