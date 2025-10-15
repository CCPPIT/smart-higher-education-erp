'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, FileText, CheckCircle, TrendingUp, Award, Shield, Calendar, Bell, Target } from 'lucide-react';

const GeneralAdministrativePage: React.FC = () => {
  const stats = [
    { title: 'عدد الموظفين', value: '2,847', icon: Users, trend: '+5%', color: 'text-blue-600' },
    { title: 'الإجراءات المنجزة', value: '1,234', icon: CheckCircle, trend: '+18%', color: 'text-green-600' },
    { title: 'طلبات التوظيف', value: '156', icon: FileText, trend: '+12%', color: 'text-purple-600' },
    { title: 'رضا الموظفين', value: '94%', icon: Award, trend: '+8%', color: 'text-orange-600' }
  ];

  const departments = [
    { name: 'إدارة الموارد البشرية', employees: 450, tasks: 89, efficiency: 96 },
    { name: 'إدارة الخدمات المساندة', employees: 320, tasks: 67, efficiency: 92 },
    { name: 'إدارة الشؤون المالية', employees: 280, tasks: 45, efficiency: 88 },
    { name: 'إدارة تقنية المعلومات', employees: 195, tasks: 78, efficiency: 94 }
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
        className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Building2 className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">الإدارة العامة للشؤون الإدارية</h1>
            <p className="text-green-100">إدارة الموارد البشرية والخدمات الإدارية والدعم الفني</p>
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
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" />
          إحصائيات الإدارات الفرعية
        </h3>
        <div className="space-y-4">
          {departments.map((dept, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900">{dept.name}</h4>
                <span className="text-sm text-gray-600">{dept.employees} موظف</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{dept.tasks}</p>
                  <p className="text-sm text-gray-600">المهام المنجزة</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{dept.efficiency}%</p>
                  <p className="text-sm text-gray-600">كفاءة الأداء</p>
                </div>
                <div className="text-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${dept.efficiency}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">مستوى الإنجاز</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GeneralAdministrativePage;
