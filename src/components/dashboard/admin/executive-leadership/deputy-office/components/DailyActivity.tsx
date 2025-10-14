import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CheckCircle, UserCheck, Clock, TrendingUp } from 'lucide-react';

interface DailyActivityProps {
  className?: string;
}

export const DailyActivity: React.FC<DailyActivityProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            نشاط اليوم
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm">تم إنجاز 8 مهام من أصل 10</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span className="text-sm">3 اجتماعات تمت بنجاح</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span className="text-sm">مهمة واحدة متأخرة عن الموعد المحدد</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm">تحسن في الأداء بنسبة 12%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
