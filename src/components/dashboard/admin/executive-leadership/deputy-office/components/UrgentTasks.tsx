import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  priority: string;
  dueDate: string;
}

interface UrgentTasksProps {
  tasks?: Task[];
  className?: string;
}

export const UrgentTasks: React.FC<UrgentTasksProps> = ({
  tasks = [
    { id: 1, title: 'مراجعة ميزانية التعليم الإلكتروني', priority: 'عالي', dueDate: 'اليوم' },
    { id: 2, title: 'اجتماع لجنة الابتكار', priority: 'متوسط', dueDate: 'غداً' },
    { id: 3, title: 'تقييم أداء الجامعات', priority: 'عالي', dueDate: 'بعد غد' }
  ],
  className = ""
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            المهام العاجلة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: task.id * 0.1 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  task.priority === 'عالي' ? 'bg-red-100' : 'bg-yellow-100'
                }`}>
                  {task.priority === 'عالي' ?
                    <AlertTriangle className="w-5 h-5 text-red-600" /> :
                    <Clock className="w-5 h-5 text-yellow-600" />
                  }
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{task.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Badge variant={task.priority === 'عالي' ? 'destructive' : 'secondary'} className="text-xs">
                      {task.priority}
                    </Badge>
                    <span>•</span>
                    <span>{task.dueDate}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
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
