import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  classification: string;
  status: string;
  assignedTo: string;
  lastUpdate: string;
}

interface SensitiveProjectsProps {
  projects?: Project[];
  className?: string;
}

export const SensitiveProjects: React.FC<SensitiveProjectsProps> = ({
  projects = [
    {
      id: 'SP-2025-001',
      title: 'مشروع تطوير الأمن السيبراني',
      classification: 'سري جداً',
      status: 'نشط',
      assignedTo: 'فريق الأمن الخاص',
      lastUpdate: 'منذ يومين'
    },
    {
      id: 'SP-2025-002',
      title: 'دراسة التهديدات الاستراتيجية',
      classification: 'سري',
      status: 'قيد المراجعة',
      assignedTo: 'لجنة التحليل',
      lastUpdate: 'منذ أسبوع'
    },
    {
      id: 'SP-2025-003',
      title: 'تقييم المخاطر المؤسسية',
      classification: 'سري',
      status: 'مكتمل',
      assignedTo: 'إدارة المخاطر',
      lastUpdate: 'منذ شهر'
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
            <Lock className="w-5 h-5" />
            المشاريع الحساسة النشطة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="p-4 bg-gradient-to-r from-gray-50 to-red-50 rounded-lg border border-red-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: parseInt(project.id.split('-')[2]) * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold">{project.id}</span>
                    <Badge
                      variant={
                        project.classification === 'سري جداً' ? 'destructive' :
                        project.classification === 'سري' ? 'secondary' : 'outline'
                      }
                      className="text-xs"
                    >
                      {project.classification}
                    </Badge>
                  </div>
                  <Badge
                    variant={
                      project.status === 'نشط' ? 'default' :
                      project.status === 'قيد المراجعة' ? 'secondary' :
                      project.status === 'مكتمل' ? 'outline' : 'outline'
                    }
                    className="text-xs"
                  >
                    {project.status}
                  </Badge>
                </div>

                <h4 className="font-medium text-sm mb-2">{project.title}</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>مسؤول: {project.assignedTo}</div>
                  <div>آخر تحديث: {project.lastUpdate}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
