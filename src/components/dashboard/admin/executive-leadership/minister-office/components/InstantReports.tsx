'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Send,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
  Download,
  Eye,
  Filter,
  Search,
  Plus,
  Calendar,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  FileBarChart,
  TrendingDown,
  Activity
} from 'lucide-react';
import { useMinisterOfficeStore } from '@/stores/minister-office';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface InstantReportsProps {
  className?: string;
}

const InstantReports: React.FC<InstantReportsProps> = ({ className }) => {
  const {
    reports,
    loading,
    createReport,
    updateReport,
    deleteReport,
    fetchReports
  } = useMinisterOfficeStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchReports({
      status: statusFilter !== 'all' ? statusFilter : undefined,
      type: typeFilter !== 'all' ? typeFilter : undefined,
      category: categoryFilter !== 'all' ? categoryFilter : undefined,
      limit: 50,
      offset: 0
    });
  }, [statusFilter, typeFilter, categoryFilter, fetchReports]);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'مسودة', color: 'bg-gray-100 text-gray-800' },
      submitted: { label: 'مرسل', color: 'bg-blue-100 text-blue-800' },
      reviewed: { label: 'مراجع', color: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'معتمد', color: 'bg-green-100 text-green-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      daily: { label: 'يومي', color: 'bg-blue-100 text-blue-800' },
      weekly: { label: 'أسبوعي', color: 'bg-green-100 text-green-800' },
      monthly: { label: 'شهري', color: 'bg-purple-100 text-purple-800' },
      quarterly: { label: 'ربع سنوي', color: 'bg-orange-100 text-orange-800' },
      annual: { label: 'سنوي', color: 'bg-red-100 text-red-800' },
      emergency: { label: 'طارئ', color: 'bg-yellow-100 text-yellow-800' }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.monthly;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    const categoryConfig = {
      performance: TrendingUp,
      financial: FileBarChart,
      academic: Users,
      administrative: FileText
    };

    const Icon = categoryConfig[category as keyof typeof categoryConfig] || FileText;
    return <Icon className="w-4 h-4" />;
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
      {/* رأس نظام التقارير الفورية */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            نظام التقارير الفورية للوزير من الإدارات
          </h2>
          <p className="text-gray-600 mt-1">
            نظام متطور لاستقبال وعرض التقارير الفورية من جميع الإدارات والجهات المعنية
          </p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          تقرير جديد
        </Button>
      </div>

      {/* إحصائيات التقارير */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">مسودات</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.status === 'draft').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Send className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">مرسلة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.status === 'submitted').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">مراجعة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.status === 'reviewed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">معتمدة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.status === 'approved').length}
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
                  placeholder="البحث في التقارير..."
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
                  <SelectItem value="submitted">مرسل</SelectItem>
                  <SelectItem value="reviewed">مراجع</SelectItem>
                  <SelectItem value="approved">معتمد</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="daily">يومي</SelectItem>
                  <SelectItem value="weekly">أسبوعي</SelectItem>
                  <SelectItem value="monthly">شهري</SelectItem>
                  <SelectItem value="quarterly">ربع سنوي</SelectItem>
                  <SelectItem value="annual">سنوي</SelectItem>
                  <SelectItem value="emergency">طارئ</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التصنيفات</SelectItem>
                  <SelectItem value="performance">أداء</SelectItem>
                  <SelectItem value="financial">مالي</SelectItem>
                  <SelectItem value="academic">أكاديمي</SelectItem>
                  <SelectItem value="administrative">إداري</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* قائمة التقارير */}
      <div className="grid gap-4">
        <AnimatePresence>
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
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
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getCategoryIcon(report.category)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {report.title}
                        </h3>
                        {getStatusBadge(report.status)}
                        {getTypeBadge(report.type)}
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {report.content}
                      </p>

                      {report.summary && (
                        <div className="bg-blue-50 p-3 rounded-lg mb-3">
                          <p className="text-sm font-medium text-blue-900 mb-1">الملخص التنفيذي:</p>
                          <p className="text-sm text-blue-700">{report.summary}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>الإدارة: {report.departmentId}</span>
                        </div>
                        {report.submittedAt && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>تاريخ الإرسال: {new Date(report.submittedAt).toLocaleDateString('ar-SA')}</span>
                          </div>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {report.priority}
                        </Badge>
                      </div>

                      {report.metrics && (
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                          {Object.entries(report.metrics).slice(0, 3).map(([key, value]: [string, any]) => (
                            <div key={key} className="bg-gray-50 p-2 rounded text-center">
                              <p className="text-xs text-gray-600">{key}</p>
                              <p className="font-semibold text-gray-900">{value}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedReport(report);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      {report.status === 'submitted' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
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

        {filteredReports.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>لا توجد تقارير متاحة</p>
          </div>
        )}
      </div>

      {/* نافذة عرض التقرير */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  {selectedReport.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>الحالة: {getStatusBadge(selectedReport.status)}</span>
                  <span>النوع: {getTypeBadge(selectedReport.type)}</span>
                  <span>التصنيف: {selectedReport.category}</span>
                  <span>الإدارة: {selectedReport.departmentId}</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">محتوى التقرير</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedReport.content}</p>
                </div>

                {selectedReport.summary && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">الملخص التنفيذي</h4>
                    <p className="text-blue-700">{selectedReport.summary}</p>
                  </div>
                )}

                {selectedReport.metrics && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      المؤشرات والإحصائيات
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Object.entries(selectedReport.metrics).map(([key, value]: [string, any]) => (
                        <div key={key} className="bg-white p-3 rounded border">
                          <p className="text-sm text-gray-600 mb-1">{key}</p>
                          <p className="text-lg font-bold text-gray-900">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedReport.recommendations && selectedReport.recommendations.length > 0 && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      التوصيات
                    </h4>
                    <div className="space-y-2">
                      {selectedReport.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border">
                          <Target className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedReport.attachments && selectedReport.attachments.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">المرفقات</h4>
                    <div className="space-y-2">
                      {selectedReport.attachments.map((attachment: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{attachment.name || `مرفق ${index + 1}`}</span>
                          <Button variant="outline" size="sm" className="mr-auto">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    إغلاق
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    تصدير PDF
                  </Button>
                  {selectedReport.status === 'submitted' && (
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      اعتماد التقرير
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

export default InstantReports;
