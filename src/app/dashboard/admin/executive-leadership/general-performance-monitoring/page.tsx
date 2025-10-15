'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, CheckCircle, Activity, Award } from 'lucide-react';

const GeneralPerformancePage: React.FC = () => {
  const stats = [
    { title: 'مؤشرات الأداء', value: '234', icon: Activity, trend: '+18%', color: 'text-blue-600' },
    { title: 'الجهات المقيمة', value: '89', icon: Users, trend: '+12%', color: 'text-green-600' },
    { title: 'الأهداف المحققة', value: '94%', icon: Target, trend: '+8%', color: 'text-purple-600' },
    { title: 'التقارير الشهرية', value: '156', icon: Award, trend: '+15%', color: 'text-orange-600' }
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
        className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <TrendingUp className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold mb-2">إدارة متابعة الأداء العام</h1>
            <p className="text-emerald-100">متابعة وتقييم الأداء العام للوزارة والجهات التابعة</p>
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
            <TrendingUp className="w-5 h-5 text-green-600" />
            مؤشرات الأداء الرئيسية للوزارة
          </h3>
          <div className="space-y-3">
            {[
              { indicator: 'رضا المستفيدين عن الخدمات', current: 94, target: 90, previous: 89, unit: '%' },
              { indicator: 'كفاءة الإجراءات الإدارية', current: 87, target: 85, previous: 82, unit: '%' },
              { indicator: 'معدل إنجاز المعاملات', current: 92, target: 95, previous: 88, unit: '%' },
              { indicator: 'جودة الخدمات التعليمية', current: 89, target: 90, previous: 86, unit: '%' }
            ].map((kpi, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{kpi.indicator}</p>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{kpi.current}{kpi.unit}</p>
                    <p className="text-xs text-gray-600">الهدف: {kpi.target}{kpi.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        kpi.current >= kpi.target ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    kpi.current > kpi.previous ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {kpi.current > kpi.previous ? '+' : ''}{(kpi.current - kpi.previous).toFixed(1)}
                  </span>
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
            <Users className="w-5 h-5 text-blue-600" />
            تقييم أداء الجهات التابعة
          </h3>
          <div className="space-y-3">
            {[
              { entity: 'الجامعات الحكومية', score: 94, evaluation: 'ممتاز', recommendations: 12 },
              { entity: 'الجامعات الخاصة', score: 89, evaluation: 'جيد جداً', recommendations: 18 },
              { entity: 'الكليات التقنية', score: 87, evaluation: 'جيد', recommendations: 15 },
              { entity: 'مراكز البحث العلمي', score: 91, evaluation: 'ممتاز', recommendations: 8 },
              { entity: 'إدارات الوزارة', score: 92, evaluation: 'ممتاز', recommendations: 10 }
            ].map((entity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{entity.entity}</p>
                  <p className="text-sm text-gray-600">التقييم: {entity.evaluation}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{entity.score}%</p>
                  <p className="text-xs text-gray-600">{entity.recommendations} توصية</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GeneralPerformancePage;
