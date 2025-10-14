'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface StatusIndicator {
  id: string;
  label: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  color: string;
  bgColor: string;
}

interface TabBarStatusProps {
  indicators?: StatusIndicator[];
  className?: string;
}

const defaultIndicators: StatusIndicator[] = [
  {
    id: 'connection',
    label: 'متصل',
    status: 'online',
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200'
  },
  {
    id: 'system',
    label: 'نشط',
    status: 'online',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200'
  }
];

export const TabBarStatus: React.FC<TabBarStatusProps> = ({
  indicators = defaultIndicators,
  className = ""
}) => {
  return (
    <motion.div
      className={`hidden md:flex items-center gap-2 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
    >
      {indicators.map((indicator, index) => (
        <motion.div
          key={indicator.id}
          className={`flex items-center gap-1 px-2 py-1 rounded-full border ${indicator.bgColor}`}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2 + index,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className={`w-2 h-2 ${indicator.color} rounded-full`}></div>
          <span className={`text-xs font-medium ${indicator.color}`}>{indicator.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};
