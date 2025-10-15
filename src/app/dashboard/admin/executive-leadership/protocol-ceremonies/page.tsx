'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, Calendar, Award, CheckCircle, Clock } from 'lucide-react';

const ProtocolCeremoniesPage: React.FC = () => {
  const stats = [
    { title: 'الفعاليات الرسمية', value: '156', icon: Crown, trend: '+18%', color: 'text-purple-600' },
    { title: 'الوفود المستقبلة', value: '89', icon: Users, trend: '+12%', color: 'text-blue-600' },
    { title: 'المؤتمرات المنظمة', value: '67', icon: Calendar, trend: '+15%', color: 'text-green-600' },
    { title: 'البروتوكولات المعتمدة', value: '234', icon: Award, trend: '+22%', color: 'text-orange-600' }
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
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Crown className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة البروتوكول والمراسم</h1>
            <p className="text-purple-100">تنظيم وإدارة المراسم الرسمية والبروتوكولات الحكومية</p>
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
            <Crown className="w-5 h-5 text-purple-600" />
            أبرز الفعاليات الرسمية
          </h3>
          <div className="space-y-3">
            {[
              { title: 'حفل تكريم المتفوقين في التعليم العالي', date: '2024-01-20', attendees: 500, type: 'حفل رسمي' },
              { title: 'افتتاح المؤتمر الدولي للتعليم العالي', date: '2024-01-18', attendees: 300, type: 'مؤتمر دولي' },
              { title: 'زيارة وفد رسمي من وزارة التعليم العليا', date: '2024-01-15', attendees: 25, type: 'زيارة رسمية' },
              { title: 'حفل توقيع اتفاقية تعاون مع الجامعات الخاصة', date: '2024-01-12', attendees: 150, type: 'توقيع اتفاقية' }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.date} - {event.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{event.attendees}</p>
                  <p className="text-xs text-gray-600">مشارك</p>
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
            <Award className="w-5 h-5 text-orange-600" />
            البروتوكولات والأوسمة
          </h3>
          <div className="space-y-3">
            {[
              { title: 'وسام التميز في التعليم العالي', category: 'أوسمة التميز', recipients: 45, status: 'معتمد' },
              { title: 'شهادة الاعتماد المؤسسي', category: 'شهادات الجودة', recipients: 23, status: 'معتمد' },
              { title: 'جائزة الابتكار في التعليم', category: 'جوائز الابتكار', recipients: 12, status: 'قيد المراجعة' },
              { title: 'وسام الخدمة المتميزة', category: 'أوسمة الخدمة', recipients: 67, status: 'معتمد' }
            ].map((protocol, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{protocol.title}</p>
                  <p className="text-sm text-gray-600">{protocol.category} - {protocol.recipients} مستلم</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  protocol.status === 'معتمد' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {protocol.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProtocolCeremoniesPage;
