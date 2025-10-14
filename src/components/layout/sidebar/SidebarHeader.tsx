'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

interface SidebarHeaderProps {
  isOpen: boolean;
  isMobile?: boolean;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isOpen,
  isMobile = false
}) => {
  return (
    <motion.div
      className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center gap-3"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
          whileHover={{ rotate: 5 }}
        >
          <Crown className="w-6 h-6 text-white" />
        </motion.div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-white font-bold text-lg">نظام التعليم العالي</h2>
            <p className="text-blue-100 text-sm">لوحة التحكم المتقدمة</p>
          </motion.div>
        )}
      </motion.div>

      {isMobile && (
        <motion.button
          className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      )}
    </motion.div>
  );
};
