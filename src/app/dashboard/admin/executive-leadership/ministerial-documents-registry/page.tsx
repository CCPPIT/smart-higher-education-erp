'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Database, Search, CheckCircle, Clock, Shield } from 'lucide-react';

const MinisterialDocumentsPage: React.FC = () => {
  const stats = [
    { title: 'الوثائق المسجلة', value: '15,678', icon: Database, trend: '+12%', color: 'text-blue-600' },
    { title: 'الوثائق المسترجعة', value: '2,345', icon: Search, trend: '+18%', color: 'text-green-600' },
    { title: 'الوثائق المصنفة', value: '94%', icon: CheckCircle, trend: '+8%', color: 'text-purple-600' },
    { title: 'وقت الاسترجاع', value: '1.2 ثانية', icon: Clock, trend: '-25%', color: 'text-orange-600' }
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
        className="bg-gradient-to-r from-slate-600 to-gray-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <FileText className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">سجل الوثائق الوزارية</h1>
            <p className="text-slate-100">تسجيل وحفظ وإدارة جميع الوثائق الوزارية الرسمية</p>
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
            <Database className="w-5 h-5 text-blue-600" />
            تصنيف الوثائق حسب النوع
          </h3>
          <div className="space-y-3">
            {[
              { type: 'القرارات الإدارية', count: 4567, percentage: 29, security: 'عالية' },
              { type: 'العقود والاتفاقيات', count: 3456, percentage: 22, security: 'عالية' },
              { type: 'المراسلات الرسمية', count: 2890, percentage: 18, security: 'متوسطة' },
              { type: 'التقارير الدورية', count: 2345, percentage: 15, security: 'متوسطة' },
              { type: 'الوثائق المالية', count: 1420, percentage: 9, security: 'عالية جداً' },
              { type: 'الوثائق الفنية', count: 1000, percentage: 7, security: 'متوسطة' }
            ].map((docType, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{docType.type}</p>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{docType.count.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">{docType.percentage}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${docType.percentage}%` }}
                    />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    docType.security === 'عالية جداً' ? 'bg-red-100 text-red-800' :
                    docType.security === 'عالية' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {docType.security}
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
            <Shield className="w-5 h-5 text-green-600" />
            مستويات الحماية والأمان
          </h3>
          <div className="space-y-3">
            {[
              { level: 'سري جداً', documents: 234, access: 'مقيد جداً', encryption: 'متقدم' },
              { level: 'سري', documents: 1890, access: 'مقيد', encryption: 'متقدم' },
              { level: 'خاص', documents: 3456, access: 'محدود', encryption: 'أساسي' },
              { level: 'عام', documents: 7890, access: 'متاح', encryption: 'أساسي' }
            ].map((security, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{security.level}</p>
                  <p className="text-sm text-gray-600">{security.documents.toLocaleString()} وثيقة - {security.access}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  security.encryption === 'متقدم' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {security.encryption}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MinisterialDocumentsPage;
