import { Building2 } from 'lucide-react';

interface CompanyChartProps {
  companies: string[];
}

export default function CompanyChart({ companies }: CompanyChartProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Building2 className="w-5 h-5 text-blue-500" />
        <h3 className="text-xl font-bold text-white">Top Companies</h3>
      </div>
      <div className="space-y-3">
        {companies.map((company, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">{company}</p>
            </div>
            <div className="text-gray-400 text-sm">
              {Math.floor(Math.random() * 50) + 10} jobs
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
