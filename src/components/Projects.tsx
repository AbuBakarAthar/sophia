import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { ExternalLink, Code } from 'lucide-react';

const projects = [
  {
    title: 'Multi-Cloud Data Platform',
    description: 'Enterprise lakehouse architecture across Azure Databricks, AWS, and Snowflake supporting real-time and batch workloads.',
    tech: ['Azure', 'AWS', 'Databricks', 'Snowflake', 'PySpark', 'dbt'],
    category: 'Cloud Architecture',
    achievements: ['45% faster processing', '99.9% SLA reliability', '25% cost reduction'],
  },
  {
    title: 'Real-Time Streaming Pipeline',
    description: 'Event-driven data platform using Kafka, Flink, and Delta Lake for near real-time analytics and ML workloads.',
    tech: ['Kafka', 'Flink', 'Delta Lake', 'Python', 'Redpanda'],
    category: 'Data Engineering',
    achievements: ['<1min latency', 'Fault-tolerant architecture', 'Auto-scaling'],
  },
  {
    title: 'Healthcare Analytics Platform',
    description: 'HIPAA-compliant data platform processing claims, EHR, and quality metrics for population health analytics.',
    tech: ['Azure', 'PySpark', 'SQL', 'Power BI', 'Python'],
    category: 'Healthcare',
    achievements: ['70% less manual work', 'HIPAA compliant', 'Audit-ready reporting'],
  },
  {
    title: 'ML Feature Store',
    description: 'Scalable feature engineering platform with MLflow integration supporting real-time inference and batch training.',
    tech: ['Databricks', 'MLflow', 'Python', 'Delta Lake', 'FastAPI'],
    category: 'Machine Learning',
    achievements: ['Real-time features', 'Version control', 'A/B testing support'],
  },
  {
    title: 'Data Governance Framework',
    description: 'Enterprise data governance solution with Unity Catalog, lineage tracking, and automated quality monitoring.',
    tech: ['Unity Catalog', 'Monte Carlo', 'Datadog', 'OpenLineage'],
    category: 'Governance',
    achievements: ['40% fewer incidents', 'Full lineage', 'Automated monitoring'],
  },
  {
    title: 'Cost Optimization System',
    description: 'Cloud cost monitoring and optimization platform reducing compute and storage spend across multi-cloud.',
    tech: ['Terraform', 'Python', 'Grafana', 'AWS', 'Azure'],
    category: 'DevOps',
    achievements: ['25% cost savings', 'Real-time alerts', 'Automated scaling'],
  },
];

const categories = ['All', 'Cloud Architecture', 'Data Engineering', 'Healthcare', 'Machine Learning', 'Governance', 'DevOps'];

function RotatingSphere() {
  const meshRef = useRef<any>();

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]}>
      <meshStandardMaterial
        color="#06b6d4"
        wireframe
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
            <Code className="text-white" size={24} />
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-cyan-500 hover:text-white transition-colors"
          >
            <ExternalLink size={20} />
          </motion.button>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-sm text-cyan-600 dark:text-cyan-400 mb-3 font-semibold">{project.category}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Achievements:</p>
          <ul className="space-y-1">
            {project.achievements.map((achievement, i) => (
              <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                <span className="text-cyan-500">✓</span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-semibold bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-64 h-64 opacity-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <RotatingSphere />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Enterprise-scale data platforms and systems built with modern cloud technologies
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
