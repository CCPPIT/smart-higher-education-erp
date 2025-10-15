'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GitMerge, CheckCircle, Users, TrendingUp, FileText, Target } from 'lucide-react';

const ProceduresUnificationPage: React.FC = () => {
  const stats = [
    { title: 'الإجراءات الموحدة', value: '156', icon: GitMerge, trend: '+18%', color: 'text-blue-600' },
    { title: 'الفرق المشاركة', value: '23', icon: Users, trend: '+8%', color: 'text-green-600' },
    { title: 'الإجراءات المكتملة', value: '89%', icon: CheckCircle, trend: '+12%', color: 'text-purple-600' },
    { title: 'الكفاءة المحسنة', value: '94%', icon: TrendingUp, trend: '+15%', color: 'text-orange-600' }
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
        className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <GitMerge className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة توحيد الإجراءات</h1>
            <p className="text-cyan-100">توحيد وتطوير الإجراءات والعمليات المؤسسية</p>
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
            <Target className="w-5 h-5 text-blue-600" />
            مشاريع توحيد الإجراءات
          </h3>
          <div className="space-y-3">
            {[
              { title: 'توحيد إجراءات القبول والتسجيل', departments: 12, progress: 85, impact: 'عالي' },
              { title: 'تطوير نظام المتابعة الموحد', departments: 8, progress: 70, impact: 'متوسط' },
              { title: 'توحيد إجراءات التقييم الأكاديمي', departments: 15, progress: 60, impact: 'عالي' },
              { title: 'تطوير نظام التوثيق المركزي', departments: 10, progress: 90, impact: 'عالي جداً' }
            ].map((project, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{project.title}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.impact === 'عالي جداً' ? 'bg-red-100 text-red-800' :
                    project.impact === 'عالي' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.impact}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{project.departments} إدارة مشاركة</span>
                  <span>{project.progress}% مكتمل</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      project.progress >= 80 ? 'bg-green-500' :
                      project.progress >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
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
            فرق العمل المشاركة
          </h3>
          <div className="space-y-3">
            {[
              { team: 'فريق توحيد الإجراءات الأكاديمية', members: 12, tasks: 45, completion: 89 },
              { team: 'فريق تطوير النظم الموحدة', members: 8, tasks: 32, completion: 94 },
              { team: 'فريق التوثيق والأرشفة', members: 10, tasks: 28, completion: 87 },
              { team: 'فريق ضمان الجودة', members: 15, tasks: 56, completion: 91 }
            ].map((team, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{team.team}</p>
                  <p className="text-sm text-gray-600">{team.members} عضو - {team.tasks} مهمة</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{team.completion}%</p>
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

export default ProceduresUnificationPage;
