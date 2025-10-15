'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, TrendingDown, CheckCircle, XCircle, Clock } from 'lucide-react';

const RiskPage: React.FC = () => {
  const stats = [
    { title: 'المخاطر المحددة', value: '89', icon: AlertTriangle, trend: '+12%', color: 'text-orange-600' },
    { title: 'المخاطر عالية التأثير', value: '23', icon: XCircle, trend: '-5%', color: 'text-red-600' },
    { title: 'خطط المعالجة', value: '156', icon: CheckCircle, trend: '+18%', color: 'text-green-600' },
    { title: 'المخاطر المراقبة', value: '67', icon: Clock, trend: '+8%', color: 'text-blue-600' }
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
        className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Shield className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة إدارة المخاطر</h1>
            <p className="text-red-100">تحديد وتقييم ومعالجة المخاطر المؤسسية</p>
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
        {/* المخاطر حسب التصنيف */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            تصنيف المخاطر حسب الشدة
          </h3>
          <div className="space-y-4">
            {[
              { category: 'مخاطر استراتيجية', count: 12, percentage: 13, color: 'bg-red-500', level: 'عالية' },
              { category: 'مخاطر تشغيلية', count: 34, percentage: 38, color: 'bg-orange-500', level: 'متوسطة' },
              { category: 'مخاطر مالية', count: 23, percentage: 26, color: 'bg-yellow-500', level: 'متوسطة' },
              { category: 'مخاطر تقنية', count: 20, percentage: 23, color: 'bg-blue-500', level: 'منخفضة' }
            ].map((risk, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{risk.category}</p>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{risk.count} مخاطرة</p>
                    <p className="text-xs text-gray-600">{risk.percentage}% من إجمالي</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${risk.color}`}
                      style={{ width: `${risk.percentage}%` }}
                    />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    risk.level === 'عالية' ? 'bg-red-100 text-red-800' :
                    risk.level === 'متوسطة' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {risk.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* حالة معالجة المخاطر */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            حالة معالجة المخاطر
          </h3>
          <div className="space-y-3">
            {[
              { title: 'مخاطر مكتملة المعالجة', count: 45, percentage: 51, status: 'مكتملة' },
              { title: 'مخاطر قيد المعالجة', count: 28, percentage: 31, status: 'قيد المعالجة' },
              { title: 'مخاطر متأخرة المعالجة', count: 16, percentage: 18, status: 'متأخرة' }
            ].map((status, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{status.title}</p>
                  <p className="text-sm font-bold text-gray-900">{status.count}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      status.status === 'مكتملة' ? 'bg-green-500' :
                      status.status === 'قيد المعالجة' ? 'bg-blue-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${status.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">{status.percentage}% من إجمالي المخاطر</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RiskPage;
