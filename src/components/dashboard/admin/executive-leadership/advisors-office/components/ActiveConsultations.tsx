import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';

interface Consultation {
  id: number;
  title: string;
  client: string;
  status: string;
  priority: string;
  progress: number;
  dueDate: string;
}

interface ActiveConsultationsProps {
  consultations?: Consultation[];
  className?: string;
}

export const ActiveConsultations: React.FC<ActiveConsultationsProps> = ({
  consultations = [
    {
      id: 1,
      title: 'تطوير استراتيجية التعليم الرقمي',
      client: 'مكتب نائب الوزير',
      status: 'قيد التنفيذ',
      priority: 'عالي',
      progress: 75,
      dueDate: 'نهاية الشهر'
    },
    {
      id: 2,
      title: 'دراسة جدوى نظام إدارة الجودة',
      client: 'إدارة الجودة',
      status: 'مراجعة نهائية',
      priority: 'متوسط',
      progress: 90,
      dueDate: 'الأسبوع القادم'
    },
    {
      id: 3,
      title: 'تقييم أداء البرامج الأكاديمية',
      client: 'الشؤون الأكاديمية',
      status: 'جمع البيانات',
      priority: 'متوسط',
      progress: 45,
      dueDate: 'نهاية الشهر القادم'
    }
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
            <Target className="w-5 h-5" />
            الاستشارات النشطة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <motion.div
                key={consultation.id}
                className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: consultation.id * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{consultation.title}</h4>
                    <Badge variant={consultation.priority === 'عالي' ? 'destructive' : 'secondary'} className="text-xs">
                      {consultation.priority}
                    </Badge>
                  </div>
                  <Badge
                    variant={
                      consultation.status === 'قيد التنفيذ' ? 'default' :
                      consultation.status === 'مراجعة نهائية' ? 'secondary' : 'outline'
                    }
                    className="text-xs"
                  >
                    {consultation.status}
                  </Badge>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>التقدم</span>
                    <span>{consultation.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        consultation.progress >= 80 ? 'bg-green-500' :
                        consultation.progress >= 60 ? 'bg-blue-500' :
                        consultation.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${consultation.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>العميل: {consultation.client}</span>
                  <span>الموعد: {consultation.dueDate}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
