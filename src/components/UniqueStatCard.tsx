import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface UniqueStatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  description?: string;
  gradient: string;
  index: number;
}

export function UniqueStatCard({ icon, label, value, description, gradient, index }: UniqueStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
      className="relative group"
    >
      {/* Gradient Border Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur`} />
      
      {/* Card Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        {/* Icon Container */}
        <div className={`mb-4 p-4 rounded-lg bg-gradient-to-r ${gradient} inline-block`}>
          <div className="text-white">
            {icon}
          </div>
        </div>

        {/* Label */}
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">
          {label}
        </p>

        {/* Value */}
        <p className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
          {value}
        </p>

        {/* Description */}
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {description}
          </p>
        )}

        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}
