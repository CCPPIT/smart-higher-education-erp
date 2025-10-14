import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface Member {
  name: string;
  role: string;
  tasks: number;
}

interface TeamMembersProps {
  members?: Member[];
  className?: string;
}

export const TeamMembers: React.FC<TeamMembersProps> = ({
  members = [
    { name: 'أحمد محمد السعد', role: 'أمين عام مساعد', tasks: 45 },
    { name: 'فاطمة علي الراشد', role: 'مدير التنسيق', tasks: 38 },
    { name: 'خالد عبدالله المحمد', role: 'مدير الأرشفة', tasks: 32 },
    { name: 'سارة أحمد السالم', role: 'مدير خدمة العملاء', tasks: 28 }
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
            أعضاء الفريق الرئيسيين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{member.name}</h4>
                  <p className="text-xs text-gray-600">{member.role}</p>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-blue-600">{member.tasks}</div>
                  <div className="text-xs text-gray-600">مهام</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
