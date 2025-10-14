import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';

interface Project {
  name: string;
  status: string;
  progress: number;
  budget: string;
  timeline: string;
}

interface MajorProjectsProps {
  projects?: Project[];
  className?: string;
}

export const MajorProjects: React.FC<MajorProjectsProps> = ({
  projects = [
    {
      name: 'تطوير التعليم الرقمي الوطني',
      status: 'قيد التنفيذ',
      progress: 75,
      budget: '500 مليون',
      timeline: '2024-2026'
    },
    {
      name: 'مشروع الجامعات الذكية',
      status: 'مكتمل',
      progress: 100,
      budget: '800 مليون',
      timeline: '2023-2025'
    },
    {
      name: 'برنامج تطوير الكوادر التعليمية',
      status: 'قيد التخطيط',
      progress: 25,
      budget: '1.2 مليار',
      timeline: '2025-2027'
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
            المشاريع الوطنية الكبرى
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-sm">{project.name}</h4>
                  <Badge
                    variant={
                      project.status === 'قيد التنفيذ' ? 'default' :
                      project.status === 'مكتمل' ? 'secondary' : 'outline'
                    }
                    className="text-xs"
                  >
                    {project.status}
                  </Badge>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>التقدم</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        project.progress >= 80 ? 'bg-green-500' :
                        project.progress >= 60 ? 'bg-blue-500' :
                        project.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-600">
                  <span>الميزانية: {project.budget}</span>
                  <span>المدة: {project.timeline}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
