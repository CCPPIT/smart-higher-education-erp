'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, Award, CheckCircle, Calendar } from 'lucide-react';

const NationalInitiativesPage: React.FC = () => {
  const stats = [
    { title: 'المبادرات الوطنية', value: '34', icon: Target, trend: '+12%', color: 'text-blue-600' },
    { title: 'المشاركون في المبادرات', value: '1,234', icon: Users, trend: '+18%', color: 'text-green-600' },
    { title: 'المبادرات المكتملة', value: '89%', icon: CheckCircle, trend: '+8%', color: 'text-purple-600' },
    { title: 'التأثير الوطني', value: '94%', icon: Award, trend: '+15%', color: 'text-orange-600' }
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
            <Target className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة المبادرات الوطنية</h1>
            <p className="text-green-100">تنفيذ ومتابعة المبادرات الوطنية في التعليم العالي</p>
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
            <Target className="w-5 h-5 text-blue-600" />
            أبرز المبادرات الوطنية
          </h3>
          <div className="space-y-3">
            {[
              { title: 'مبادرة التعليم الرقمي الشامل', budget: '500 مليون ريال', beneficiaries: '2.5 مليون طالب', status: 'قيد التنفيذ' },
              { title: 'برنامج تطوير الجامعات السعودية', budget: '300 مليون ريال', beneficiaries: '45 جامعة', status: 'قيد التنفيذ' },
              { title: 'مبادرة البحث العلمي المتقدم', budget: '200 مليون ريال', beneficiaries: '156 باحث', status: 'مكتملة' },
              { title: 'برنامج الابتعاث الخارجي المطور', budget: '800 مليون ريال', beneficiaries: '50 ألف مبتعث', status: 'قيد التنفيذ' }
            ].map((initiative, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{initiative.title}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    initiative.status === 'مكتملة' ? 'bg-green-100 text-green-800' :
                    initiative.status === 'قيد التنفيذ' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {initiative.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <span>الميزانية: {initiative.budget}</span>
                  <span>المستفيدون: {initiative.beneficiaries}</span>
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
            <Calendar className="w-5 h-5 text-green-600" />
            جدول المبادرات الوطنية
          </h3>
          <div className="space-y-3">
            {[
              { title: 'إطلاق مبادرة التعليم الذكي', date: '2024-02-01', phase: 'المرحلة الأولى', progress: 75 },
              { title: 'توسعة برنامج الابتعاث', date: '2024-03-15', phase: 'المرحلة الثانية', progress: 60 },
              { title: 'تطوير الجامعات التقنية', date: '2024-04-01', phase: 'المرحلة الثالثة', progress: 45 },
              { title: 'إنشاء مراكز البحث المتقدم', date: '2024-05-01', phase: 'المرحلة الرابعة', progress: 30 }
            ].map((schedule, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{schedule.title}</p>
                  <span className="text-sm text-gray-600">{schedule.date}</span>
                </div>
                <p className="text-sm text-blue-600 mb-2">{schedule.phase}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      schedule.progress >= 70 ? 'bg-green-500' :
                      schedule.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${schedule.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{schedule.progress}% مكتمل</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NationalInitiativesPage;
