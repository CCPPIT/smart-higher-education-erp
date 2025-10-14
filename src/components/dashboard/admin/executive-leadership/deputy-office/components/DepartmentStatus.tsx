import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';

interface Department {
  name: string;
  status: string;
  progress: number;
  tasks: number;
}

interface DepartmentStatusProps {
  departments?: Department[];
  className?: string;
}

export const DepartmentStatus: React.FC<DepartmentStatusProps> = ({
  departments = [
    { name: 'الشؤون الأكاديمية', status: 'ممتاز', progress: 95, tasks: 23 },
    { name: 'الشؤون الإدارية', status: 'جيد', progress: 87, tasks: 18 },
    { name: 'التطوير التقني', status: 'ممتاز', progress: 91, tasks: 15 },
    { name: 'الجودة والتقييم', status: 'جيد', progress: 83, tasks: 12 }
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
            <BarChart3 className="w-5 h-5" />
            حالة الإدارات الفرعية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{dept.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        dept.status === 'ممتاز' ? 'default' :
                        dept.status === 'جيد' ? 'secondary' : 'outline'
                      }
                      className="text-xs"
                    >
                      {dept.status}
                    </Badge>
                    <span className="text-xs text-gray-600">{dept.tasks} مهمة</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      dept.progress >= 90 ? 'bg-green-500' :
                      dept.progress >= 80 ? 'bg-blue-500' :
                      dept.progress >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${dept.progress}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
