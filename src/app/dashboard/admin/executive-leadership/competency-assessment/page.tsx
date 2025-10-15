'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, CheckCircle, Target, BarChart3 } from 'lucide-react';

const CompetencyAssessmentPage: React.FC = () => {
  const stats = [
    { title: 'الكفاءات المقيمة', value: '234', icon: Award, trend: '+18%', color: 'text-yellow-600' },
    { title: 'الموظفون المشاركون', value: '156', icon: Users, trend: '+12%', color: 'text-blue-600' },
    { title: 'مستوى الكفاءة العام', value: '87%', icon: TrendingUp, trend: '+8%', color: 'text-green-600' },
    { title: 'التقييمات المكتملة', value: '94%', icon: CheckCircle, trend: '+5%', color: 'text-purple-600' }
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
        className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Award className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة تقييم الكفاءات</h1>
            <p className="text-yellow-100">تقييم وتطوير كفاءات الموظفين والقيادات</p>
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
            <BarChart3 className="w-5 h-5 text-blue-600" />
            مستويات الكفاءة حسب التصنيف
          </h3>
          <div className="space-y-3">
            {[
              { category: 'الكفاءات القيادية', average: 89, employees: 45, target: 90 },
              { category: 'الكفاءات الفنية', average: 87, employees: 67, target: 85 },
              { category: 'الكفاءات الإدارية', average: 91, employees: 34, target: 88 },
              { category: 'الكفاءات الرقمية', average: 84, employees: 56, target: 87 }
            ].map((competency, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{competency.category}</p>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{competency.average}%</p>
                    <p className="text-xs text-gray-600">الهدف: {competency.target}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{competency.employees} موظف مقيم</span>
                  <span className={competency.average >= competency.target ? 'text-green-600' : 'text-red-600'}>
                    {competency.average >= competency.target ? 'مكتمل' : 'قيد التطوير'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      competency.average >= competency.target ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${Math.min((competency.average / competency.target) * 100, 100)}%` }}
                  />
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
            <Users className="w-5 h-5 text-green-600" />
            برامج تطوير الكفاءات
          </h3>
          <div className="space-y-3">
            {[
              { program: 'برنامج القيادة الاستراتيجية', participants: 34, completion: 89, nextCycle: '2024-02-15' },
              { program: 'دورة التحول الرقمي', participants: 45, completion: 92, nextCycle: '2024-03-01' },
              { program: 'ورشة إدارة التغيير', participants: 28, completion: 87, nextCycle: '2024-02-20' },
              { program: 'برنامج التميز المؤسسي', participants: 23, completion: 94, nextCycle: '2024-03-15' }
            ].map((program, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{program.program}</p>
                  <p className="text-sm text-gray-600">{program.participants} مشارك - دورة قادمة: {program.nextCycle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{program.completion}%</p>
                  <p className="text-xs text-gray-600">إكمال</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CompetencyAssessmentPage;
