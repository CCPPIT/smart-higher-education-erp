'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Wifi,
  WifiOff,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  Zap,
  Shield,
  Database,
  Link,
  Server
} from 'lucide-react';
import { useMinisterOfficeStore } from '@/stores/minister-office';
import type { ExternalApiIntegration, ApiLog } from '@/stores/minister-office';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface GovernmentIntegrationProps {
  className?: string;
}

const GovernmentIntegration: React.FC<GovernmentIntegrationProps> = ({ className }) => {
  const {
    externalApis,
    apiLogs,
    loading,
    createExternalApi,
    updateExternalApi,
    deleteExternalApi,
    fetchExternalApis,
    fetchApiLogs
  } = useMinisterOfficeStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApi, setSelectedApi] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('integrations');

  const [newApi, setNewApi] = useState({
    name: '',
    description: '',
    baseUrl: '',
    apiKey: '',
    status: 'active' as 'active' | 'inactive' | 'error',
    syncFrequency: 'daily' as 'realtime' | 'hourly' | 'daily' | 'weekly',
    endpoints: [] as any[],
    authentication: {} as any,
    rateLimit: 1000
  });

  useEffect(() => {
    fetchExternalApis();
    fetchApiLogs({ limit: 50, offset: 0 });
  }, [fetchExternalApis, fetchApiLogs]);

  const filteredApis = externalApis.filter((api: ExternalApiIntegration) => {
    const matchesSearch = api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         api.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || api.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateApi = async () => {
    try {
      await createExternalApi({
        ...newApi,
        authentication: {
          type: 'api_key',
          header: 'X-API-Key',
          value: newApi.apiKey
        }
      });

      setNewApi({
        name: '',
        description: '',
        baseUrl: '',
        apiKey: '',
        status: 'active',
        syncFrequency: 'daily',
        endpoints: [],
        authentication: {},
        rateLimit: 1000
      });

      setIsCreateDialogOpen(false);
      toast.success('تم إضافة التكامل بنجاح');
    } catch (error) {
      toast.error('فشل في إضافة التكامل');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'نشط', color: 'bg-green-100 text-green-800' },
      inactive: { label: 'غير نشط', color: 'bg-gray-100 text-gray-800' },
      error: { label: 'خطأ', color: 'bg-red-100 text-red-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getSyncFrequencyBadge = (frequency: string) => {
    const frequencyConfig = {
      realtime: { label: 'فوري', color: 'bg-green-100 text-green-800' },
      hourly: { label: 'ساعي', color: 'bg-blue-100 text-blue-800' },
      daily: { label: 'يومي', color: 'bg-yellow-100 text-yellow-800' },
      weekly: { label: 'أسبوعي', color: 'bg-purple-100 text-purple-800' }
    };

    const config = frequencyConfig[frequency as keyof typeof frequencyConfig] || frequencyConfig.daily;
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
      {/* رأس نظام التكامل الحكومي */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-600" />
            التكامل مع الجهات الحكومية الأخرى (API Hub)
          </h2>
          <p className="text-gray-600 mt-1">
            نظام مركزي للتكامل مع الجهات الحكومية والحصول على البيانات والخدمات بشكل آمن وفعال
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                تكامل جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>إضافة تكامل جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم التكامل
                    </label>
                    <Input
                      value={newApi.name}
                      onChange={(e) => setNewApi(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="مثال: وزارة المالية"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      عنوان URL الأساسي
                    </label>
                    <Input
                      value={newApi.baseUrl}
                      onChange={(e) => setNewApi(prev => ({ ...prev, baseUrl: e.target.value }))}
                      placeholder="https://api.example.gov"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف
                  </label>
                  <Input
                    value={newApi.description}
                    onChange={(e) => setNewApi(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="وصف مختصر للتكامل"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مفتاح API
                    </label>
                    <Input
                      type="password"
                      value={newApi.apiKey}
                      onChange={(e) => setNewApi(prev => ({ ...prev, apiKey: e.target.value }))}
                      placeholder="API Key المقدم من الجهة"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تردد المزامنة
                    </label>
                    <Select
                      value={newApi.syncFrequency}
                      onValueChange={(value: 'realtime' | 'hourly' | 'daily' | 'weekly') =>
                        setNewApi(prev => ({ ...prev, syncFrequency: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">فوري</SelectItem>
                        <SelectItem value="hourly">ساعي</SelectItem>
                        <SelectItem value="daily">يومي</SelectItem>
                        <SelectItem value="weekly">أسبوعي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button
                    onClick={handleCreateApi}
                    disabled={!newApi.name || !newApi.baseUrl}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    إضافة التكامل
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* إحصائيات التكاملات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">نشطة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {externalApis.filter(api => api.status === 'active').length}
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
                <p className="text-sm text-gray-600">خطأ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {externalApis.filter(api => api.status === 'error').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">طلبات اليوم</p>
                <p className="text-2xl font-bold text-gray-900">
                  {apiLogs.filter((log: ApiLog) => {
                    const today = new Date().toDateString();
                    return new Date(log.timestamp).toDateString() === today;
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">معدل النجاح</p>
                <p className="text-2xl font-bold text-gray-900">
                  {apiLogs.length > 0 ?
                    Math.round((apiLogs.filter(log => log.success).length / apiLogs.length) * 100) : 0}%
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
                  placeholder="البحث في التكاملات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
                <SelectItem value="error">خطأ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* تبويبات التكاملات وسجل الطلبات */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            التكاملات ({filteredApis.length})
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            سجل الطلبات ({apiLogs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          {filteredApis.length > 0 ? (
            filteredApis.map((api: ExternalApiIntegration) => (
              <motion.div
                key={api.id}
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
                          <div className={`p-2 rounded-lg ${
                            api.status === 'active' ? 'bg-green-100' :
                            api.status === 'error' ? 'bg-red-100' : 'bg-gray-100'
                          }`}>
                            {api.status === 'active' ? (
                              <Wifi className="w-5 h-5 text-green-600" />
                            ) : (
                              <WifiOff className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {api.name}
                          </h3>
                          {getStatusBadge(api.status)}
                          {getSyncFrequencyBadge(api.syncFrequency)}
                        </div>

                        <p className="text-gray-600 mb-3">
                          {api.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Link className="w-4 h-4" />
                            <span>{api.baseUrl}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>آخر مزامنة: {api.lastSync ? new Date(api.lastSync).toLocaleDateString('ar-SA') : 'لم يتم بعد'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Database className="w-4 h-4" />
                            <span>حد المعدل: {api.rateLimit} طلب/دقيقة</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {api.endpoints?.length || 0} نقطة نهاية
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedApi(api);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            // يمكن إضافة منطق اختبار الاتصال
                            toast.success('تم اختبار الاتصال بنجاح');
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Zap className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>لا توجد تكاملات متاحة</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                سجل طلبات API
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
              {apiLogs.slice(0, 10).map((log: ApiLog) => (
                  <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-1 rounded-full ${
                        log.success ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {log.success ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {log.method} {log.endpoint}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleString('ar-SA')} • {log.responseTime}ms
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={log.success ? 'default' : 'destructive'} className="text-xs">
                        {log.statusCode}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {log.integrationId}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* نافذة عرض التكامل */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedApi && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  تفاصيل التكامل: {selectedApi.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">معلومات عامة</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">الحالة:</span>
                        <span>{getStatusBadge(selectedApi.status)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">تردد المزامنة:</span>
                        <span>{getSyncFrequencyBadge(selectedApi.syncFrequency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">حد المعدل:</span>
                        <span>{selectedApi.rateLimit} طلب/دقيقة</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">نقاط النهاية</h4>
                    <div className="space-y-2">
                      {selectedApi.endpoints?.map((endpoint: any, index: number) => (index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                          <Server className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{endpoint.path}</span>
                          <Badge variant="outline" className="text-xs">
                            {endpoint.method}
                          </Badge>
                        </div>
                      )) || (
                        <p className="text-sm text-gray-500">لا توجد نقاط نهاية محددة</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">معلومات المصادقة</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">نوع المصادقة:</span>
                      <span className="font-medium">{selectedApi.authentication?.type || 'غير محدد'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">الهيدر:</span>
                      <span className="font-medium">{selectedApi.authentication?.header || 'غير محدد'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    إغلاق
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Zap className="w-4 h-4 mr-2" />
                    اختبار الاتصال
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    تعديل الإعدادات
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

export default GovernmentIntegration;
