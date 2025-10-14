import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Star } from 'lucide-react';

interface Expert {
  name: string;
  specialization: string;
  experience: string;
  activeProjects: number;
  rating: number;
}

interface ExpertTeamProps {
  experts?: Expert[];
  className?: string;
}

export const ExpertTeam: React.FC<ExpertTeamProps> = ({
  experts = [
    {
      name: 'د. أحمد السالم',
      specialization: 'استراتيجيات التعليم',
      experience: '15 سنة',
      activeProjects: 3,
      rating: 4.9
    },
    {
      name: 'د. فاطمة المحمد',
      specialization: 'التطوير التقني',
      experience: '12 سنة',
      activeProjects: 2,
      rating: 4.8
    },
    {
      name: 'د. خالد العبدالله',
      specialization: 'إدارة الجودة',
      experience: '18 سنة',
      activeProjects: 4,
      rating: 4.9
    },
    {
      name: 'د. سارة الراشد',
      specialization: 'السياسات التعليمية',
      experience: '10 سنوات',
      activeProjects: 2,
      rating: 4.7
    }
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
            <Users className="w-5 h-5" />
            فريق المستشارين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.name}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {expert.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{expert.name}</h4>
                  <p className="text-xs text-gray-600 mb-1">{expert.specialization}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">{expert.experience}</span>
                    <span className="text-xs text-gray-600">•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{expert.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-amber-600">{expert.activeProjects}</div>
                  <div className="text-xs text-gray-600">مشروع</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
