'use client';

import React from 'react'
import { motion } from 'framer-motion';
import { Shield, FileText, CheckCircle, TrendingUp, Users, Calendar, Bell, Target, Clock } from 'lucide-react';

const AssistantMinisterOfficePage: React.FC = () => {
  const stats = [
    { title: 'المهام المسندة', value: '45', icon: CheckCircle, trend: '+12%', color: 'text-blue-600' },
    { title: 'التقارير المعدة', value: '23', icon: FileText, trend: '+8%', color: 'text-green-600' },
    { title: 'الاجتماعات المنسقة', value: '18', icon: Calendar, trend: '+5%', color: 'text-purple-600' },
    { title: 'المتابعات النشطة', value: '67', icon: TrendingUp, trend: '+15%', color: 'text-orange-600' },
    { title: 'التنبيهات', value: '3', icon: Bell, trend: '-2', color: 'text-red-600' }
  ];

  const tasks = [
    { title: 'مراجعة تقرير الميزانية', priority: 'عالية', status: 'قيد التنفيذ', time: 'غداً' },
    { title: 'تنسيق اجتماع اللجنة', priority: 'متوسطة', status: 'معلق', time: 'اليوم' },
    { title: 'إعداد تقرير الأداء', priority: 'منخفضة', status: 'مكتمل', time: 'أمس' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* رأس الصفحة */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8" />
          مكتب مساعد الوزير
        </h1>
        <p className="text-blue-100">إدارة المهام والتنسيق والمتابعة التنفيذية</p>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-xs ${stat.color}`}>{stat.trend}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* المحتوى الرئيسي */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* المهام الحالية */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            المهام الحالية
          </h2>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  task.status === 'مكتمل' ? 'bg-green-500' :
                  task.status === 'قيد التنفيذ' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'عالية' ? 'bg-red-100 text-red-800' :
                      task.priority === 'متوسطة' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500">{task.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* المتابعات السريعة */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            المتابعات السريعة
          </h2>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">متابعة المشاريع الاستراتيجية</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-700">تنسيق مع الإدارات</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">جدولة الاجتماعات</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <FileText className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-gray-700">إعداد التقارير</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ملخص الأداء */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">ملخص الأداء اليومي</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">94%</p>
            <p className="text-sm text-gray-600">كفاءة المهام</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-600">مهمة مكتملة</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">8.5</p>
            <p className="text-sm text-gray-600">ساعات عمل فعالة</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AssistantMinisterOfficePage;