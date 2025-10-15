'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, CheckCircle, TrendingUp, Award, Shield, AlertTriangle, BookOpen } from 'lucide-react';

const GeneralLegalPage: React.FC = () => {
  const stats = [
    { title: 'القضايا النشطة', value: '127', icon: Scale, trend: '-8%', color: 'text-red-600' },
    { title: 'العقود المراجعة', value: '89', icon: FileText, trend: '+15%', color: 'text-blue-600' },
    { title: 'الاستشارات القانونية', value: '234', icon: BookOpen, trend: '+22%', color: 'text-green-600' },
    { title: 'القرارات القانونية', value: '156', icon: CheckCircle, trend: '+18%', color: 'text-purple-600' }
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
        className="bg-gradient-to-r from-gray-600 to-slate-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Scale className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">الإدارة العامة للشؤون القانونية</h1>
            <p className="text-gray-100">تقديم الاستشارات القانونية وحماية المصالح المؤسسية</p>
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

export default GeneralLegalPage;
