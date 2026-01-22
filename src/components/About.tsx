import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Lead Data Engineer',
    company: 'West Monroe',
    period: '2022 - Present',
    description: 'Led architecture and development of multi-cloud enterprise data platforms across Azure Databricks, AWS, and Snowflake.',
    achievements: [
      'Reduced processing time by 45% with optimized ETL/ELT frameworks',
      'Decreased production incidents by 40% through observability systems',
      'Cut cloud costs by 25% while improving platform reliability',
    ],
  },
  {
    title: 'Senior Data Engineer',
    company: 'Andela - Healthcare Analytics',
    period: '2020 - 2022',
    description: 'Engineered scalable ETL/ELT pipelines for healthcare data using PySpark, SQL, and Azure.',
    achievements: [
      'Reduced manual processing by 70% with automated reporting',
      'Decreased data defects by 40% across critical domains',
      'Built enterprise data marts for population health analytics',
    ],
  },
  {
    title: 'BI & Data Integration Engineer',
    company: 'Rangle.io',
    period: '2018 - 2020',
    description: 'Developed end-to-end ETL pipelines and interactive dashboards for enterprise reporting.',
    achievements: [
      'Reduced spreadsheet processes by 60% with automated dashboards',
      'Improved data reliability across ingestion layers',
      'Integrated legacy systems into unified data pipelines',
    ],
  },
];

function TimelineItem({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative mb-12"
    >
      <div className="flex items-center mb-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg text-white mr-4"
        >
          <Briefcase size={24} />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{experience.title}</h3>
          <p className="text-cyan-600 dark:text-cyan-400 font-semibold">{experience.company}</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Calendar size={16} />
          <span className="text-sm">{experience.period}</span>
        </div>
      </div>

      <div className="ml-16 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300 mb-4">{experience.description}</p>
        <ul className="space-y-2">
          {experience.achievements.map((achievement, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + i * 0.1 }}
              className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
            >
              <span className="text-cyan-500 mt-1">▹</span>
              <span>{achievement}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900">
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
              About Me
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            With 9+ years of experience in data engineering and cloud architecture, I specialize in building
            scalable, secure, production-grade data platforms that drive business value.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Profile</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Senior Data Engineer & Cloud Data Architect specializing in cloud-native lakehouse architectures,
              multi-terabyte ETL/ELT pipelines, and real-time streaming systems. Proven track record in
              healthcare, finance, and enterprise SaaS, with expertise in AWS, Azure, and GCP.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Remote Work Expertise</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Experienced in leading distributed teams and collaborating across time zones. Strong advocate for
              remote work culture, digital transformation, and asynchronous communication. Proven ability to
              deliver high-impact projects in fully remote environments.
            </p>
          </motion.div>
        </div>

        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            Career Timeline
          </motion.h3>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-600 hidden md:block" />

            {experiences.map((exp, index) => (
              <TimelineItem key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
