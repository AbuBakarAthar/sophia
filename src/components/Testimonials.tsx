import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'VP of Engineering',
    company: 'HealthTech Solutions',
    content: 'Sophia transformed our data infrastructure from a fragile, failure-prone system into a robust, scalable platform. Her expertise in cloud architecture and data governance reduced our incidents by 40% while improving performance. She\'s a true technical leader.',
    avatar: 'MC',
  },
  {
    name: 'Sarah Williams',
    role: 'Chief Data Officer',
    company: 'Financial Services Corp',
    content: 'Working with Sophia on our multi-cloud data platform was exceptional. She delivered a 45% improvement in processing speed while cutting costs by 25%. Her ability to translate complex technical concepts for stakeholders is outstanding.',
    avatar: 'SW',
  },
  {
    name: 'David Martinez',
    role: 'Director of Analytics',
    company: 'Enterprise SaaS Inc',
    content: 'Sophia\'s real-time streaming pipeline revolutionized our analytics capabilities. Her attention to security, compliance, and data quality while maintaining high performance sets her apart. An invaluable asset to any data-driven organization.',
    avatar: 'DM',
  },
  {
    name: 'Emily Thompson',
    role: 'Product Manager',
    company: 'West Monroe',
    content: 'Sophia\'s collaborative approach and deep technical expertise made our product launches seamless. She mentored our team, established best practices, and delivered enterprise-grade solutions that exceeded expectations. Highly recommended for remote collaboration.',
    avatar: 'ET',
  },
  {
    name: 'James Rodriguez',
    role: 'CTO',
    company: 'Data Analytics Startup',
    content: 'Sophia built our entire data platform from scratch with modern lakehouse architecture. Her implementation of Delta Lake, Unity Catalog, and automated monitoring created a foundation that scales with our growth. Her remote work ethic is impeccable.',
    avatar: 'JR',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            What colleagues and clients say about working with me
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="mb-6">
                <Quote className="text-cyan-600 dark:text-cyan-400" size={48} />
              </div>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
                "{current.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {current.avatar}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{current.name}</h4>
                  <p className="text-cyan-600 dark:text-cyan-400 font-semibold">{current.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{current.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-cyan-500 hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-cyan-600 w-8'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-cyan-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-cyan-500 hover:text-white transition-colors"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
