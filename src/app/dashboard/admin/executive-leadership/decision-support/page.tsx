'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Users, Target, CheckCircle, Lightbulb } from 'lucide-react';

const DecisionSupportPage: React.FC = () => {
  const stats = [
    { title: 'أنظمة الدعم', value: '23', icon: Brain, trend: '+8%', color: 'text-purple-600' },
    { title: 'القرارات المدعومة', value: '156', icon: Target, trend: '+18%', color: 'text-blue-600' },
    { title: 'المستخدمون النشطون', value: '89', icon: Users, trend: '+12%', color: 'text-green-600' },
    { title: 'دقة التنبؤات', value: '94%', icon: TrendingUp, trend: '+5%', color: 'text-orange-600' }
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
        className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Brain className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة دعم اتخاذ القرار</h1>
            <p className="text-purple-100">تقديم الدعم الذكي لاتخاذ القرارات الاستراتيجية والتشغيلية</p>
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
            <Brain className="w-5 h-5 text-purple-600" />
            أنظمة دعم اتخاذ القرار
          </h3>
          <div className="space-y-3">
            {[
              { name: 'نظام التحليل التنبؤي', type: 'ذكاء اصطناعي', accuracy: 94, users: 45 },
              { name: 'نظام تحليل البيانات الضخمة', type: 'تحليل بيانات', accuracy: 89, users: 67 },
              { name: 'نظام تقييم المخاطر', type: 'إدارة مخاطر', accuracy: 91, users: 34 },
              { name: 'نظام تخطيط السيناريوهات', type: 'تخطيط استراتيجي', accuracy: 87, users: 56 }
            ].map((system, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{system.name}</p>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {system.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>دقة: {system.accuracy}%</span>
                  <span>مستخدمون: {system.users}</span>
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
            <Target className="w-5 h-5 text-blue-600" />
            القرارات المدعومة مؤخراً
          </h3>
          <div className="space-y-3">
            {[
              { decision: 'توسعة برنامج الابتعاث الخارجي', support: 'تحليل تنبؤي', outcome: 'معتمد', impact: 'عالي' },
              { decision: 'تطوير منصة التعليم الرقمي', support: 'تحليل بيانات', outcome: 'قيد التنفيذ', impact: 'متوسط' },
              { decision: 'إعادة هيكلة الكليات التقنية', support: 'تقييم مخاطر', outcome: 'معتمد', impact: 'عالي جداً' },
              { decision: 'إطلاق برنامج الابتكار المؤسسي', support: 'تخطيط سيناريوهات', outcome: 'قيد المراجعة', impact: 'متوسط' }
            ].map((decision, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{decision.decision}</p>
                  <p className="text-sm text-gray-600">دعم: {decision.support}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium mb-1 block ${
                    decision.outcome === 'معتمد' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {decision.outcome}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    decision.impact === 'عالي جداً' ? 'bg-red-100 text-red-800' :
                    decision.impact === 'عالي' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {decision.impact}
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

export default DecisionSupportPage;
