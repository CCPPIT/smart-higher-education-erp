import React from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckSquare, Calendar, TrendingUp } from 'lucide-react';

interface Stat {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend: string;
}

interface MinisterStatsProps {
  className?: string;
}

export const MinisterStats: React.FC<MinisterStatsProps> = ({ className = "" }) => {
  const stats: Stat[] = [
    { title: 'المراسلات الواردة', value: '156', icon: Mail, color: 'text-blue-600', trend: '+12%' },
    { title: 'القرارات الصادرة', value: '23', icon: CheckSquare, color: 'text-green-600', trend: '+8%' },
    { title: 'الاجتماعات المقررة', value: '12', icon: Calendar, color: 'text-purple-600', trend: '+5%' },
    { title: 'التقارير المقدمة', value: '18', icon: TrendingUp, color: 'text-orange-600', trend: '+15%' }
  ];

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend}
                </p>
              </div>
              <Icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
