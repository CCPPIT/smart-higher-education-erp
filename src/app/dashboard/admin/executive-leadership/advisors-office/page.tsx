'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Lightbulb, MessageSquare, CheckCircle, BookOpen } from 'lucide-react';

const AdvisorsOfficePage: React.FC = () => {
  const stats = [
    { title: 'المستشارون النشطون', value: '18', icon: Users, trend: '+3', color: 'text-blue-600' },
    { title: 'الاستشارات المقدمة', value: '234', icon: Lightbulb, trend: '+25%', color: 'text-green-600' },
    { title: 'الاجتماعات الاستشارية', value: '156', icon: MessageSquare, trend: '+18%', color: 'text-purple-600' },
    { title: 'التقارير التحليلية', value: '89', icon: BookOpen, trend: '+12%', color: 'text-orange-600' }
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
        className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Star className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">مكتب المستشارين</h1>
            <p className="text-amber-100">تقديم الاستشارات الاستراتيجية والخبرة المتخصصة</p>
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
        {/* المستشارون الرئيسيون */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            المستشارون الرئيسيون ومجالات الخبرة
          </h3>
          <div className="space-y-3">
            {[
              { name: 'د. أحمد العتيبي', specialty: 'السياسات التعليمية', consultations: 45, status: 'نشط' },
              { name: 'د. سارة المحمد', specialty: 'التطوير الإداري', consultations: 38, status: 'نشط' },
              { name: 'د. محمد الراشد', specialty: 'التحول الرقمي', consultations: 52, status: 'نشط' },
              { name: 'د. فاطمة الزايد', specialty: 'الجودة والتميز', consultations: 41, status: 'نشط' },
              { name: 'د. خالد السعيد', specialty: 'البحث العلمي', consultations: 29, status: 'متفرغ' }
            ].map((advisor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{advisor.name}</p>
                  <p className="text-sm text-gray-600">{advisor.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{advisor.consultations} استشارة</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    advisor.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {advisor.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* الاستشارات الأخيرة */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-green-600" />
            أحدث الاستشارات والتوصيات
          </h3>
          <div className="space-y-3">
            {[
              { title: 'تطوير استراتيجية البحث العلمي', advisor: 'د. محمد الراشد', date: '2024-01-15', status: 'مكتملة' },
              { title: 'تحسين نظم الجودة المؤسسية', advisor: 'د. فاطمة الزايد', date: '2024-01-12', status: 'قيد التنفيذ' },
              { title: 'تطوير السياسات التعليمية', advisor: 'د. أحمد العتيبي', date: '2024-01-10', status: 'قيد المراجعة' },
              { title: 'استراتيجية التحول الرقمي', advisor: 'د. محمد الراشد', date: '2024-01-08', status: 'معتمدة' }
            ].map((consultation, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{consultation.title}</p>
                  <p className="text-sm text-gray-600">{consultation.advisor} - {consultation.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  consultation.status === 'مكتملة' ? 'bg-green-100 text-green-800' :
                  consultation.status === 'معتمدة' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {consultation.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdvisorsOfficePage;
