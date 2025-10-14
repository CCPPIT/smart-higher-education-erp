'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

interface TabBarHeaderProps {
  pageTitle: string;
  pageSubtitle?: string;
  pageIcon?: React.ComponentType<{ className?: string }>;
}

export const TabBarHeader: React.FC<TabBarHeaderProps> = ({
  pageTitle,
  pageSubtitle,
  pageIcon: PageIcon
}) => {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    // تحديث التاريخ فقط على العميل لتجنب مشكلة Hydration
    const date = new Date().toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(date);
  }, []);

  return (
    <motion.div
      className="flex items-center gap-3"
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {PageIcon ? <PageIcon className="w-5 h-5 text-white" /> : <Crown className="w-5 h-5 text-white" />}
      </motion.div>

      <div>
        <motion.h1
          className="text-lg font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {pageTitle}
        </motion.h1>
        {pageSubtitle && (
          <motion.p
            className="text-sm text-gray-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentDate || pageSubtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};
