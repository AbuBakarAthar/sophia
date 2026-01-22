import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { Download, Mail, Linkedin, Github } from 'lucide-react';

export function Hero() {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/sophia-valhari.pdf';
    link.download = 'Sophia-Valhari-Resume.pdf';
    link.click();
  };

  const handleContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950" />

      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ParticleField />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-cyan-600 dark:text-cyan-400 font-semibold mb-4 text-lg"
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700 bg-clip-text text-transparent">
                Sophia Valhari
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-4"
            >
              Senior Data Engineer & Cloud Architect
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
            >
              Specializing in cloud-native data platforms, distributed systems, and real-time analytics.
              Building scalable solutions that transform data into actionable insights.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-md text-gray-600 dark:text-gray-400 mb-12 flex items-center justify-center gap-2"
            >
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              Open to remote opportunities worldwide
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadResume}
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Download size={20} />
                Download Resume
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContact}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold border-2 border-cyan-600 hover:bg-cyan-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                Get in Touch
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-6"
            >
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="mailto:sophia.walhaei@gmail.com"
                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-cyan-500 hover:text-white transition-colors"
              >
                <Mail size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-cyan-500 hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-cyan-500 hover:text-white transition-colors"
              >
                <Github size={24} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-3 bg-cyan-600 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
