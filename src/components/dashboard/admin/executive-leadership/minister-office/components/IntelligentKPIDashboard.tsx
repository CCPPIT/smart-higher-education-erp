'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  BookOpen,
  Award,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  Eye,
  EyeOff,
  Settings,
  Download,
  Share,
  Maximize2,
  Minimize2,
  Filter,
  Calendar,
  Bell,
  Lightbulb,
  Cpu,
  Database,
  Network,
  Wifi,
  WifiOff,
  ChevronRight,
  Plus,
  Minus,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { trpc } from '@/trpc/client';

interface KPIMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'warning' | 'critical';
  category: 'academic' | 'financial' | 'operational' | 'strategic';
  lastUpdated: string;
  confidence: number;
  aiInsights?: string;
}

interface KPIAlert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'threshold' | 'trend' | 'anomaly' | 'forecast';
  metricId: string;
  createdAt: string;
  acknowledged: boolean;
}

interface IntelligentKPIDashboardProps {
  className?: string;
}

export const IntelligentKPIDashboard: React.FC<IntelligentKPIDashboardProps> = ({ className = "" }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
  const [showAlerts, setShowAlerts] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState([30]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // جلب مؤشرات KPI الذكية
  const { data: kpiMetrics = [], isLoading: metricsLoading, refetch: refetchMetrics } = trpc.ministerOffice.analytics.intelligentKPIs.useQuery({
    timeframe: selectedTimeframe,
    category: selectedCategory,
    autoRefresh: autoRefresh
  });

  // جلب التنبيهات الذكية
  const { data: kpiAlerts = [], isLoading: alertsLoading } = trpc.ministerOffice.analytics.kpiAlerts.useQuery({
    activeOnly: showAlerts
  });

  // مراقبة المؤشرات في الوقت الفعلي
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refetchMetrics();
    }, refreshInterval[0] * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refetchMetrics]);

  const getStatusColor = (status: string) => {
    const colors = {
      excellent: 'bg-green-100 text-green-800 border-green-200',
      good: 'bg-blue-100 text-blue-800 border-blue-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      critical: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || colors.good;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === 'currency') return `${value.toLocaleString()} ريال`;
    if (unit === 'percentage') return `${value}%`;
    if (unit === 'count') return value.toLocaleString();
    return value.toString();
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getAlertIcon = (type: string) => {
    const icons = {
      threshold: Target,
      trend: TrendingUp,
      anomaly: AlertCircle,
      forecast: Clock
    };
    const Icon = icons[type as keyof typeof icons] || AlertCircle;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <motion.div
      className={`space-y-8 ${className} ${isFullscreen ? 'fixed inset-0 bg-white z-50 p-6 overflow-auto' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* رأس لوحة KPI الذكية */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            لوحة مؤشرات الأداء الذكية (KPI)
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            مراقبة وتحليل مؤشرات الأداء في الوقت الفعلي مع اقتراحات الذكاء الاصطناعي
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
            <Cpu className="w-3 h-3 mr-1" />
            مدعوم بالذكاء الاصطناعي
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchMetrics()}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* لوحة التحكم والإعدادات */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الفترة الزمنية
                </label>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">يوم واحد</SelectItem>
                    <SelectItem value="7d">أسبوع واحد</SelectItem>
                    <SelectItem value="30d">شهر واحد</SelectItem>
                    <SelectItem value="90d">3 أشهر</SelectItem>
                    <SelectItem value="1y">سنة واحدة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الفئة
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    <SelectItem value="academic">أكاديمي</SelectItem>
                    <SelectItem value="financial">مالي</SelectItem>
                    <SelectItem value="operational">تشغيلي</SelectItem>
                    <SelectItem value="strategic">استراتيجي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وضع العرض
                </label>
                <Select value={viewMode} onValueChange={(value: 'grid' | 'list' | 'compact') => setViewMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">شبكة</SelectItem>
                    <SelectItem value="list">قائمة</SelectItem>
                    <SelectItem value="compact">مضغوط</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  التحديث التلقائي
                </label>
                <Switch
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  فترة التحديث (ثواني)
                </label>
                <div className="px-2">
                  <Slider
                    value={refreshInterval}
                    onValueChange={setRefreshInterval}
                    max={300}
                    min={10}
                    step={10}
                    className="w-full"
                    disabled={!autoRefresh}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10ث</span>
                    <span>{refreshInterval[0]}ث</span>
                    <span>300ث</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                تصدير التقرير
              </Button>
              <Button variant="outline">
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* التنبيهات الذكية */}
      {showAlerts && kpiAlerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <Bell className="w-5 h-5" />
              تنبيهات KPI ذكية ({kpiAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {kpiAlerts.slice(0, 3).map((alert: KPIAlert) => (
                <motion.div
                  key={alert.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    alert.severity === 'critical' ? 'bg-red-100 border-red-200' :
                    alert.severity === 'high' ? 'bg-orange-100 border-orange-200' :
                    alert.severity === 'medium' ? 'bg-yellow-100 border-yellow-200' :
                    'bg-blue-100 border-blue-200'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className={`p-2 rounded-lg ${
                    alert.severity === 'critical' ? 'bg-red-200' :
                    alert.severity === 'high' ? 'bg-orange-200' :
                    alert.severity === 'medium' ? 'bg-yellow-200' :
                    'bg-blue-200'
                  }`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    <p className="text-xs text-gray-600">{alert.message}</p>
                  </div>
                  <Badge className={getStatusColor(alert.severity)}>
                    {alert.severity === 'critical' ? 'حرج' :
                     alert.severity === 'high' ? 'عالي' :
                     alert.severity === 'medium' ? 'متوسط' : 'منخفض'}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* مؤشرات KPI الرئيسية */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
        viewMode === 'list' ? 'grid-cols-1' :
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      }`}>
        {metricsLoading ? (
          // حالة التحميل
          [...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          kpiMetrics.map((metric: KPIMetric) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`hover:shadow-lg transition-all duration-300 border-l-4 ${
                metric.status === 'excellent' ? 'border-l-green-500' :
                metric.status === 'good' ? 'border-l-blue-500' :
                metric.status === 'warning' ? 'border-l-yellow-500' :
                'border-l-red-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        metric.category === 'academic' ? 'bg-blue-100' :
                        metric.category === 'financial' ? 'bg-green-100' :
                        metric.category === 'operational' ? 'bg-purple-100' :
                        'bg-orange-100'
                      }`}>
                        {metric.category === 'academic' ? <BookOpen className="w-5 h-5 text-blue-600" /> :
                         metric.category === 'financial' ? <DollarSign className="w-5 h-5 text-green-600" /> :
                         metric.category === 'operational' ? <Settings className="w-5 h-5 text-purple-600" /> :
                         <Target className="w-5 h-5 text-orange-600" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                        <p className="text-xs text-gray-500">{metric.category}</p>
                      </div>
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {formatValue(metric.value, metric.unit)}
                      </span>
                      <span className="text-sm text-gray-500">الحالي</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-gray-600">
                        {formatValue(metric.target, metric.unit)}
                      </span>
                      <span className="text-sm text-gray-500">الهدف</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>التقدم نحو الهدف</span>
                        <span>{Math.round(calculateProgress(metric.value, metric.target))}%</span>
                      </div>
                      <Progress
                        value={calculateProgress(metric.value, metric.target)}
                        className="h-2"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status === 'excellent' ? 'ممتاز' :
                         metric.status === 'good' ? 'جيد' :
                         metric.status === 'warning' ? 'تحذير' :
                         'حرج'}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>تحديث: {new Date(metric.lastUpdated).toLocaleTimeString('ar-SA')}</span>
                      </div>
                    </div>

                    {metric.aiInsights && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">رؤية ذكية</span>
                        </div>
                        <p className="text-xs text-blue-700">{metric.aiInsights}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* التحليلات المفصلة والتنبؤات */}
      <Tabs defaultValue="detailed" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="detailed">التحليلات المفصلة</TabsTrigger>
          <TabsTrigger value="forecasts">التنبؤات المستقبلية</TabsTrigger>
          <TabsTrigger value="comparisons">المقارنات والمعايير</TabsTrigger>
        </TabsList>

        <TabsContent value="detailed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* رسم بياني للاتجاهات */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-blue-600" />
                  اتجاهات الأداء خلال الفترة المحددة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <LineChart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">سيتم عرض الرسوم البيانية التفاعلية هنا</p>
                    <p className="text-sm text-gray-400 mt-2">تطوير قيد التنفيذ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* توزيع الأداء حسب الفئات */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-green-600" />
                  توزيع الأداء حسب الفئات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <PieChart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">سيتم عرض مخطط التوزيع هنا</p>
                    <p className="text-sm text-gray-400 mt-2">تطوير قيد التنفيذ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                التنبؤات المستقبلية للمؤشرات الرئيسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {kpiMetrics.slice(0, 3).map((metric: KPIMetric) => (
                  <div key={metric.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{metric.name}</h4>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status === 'excellent' ? 'ممتاز' :
                         metric.status === 'good' ? 'جيد' :
                         metric.status === 'warning' ? 'تحذير' :
                         'حرج'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {formatValue(metric.value, metric.unit)}
                        </div>
                        <div className="text-xs text-gray-500">الحالي</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">
                          {formatValue(metric.value * 1.1, metric.unit)}
                        </div>
                        <div className="text-xs text-gray-500">متوقع (شهر)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">
                          {formatValue(metric.value * 1.2, metric.unit)}
                        </div>
                        <div className="text-xs text-gray-500">متوقع (3 أشهر)</div>
                      </div>
                    </div>

                    <Progress value={metric.confidence * 100} className="h-2 mb-2" />
                    <div className="text-xs text-gray-500 text-center">
                      دقة التنبؤ: {Math.round(metric.confidence * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparisons" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* مقارنة مع السنوات السابقة */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  مقارنة الأداء مع السنوات السابقة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">سيتم عرض مقارنات الأداء هنا</p>
                    <p className="text-sm text-gray-400 mt-2">تطوير قيد التنفيذ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* مقارنة مع المعايير الدولية */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  مقارنة مع المعايير الدولية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">سيتم عرض المقارنات الدولية هنا</p>
                    <p className="text-sm text-gray-400 mt-2">تطوير قيد التنفيذ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* معلومات النظام الذكي */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Cpu className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                كيف يعمل نظام KPI الذكي؟
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  <span>تحليل البيانات التاريخية والنماذج التنبؤية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-purple-600" />
                  <span>ربط مؤشرات الأداء مع الأهداف الاستراتيجية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-orange-600" />
                  <span>إرسال تنبيهات فورية عند انحراف المؤشرات</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600" />
                  <span>اقتراح إجراءات تصحيحية ذكية</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IntelligentKPIDashboard;
