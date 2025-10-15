import React from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckSquare, Calendar, TrendingUp } from 'lucide-react';
import { trpc } from '@/trpc/client';

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
  // جلب إحصائيات لوحة التحكم من tRPC
  const { data: stats, isLoading } = trpc.ministerOffice.dashboard.getStats.useQuery();

  // تحويل البيانات من tRPC إلى تنسيق المكون
  const formattedStats: Stat[] = React.useMemo(() => {
    if (!stats) return [];

    return [
      {
        title: 'المراسلات الواردة',
        value: stats.totalCorrespondence.toString(),
        icon: Mail,
        color: 'text-blue-600',
        trend: '+12%'
      },
      {
        title: 'القرارات الصادرة',
        value: stats.totalDecisions.toString(),
        icon: CheckSquare,
        color: 'text-green-600',
        trend: '+8%'
      },
      {
        title: 'الاجتماعات المقررة',
        value: stats.totalMeetings.toString(),
        icon: Calendar,
        color: 'text-purple-600',
        trend: '+5%'
      },
      {
        title: 'التقارير المقدمة',
        value: stats.totalReports.toString(),
        icon: TrendingUp,
        color: 'text-orange-600',
        trend: '+15%'
      }
    ];
  }, [stats]);

  if (isLoading) {
    return (
      <motion.div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {formattedStats.map((stat, index) => {
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

export default MinisterStats;
