import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Video, Phone } from 'lucide-react';

interface UpcomingEventsProps {
  className?: string;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ className = "" }) => {
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
            <Calendar className="w-5 h-5" />
            الفعاليات الإعلامية القادمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Video className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <div className="font-medium text-sm">مؤتمر التعليم الرقمي</div>
                <div className="text-xs text-gray-600">غداً 10:00 ص - قناة التعليم</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <div className="font-medium text-sm">لقاء إذاعي عن التعليم العالي</div>
                <div className="text-xs text-gray-600">بعد غد 9:00 ص - إذاعة التربية</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
