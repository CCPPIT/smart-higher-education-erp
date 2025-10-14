import React from 'react';
import { motion } from 'framer-motion';
import { Lock, FileText, Eye, CheckCircle } from 'lucide-react';

interface Metric {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend: string;
}

interface SecurityMetricsProps {
  className?: string;
}

export const SecurityMetrics: React.FC<SecurityMetricsProps> = ({ className = "" }) => {
  const securityMetrics: Metric[] = [
    { title: 'الملفات المصنفة', value: '45', icon: Lock, color: 'text-red-600', trend: '+5' },
    { title: 'التقارير السرية', value: '23', icon: FileText, color: 'text-orange-600', trend: '+8' },
    { title: 'المراجعات الأمنية', value: '156', icon: Eye, color: 'text-blue-600', trend: '+12' },
    { title: 'الحالات المغلقة', value: '134', icon: CheckCircle, color: 'text-green-600', trend: '+18' }
  ];

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {securityMetrics.map((metric, index) => {
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
