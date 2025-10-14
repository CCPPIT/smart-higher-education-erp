import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, Users, Settings } from 'lucide-react';

interface Meeting {
  id: number;
  title: string;
  time: string;
  attendees: number;
  type: string;
}

interface UpcomingMeetingsProps {
  meetings?: Meeting[];
  className?: string;
}

export const UpcomingMeetings: React.FC<UpcomingMeetingsProps> = ({
  meetings = [
    { id: 1, title: 'مجلس الجامعات الخاصة', time: 'اليوم 2:00 م', attendees: 15, type: 'افتراضي' },
    { id: 2, title: 'لقاء مع وزير التعليم', time: 'غداً 10:00 ص', attendees: 8, type: 'حضوري' },
    { id: 3, title: 'مراجعة الميزانية السنوية', time: 'بعد غد 3:00 م', attendees: 12, type: 'مختلط' }
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
            <Calendar className="w-5 h-5" />
            الاجتماعات القادمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <motion.div
                key={meeting.id}
                className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: meeting.id * 0.1 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  meeting.type === 'افتراضي' ? 'bg-green-100' : meeting.type === 'حضوري' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  {meeting.type === 'افتراضي' ? <Video className="w-5 h-5 text-green-600" /> :
                   meeting.type === 'حضوري' ? <Users className="w-5 h-5 text-blue-600" /> :
                   <Settings className="w-5 h-5 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{meeting.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{meeting.time}</span>
                    <span>•</span>
                    <span>{meeting.attendees} مشارك</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {meeting.type}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
