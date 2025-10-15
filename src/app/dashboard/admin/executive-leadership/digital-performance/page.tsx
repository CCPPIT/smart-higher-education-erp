'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Users, Target, CheckCircle, Zap } from 'lucide-react';

const DigitalPerformancePage: React.FC = () => {
  const stats = [
    { title: 'مؤشرات الأداء الرقمي', value: '156', icon: Activity, trend: '+18%', color: 'text-blue-600' },
    { title: 'المستخدمون النشطون', value: '2,345', icon: Users, trend: '+22%', color: 'text-green-600' },
    { title: 'الأهداف المحققة', value: '89%', icon: Target, trend: '+12%', color: 'text-purple-600' },
    { title: 'معدل التحسن', value: '94%', icon: TrendingUp, trend: '+8%', color: 'text-orange-600' }
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
        className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Activity className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة الأداء الرقمي</h1>
            <p className="text-cyan-100">قياس وتحسين الأداء الرقمي والتقني في المؤسسة</p>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            مؤشرات الأداء الرقمي الرئيسية
          </h3>
          <div className="space-y-3">
            {[
              { indicator: 'سرعة استجابة الأنظمة', current: 94, target: 95, previous: 89, unit: '%' },
              { indicator: 'توفر الخدمات الرقمية', current: 99.5, target: 99, previous: 98.8, unit: '%' },
              { indicator: 'رضا المستخدمين عن الخدمات الرقمية', current: 87, target: 85, previous: 82, unit: '%' },
              { indicator: 'معدل استخدام التطبيقات الذكية', current: 78, target: 80, previous: 73, unit: '%' }
            ].map((kpi, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{kpi.indicator}</p>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{kpi.current}{kpi.unit}</p>
                    <p className="text-xs text-gray-600">الهدف: {kpi.target}{kpi.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        kpi.current >= kpi.target ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    kpi.current > kpi.previous ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {kpi.current > kpi.previous ? '+' : ''}{(kpi.current - kpi.previous).toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            مشاريع التحول الرقمي
          </h3>
          <div className="space-y-3">
            {[
              { project: 'تطوير منصة التعليم الذكية', progress: 85, budget: '15 مليون ريال', timeline: '2024-06' },
              { project: 'أتمتة الإجراءات الإدارية', progress: 70, budget: '8 مليون ريال', timeline: '2024-08' },
              { project: 'تطوير تطبيقات الهواتف الذكية', progress: 60, budget: '12 مليون ريال', timeline: '2024-10' },
              { project: 'نظام إدارة البيانات الضخمة', progress: 90, budget: '20 مليون ريال', timeline: '2024-05' }
            ].map((project, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{project.project}</p>
                  <span className="text-sm text-gray-600">{project.timeline}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>الميزانية: {project.budget}</span>
                  <span>{project.progress}% مكتمل</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      project.progress >= 80 ? 'bg-green-500' :
                      project.progress >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DigitalPerformancePage;
