import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';
import { trpc } from '@/trpc/client';

interface Activity {
  id: string;
  type: string;
  title: string;
  time: string;
  priority: string;
  createdAt: string;
}

interface RecentActivitiesProps {
  className?: string;
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({ className = "" }) => {
  // جلب الأنشطة الأخيرة من خلال استعلامات متعددة
  const { data: correspondence = [] } = trpc.ministerOffice.correspondence.getAll.useQuery({
    limit: 3,
    offset: 0
  });

  const { data: decisions = [] } = trpc.ministerOffice.decisions.getAll.useQuery({
    limit: 3,
    offset: 0
  });

  const { data: meetings = [] } = trpc.ministerOffice.meetings.getAll.useQuery({
    limit: 3,
    offset: 0
  });

  // تحويل البيانات إلى تنسيق موحد للأنشطة
  const activities: Activity[] = React.useMemo(() => {
    const allActivities: Activity[] = [];

    // إضافة المراسلات
    correspondence.slice(0, 3).forEach((item: any) => {
      allActivities.push({
        id: `corr-${item.id}`,
        type: 'مراسلة واردة',
        title: item.subject,
        time: new Date(item.createdAt).toLocaleString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
          day: 'numeric',
          month: 'short'
        }),
        priority: item.priority,
        createdAt: item.createdAt
      });
    });

    // إضافة القرارات
    decisions.slice(0, 3).forEach((item: any) => {
      allActivities.push({
        id: `decision-${item.id}`,
        type: 'قرار صادر',
        title: item.title,
        time: new Date(item.createdAt).toLocaleString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
          day: 'numeric',
          month: 'short'
        }),
        priority: item.priority,
        createdAt: item.createdAt
      });
    });

    // إضافة الاجتماعات
    meetings.slice(0, 3).forEach((item: any) => {
      allActivities.push({
        id: `meeting-${item.id}`,
        type: 'اجتماع',
        title: item.title,
        time: new Date(item.createdAt).toLocaleString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
          day: 'numeric',
          month: 'short'
        }),
        priority: 'متوسط',
        createdAt: item.createdAt
      });
    });

    // ترتيب حسب التاريخ
    return allActivities
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  }, [correspondence, decisions, meetings]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            الأنشطة الأخيرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.priority === 'عالي' || activity.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{activity.type}</span>
                      <Badge
                        variant={activity.priority === 'عالي' || activity.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {activity.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>لا توجد أنشطة حديثة</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentActivities;
