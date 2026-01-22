import { useState } from 'react';
import { MapPin, DollarSign, ExternalLink } from 'lucide-react';
import { API_BASE_URL } from '../config';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary_min: number | null;
    salary_max: number | null;
    remote_type: string;
    experience_level: string;
    job_url?: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const handleGetRecommendation = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/recommendation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: job.id, user_preferences: null })
      });
      if (!response.ok) throw new Error('Failed to get recommendation');
      const data = await response.json();
      setMatchScore(data.match_score);
    } catch (error) {
      console.error('Error getting recommendation:', error);
    }
  };

  const salaryRange = job.salary_min && job.salary_max 
    ? `$${(job.salary_min / 1000).toFixed(0)}K - $${(job.salary_max / 1000).toFixed(0)}K`
    : 'Competitive';

  const experienceBadgeColor = {
    entry: 'bg-green-900 text-green-200',
    mid: 'bg-blue-900 text-blue-200',
    senior: 'bg-purple-900 text-purple-200'
  };

  const remoteBadgeColor = {
    'fully-remote': 'bg-cyan-900 text-cyan-200',
    'hybrid': 'bg-yellow-900 text-yellow-200',
    'on-site': 'bg-gray-700 text-gray-200'
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
          <p className="text-gray-400">{job.company}</p>
        </div>
        <button
          onClick={handleGetRecommendation}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
        >
          Analyze
        </button>
      </div>

      {/* Match Score */}
      {matchScore !== null && (
        <div className="mb-4 bg-gray-700 rounded p-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Match Score</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
                  style={{ width: `${matchScore * 100}%` }}
                />
              </div>
              <span className="text-white font-bold">{Math.round(matchScore * 100)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Info Row */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center space-x-2 text-gray-300">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-300">
          <DollarSign className="w-4 h-4" />
          <span>{salaryRange}</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${experienceBadgeColor[job.experience_level as keyof typeof experienceBadgeColor]}`}>
          {job.experience_level}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${remoteBadgeColor[job.remote_type as keyof typeof remoteBadgeColor]}`}>
          {job.remote_type}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
        {job.job_url && (
          <a
            href={job.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Apply</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
