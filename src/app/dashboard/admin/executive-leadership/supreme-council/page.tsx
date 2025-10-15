'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, Calendar, FileText, CheckCircle, Award } from 'lucide-react';

const SupremeCouncilPage: React.FC = () => {
  const stats = [
    { title: 'أعضاء المجلس', value: '15', icon: Users, trend: '+2', color: 'text-blue-600' },
    { title: 'الاجتماعات السنوية', value: '12', icon: Calendar, trend: '+1', color: 'text-green-600' },
    { title: 'القرارات الصادرة', value: '156', icon: FileText, trend: '+18%', color: 'text-purple-600' },
    { title: 'معدل التنفيذ', value: '94%', icon: CheckCircle, trend: '+8%', color: 'text-orange-600' }
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
        className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Crown className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة مجلس القيادة العليا</h1>
            <p className="text-amber-100">تنسيق وإدارة اجتماعات وأعمال مجلس القيادة العليا</p>
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
            <Users className="w-5 h-5 text-blue-600" />
            أعضاء مجلس القيادة العليا
          </h3>
          <div className="space-y-3">
            {[
              { name: 'معالي وزير التعليم العالي', position: 'رئيس المجلس', attendance: 100, decisions: 45 },
              { name: 'معالي نائب الوزير', position: 'نائب الرئيس', attendance: 98, decisions: 38 },
              { name: 'معالي مساعد الوزير', position: 'عضو', attendance: 95, decisions: 32 },
              { name: 'معالي وكيل الوزارة', position: 'عضو', attendance: 97, decisions: 41 },
              { name: 'رئيس مجلس إدارة الجامعات', position: 'عضو', attendance: 93, decisions: 29 }
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{member.attendance}%</p>
                  <p className="text-xs text-gray-600">{member.decisions} قرار</p>
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
            <Calendar className="w-5 h-5 text-green-600" />
            جدول اجتماعات المجلس
          </h3>
          <div className="space-y-3">
            {[
              { title: 'اجتماع المجلس الرابع لعام 2024', date: '2024-01-25', agenda: 'مراجعة الخطط الاستراتيجية', decisions: 12 },
              { title: 'اجتماع المجلس الثالث لعام 2024', date: '2023-12-20', agenda: 'تقييم الأداء السنوي', decisions: 15 },
              { title: 'اجتماع المجلس الثاني لعام 2024', date: '2023-11-15', agenda: 'اعتماد الميزانية الجديدة', decisions: 18 },
              { title: 'اجتماع المجلس الأول لعام 2024', date: '2023-10-10', agenda: 'خطة التطوير السنوية', decisions: 14 }
            ].map((meeting, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{meeting.title}</p>
                  <p className="text-sm text-gray-600">{meeting.date} - {meeting.agenda}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{meeting.decisions}</p>
                  <p className="text-xs text-gray-600">قرار</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SupremeCouncilPage;
