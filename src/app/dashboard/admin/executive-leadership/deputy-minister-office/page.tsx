'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, FileText, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const DeputyMinisterOfficePage: React.FC = () => {
  const stats = [
    { title: 'الاجتماعات اليومية', value: '8', icon: Calendar, trend: '+2', color: 'text-blue-600' },
    { title: 'التقارير المراجعة', value: '45', icon: FileText, trend: '+12%', color: 'text-green-600' },
    { title: 'المهام المستحقة', value: '23', icon: Clock, trend: '-5%', color: 'text-orange-600' },
    { title: 'المشاريع الخSupervised', value: '156', icon: TrendingUp, trend: '+18%', color: 'text-purple-600' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* رأس الصفحة */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Users className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">مكتب نائب الوزير</h1>
            <p className="text-blue-100">الإشراف على العمليات اليومية والتنسيق بين الإدارات</p>
          </div>
        </div>
      </motion.div>

      {/* الإحصائيات */}
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

      {/* المحتوى الرئيسي */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* جدول الاجتماعات */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            جدول الاجتماعات اليوم
          </h3>
          <div className="space-y-3">
            {[
              { title: 'اجتماع مع مديري الإدارات', time: '9:00 ص - 10:30 ص', attendees: 12, status: 'قيد التنفيذ' },
              { title: 'مراجعة التقارير الشهرية', time: '11:00 ص - 12:00 م', attendees: 8, status: 'مقرر' },
              { title: 'لقاء مع لجنة التطوير', time: '2:00 م - 3:30 م', attendees: 15, status: 'مقرر' },
              { title: 'اجتماع تنسيقي مع الجهات الخارجية', time: '4:00 م - 5:00 م', attendees: 6, status: 'مقرر' }
            ].map((meeting, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{meeting.title}</p>
                  <p className="text-sm text-gray-600">{meeting.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{meeting.attendees} مشارك</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    meeting.status === 'قيد التنفيذ' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {meeting.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* المهام المستحقة */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            المهام المستحقة والمشاريع
          </h3>
          <div className="space-y-3">
            {[
              { title: 'مراجعة استراتيجية التطوير', priority: 'عالية', deadline: '2024-01-20', progress: 75 },
              { title: 'تقييم أداء الإدارات', priority: 'متوسطة', deadline: '2024-01-25', progress: 60 },
              { title: 'تطوير نظام المتابعة', priority: 'عالية', deadline: '2024-01-18', progress: 90 },
              { title: 'إعداد تقرير الأداء الشهري', priority: 'متوسطة', deadline: '2024-01-22', progress: 45 }
            ].map((task, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'عالية' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>الموعد النهائي: {task.deadline}</span>
                  <span>{task.progress}% مكتمل</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      task.progress >= 80 ? 'bg-green-500' :
                      task.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${task.progress}%` }}
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

export default DeputyMinisterOfficePage;
