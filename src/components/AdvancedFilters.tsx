import { Search, Filter, Zap } from 'lucide-react';
import { useState } from 'react';

interface Filters {
  keyword: string;
  experience: string[];
  remote: string[];
  salaryMin: number;
  salaryMax: number;
  timezone: string[];
  skills: string[];
}

export default function AdvancedFilters() {
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    experience: [],
    remote: [],
    salaryMin: 0,
    salaryMax: 300000,
    timezone: [],
    skills: []
  });
  const [isOpen, setIsOpen] = useState(false);

  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'C-Level'];
  const remoteTypes = ['Fully Remote', 'Remote First', 'Hybrid'];
  const timezones = ['UTC-8 (PST)', 'UTC-5 (EST)', 'UTC+0 (GMT)', 'UTC+1 (CET)', 'UTC+5:30 (IST)'];
  const popularSkills = ['React', 'Python', 'TypeScript', 'Node.js', 'AWS', 'GraphQL', 'Docker', 'AI/ML'];

  const toggleFilter = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter(i => i !== value)
      : [...array, value];
  };

  return (
    <section className="py-8 bg-gradient-to-r from-blue-50 to-purple-50 sticky top-16 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search job title, company, or skills..."
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <button className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all flex items-center gap-2 hover:shadow-lg">
            <Zap className="w-5 h-5" />
            Search
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              isOpen
                ? 'bg-blue-600 text-white'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-600'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Expanded Filters */}
        {isOpen && (
          <div className="bg-white rounded-xl shadow-lg p-8 mt-4 border border-gray-200">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Experience Level */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  Experience Level
                </h4>
                <div className="space-y-3">
                  {experienceLevels.map(level => (
                    <label key={level} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={filters.experience.includes(level)}
                        onChange={() =>
                          setFilters({
                            ...filters,
                            experience: toggleFilter(filters.experience, level)
                          })
                        }
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 font-medium">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Remote Type */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Remote Type</h4>
                <div className="space-y-3">
                  {remoteTypes.map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={filters.remote.includes(type)}
                        onChange={() =>
                          setFilters({
                            ...filters,
                            remote: toggleFilter(filters.remote, type)
                          })
                        }
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Timezone */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Timezone</h4>
                <div className="space-y-3">
                  {timezones.map(tz => (
                    <label key={tz} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={filters.timezone.includes(tz)}
                        onChange={() =>
                          setFilters({
                            ...filters,
                            timezone: toggleFilter(filters.timezone, tz)
                          })
                        }
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 font-medium text-sm">{tz}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Salary Range</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 font-medium">Min: ${(filters.salaryMin / 1000).toFixed(0)}K</label>
                    <input
                      type="range"
                      min="0"
                      max="300000"
                      step="10000"
                      value={filters.salaryMin}
                      onChange={(e) => setFilters({ ...filters, salaryMin: Number(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-medium">Max: ${(filters.salaryMax / 1000).toFixed(0)}K</label>
                    <input
                      type="range"
                      min="0"
                      max="300000"
                      step="10000"
                      value={filters.salaryMax}
                      onChange={(e) => setFilters({ ...filters, salaryMax: Number(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {popularSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() =>
                        setFilters({
                          ...filters,
                          skills: toggleFilter(filters.skills, skill)
                        })
                      }
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        filters.skills.includes(skill)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-end gap-3">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg">
                  Apply Filters
                </button>
                <button
                  onClick={() =>
                    setFilters({
                      keyword: '',
                      experience: [],
                      remote: [],
                      salaryMin: 0,
                      salaryMax: 300000,
                      timezone: [],
                      skills: []
                    })
                  }
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
