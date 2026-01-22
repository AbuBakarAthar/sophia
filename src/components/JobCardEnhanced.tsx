import { Save, MapPin, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary_min: number;
  salary_max: number;
  experience_level: string;
  remote_type: string;
  skills: string[];
  description: string;
  userSkills?: string[];
}

export default function JobCardEnhanced({
  title,
  company,
  location,
  salary_min,
  salary_max,
  experience_level,
  remote_type,
  skills,
  description,
  userSkills = []
}: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Calculate skill match percentage
  const calculateSkillMatch = () => {
    if (userSkills.length === 0) return 0;
    const matchedSkills = skills.filter(skill =>
      userSkills.some(userSkill =>
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    ).length;
    return Math.round((matchedSkills / Math.max(skills.length, userSkills.length)) * 100);
  };

  const skillMatch = calculateSkillMatch();
  const matchColor = skillMatch >= 75 ? 'text-green-600' : skillMatch >= 50 ? 'text-blue-600' : 'text-yellow-600';
  const matchBgColor = skillMatch >= 75 ? 'bg-green-50' : skillMatch >= 50 ? 'bg-blue-50' : 'bg-yellow-50';

  const formatSalary = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num}`;
  };

  const getBadgeColor = (level: string) => {
    const colors: Record<string, string> = {
      'Entry': 'bg-blue-100 text-blue-800',
      'Mid': 'bg-purple-100 text-purple-800',
      'Senior': 'bg-pink-100 text-pink-800',
      'Lead': 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const getRemoteType = (type: string) => {
    const types: Record<string, string> = {
      'fully_remote': '🌍 Fully Remote',
      'remote_first': '💻 Remote First',
      'hybrid': '🏢 Hybrid'
    };
    return types[type] || type;
  };

  return (
    <div className={`border rounded-xl transition-all duration-300 overflow-hidden hover:shadow-xl hover:-translate-y-1 ${matchBgColor}`}>
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 font-medium mb-3">{company}</p>
            
            {/* Badges Row */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(experience_level)}`}>
                {experience_level}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {getRemoteType(remote_type)}
              </span>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-3 rounded-lg transition-all ml-4 ${
              isSaved
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Save className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Location & Timezone */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="bg-white px-2 py-0.5 rounded">UTC-8 to UTC+5</span>
          </div>
        </div>

        {/* Salary */}
        <div className="text-2xl font-bold text-gray-900 mb-4">
          {formatSalary(salary_min)} - {formatSalary(salary_max)}
        </div>
      </div>

      {/* Skill Match Bar */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Skill Match</span>
          <span className={`text-sm font-bold ${matchColor}`}>{skillMatch}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              skillMatch >= 75
                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                : skillMatch >= 50
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                : 'bg-gradient-to-r from-yellow-500 to-orange-500'
            }`}
            style={{ width: `${skillMatch}%` }}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">Required Skills</span>
          <TrendingUp className="w-4 h-4 text-gray-500" />
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 5).map((skill, i) => {
            const isMatched = userSkills.some(us =>
              us.toLowerCase().includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(us.toLowerCase())
            );
            return (
              <span
                key={i}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  isMatched
                    ? 'bg-green-200 text-green-800 font-semibold'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {skill}
              </span>
            );
          })}
          {skills.length > 5 && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
              +{skills.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Details Toggle */}
      {showDetails && (
        <div className="px-6 pb-4 border-t border-gray-200 pt-4">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">{description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 font-medium">Team Size</p>
              <p className="text-gray-900">5-50 people</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Salary Review</p>
              <p className="text-gray-900">Annual</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-gray-100 bg-white flex gap-3">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white font-medium rounded-lg transition-all hover:shadow-lg">
          Apply Now
        </button>
      </div>
    </div>
  );
}
