import { motion } from 'framer-motion';
import { Code2, Cloud, Database, Brain, Zap, Target } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ReactNode;
}

const skillsData: Skill[] = [
  { name: 'Data Engineering', level: 95, category: 'Core', icon: <Database className="w-5 h-5" /> },
  { name: 'Cloud Architecture', level: 92, category: 'Core', icon: <Cloud className="w-5 h-5" /> },
  { name: 'Python', level: 90, category: 'Languages', icon: <Code2 className="w-5 h-5" /> },
  { name: 'Machine Learning', level: 88, category: 'AI/ML', icon: <Brain className="w-5 h-5" /> },
  { name: 'Apache Spark', level: 87, category: 'Tools', icon: <Zap className="w-5 h-5" /> },
  { name: 'System Design', level: 89, category: 'Architecture', icon: <Target className="w-5 h-5" /> },
];

export function UniqueSkillsVisualization() {
  const categories = ['Core', 'Languages', 'AI/ML', 'Tools', 'Architecture'];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Specialized skills across modern data engineering and cloud technologies
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-xl p-6"
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-orange-600 to-green-600 text-white">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{skill.category}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Proficiency</span>
                  <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{skill.level}%</span>
                </div>

                {/* Animated Progress Bar */}
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-orange-600 to-green-600 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-green-100 dark:from-orange-900 dark:to-green-900 border border-orange-300 dark:border-orange-700"
            >
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                {category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
