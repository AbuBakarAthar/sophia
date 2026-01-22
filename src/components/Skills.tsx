import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Database,
  Cloud,
  Code,
  BarChart3,
  Shield,
  Gauge,
  Zap,
  Brain,
  GitBranch,
  Users,
} from 'lucide-react';

const skillCategories = [
  {
    icon: Database,
    title: 'Enterprise Data Engineering',
    skills: [
      { name: 'dbt (Core & Cloud)', level: 95 },
      { name: 'PySpark & Airflow', level: 95 },
      { name: 'ETL/ELT Pipelines', level: 98 },
      { name: 'CDC & Event-Driven', level: 90 },
    ],
  },
  {
    icon: Code,
    title: 'Software Development',
    skills: [
      { name: 'Python & SQL', level: 98 },
      { name: 'Scala & Java', level: 85 },
      { name: 'REST APIs & gRPC', level: 90 },
      { name: 'PostgreSQL & ClickHouse', level: 92 },
    ],
  },
  {
    icon: BarChart3,
    title: 'Business Intelligence',
    skills: [
      { name: 'Power BI & Tableau', level: 93 },
      { name: 'Looker & Analytics', level: 88 },
      { name: 'KPI Dashboards', level: 95 },
      { name: 'Data Storytelling', level: 90 },
    ],
  },
  {
    icon: Shield,
    title: 'Security & Governance',
    skills: [
      { name: 'HIPAA & SOC2', level: 95 },
      { name: 'IAM & Encryption', level: 92 },
      { name: 'Unity Catalog', level: 90 },
      { name: 'Compliance Reporting', level: 93 },
    ],
  },
  {
    icon: Gauge,
    title: 'Monitoring & Observability',
    skills: [
      { name: 'Prometheus & Grafana', level: 90 },
      { name: 'Datadog & ELK Stack', level: 88 },
      { name: 'Monte Carlo', level: 85 },
      { name: 'Anomaly Detection', level: 87 },
    ],
  },
  {
    icon: Zap,
    title: 'Big Data & Real-Time',
    skills: [
      { name: 'Apache Kafka & Flink', level: 92 },
      { name: 'Delta Lake & Iceberg', level: 95 },
      { name: 'ClickHouse & Druid', level: 88 },
      { name: 'Streaming Systems', level: 90 },
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud Platforms',
    skills: [
      { name: 'Azure & Databricks', level: 95 },
      { name: 'AWS (S3, Lambda, Glue)', level: 93 },
      { name: 'GCP & BigQuery', level: 88 },
      { name: 'Snowflake & Redshift', level: 92 },
    ],
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    skills: [
      { name: 'MLflow & Feature Stores', level: 88 },
      { name: 'Vertex AI & SageMaker', level: 85 },
      { name: 'ML Pipeline Engineering', level: 90 },
      { name: 'Model Deployment', level: 87 },
    ],
  },
  {
    icon: GitBranch,
    title: 'Data Modeling',
    skills: [
      { name: 'Star & Snowflake Schema', level: 98 },
      { name: 'Dimensional Modeling', level: 95 },
      { name: 'Data Vault', level: 90 },
      { name: 'System Architecture', level: 93 },
    ],
  },
  {
    icon: Users,
    title: 'Leadership & Collaboration',
    skills: [
      { name: 'Agile/Scrum', level: 95 },
      { name: 'Cross-Functional Teams', level: 98 },
      { name: 'Mentorship', level: 92 },
      { name: 'Strategic Planning', level: 90 },
    ],
  },
];

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg"
        >
          <Icon className="text-white" size={24} />
        </motion.div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{category.title}</h3>
      </div>

      <div className="space-y-4">
        {category.skills.map((skill, i) => (
          <div key={i}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
              <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1, delay: index * 0.1 + i * 0.1 }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive technical skillset spanning data engineering, cloud platforms, and enterprise architecture
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
