'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, CheckCircle, TrendingUp, Calendar, Award } from 'lucide-react';

const SupremeLeadershipSupportPage: React.FC = () => {
  const stats = [
    { title: 'القيادات المدعومة', value: '25', icon: Crown, trend: '+5%', color: 'text-purple-600' },
    { title: 'الاجتماعات المنسقة', value: '156', icon: Calendar, trend: '+18%', color: 'text-blue-600' },
    { title: 'التقارير المعدة', value: '234', icon: CheckCircle, trend: '+22%', color: 'text-green-600' },
    { title: 'رضا القيادة', value: '96%', icon: Award, trend: '+8%', color: 'text-orange-600' }
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
        className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Crown className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">دعم القيادة العليا</h1>
            <p className="text-purple-100">تقديم الدعم الإداري والفني للقيادة العليا في الوزارة</p>
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
            <Crown className="w-5 h-5 text-purple-600" />
            القيادات المدعومة
          </h3>
          <div className="space-y-3">
            {[
              { leader: 'معالي وزير التعليم العالي', support: 'دعم كامل', meetings: 45, reports: 67 },
              { leader: 'معالي نائب الوزير', support: 'دعم كامل', meetings: 38, reports: 54 },
              { leader: 'معالي مساعد الوزير', support: 'دعم متخصص', meetings: 32, reports: 43 },
              { leader: 'معالي وكيل الوزارة', support: 'دعم متخصص', meetings: 41, reports: 56 },
              { leader: 'رئيس مجلس إدارة الجامعات', support: 'دعم استراتيجي', meetings: 29, reports: 38 }
            ].map((leadership, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{leadership.leader}</p>
                  <p className="text-sm text-gray-600">{leadership.support}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{leadership.meetings}</p>
                  <p className="text-xs text-gray-600">{leadership.reports} تقرير</p>
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
            <Calendar className="w-5 h-5 text-blue-600" />
            جدول الاجتماعات القيادية
          </h3>
          <div className="space-y-3">
            {[
              { meeting: 'اجتماع مجلس القيادة العليا', date: '2024-01-25', type: 'مجلس عليا', preparation: 'معد بالكامل' },
              { meeting: 'لقاء مع رؤساء الجامعات', date: '2024-01-22', type: 'اجتماع تنسيقي', preparation: 'معد بالكامل' },
              { meeting: 'جلسة مراجعة الخطط الاستراتيجية', date: '2024-01-20', type: 'جلسة مراجعة', preparation: 'قيد الإعداد' },
              { meeting: 'اجتماع لجنة التطوير والجودة', date: '2024-01-18', type: 'لجنة متخصصة', preparation: 'معد بالكامل' }
            ].map((schedule, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{schedule.meeting}</p>
                  <p className="text-sm text-gray-600">{schedule.date} - {schedule.type}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  schedule.preparation === 'معد بالكامل' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {schedule.preparation}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SupremeLeadershipSupportPage;
