'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, FileText, CheckCircle, Target, BarChart, Activity } from 'lucide-react';

const InstitutionalPerformancePage: React.FC = () => {
  const stats = [
    { title: 'مؤشرات الأداء', value: '156', icon: TrendingUp, trend: '+12%', color: 'text-green-600' },
    { title: 'التقارير الشهرية', value: '24', icon: FileText, trend: '+8%', color: 'text-blue-600' },
    { title: 'المؤشرات المحققة', value: '89%', icon: CheckCircle, trend: '+15%', color: 'text-purple-600' },
    { title: 'التحسينات المطبقة', value: '34', icon: Target, trend: '+22%', color: 'text-orange-600' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <TrendingUp className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة الأداء المؤسسي</h1>
            <p className="text-green-100">قياس وتحسين الأداء المؤسسي وتحقيق الأهداف الاستراتيجية</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <span className={`text-sm font-medium ${stat.color} bg-gray-100 px-2 py-1 rounded-full`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default InstitutionalPerformancePage;
