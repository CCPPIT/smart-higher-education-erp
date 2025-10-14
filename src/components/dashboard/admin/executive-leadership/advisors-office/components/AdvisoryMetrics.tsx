import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, BookOpen, MessageSquare, Award } from 'lucide-react';

interface Metric {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend: string;
}

interface AdvisoryMetricsProps {
  className?: string;
}

export const AdvisoryMetrics: React.FC<AdvisoryMetricsProps> = ({ className = "" }) => {
  const advisoryMetrics: Metric[] = [
    { title: 'الاستشارات المقدمة', value: '76', icon: Lightbulb, color: 'text-yellow-600', trend: '+24%' },
    { title: 'الدراسات المكتملة', value: '18', icon: BookOpen, color: 'text-blue-600', trend: '+12' },
    { title: 'الاجتماعات الاستراتيجية', value: '32', icon: MessageSquare, color: 'text-purple-600', trend: '+8%' },
    { title: 'معدل الرضا', value: '96%', icon: Award, color: 'text-green-600', trend: '+4%' }
  ];

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {advisoryMetrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={metric.title}
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <p className={`text-sm font-medium ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trend}
                </p>
              </div>
              <Icon className={`w-8 h-8 ${metric.color}`} />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
