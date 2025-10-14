import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

interface Activity {
  id: number;
  type: string;
  title: string;
  time: string;
  priority: string;
}

interface RecentActivitiesProps {
  activities?: Activity[];
  className?: string;
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({
  activities = [
    { id: 1, type: 'مراسلة واردة', title: 'طلب دعم فني لنظام التعليم الإلكتروني', time: 'منذ ساعتين', priority: 'عالي' },
    { id: 2, type: 'قرار صادر', title: 'اعتماد خطة التطوير الرقمي للعام 2025', time: 'منذ 4 ساعات', priority: 'متوسط' },
    { id: 3, type: 'اجتماع', title: 'اجتماع مع رؤساء الجامعات حول الابتكار', time: 'منذ يوم واحد', priority: 'عالي' },
    { id: 4, type: 'تقرير', title: 'تقرير شهري عن حالة التعليم العالي', time: 'منذ يومين', priority: 'متوسط' }
  ],
  className = ""
}) => {
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
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: activity.id * 0.1 }}
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.priority === 'عالي' ? 'bg-red-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{activity.type}</span>
                    <Badge variant={activity.priority === 'عالي' ? 'destructive' : 'secondary'} className="text-xs">
                      {activity.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
