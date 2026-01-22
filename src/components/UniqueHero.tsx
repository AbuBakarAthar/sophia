import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { Download, Mail, Linkedin, Github, Zap, Code2, Brain } from 'lucide-react';

export function UniqueHero() {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/sophia-valhari.pdf';
    link.download = 'Sophia-Valhari-Resume.pdf';
    link.click();
  };

  const handleContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const floatingIcons = [
    { icon: Code2, label: 'Code', delay: 0 },
    { icon: Brain, label: 'AI/ML', delay: 0.2 },
    { icon: Zap, label: 'Performance', delay: 0.4 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950" />

      {/* Floating Orbs Background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* Canvas Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-green-100 dark:from-orange-900 dark:to-green-900 border border-orange-300 dark:border-orange-700">
              <p className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                ✨ Welcome to my digital space
              </p>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                Sophia Valhari
              </span>
            </h1>
          </motion.div>

          {/* Subtitle with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-8"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Senior Data Engineer & Cloud Architect
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Transforming data into insights. Building scalable cloud-native solutions.
            </p>
          </motion.div>

          {/* Floating Icons */}
          <div className="flex justify-center gap-12 mb-12">
            {floatingIcons.map(({ icon: Icon, label, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.3 }}
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-orange-100 to-green-100 dark:from-orange-900 dark:to-green-900">
                  <Icon className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            I specialize in designing and implementing cloud-native data platforms, distributed systems architecture, 
            and real-time analytics solutions that scale to millions of events per second.
          </motion.p>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-12"
          >
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-600 dark:text-gray-400">
              Open to remote opportunities globally
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Download size={20} />
              Download Resume
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(234, 88, 12, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContact}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            >
              <Mail size={20} />
              Get in Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex justify-center gap-6"
          >
            <motion.a
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              href="https://linkedin.com/in/sophiavalhari"
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
            >
              <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/sophiavalhari"
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            >
              <Github className="w-6 h-6 text-gray-900 dark:text-gray-100" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Scroll to explore</span>
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
