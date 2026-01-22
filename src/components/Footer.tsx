import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 justify-center md:justify-start">
              <span>Built with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart className="text-red-500" size={18} fill="currentColor" />
              </motion.span>
              <span>by Sophia Valhari</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#home"
              className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 transition-colors text-sm font-medium"
            >
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
