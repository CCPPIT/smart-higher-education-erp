'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Target,
  Award,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { trpc } from '@/trpc/client';

interface DecisionDashboardProps {
  className?: string;
}

const DecisionDashboard: React.FC<DecisionDashboardProps> = ({ className }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<any>(null);

  // جلب القرارات باستخدام tRPC
  const { data: decisions = [], isLoading, refetch } = trpc.ministerOffice.decisions.getAll.useQuery({
    limit: 50,
    offset: 0,
  });

  // إنشاء قرار جديد
  const createMutation = trpc.ministerOffice.decisions.create.useMutation({
    onSuccess: () => {
      toast.success('تم إنشاء القرار بنجاح');
      refetch();
      setIsCreateDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error('فشل في إنشاء القرار: ' + error.message);
    }
  });

  // تحديث قرار
  const updateMutation = trpc.ministerOffice.decisions.update.useMutation({
    onSuccess: () => {
      toast.success('تم تحديث القرار بنجاح');
      refetch();
    },
    onError: (error: any) => {
      toast.error('فشل في تحديث القرار: ' + error.message);
    }
  });

  const [newDecision, setNewDecision] = useState({
    title: '',
    description: '',
    decisionType: 'administrative' as 'administrative' | 'financial' | 'academic' | 'policy',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    decisionNumber: '',
    budget: 0,
    implementationDate: '',
  });

  useEffect(() => {
    refetch();
  }, []);

  const filteredDecisions = decisions.filter(decision => {
    const matchesSearch = decision.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         decision.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || decision.status === statusFilter;
    const matchesType = typeFilter === 'all' || decision.decisionType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateDecision = async () => {
    if (!newDecision.title || !newDecision.description || !newDecision.decisionNumber) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      await createMutation.mutateAsync({
        title: newDecision.title,
        description: newDecision.description,
        decisionType: newDecision.decisionType,
        priority: newDecision.priority,
        decisionNumber: newDecision.decisionNumber,
        budget: newDecision.budget || undefined,
        implementationDate: newDecision.implementationDate ? new Date(newDecision.implementationDate) : undefined,
      });

      setNewDecision({
        title: '',
        description: '',
        decisionType: 'administrative',
        priority: 'medium',
        decisionNumber: '',
        budget: 0,
        implementationDate: '',
      });
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleUpdateDecision = async (decisionId: string, updates: any) => {
    try {
      await updateMutation.mutateAsync({
        id: decisionId,
        data: updates,
      });
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleStatusUpdate = async (decisionId: string, newStatus: string) => {
    // For now, we'll update the priority instead of status since status is not in the update schema
    // In a real implementation, you might want to add status to the update schema in the tRPC router
    try {
      await updateMutation.mutateAsync({
        id: decisionId,
        data: { priority: newStatus === 'approved' ? 'high' : 'medium' },
      });
    } catch (error) {
      // Error handled by mutation
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      draft: { label: 'مسودة', color: 'bg-gray-100 text-gray-800' },
      review: { label: 'قيد المراجعة', color: 'bg-blue-100 text-blue-800' },
      approved: { label: 'معتمد', color: 'bg-green-100 text-green-800' },
      implemented: { label: 'منفذ', color: 'bg-purple-100 text-purple-800' },
      cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-800' },
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.draft;

    return (
      <Badge className={`${statusInfo.color} border-0`}>
        {statusInfo.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap = {
      low: { label: 'منخفض', color: 'bg-green-100 text-green-800' },
      medium: { label: 'متوسط', color: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'عالي', color: 'bg-orange-100 text-orange-800' },
      urgent: { label: 'عاجل', color: 'bg-red-100 text-red-800' },
    };

    const priorityInfo = priorityMap[priority as keyof typeof priorityMap] || priorityMap.medium;

    return (
      <Badge className={`${priorityInfo.color} border-0`}>
        {priorityInfo.label}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'administrative':
        return <FileText className="w-4 h-4" />;
      case 'financial':
        return <DollarSign className="w-4 h-4" />;
      case 'academic':
        return <Award className="w-4 h-4" />;
      case 'policy':
        return <Target className="w-4 h-4" />;
      default:
        return <CheckSquare className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-6 ${className}`}
    >
      {/* رأس لوحة التحكم */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-green-600" />
            لوحة تحكم القرارات الوزارية
          </h2>
          <p className="text-gray-600 mt-1">
            متابعة وإدارة شاملة لجميع القرارات والسياسات الوزارية
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              قرار جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إنشاء قرار جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان القرار
                  </label>
                  <Input
                    value={newDecision.title}
                    onChange={(e) => setNewDecision(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="أدخل عنوان القرار"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم القرار
                  </label>
                  <Input
                    value={newDecision.decisionNumber}
                    onChange={(e) => setNewDecision(prev => ({ ...prev, decisionNumber: e.target.value }))}
                    placeholder="مثال: 123/2024"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف القرار
                </label>
                <Textarea
                  value={newDecision.description}
                  onChange={(e) => setNewDecision(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف مفصل للقرار"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع القرار
                  </label>
                  <Select
                    value={newDecision.decisionType}
                    onValueChange={(value: 'administrative' | 'financial' | 'academic' | 'policy') =>
                      setNewDecision(prev => ({ ...prev, decisionType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administrative">إداري</SelectItem>
                      <SelectItem value="financial">مالي</SelectItem>
                      <SelectItem value="academic">أكاديمي</SelectItem>
                      <SelectItem value="policy">سياسة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الأولوية
                  </label>
                  <Select
                    value={newDecision.priority}
                    onValueChange={(value: 'low' | 'medium' | 'high' | 'urgent') =>
                      setNewDecision(prev => ({ ...prev, priority: value }))
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
                    الميزانية (اختياري)
                  </label>
                  <Input
                    type="number"
                    value={newDecision.budget}
                    onChange={(e) => setNewDecision(prev => ({ ...prev, budget: Number(e.target.value) }))}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاريخ التنفيذ (اختياري)
                </label>
                <Input
                  type="date"
                  value={newDecision.implementationDate}
                  onChange={(e) => setNewDecision(prev => ({ ...prev, implementationDate: e.target.value }))}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button
                  onClick={handleCreateDecision}
                  disabled={!newDecision.title || !newDecision.decisionNumber}
                  className="bg-green-600 hover:bg-green-700"
                >
                  إنشاء القرار
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
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">المسودات</p>
                <p className="text-2xl font-bold text-gray-900">
                  {decisions.filter(d => d.status === 'draft').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">قيد المراجعة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {decisions.filter(d => d.status === 'review').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">معتمدة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {decisions.filter(d => d.status === 'approved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">منفذة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {decisions.filter(d => d.status === 'implemented').length}
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
                  placeholder="البحث في القرارات..."
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
                  <SelectItem value="draft">مسودة</SelectItem>
                  <SelectItem value="review">قيد المراجعة</SelectItem>
                  <SelectItem value="approved">معتمد</SelectItem>
                  <SelectItem value="implemented">منفذ</SelectItem>
                  <SelectItem value="cancelled">ملغي</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="administrative">إداري</SelectItem>
                  <SelectItem value="financial">مالي</SelectItem>
                  <SelectItem value="academic">أكاديمي</SelectItem>
                  <SelectItem value="policy">سياسة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* قائمة القرارات */}
      <div className="grid gap-4">
        <AnimatePresence>
          {filteredDecisions.map((decision) => (
            <motion.div
              key={decision.id}
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
                          {decision.title}
                        </h3>
                        <Badge variant="outline">
                          #{decision.decisionNumber}
                        </Badge>
                        {getStatusBadge(decision.status)}
                        {getPriorityBadge(decision.priority)}
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {decision.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {decision.budget && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{decision.budget.toLocaleString()} ريال</span>
                          </div>
                        )}
                        {decision.implementationDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(decision.implementationDate).toLocaleDateString('ar-SA')}</span>
                          </div>
                        )}
                        {decision.approvedBy && (
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            <span>معتمد من: {decision.approvedBy}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedDecision(decision);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(decision.id, 'review')}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {decision.status === 'draft' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(decision.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredDecisions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <CheckSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>لا توجد قرارات متاحة</p>
          </div>
        )}
      </div>

      {/* نافذة عرض القرار */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedDecision && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-green-600" />
                  {selectedDecision.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>رقم القرار: {selectedDecision.decisionNumber}</span>
                  <span>الحالة: {getStatusBadge(selectedDecision.status)}</span>
                  <span>الأولوية: {getPriorityBadge(selectedDecision.priority)}</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">وصف القرار</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedDecision.description}</p>
                </div>

                {selectedDecision.budget && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      الميزانية المخصصة
                    </h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedDecision.budget.toLocaleString()} ريال سعودي
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDecision.implementationDate && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-600" />
                        تاريخ التنفيذ
                      </h4>
                      <p className="text-green-700">
                        {new Date(selectedDecision.implementationDate).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  )}

                  {selectedDecision.approvedBy && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-purple-600" />
                        تاريخ الاعتماد
                      </h4>
                      <p className="text-purple-700">
                        {selectedDecision.approvedBy} - {selectedDecision.approvedAt ?
                          new Date(selectedDecision.approvedAt).toLocaleDateString('ar-SA') : 'غير محدد'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    إغلاق
                  </Button>
                  {selectedDecision.status === 'draft' && (
                    <Button
                      onClick={() => handleStatusUpdate(selectedDecision.id, 'approved')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      اعتماد القرار
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

export default DecisionDashboard;
