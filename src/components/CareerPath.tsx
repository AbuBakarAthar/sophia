import { ArrowRight, Zap, TrendingUp } from 'lucide-react';

interface CareerStep {
  level: string;
  title: string;
  salary: string;
  skills: string[];
  timeline: string;
  companies: string[];
}

const careerPath: CareerStep[] = [
  {
    level: 'Entry',
    title: 'Junior Developer',
    salary: '$60K - $80K',
    skills: ['React', 'JavaScript', 'Git', 'Basic Backend'],
    timeline: '1-2 Years',
    companies: ['Startups', 'Small Teams', 'Agencies']
  },
  {
    level: 'Mid',
    title: 'Senior Developer',
    salary: '$120K - $160K',
    skills: ['React', 'TypeScript', 'System Design', 'Leadership'],
    timeline: '2-4 Years',
    companies: ['Scale-ups', 'Tech Companies', 'Established Firms']
  },
  {
    level: 'Senior',
    title: 'Staff Engineer',
    salary: '$180K - $250K',
    skills: ['Architecture', 'AI/ML', 'Team Leadership', 'Strategic Design'],
    timeline: '4-6 Years',
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta']
  },
  {
    level: 'Lead',
    title: 'Principal Engineer',
    salary: '$250K - $400K',
    skills: ['Strategic Vision', 'Organization Design', 'Innovation', 'Mentorship'],
    timeline: '6+ Years',
    companies: ['Top Tech Companies', 'Leadership Track']
  }
];

export default function CareerPath() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Career Growth Path</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the recommended skills and timelines to advance from entry-level to principal engineer
          </p>
        </div>

        {/* Career Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 -translate-y-1/2" />

          {/* Career Steps */}
          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {careerPath.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Step Circle */}
                <div className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-green-600 border-4 border-white shadow-lg flex items-center justify-center text-white font-bold">
                  {idx + 1}
                </div>

                {/* Card */}
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 mt-8 border-l-4 border-gradient-to-b from-orange-600 to-green-600 hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm font-semibold text-blue-600 mb-4">{step.level} Level</p>

                  {/* Salary */}
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-xs text-gray-600 font-medium mb-1">Expected Salary</p>
                    <p className="text-2xl font-bold text-green-600">{step.salary}</p>
                  </div>

                  {/* Timeline */}
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-xs text-gray-600 font-medium mb-1">Timeline</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <TrendingUp className="w-4 h-4" />
                      {step.timeline}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-600 font-medium mb-3">Skills to Master</p>
                    <div className="space-y-2">
                      {step.skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                          <span className="text-sm text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Companies */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-xs text-gray-600 font-medium mb-2">Target Companies</p>
                    <div className="flex flex-wrap gap-2">
                      {step.companies.map((company, i) => (
                        <span key={i} className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg">
                    View Jobs
                  </button>

                  {/* Arrow */}
                  {idx < careerPath.length - 1 && (
                    <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-green-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Take the Next Step?</h3>
          <p className="text-lg mb-6 opacity-90">
            Get personalized job recommendations based on your current level and goals
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Get Your Recommendations
          </button>
        </div>
      </div>
    </section>
  );
}
