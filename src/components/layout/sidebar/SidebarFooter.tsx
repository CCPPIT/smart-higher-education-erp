'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface SidebarFooterProps {
  isOpen: boolean;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  isOpen
}) => {
  return (
    <motion.div
      className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Activity className="w-4 h-4 text-white" />
        </motion.div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm font-medium text-gray-800">حالة النظام</p>
            <p className="text-xs text-green-600 font-medium">يعمل بشكل طبيعي</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
