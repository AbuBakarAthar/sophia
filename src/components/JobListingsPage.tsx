import { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import { API_BASE_URL } from '../config';
import JobCard from './JobCard';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  remote_type: string;
  experience_level: string;
  match_score?: number;
  growth_potential?: number;
}

export default function JobListingsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: '',
    experience_level: '',
    remote_type: '',
    salary_min: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.keyword) params.append('keyword', filters.keyword);
      if (filters.experience_level) params.append('experience_level', filters.experience_level);
      if (filters.remote_type) params.append('remote_type', filters.remote_type);
      if (filters.salary_min) params.append('salary_min', filters.salary_min);
      
      const response = await fetch(`${API_BASE_URL}/api/jobs?${params}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    fetchJobs();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Job Listings</h2>
        <p className="text-gray-400">Discover ML & Data Engineering opportunities</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Keyword</label>
            <input
              type="text"
              placeholder="e.g., Python, ML Engineer"
              value={filters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Experience</label>
            <select
              value={filters.experience_level}
              onChange={(e) => handleFilterChange('experience_level', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Any</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Remote</label>
            <select
              value={filters.remote_type}
              onChange={(e) => handleFilterChange('remote_type', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Any</option>
              <option value="fully-remote">Fully Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-Site</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Min Salary</label>
            <input
              type="number"
              placeholder="e.g., 60000"
              value={filters.salary_min}
              onChange={(e) => handleFilterChange('salary_min', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      {loading ? (
        <LoadingState />
      ) : jobs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading jobs...</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
      <Briefcase className="w-12 h-12 text-gray-500 mx-auto mb-4" />
      <p className="text-gray-400">No jobs found. Try adjusting your filters.</p>
    </div>
  );
}
