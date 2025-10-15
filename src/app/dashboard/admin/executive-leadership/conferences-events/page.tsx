'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const ConferencesEventsPage: React.FC = () => {
  const stats = [
    { title: 'المؤتمرات المنظمة', value: '45', icon: Calendar, trend: '+12%', color: 'text-blue-600' },
    { title: 'المشاركون الإجمالي', value: '2,345', icon: Users, trend: '+18%', color: 'text-green-600' },
    { title: 'الفعاليات الدولية', value: '23', icon: MapPin, trend: '+15%', color: 'text-purple-600' },
    { title: 'معدل الرضا', value: '94%', icon: TrendingUp, trend: '+5%', color: 'text-orange-600' }
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
        className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Calendar className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة المؤتمرات والفعاليات</h1>
            <p className="text-blue-100">تنظيم وإدارة المؤتمرات والفعاليات التعليمية والأكاديمية</p>
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
            <Calendar className="w-5 h-5 text-blue-600" />
            المؤتمرات القادمة
          </h3>
          <div className="space-y-3">
            {[
              { title: 'المؤتمر الدولي للتعليم الرقمي', date: '2024-02-15', location: 'مركز المؤتمرات الدولي', type: 'دولي' },
              { title: 'منتدى التعليم العالي السعودي', date: '2024-02-20', location: 'جامعة الملك سعود', type: 'وطني' },
              { title: 'ورشة عمل تطوير المناهج', date: '2024-02-25', location: 'مركز التدريب', type: 'تخصصي' },
              { title: 'مؤتمر البحث العلمي والابتكار', date: '2024-03-01', location: 'مدينة الملك عبدالعزيز للعلوم', type: 'دولي' }
            ].map((conference, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{conference.title}</p>
                  <p className="text-sm text-gray-600">{conference.date} - {conference.location}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  conference.type === 'دولي' ? 'bg-green-100 text-green-800' :
                  conference.type === 'وطني' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {conference.type}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            إحصائيات المشاركة
          </h3>
          <div className="space-y-3">
            {[
              { category: 'المشاركون المسجلون', count: 2345, percentage: 100 },
              { category: 'الحضور الفعلي', count: 2101, percentage: 90 },
              { category: 'المشاركون الدوليون', count: 467, percentage: 20 },
              { category: 'المتحدثون الرئيسيون', count: 89, percentage: 4 }
            ].map((stat, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{stat.category}</p>
                  <p className="text-sm font-bold text-gray-900">{stat.count.toLocaleString()}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{stat.percentage}% من إجمالي المشاركين</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ConferencesEventsPage;
