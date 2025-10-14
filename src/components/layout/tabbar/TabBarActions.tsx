'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuickAction {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  gradient?: string;
  badge?: string | number;
}

interface TabBarActionsProps {
  actions?: QuickAction[];
  className?: string;
}

const defaultActions: QuickAction[] = [
  {
    id: 'add',
    title: 'إضافة عنصر جديد',
    icon: Plus,
    action: () => console.log('إضافة عنصر جديد'),
    gradient: 'from-blue-500 to-purple-600',
    badge: 'جديد'
  },
  {
    id: 'filter',
    title: 'تصفية البيانات',
    icon: Filter,
    action: () => console.log('تصفية البيانات'),
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 'export',
    title: 'تصدير البيانات',
    icon: Download,
    action: () => console.log('تصدير البيانات'),
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'refresh',
    title: 'تحديث البيانات',
    icon: RefreshCw,
    action: () => console.log('تحديث البيانات'),
    gradient: 'from-cyan-500 to-blue-600'
  }
];

export const TabBarActions: React.FC<TabBarActionsProps> = ({
  actions = defaultActions,
  className = ""
}) => {
  return (
    <div className={cn("hidden md:flex items-center gap-1", className)}>
      {actions.map((action, index) => {
        const Icon = action.icon;

        return (
          <motion.button
            key={action.id}
            onClick={action.action}
            className={cn(
              "relative p-2 rounded-xl transition-all duration-300 group overflow-hidden",
              `bg-gradient-to-r ${action.gradient} text-white shadow-lg hover:shadow-xl`
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* خلفية متحركة */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                x: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <Icon className="w-4 h-4 relative z-10" />

            {action.badge && (
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center text-xs font-bold text-gray-800"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {action.badge}
              </motion.div>
            )}

            {/* تلميحة عند التمرير */}
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              initial={{ opacity: 0, y: 5 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              {action.title}
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
};
