import { Zap } from 'lucide-react';

interface TopSkillsCardProps {
  skills: string[];
}

export default function TopSkillsCard({ skills }: TopSkillsCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-5 h-5 text-cyan-500" />
        <h3 className="text-xl font-bold text-white">Top In-Demand Skills</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-700 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium hover:bg-cyan-500 hover:text-white transition-colors cursor-pointer"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
