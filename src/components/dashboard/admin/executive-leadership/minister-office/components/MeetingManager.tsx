'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Clock,
  MapPin,
  Users,
  Video,
  FileText,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  Square,
  MessageSquare,
  Paperclip,
  Send
} from 'lucide-react';
import { useMinisterOfficeStore, useMinisterOfficeActions, useMinisterOfficeState } from '@/stores/minister-office';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface MeetingManagerProps {
  className?: string;
}

const MeetingManager: React.FC<MeetingManagerProps> = ({ className }) => {
  const {
    meetings,
    loading
  } = useMinisterOfficeState();

  const {
    createMeeting,
    updateMeeting,
    deleteMeeting,
    fetchMeetings
  } = useMinisterOfficeActions();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    meetingType: 'regular' as 'regular' | 'emergency' | 'committee' | 'bilateral',
    scheduledDate: '',
    location: '',
    virtualLink: '',
    agenda: [] as any[],
    attendees: [] as any[]
  });

  useEffect(() => {
    fetchMeetings({
      status: statusFilter !== 'all' ? statusFilter : undefined,
      type: typeFilter !== 'all' ? typeFilter : undefined,
      limit: 50,
      offset: 0
    });
  }, [statusFilter, typeFilter, fetchMeetings]);

  const filteredMeetings = meetings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const upcomingMeetings = filteredMeetings.filter(m => {
    const meetingDate = new Date(m.scheduledDate);
    const now = new Date();
    return meetingDate > now && m.status !== 'cancelled';
  });

  const ongoingMeetings = filteredMeetings.filter(m => m.status === 'in_progress');
  const completedMeetings = filteredMeetings.filter(m => m.status === 'completed');
  const cancelledMeetings = filteredMeetings.filter(m => m.status === 'cancelled');

  const handleCreateMeeting = async () => {
    try {
      await createMeeting({
        ...newMeeting,
        scheduledDate: new Date(newMeeting.scheduledDate),
        agenda: newMeeting.agenda.length > 0 ? newMeeting.agenda : undefined,
        attendees: newMeeting.attendees.length > 0 ? newMeeting.attendees : undefined
      });

      setNewMeeting({
        title: '',
        description: '',
        meetingType: 'regular',
        scheduledDate: '',
        location: '',
        virtualLink: '',
        agenda: [],
        attendees: []
      });

      setIsCreateDialogOpen(false);
      toast.success('تم إنشاء الاجتماع بنجاح');
    } catch (error) {
      toast.error('فشل في إنشاء الاجتماع');
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateMeeting(id, { status: status as any });
      toast.success('تم تحديث حالة الاجتماع');
    } catch (error) {
      toast.error('فشل في تحديث الاجتماع');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { label: 'مجدول', color: 'bg-blue-100 text-blue-800' },
      in_progress: { label: 'قيد الانعقاد', color: 'bg-green-100 text-green-800' },
      completed: { label: 'مكتمل', color: 'bg-gray-100 text-gray-800' },
      cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-800' },
      postponed: { label: 'مؤجل', color: 'bg-yellow-100 text-yellow-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      regular: { label: 'دوري', color: 'bg-blue-100 text-blue-800' },
      emergency: { label: 'طارئ', color: 'bg-red-100 text-red-800' },
      committee: { label: 'لجنة', color: 'bg-green-100 text-green-800' },
      bilateral: { label: 'ثنائي', color: 'bg-purple-100 text-purple-800' }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.regular;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-6 ${className}`}
    >
      {/* رأس نظام إدارة الاجتماعات */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            إدارة الاجتماعات الوزارية ومتابعة القرارات
          </h2>
          <p className="text-gray-600 mt-1">
            نظام شامل لجدولة وإدارة الاجتماعات الوزارية ومتابعة الإجراءات المطلوبة
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              اجتماع جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إنشاء اجتماع جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان الاجتماع
                  </label>
                  <Input
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="أدخل عنوان الاجتماع"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع الاجتماع
                  </label>
                  <Select
                    value={newMeeting.meetingType}
                    onValueChange={(value: 'regular' | 'emergency' | 'committee' | 'bilateral') =>
                      setNewMeeting(prev => ({ ...prev, meetingType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">دوري</SelectItem>
                      <SelectItem value="emergency">طارئ</SelectItem>
                      <SelectItem value="committee">لجنة</SelectItem>
                      <SelectItem value="bilateral">ثنائي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف الاجتماع
                </label>
                <Textarea
                  value={newMeeting.description}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف الاجتماع وأهدافه"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تاريخ ووقت الاجتماع
                  </label>
                  <Input
                    type="datetime-local"
                    value={newMeeting.scheduledDate}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الموقع (اختياري)
                  </label>
                  <Input
                    value={newMeeting.location}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="مثال: قاعة الاجتماعات الرئيسية"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رابط الاجتماع الافتراضي (اختياري)
                </label>
                <Input
                  value={newMeeting.virtualLink}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, virtualLink: e.target.value }))}
                  placeholder="رابط Zoom أو Teams"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button
                  onClick={handleCreateMeeting}
                  disabled={!newMeeting.title || !newMeeting.scheduledDate}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  إنشاء الاجتماع
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">مجدولة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {upcomingMeetings.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Play className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">قيد الانعقاد</p>
                <p className="text-2xl font-bold text-gray-900">
                  {ongoingMeetings.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">مكتملة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedMeetings.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ملغية</p>
                <p className="text-2xl font-bold text-gray-900">
                  {cancelledMeetings.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* فلاتر البحث */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الاجتماعات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="scheduled">مجدول</SelectItem>
                  <SelectItem value="in_progress">قيد الانعقاد</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="cancelled">ملغي</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="regular">دوري</SelectItem>
                  <SelectItem value="emergency">طارئ</SelectItem>
                  <SelectItem value="committee">لجنة</SelectItem>
                  <SelectItem value="bilateral">ثنائي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* تبويبات الاجتماعات */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            قادمة ({upcomingMeetings.length})
          </TabsTrigger>
          <TabsTrigger value="ongoing" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            جارية ({ongoingMeetings.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            مكتملة ({completedMeetings.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            ملغية ({cancelledMeetings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingMeetings.length > 0 ? (
            upcomingMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} onView={setSelectedMeeting} onUpdate={handleStatusUpdate} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>لا توجد اجتماعات قادمة</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="ongoing" className="space-y-4">
          {ongoingMeetings.length > 0 ? (
            ongoingMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} onView={setSelectedMeeting} onUpdate={handleStatusUpdate} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Play className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>لا توجد اجتماعات جارية حالياً</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedMeetings.length > 0 ? (
            completedMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} onView={setSelectedMeeting} onUpdate={handleStatusUpdate} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>لا توجد اجتماعات مكتملة</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {cancelledMeetings.length > 0 ? (
            cancelledMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} onView={setSelectedMeeting} onUpdate={handleStatusUpdate} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>لا توجد اجتماعات ملغية</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* نافذة عرض الاجتماع */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedMeeting && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  {selectedMeeting.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>الحالة: {getStatusBadge(selectedMeeting.status)}</span>
                  <span>النوع: {getTypeBadge(selectedMeeting.meetingType)}</span>
                  <span>التاريخ: {new Date(selectedMeeting.scheduledDate).toLocaleString('ar-SA')}</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">وصف الاجتماع</h4>
                  <p className="text-gray-700">{selectedMeeting.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedMeeting.location && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        الموقع
                      </h4>
                      <p className="text-blue-700">{selectedMeeting.location}</p>
                    </div>
                  )}

                  {selectedMeeting.virtualLink && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Video className="w-4 h-4 text-green-600" />
                        رابط الاجتماع الافتراضي
                      </h4>
                      <a href={selectedMeeting.virtualLink} target="_blank" rel="noopener noreferrer"
                         className="text-green-700 hover:underline">
                        انضم للاجتماع
                      </a>
                    </div>
                  )}
                </div>

                {selectedMeeting.minutes && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-600" />
                      محاضر الاجتماع
                    </h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedMeeting.minutes}</p>
                  </div>
                )}

                {selectedMeeting.followUpActions && selectedMeeting.followUpActions.length > 0 && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-yellow-600" />
                      الإجراءات المطلوبة
                    </h4>
                    <div className="space-y-2">
                      {selectedMeeting.followUpActions.map((action: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">{action.description}</span>
                          <Badge className="mr-auto" variant="outline">
                            {action.assignedTo}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    إغلاق
                  </Button>
                  {selectedMeeting.status === 'scheduled' && (
                    <Button
                      onClick={() => handleStatusUpdate(selectedMeeting.id, 'in_progress')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      بدء الاجتماع
                    </Button>
                  )}
                  {selectedMeeting.status === 'in_progress' && (
                    <Button
                      onClick={() => handleStatusUpdate(selectedMeeting.id, 'completed')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      إنهاء الاجتماع
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

// مكون بطاقة الاجتماع
const MeetingCard: React.FC<{
  meeting: any;
  onView: (meeting: any) => void;
  onUpdate: (id: string, status: string) => void;
}> = ({ meeting, onView, onUpdate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {meeting.title}
                </h3>
                {getStatusBadge(meeting.status)}
                {getTypeBadge(meeting.meetingType)}
              </div>

              <p className="text-gray-600 mb-3 line-clamp-2">
                {meeting.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(meeting.scheduledDate).toLocaleString('ar-SA')}</span>
                </div>
                {meeting.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{meeting.location}</span>
                  </div>
                )}
                {meeting.virtualLink && (
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    <span>اجتماع افتراضي</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(meeting)}
              >
                <Eye className="w-4 h-4" />
              </Button>
              {meeting.status === 'scheduled' && (
                <Button
                  size="sm"
                  onClick={() => onUpdate(meeting.id, 'in_progress')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="w-4 h-4" />
                </Button>
              )}
              {meeting.status === 'in_progress' && (
                <Button
                  size="sm"
                  onClick={() => onUpdate(meeting.id, 'completed')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <CheckCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MeetingManager;
