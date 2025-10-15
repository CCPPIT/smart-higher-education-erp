'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Send,
  Inbox,
  Clock,
  AlertCircle,
  CheckCircle,
  Archive,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Tag,
  Paperclip
} from 'lucide-react';
import { useMinisterOfficeStore, useMinisterOfficeActions, useMinisterOfficeState } from '@/stores/minister-office';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface CorrespondenceSystemProps {
  className?: string;
}

const CorrespondenceSystem: React.FC<CorrespondenceSystemProps> = ({ className }) => {
  const {
    correspondence,
    loading
  } = useMinisterOfficeState();

  const {
    createCorrespondence,
    updateCorrespondence,
    deleteCorrespondence,
    fetchCorrespondences
  } = useMinisterOfficeActions();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedCorrespondence, setSelectedCorrespondence] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [newCorrespondence, setNewCorrespondence] = useState({
    subject: '',
    content: '',
    senderId: 'minister-office',
    senderType: 'internal' as 'internal' | 'external',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    category: 'information' as 'decision' | 'information' | 'request' | 'complaint',
    dueDate: '',
    attachments: [] as any[]
  });

  useEffect(() => {
    fetchCorrespondences({
      status: statusFilter !== 'all' ? statusFilter : undefined,
      priority: priorityFilter !== 'all' ? priorityFilter : undefined,
      category: categoryFilter !== 'all' ? categoryFilter : undefined,
      limit: 50,
      offset: 0
    });
  }, [statusFilter, priorityFilter, categoryFilter, fetchCorrespondences]);

  const filteredCorrespondences = correspondence.filter(item => {
    const matchesSearch = item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleCreateCorrespondence = async () => {
    try {
      await createCorrespondence({
        ...newCorrespondence,
        dueDate: newCorrespondence.dueDate ? new Date(newCorrespondence.dueDate) : undefined
      });

      setNewCorrespondence({
        subject: '',
        content: '',
        senderId: 'minister-office',
        senderType: 'internal',
        priority: 'medium',
        category: 'information',
        dueDate: '',
        attachments: []
      });

      setIsCreateDialogOpen(false);
      toast.success('تم إنشاء المراسلة بنجاح');
    } catch (error) {
      toast.error('فشل في إنشاء المراسلة');
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateCorrespondence(id, { status: status as any });
      toast.success('تم تحديث حالة المراسلة');
    } catch (error) {
      toast.error('فشل في تحديث المراسلة');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'معلق', color: 'bg-yellow-100 text-yellow-800' },
      in_progress: { label: 'قيد المعالجة', color: 'bg-blue-100 text-blue-800' },
      completed: { label: 'مكتمل', color: 'bg-green-100 text-green-800' },
      archived: { label: 'مؤرشف', color: 'bg-gray-100 text-gray-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'منخفضة', color: 'bg-green-100 text-green-800' },
      medium: { label: 'متوسطة', color: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'عالية', color: 'bg-orange-100 text-orange-800' },
      urgent: { label: 'عاجل', color: 'bg-red-100 text-red-800' }
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
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
      {/* رأس النظام */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            نظام إدارة المراسلات الوزارية الذكي
          </h2>
          <p className="text-gray-600 mt-1">
            إدارة شاملة وذكية لجميع المراسلات والتواصل الرسمي
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              مراسلة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إنشاء مراسلة جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان المراسلة
                  </label>
                  <Input
                    value={newCorrespondence.subject}
                    onChange={(e) => setNewCorrespondence(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="أدخل عنوان المراسلة"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع المرسل
                  </label>
                  <Select
                    value={newCorrespondence.senderType}
                    onValueChange={(value: 'internal' | 'external') =>
                      setNewCorrespondence(prev => ({ ...prev, senderType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">داخلي</SelectItem>
                      <SelectItem value="external">خارجي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  محتوى المراسلة
                </label>
                <Textarea
                  value={newCorrespondence.content}
                  onChange={(e) => setNewCorrespondence(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="أدخل محتوى المراسلة"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الأولوية
                  </label>
                  <Select
                    value={newCorrespondence.priority}
                    onValueChange={(value: 'low' | 'medium' | 'high' | 'urgent') =>
                      setNewCorrespondence(prev => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">منخفضة</SelectItem>
                      <SelectItem value="medium">متوسطة</SelectItem>
                      <SelectItem value="high">عالية</SelectItem>
                      <SelectItem value="urgent">عاجل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    التصنيف
                  </label>
                  <Select
                    value={newCorrespondence.category}
                    onValueChange={(value: 'decision' | 'information' | 'request' | 'complaint') =>
                      setNewCorrespondence(prev => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="decision">قرار</SelectItem>
                      <SelectItem value="information">معلومات</SelectItem>
                      <SelectItem value="request">طلب</SelectItem>
                      <SelectItem value="complaint">شكوى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تاريخ الاستحقاق (اختياري)
                  </label>
                  <Input
                    type="date"
                    value={newCorrespondence.dueDate}
                    onChange={(e) => setNewCorrespondence(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button
                  onClick={handleCreateCorrespondence}
                  disabled={!newCorrespondence.subject || !newCorrespondence.content}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  إنشاء المراسلة
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* فلاتر البحث */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في المراسلات..."
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
                  <SelectItem value="pending">معلق</SelectItem>
                  <SelectItem value="in_progress">قيد المعالجة</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="archived">مؤرشف</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأولويات</SelectItem>
                  <SelectItem value="low">منخفضة</SelectItem>
                  <SelectItem value="medium">متوسطة</SelectItem>
                  <SelectItem value="high">عالية</SelectItem>
                  <SelectItem value="urgent">عاجل</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التصنيفات</SelectItem>
                  <SelectItem value="decision">قرار</SelectItem>
                  <SelectItem value="information">معلومات</SelectItem>
                  <SelectItem value="request">طلب</SelectItem>
                  <SelectItem value="complaint">شكوى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* قائمة المراسلات */}
      <div className="grid gap-4">
        <AnimatePresence>
          {filteredCorrespondences.map((correspondence) => (
            <motion.div
              key={correspondence.id}
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
                          {correspondence.subject}
                        </h3>
                        {getStatusBadge(correspondence.status)}
                        {getPriorityBadge(correspondence.priority)}
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {correspondence.content}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{correspondence.senderType === 'internal' ? 'داخلي' : 'خارجي'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          <span>{correspondence.category}</span>
                        </div>
                        {correspondence.dueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(correspondence.dueDate).toLocaleDateString('ar-SA')}</span>
                          </div>
                        )}
                        {correspondence.attachments && correspondence.attachments.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Paperclip className="w-4 h-4" />
                            <span>{correspondence.attachments.length} مرفق</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCorrespondence(correspondence);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(correspondence.id, 'in_progress')}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(correspondence.id, 'completed')}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredCorrespondences.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Inbox className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>لا توجد مراسلات متاحة</p>
          </div>
        )}
      </div>

      {/* نافذة عرض المراسلة */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedCorrespondence && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  {selectedCorrespondence.subject}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>الحالة: {getStatusBadge(selectedCorrespondence.status)}</span>
                  <span>الأولوية: {getPriorityBadge(selectedCorrespondence.priority)}</span>
                  <span>التصنيف: {selectedCorrespondence.category}</span>
                  <span>نوع المرسل: {selectedCorrespondence.senderType === 'internal' ? 'داخلي' : 'خارجي'}</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">محتوى المراسلة</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedCorrespondence.content}</p>
                </div>

                {selectedCorrespondence.attachments && selectedCorrespondence.attachments.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">المرفقات</h4>
                    <div className="space-y-2">
                      {selectedCorrespondence.attachments.map((attachment: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                          <Paperclip className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{attachment.name || `مرفق ${index + 1}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    إغلاق
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate(selectedCorrespondence.id, 'completed')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    إكمال المراسلة
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CorrespondenceSystem;
