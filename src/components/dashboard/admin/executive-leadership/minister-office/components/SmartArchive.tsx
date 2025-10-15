'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Archive,
  Search,
  Filter,
  Eye,
  Download,
  Upload,
  FileText,
  Calendar,
  Tag,
  FolderOpen,
  HardDrive,
  Cloud,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Database
} from 'lucide-react';
import { useMinisterOfficeStore } from '@/stores/minister-office';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface SmartArchiveProps {
  className?: string;
}

const SmartArchive: React.FC<SmartArchiveProps> = ({ className }) => {
  const {
    archives,
    loading,
    archiveItem,
    searchArchives,
    fetchArchives
  } = useMinisterOfficeStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [accessLevelFilter, setAccessLevelFilter] = useState<string>('all');
  const [selectedArchive, setSelectedArchive] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  useEffect(() => {
    fetchArchives({
      limit: 50,
      offset: 0
    });
  }, [fetchArchives]);

  const filteredArchives = archives.filter(archive => {
    const matchesSearch = archive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         archive.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (archive.tags && archive.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory = categoryFilter === 'all' || archive.category === categoryFilter;
    const matchesAccessLevel = accessLevelFilter === 'all' || archive.accessLevel === accessLevelFilter;
    return matchesSearch && matchesCategory && matchesAccessLevel;
  });

  const handleSearch = async () => {
    try {
      await searchArchives({
        query: searchQuery,
        category: categoryFilter !== 'all' ? categoryFilter : undefined,
        tags: searchQuery ? [searchQuery] : undefined,
        accessLevel: accessLevelFilter !== 'all' ? accessLevelFilter : undefined,
        limit: 50,
        offset: 0
      });
      setIsSearchDialogOpen(false);
    } catch (error) {
      toast.error('فشل في البحث في الأرشيف');
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      decision: { label: 'قرار', color: 'bg-blue-100 text-blue-800' },
      correspondence: { label: 'مراسلة', color: 'bg-green-100 text-green-800' },
      report: { label: 'تقرير', color: 'bg-purple-100 text-purple-800' },
      meeting: { label: 'اجتماع', color: 'bg-orange-100 text-orange-800' },
      document: { label: 'وثيقة', color: 'bg-gray-100 text-gray-800' }
    };

    const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.document;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getAccessLevelBadge = (accessLevel: string) => {
    const accessConfig = {
      public: { label: 'عام', color: 'bg-green-100 text-green-800' },
      restricted: { label: 'مقيد', color: 'bg-yellow-100 text-yellow-800' },
      confidential: { label: 'سري', color: 'bg-red-100 text-red-800' }
    };

    const config = accessConfig[accessLevel as keyof typeof accessConfig] || accessConfig.restricted;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getArchiveTypeIcon = (archiveType: string) => {
    switch (archiveType) {
      case 'digital':
        return <Database className="w-4 h-4 text-blue-600" />;
      case 'physical':
        return <HardDrive className="w-4 h-4 text-gray-600" />;
      case 'hybrid':
        return <Cloud className="w-4 h-4 text-purple-600" />;
      default:
        return <Archive className="w-4 h-4 text-gray-600" />;
    }
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
      {/* رأس نظام الأرشفة الذكية */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Archive className="w-6 h-6 text-purple-600" />
            أرشفة ذكية للقرارات والوثائق الرسمية
          </h2>
          <p className="text-gray-600 mt-1">
            نظام متقدم للأرشفة الذكية مع إمكانيات البحث المتقدم والتصنيف التلقائي
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                بحث متقدم
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>البحث المتقدم في الأرشيف</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    كلمات البحث
                  </label>
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="أدخل كلمات البحث..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      التصنيف
                    </label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر التصنيف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع التصنيفات</SelectItem>
                        <SelectItem value="decision">قرار</SelectItem>
                        <SelectItem value="correspondence">مراسلة</SelectItem>
                        <SelectItem value="report">تقرير</SelectItem>
                        <SelectItem value="meeting">اجتماع</SelectItem>
                        <SelectItem value="document">وثيقة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مستوى الوصول
                    </label>
                    <Select value={accessLevelFilter} onValueChange={setAccessLevelFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر مستوى الوصول" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المستويات</SelectItem>
                        <SelectItem value="public">عام</SelectItem>
                        <SelectItem value="restricted">مقيد</SelectItem>
                        <SelectItem value="confidential">سري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsSearchDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700">
                    بحث
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button className="bg-purple-600 hover:bg-purple-700">
            <Upload className="w-4 h-4 mr-2" />
            أرشفة جديدة
          </Button>
        </div>
      </div>

      {/* إحصائيات الأرشيف */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي الأرشيف</p>
                <p className="text-2xl font-bold text-gray-900">
                  {archives.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">عام</p>
                <p className="text-2xl font-bold text-gray-900">
                  {archives.filter(a => a.accessLevel === 'public').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Unlock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">مقيد</p>
                <p className="text-2xl font-bold text-gray-900">
                  {archives.filter(a => a.accessLevel === 'restricted').length}
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
                <p className="text-sm text-gray-600">سري</p>
                <p className="text-2xl font-bold text-gray-900">
                  {archives.filter(a => a.accessLevel === 'confidential').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* فلاتر البحث السريع */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الأرشيف..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التصنيفات</SelectItem>
                  <SelectItem value="decision">قرار</SelectItem>
                  <SelectItem value="correspondence">مراسلة</SelectItem>
                  <SelectItem value="report">تقرير</SelectItem>
                  <SelectItem value="meeting">اجتماع</SelectItem>
                  <SelectItem value="document">وثيقة</SelectItem>
                </SelectContent>
              </Select>

              <Select value={accessLevelFilter} onValueChange={setAccessLevelFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="الوصول" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المستويات</SelectItem>
                  <SelectItem value="public">عام</SelectItem>
                  <SelectItem value="restricted">مقيد</SelectItem>
                  <SelectItem value="confidential">سري</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* قائمة الأرشيف */}
      <div className="grid gap-4">
        <AnimatePresence>
          {filteredArchives.map((archive) => (
            <motion.div
              key={archive.id}
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
                          {getArchiveTypeIcon(archive.archiveType)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {archive.title}
                        </h3>
                        {getCategoryBadge(archive.category)}
                        {getAccessLevelBadge(archive.accessLevel)}
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {archive.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>تاريخ الأرشفة: {new Date(archive.archivedAt).toLocaleDateString('ar-SA')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>المسؤول: {archive.archivedBy}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-gray-600">الوسوم:</span>
                        <div className="flex flex-wrap gap-1">
                          {archive.tags?.map((tag: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          )) || (
                            <span className="text-sm text-gray-500">لا توجد وسوم</span>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">فترة الاحتفاظ:</span>
                          <span className="font-medium">{archive.retentionPeriod} سنوات</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-gray-600">نوع الأرشفة:</span>
                          <Badge variant="outline" className="text-xs">
                            {archive.archiveType}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedArchive(archive);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          toast.success('تم الوصول إلى الملف بنجاح');
                        }}
                      >
                        <FolderOpen className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredArchives.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Archive className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>لا توجد عناصر مؤرشفة متاحة</p>
          </div>
        )}
      </div>

      {/* نافذة عرض العنصر المؤرشف */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedArchive && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Archive className="w-5 h-5 text-purple-600" />
                  تفاصيل العنصر المؤرشف: {selectedArchive.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">معلومات عامة</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">التصنيف:</span>
                        <span>{getCategoryBadge(selectedArchive.category)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">نوع الأرشفة:</span>
                        <Badge variant="outline" className="text-xs">
                          {selectedArchive.archiveType}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">مستوى الوصول:</span>
                        <span>{getAccessLevelBadge(selectedArchive.accessLevel)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">فترة الاحتفاظ:</span>
                        <span className="font-medium">{selectedArchive.retentionPeriod} سنوات</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">معلومات الوقت</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">تاريخ الأرشفة:</span>
                        <span className="font-medium">
                          {new Date(selectedArchive.archivedAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">وقت الأرشفة:</span>
                        <span className="font-medium">
                          {new Date(selectedArchive.archivedAt).toLocaleTimeString('ar-SA')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">المسؤول:</span>
                        <span className="font-medium">{selectedArchive.archivedBy}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">الوصف</h4>
                  <p className="text-gray-700">{selectedArchive.description}</p>
                </div>

                {selectedArchive.metadata && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">البيانات الوصفية</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      {Object.entries(selectedArchive.metadata).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-blue-700">{key}:</span>
                          <span className="font-medium">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">الوسوم</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedArchive.tags?.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    )) || (
                      <span className="text-sm text-gray-500">لا توجد وسوم</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    إغلاق
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    تحميل الملف
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    معاينة الملف
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

export default SmartArchive;
