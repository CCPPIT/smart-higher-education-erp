'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, TrendingUp, CheckCircle, Clock, AlertTriangle, Lightbulb } from 'lucide-react';

const ComplaintsSuggestionsPage: React.FC = () => {
  const stats = [
    { title: 'الشكاوى المستلمة', value: '234', icon: AlertTriangle, trend: '+8%', color: 'text-red-600' },
    { title: 'المقترحات المقدمة', value: '156', icon: Lightbulb, trend: '+18%', color: 'text-yellow-600' },
    { title: 'الحالات المحلولة', value: '89%', icon: CheckCircle, trend: '+12%', color: 'text-green-600' },
    { title: 'متوسط وقت الرد', value: '2.3 أيام', icon: Clock, trend: '-15%', color: 'text-blue-600' }
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
        className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <MessageSquare className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة الشكاوى والمقترحات</h1>
            <p className="text-orange-100">استقبال ومعالجة الشكاوى والمقترحات من المستفيدين</p>
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
            <AlertTriangle className="w-5 h-5 text-red-600" />
            الشكاوى حسب التصنيف
          </h3>
          <div className="space-y-3">
            {[
              { category: 'الخدمات الأكاديمية', count: 89, priority: 'عالية', resolution: 85 },
              { category: 'الخدمات الإدارية', count: 67, priority: 'متوسطة', resolution: 92 },
              { category: 'الخدمات التقنية', count: 45, priority: 'متوسطة', resolution: 78 },
              { category: 'الخدمات المالية', count: 33, priority: 'عالية', resolution: 90 }
            ].map((complaint, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{complaint.category}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    complaint.priority === 'عالية' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {complaint.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{complaint.count} شكوى</span>
                  <span>{complaint.resolution}% محلولة</span>
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
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            المقترحات المقدمة
          </h3>
          <div className="space-y-3">
            {[
              { title: 'تطوير منصة التعليم الإلكتروني', proposer: 'د. أحمد محمد', status: 'قيد المراجعة', impact: 'عالي' },
              { title: 'تحسين خدمة الطلاب الدوليين', proposer: 'أ. سارة أحمد', status: 'معتمدة', impact: 'متوسط' },
              { title: 'إنشاء مركز للإرشاد الأكاديمي', proposer: 'د. محمد علي', status: 'قيد التنفيذ', impact: 'عالي' },
              { title: 'تطوير برامج التدريب العملي', proposer: 'أ. فاطمة خالد', status: 'معتمدة', impact: 'متوسط' }
            ].map((suggestion, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{suggestion.title}</p>
                  <p className="text-sm text-gray-600">مقدم من: {suggestion.proposer}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium mb-1 block ${
                    suggestion.status === 'معتمدة' ? 'bg-green-100 text-green-800' :
                    suggestion.status === 'قيد التنفيذ' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {suggestion.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    suggestion.impact === 'عالي' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {suggestion.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ComplaintsSuggestionsPage;
