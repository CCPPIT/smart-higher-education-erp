'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Handshake, FileText, Calendar, CheckCircle } from 'lucide-react';

const ForeignAffairsPage: React.FC = () => {
  const stats = [
    { title: 'الشراكات الدولية', value: '67', icon: Handshake, trend: '+15%', color: 'text-blue-600' },
    { title: 'الوفود الدولية', value: '156', icon: Users, trend: '+12%', color: 'text-green-600' },
    { title: 'الاتفاقيات الموقعة', value: '89', icon: FileText, trend: '+18%', color: 'text-purple-600' },
    { title: 'الفعاليات الدولية', value: '234', icon: Calendar, trend: '+22%', color: 'text-orange-600' }
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
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Globe className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة الشؤون الخارجية</h1>
            <p className="text-blue-100">إدارة العلاقات الدولية والشراكات الخارجية</p>
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
            <Handshake className="w-5 h-5 text-blue-600" />
            أبرز الشراكات الدولية
          </h3>
          <div className="space-y-3">
            {[
              { country: 'الولايات المتحدة الأمريكية', type: 'شراكة تعليمية', projects: 12, status: 'نشطة' },
              { country: 'المملكة المتحدة', type: 'تعاون بحثي', projects: 8, status: 'نشطة' },
              { country: 'ألمانيا', type: 'تبادل تقني', projects: 6, status: 'قيد التطوير' },
              { country: 'اليابان', type: 'شراكة ابتكار', projects: 9, status: 'نشطة' },
              { country: 'كندا', type: 'تعاون أكاديمي', projects: 7, status: 'جديدة' }
            ].map((partnership, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{partnership.country}</p>
                  <p className="text-sm text-gray-600">{partnership.type} - {partnership.projects} مشروع</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  partnership.status === 'نشطة' ? 'bg-green-100 text-green-800' :
                  partnership.status === 'قيد التطوير' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {partnership.status}
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
            <Calendar className="w-5 h-5 text-green-600" />
            الزيارات والفعاليات الدولية
          </h3>
          <div className="space-y-3">
            {[
              { event: 'زيارة وفد من جامعة هارفارد', date: '2024-01-20', type: 'زيارة أكاديمية', outcome: 'اتفاق تعاون' },
              { event: 'مشاركة في مؤتمر التعليم العالمي', date: '2024-01-25', type: 'مؤتمر دولي', outcome: 'شراكات جديدة' },
              { event: 'لقاء مع منظمة اليونسكو', date: '2024-02-01', type: 'اجتماع رسمي', outcome: 'دعم فني' },
              { event: 'ورشة عمل مع جامعات أوروبية', date: '2024-02-10', type: 'ورشة عمل', outcome: 'تبادل خبرات' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{activity.event}</p>
                  <p className="text-sm text-gray-600">{activity.date} - {activity.type}</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {activity.outcome}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ForeignAffairsPage;
