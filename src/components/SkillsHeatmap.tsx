import { TrendingUp, Flame, Award } from 'lucide-react';

interface Skill {
  name: string;
  demand: number;
  salaryImpact: number;
  trend: number;
  jobs: number;
}

const trendingSkills: Skill[] = [
  { name: 'AI/Machine Learning', demand: 95, salaryImpact: 45000, trend: 28, jobs: 1247 },
  { name: 'React', demand: 88, salaryImpact: 28000, trend: 12, jobs: 856 },
  { name: 'TypeScript', demand: 85, salaryImpact: 24000, trend: 18, jobs: 742 },
  { name: 'Cloud (AWS/GCP)', demand: 82, salaryImpact: 32000, trend: 22, jobs: 695 },
  { name: 'Python', demand: 90, salaryImpact: 26000, trend: 15, jobs: 934 },
  { name: 'Node.js', demand: 79, salaryImpact: 21000, trend: 8, jobs: 543 },
  { name: 'Docker/Kubernetes', demand: 76, salaryImpact: 30000, trend: 20, jobs: 489 },
  { name: 'GraphQL', demand: 68, salaryImpact: 18000, trend: 5, jobs: 234 },
];

export default function SkillsHeatmap() {
  const getHeatColor = (demand: number) => {
    if (demand >= 85) return 'from-red-600 to-orange-600';
    if (demand >= 75) return 'from-orange-500 to-amber-500';
    if (demand >= 65) return 'from-yellow-500 to-lime-500';
    return 'from-lime-500 to-green-500';
  };

  const getHeatLabel = (demand: number) => {
    if (demand >= 85) return '🔥 Critical';
    if (demand >= 75) return '🚀 Very High';
    if (demand >= 65) return '⬆️ High';
    return '📈 Growing';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Skills</h2>
          <p className="text-lg text-gray-600">
            Learn what skills are in highest demand and boost your earning potential
          </p>
        </div>

        {/* Heatmap Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {trendingSkills.map((skill, idx) => (
            <div
              key={idx}
              className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}
            >
              {/* Gradient Bar */}
              <div className={`h-2 bg-gradient-to-r ${getHeatColor(skill.demand)}`} />

              {/* Content */}
              <div className="p-6 bg-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{skill.name}</h3>
                    <span className="inline-flex items-center space-x-1 text-sm font-semibold">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{getHeatLabel(skill.demand)}</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">{skill.demand}</p>
                    <p className="text-xs text-gray-500">demand score</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Salary +</p>
                    <p className="text-lg font-bold text-green-600">
                      ${(skill.salaryImpact / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Growth</p>
                    <p className="text-lg font-bold text-blue-600">
                      +{skill.trend}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Jobs Open</p>
                    <p className="text-lg font-bold text-purple-600">
                      {skill.jobs}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600 font-medium">Market Demand</span>
                    <span className="text-xs font-bold text-gray-900">{skill.demand}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getHeatColor(skill.demand)} transition-all duration-500`}
                      style={{ width: `${skill.demand}%` }}
                    />
                  </div>
                </div>

                {/* Action */}
                <button className="w-full mt-4 px-4 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors group-hover:bg-blue-50">
                  Learn This Skill →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <Award className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Highest ROI</h4>
                <p className="text-sm text-gray-700">AI/ML skills add +$45K to your salary on average</p>
              </div>
            </div>
            <div className="flex gap-4">
              <TrendingUp className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Fastest Growing</h4>
                <p className="text-sm text-gray-700">AI/ML demand up 28% YoY - fastest growing skill</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Flame className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Most Opportunities</h4>
                <p className="text-sm text-gray-700">1,247 open positions require AI/ML expertise</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
