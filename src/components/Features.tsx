import { BarChart3, Zap, Target, Lightbulb, TrendingUp, Shield } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'AI Salary Predictor',
    description: 'Get accurate salary ranges using machine learning models trained on 2000+ jobs'
  },
  {
    icon: Zap,
    title: 'Skill Recommendations',
    description: 'Discover in-demand skills that will boost your salary and career prospects'
  },
  {
    icon: Target,
    title: 'Smart Matching',
    description: 'Find jobs that match your skills, experience, and career goals perfectly'
  },
  {
    icon: TrendingUp,
    title: 'Market Analytics',
    description: 'Track job market trends, growth rates, and emerging opportunities in real-time'
  },
  {
    icon: Lightbulb,
    title: 'Career Insights',
    description: 'Get personalized career recommendations based on your profile and goals'
  },
  {
    icon: Shield,
    title: 'Verified Data',
    description: 'All job data verified and updated daily from trusted sources'
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for Your Career
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to find the perfect remote job and advance your career
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-xl border border-gray-100 hover:border-blue-200 bg-white hover:bg-blue-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
