'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, AlertTriangle, Eye, FileText, CheckCircle } from 'lucide-react';

const SpecialAffairsOfficePage: React.FC = () => {
  const stats = [
    { title: 'القضايا الخاصة', value: '34', icon: AlertTriangle, trend: '+8%', color: 'text-orange-600' },
    { title: 'التقارير السرية', value: '89', icon: Lock, trend: '+15%', color: 'text-red-600' },
    { title: 'المراجعات الأمنية', value: '156', icon: Shield, trend: '+12%', color: 'text-green-600' },
    { title: 'المتابعات الخاصة', value: '67', icon: Eye, trend: '+18%', color: 'text-blue-600' }
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
        className="bg-gradient-to-r from-gray-700 to-slate-700 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Shield className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">مكتب الشؤون الخاصة</h1>
            <p className="text-gray-200">إدارة القضايا الخاصة والأمور الحساسة والسرية</p>
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
        {/* القضايا الخاصة الحالية */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            القضايا الخاصة الحالية
          </h3>
          <div className="space-y-3">
            {[
              { title: 'مراجعة أمنية شاملة للأنظمة', priority: 'عالية', status: 'قيد التنفيذ', assignee: 'فريق الأمن السيبراني' },
              { title: 'تقييم مخاطر الشراكات الخارجية', priority: 'متوسطة', status: 'قيد المراجعة', assignee: 'لجنة المخاطر' },
              { title: 'تحقيق في قضية سرقة بيانات', priority: 'عالية جداً', status: 'قيد التحقيق', assignee: 'الفريق الخاص' },
              { title: 'مراجعة عقود الخدمات الحساسة', priority: 'متوسطة', status: 'معد للمراجعة', assignee: 'إدارة الشؤون القانونية' }
            ].map((case_, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{case_.title}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    case_.priority === 'عالية جداً' ? 'bg-red-100 text-red-800' :
                    case_.priority === 'عالية' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {case_.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-gray-600">مسؤول: {case_.assignee}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    case_.status === 'قيد التنفيذ' ? 'bg-blue-100 text-blue-800' :
                    case_.status === 'قيد التحقيق' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {case_.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* التقارير السرية والخاصة */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            التقارير السرية والخاصة
          </h3>
          <div className="space-y-3">
            {[
              { title: 'تقرير الأمن السيبراني الشهري', classification: 'سري جداً', date: '2024-01-15', status: 'معتمد' },
              { title: 'تقييم المخاطر الاستراتيجية', classification: 'سري', date: '2024-01-12', status: 'قيد المراجعة' },
              { title: 'مراجعة الامتثال للمعايير', classification: 'سري', date: '2024-01-10', status: 'معتمد' },
              { title: 'تقرير الشؤون الدولية الحساسة', classification: 'سري جداً', date: '2024-01-08', status: 'قيد الإعداد' }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{report.title}</p>
                  <p className="text-sm text-gray-600">{report.date}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium mb-1 block ${
                    report.classification === 'سري جداً' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {report.classification}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report.status === 'معتمد' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
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

export default SpecialAffairsOfficePage;
