'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavigationItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string | number;
  gradient?: string;
}

interface SidebarSubNavigationItemProps {
  item: NavigationItem;
  isActive: boolean;
  isOpen: boolean;
  level: number;
  index: number;
}

export const SidebarSubNavigationItem: React.FC<SidebarSubNavigationItemProps> = ({
  item,
  isActive,
  isOpen,
  level,
  index
}) => {
  const Icon = item.icon;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
        isActive
          ? `bg-gradient-to-r ${item.gradient} text-white shadow-md`
          : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
      )}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{item.title}</span>

      {item.badge && (
        <motion.div
          className={cn(
            "px-2 py-1 rounded-full text-xs font-bold ml-auto",
            isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {item.badge}
        </motion.div>
      )}

      {/* نقطة مؤشر النشاط */}
      {isActive && (
        <motion.div
          className="w-2 h-2 bg-white rounded-full ml-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        />
      )}
    </motion.button>
  );
};
