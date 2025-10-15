'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, FileText, CheckCircle, TrendingUp, Activity } from 'lucide-react';

const AssistantMinisterOfficePage: React.FC = () => {
  const stats = [
    { title: 'المشاريع الإشرافية', value: '34', icon: Activity, trend: '+8%', color: 'text-blue-600' },
    { title: 'التقارير المراجعة', value: '156', icon: FileText, trend: '+15%', color: 'text-green-600' },
    { title: 'الاجتماعات التنسيقية', value: '67', icon: Users, trend: '+12%', color: 'text-purple-600' },
    { title: 'القرارات المعتمدة', value: '89', icon: CheckCircle, trend: '+18%', color: 'text-orange-600' }
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
        className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Shield className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">مكتب مساعد الوزير</h1>
            <p className="text-green-100">الدعم الإداري والإشراف على المشاريع الاستراتيجية</p>
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
        {/* المشاريع الإشرافية */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            المشاريع الإشرافية الرئيسية
          </h3>
          <div className="space-y-3">
            {[
              { title: 'تطوير نظام إدارة المشاريع', progress: 85, status: 'قيد الإنجاز', budget: '2.5 مليون ريال' },
              { title: 'برنامج تحسين الخدمات الإلكترونية', progress: 70, status: 'قيد التنفيذ', budget: '1.8 مليون ريال' },
              { title: 'مبادرة تطوير الكوادر الإدارية', progress: 60, status: 'قيد التنفيذ', budget: '3.2 مليون ريال' },
              { title: 'مشروع التحول الرقمي الشامل', progress: 45, status: 'قيد التخطيط', budget: '5.0 مليون ريال' }
            ].map((project, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{project.title}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'قيد الإنجاز' ? 'bg-green-100 text-green-800' :
                    project.status === 'قيد التنفيذ' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>الميزانية: {project.budget}</span>
                  <span>{project.progress}% مكتمل</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      project.progress >= 80 ? 'bg-green-500' :
                      project.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* التقارير والقرارات */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            أحدث القرارات والتقارير
          </h3>
          <div className="space-y-3">
            {[
              { title: 'اعتماد خطة التطوير السنوية', date: '2024-01-15', type: 'قرار إداري', status: 'معتمد' },
              { title: 'تقرير أداء المشاريع للربع الأخير', date: '2024-01-12', type: 'تقرير دوري', status: 'معتمد' },
              { title: 'مراجعة عقود الخدمات التقنية', date: '2024-01-10', type: 'قرار مراجعة', status: 'قيد المراجعة' },
              { title: 'تقرير متابعة المبادرات الاستراتيجية', date: '2024-01-08', type: 'تقرير متابعة', status: 'معتمد' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.date} - {item.type}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'معتمد' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AssistantMinisterOfficePage;
