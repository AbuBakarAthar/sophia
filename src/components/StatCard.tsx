import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  change: string;
  color: 'blue' | 'green' | 'cyan' | 'purple';
}

const colorMap = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  cyan: 'from-cyan-500 to-cyan-600',
  purple: 'from-purple-500 to-purple-600'
};

export default function StatCard({ icon: Icon, title, value, change, color }: StatCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>
        <div className={`bg-gradient-to-br ${colorMap[color]} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <p className="text-green-400 text-sm">{change}</p>
    </div>
  );
}
