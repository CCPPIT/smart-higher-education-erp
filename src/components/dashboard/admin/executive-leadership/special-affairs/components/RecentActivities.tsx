import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle, Eye, AlertTriangle } from 'lucide-react';

interface RecentActivitiesProps {
  className?: string;
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({ className = "" }) => {
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
            <Calendar className="w-5 h-5" />
            النشاطات الأخيرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div className="flex-1">
                <div className="text-sm font-medium">تمت الموافقة على طلب وصول</div>
                <div className="text-xs text-gray-600">منذ ساعتين</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
              <Eye className="w-4 h-4 text-blue-600" />
              <div className="flex-1">
                <div className="text-sm font-medium">تمت مراجعة ملف سري</div>
                <div className="text-xs text-gray-600">منذ 4 ساعات</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <div className="flex-1">
                <div className="text-sm font-medium">محاولة وصول غير مصرح به</div>
                <div className="text-xs text-gray-600">أمس 3:00 م</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
