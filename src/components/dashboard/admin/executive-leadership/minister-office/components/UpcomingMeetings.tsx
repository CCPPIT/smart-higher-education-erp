import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, Users, Settings } from 'lucide-react';
import { trpc } from '@/trpc/client';

interface Meeting {
  id: string;
  title: string;
  scheduledDate: string;
  meetingType: string;
  attendees?: number;
  status: string;
}

interface UpcomingMeetingsProps {
  className?: string;
}

export const UpcomingMeetings: React.FC<UpcomingMeetingsProps> = ({ className = "" }) => {
  // جلب الاجتماعات القادمة من tRPC
  const { data: meetings = [], isLoading } = trpc.ministerOffice.meetings.getAll.useQuery({
    limit: 5,
    offset: 0,
    status: 'scheduled' // فقط الاجتماعات المقررة
  });

  // تحويل البيانات وترتيبها حسب التاريخ
  const upcomingMeetings: Meeting[] = React.useMemo(() => {
    const now = new Date();
    return meetings
      .filter((meeting: any) => new Date(meeting.scheduledDate) >= now)
      .sort((a: any, b: any) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
      .slice(0, 3)
      .map((meeting: any) => ({
        id: meeting.id,
        title: meeting.title,
        scheduledDate: meeting.scheduledDate,
        meetingType: meeting.meetingType,
        attendees: meeting.attendees?.length || 0,
        status: meeting.status
      }));
  }, [meetings]);

  // تنسيق التاريخ للعرض
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `اليوم ${date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `غداً ${date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 2) {
      return `بعد غد ${date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('ar-SA', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  if (isLoading) {
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
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-16 h-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

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
            {upcomingMeetings.length > 0 ? (
              upcomingMeetings.map((meeting) => (
                <motion.div
                  key={meeting.id}
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    meeting.meetingType === 'virtual' ? 'bg-green-100' :
                    meeting.meetingType === 'regular' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {meeting.meetingType === 'virtual' ? <Video className="w-5 h-5 text-green-600" /> :
                     meeting.meetingType === 'regular' ? <Users className="w-5 h-5 text-blue-600" /> :
                     <Settings className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{meeting.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>{formatDate(meeting.scheduledDate)}</span>
                      <span>•</span>
                      <span>{meeting.attendees || 0} مشارك</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {meeting.meetingType === 'virtual' ? 'افتراضي' :
                     meeting.meetingType === 'regular' ? 'حضوري' : 'مختلط'}
                  </Badge>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>لا توجد اجتماعات قادمة</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UpcomingMeetings;
