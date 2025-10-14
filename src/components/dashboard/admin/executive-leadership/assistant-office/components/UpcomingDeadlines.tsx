import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle } from 'lucide-react';

interface Deadline {
  id: number;
  title: string;
  dueDate: string;
  priority: string;
}

interface UpcomingDeadlinesProps {
  deadlines?: Deadline[];
  className?: string;
}

export const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({
  deadlines = [
    { id: 1, title: 'تقرير الأداء الشهري', dueDate: 'غداً 10:00 ص', priority: 'عالي' },
    { id: 2, title: 'مراجعة الميزانية المقترحة', dueDate: 'بعد غد 2:00 م', priority: 'متوسط' },
    { id: 3, title: 'اجتماع لجنة التطوير', dueDate: 'نهاية الأسبوع', priority: 'متوسط' }
  ],
  className = ""
}) => {
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
            <Clock className="w-5 h-5" />
            المواعيد النهائية القادمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {deadlines.map((deadline) => (
              <motion.div
                key={deadline.id}
                className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: deadline.id * 0.1 }}
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{deadline.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Badge variant={deadline.priority === 'عالي' ? 'destructive' : 'secondary'} className="text-xs">
                      {deadline.priority}
                    </Badge>
                    <span>•</span>
                    <span>{deadline.dueDate}</span>
                  </div>
                </div>
                <Button size="sm">
                  مراجعة
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
