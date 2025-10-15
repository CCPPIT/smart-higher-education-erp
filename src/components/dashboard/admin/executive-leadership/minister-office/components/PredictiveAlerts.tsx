'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Target,
  Calendar,
  Brain,
  Eye,
  Zap,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface PredictiveAlert {
  id: string;
  title: string;
  description: string;
  type: 'deadline' | 'performance' | 'risk' | 'opportunity' | 'maintenance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
  predictedDate: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  affectedArea: string;
  recommendedAction: string;
  aiGenerated: boolean;
}

// مكون منفصل للتاريخ لتجنب مشكلة hydration
const FormattedDate: React.FC<{ dateString: string }> = ({ dateString }) => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    setFormattedDate(new Date(dateString).toLocaleDateString('ar-SA'));
  }, [dateString]);

  return <span suppressHydrationWarning>{formattedDate}</span>;
};

interface PredictiveAlertsProps {
  className?: string;
}

const PredictiveAlerts: React.FC<PredictiveAlertsProps> = ({ className }) => {
  const [activeAlerts] = useState<PredictiveAlert[]>([
    {
      id: 'alert-1',
      title: 'تأخير محتمل في مشروع التعليم الرقمي',
      description: 'بناءً على تحليل البيانات، هناك احتمالية تأخير بنسبة 78% في إنجاز مشروع التعليم الرقمي.',
      type: 'risk',
      priority: 'high',
      status: 'active',
      predictedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      confidence: 0.78,
      impact: 'high',
      affectedArea: 'قسم التعليم الرقمي',
      recommendedAction: 'تعيين مطورين إضافيين أو الاستعانة بشركاء خارجيين.',
      aiGenerated: true
    },
    {
      id: 'alert-2',
      title: 'فرصة لتحسين كفاءة العمليات الإدارية',
      description: 'يمكن تحسين كفاءة العمليات الإدارية بنسبة 35% من خلال تطبيق نظام إدارة الوثائق الذكي.',
      type: 'opportunity',
      priority: 'medium',
      status: 'active',
      predictedDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      confidence: 0.92,
      impact: 'medium',
      affectedArea: 'جميع الإدارات',
      recommendedAction: 'تطبيق نظام إدارة الوثائق الذكي وتدريب الموظفين.',
      aiGenerated: true
    }
  ]);

  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredAlerts = activeAlerts.filter((alert: PredictiveAlert) => {
    const matchesPriority = priorityFilter === 'all' || alert.priority === priorityFilter;
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    return matchesPriority && matchesType;
  });

  const handleAcknowledgeAlert = async (alertId: string) => {
    toast.success('تم تأكيد التنبيه');
  };

  const handleResolveAlert = async (alertId: string) => {
    toast.success('تم حل التنبيه');
  };

  const getPriorityBadge = (priority: string) => {
    const configs = {
      critical: { label: 'حرجة', color: 'bg-red-100 text-red-800' },
      high: { label: 'عالية', color: 'bg-orange-100 text-orange-800' },
      medium: { label: 'متوسطة', color: 'bg-yellow-100 text-yellow-800' },
      low: { label: 'منخفضة', color: 'bg-green-100 text-green-800' }
    };

    const config = configs[priority as keyof typeof configs] || configs.medium;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      deadline: Clock,
      performance: Target,
      risk: AlertTriangle,
      opportunity: Target,
      maintenance: Clock
    };

    const Icon = icons[type as keyof typeof icons] || AlertTriangle;
    return <Icon className="w-4 h-4" />;
  };

  const getImpactBadge = (impact: string) => {
    const impactConfig = {
      low: { label: 'منخفض', color: 'bg-green-100 text-green-800' },
      medium: { label: 'متوسط', color: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'عالي', color: 'bg-orange-100 text-orange-800' },
      critical: { label: 'حرج', color: 'bg-red-100 text-red-800' }
    };

    const config = impactConfig[impact as keyof typeof impactConfig] || impactConfig.medium;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getConfidenceBar = (confidence: number) => {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-600">الثقة:</span>
        <Progress value={confidence * 100} className="flex-1 h-2" />
        <span className="text-xs text-gray-600">{Math.round(confidence * 100)}%</span>
      </div>
    );
  };

  return (
    <motion.div className={`space-y-6 ${className}`}>
      {/* رأس نظام التنبيهات */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-orange-600" />
            التنبيهات الاستباقية والتوقعات الذكية
          </h2>
          <p className="text-gray-600 mt-1">
            تنبيهات ذكية تستبق الأحداث الهامة وتساعد في اتخاذ القرارات الاستباقية
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800 border-0">
            <Brain className="w-3 h-3 mr-1" />
            مدعوم بالذكاء الاصطناعي
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* فلاتر التنبيهات */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700 mb-2">عدد التنبيهات النشطة</div>
              <div className="text-3xl font-bold text-gray-900">{filteredAlerts.length}</div>
            </div>

            <div className="flex gap-2">
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأولويات</SelectItem>
                  <SelectItem value="critical">حرجة</SelectItem>
                  <SelectItem value="high">عالية</SelectItem>
                  <SelectItem value="medium">متوسطة</SelectItem>
                  <SelectItem value="low">منخفضة</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="deadline">موعد نهائي</SelectItem>
                  <SelectItem value="performance">أداء</SelectItem>
                  <SelectItem value="risk">مخاطر</SelectItem>
                  <SelectItem value="opportunity">فرص</SelectItem>
                  <SelectItem value="maintenance">صيانة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* قائمة التنبيهات */}
      <div className="grid gap-4">
        <AnimatePresence>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert: PredictiveAlert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className={`border-l-4 ${
                  alert.priority === 'critical' ? 'border-l-red-500' :
                  alert.priority === 'high' ? 'border-l-orange-500' :
                  alert.priority === 'medium' ? 'border-l-yellow-500' :
                  'border-l-green-500'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${
                            alert.priority === 'critical' ? 'bg-red-100' :
                            alert.priority === 'high' ? 'bg-orange-100' :
                            alert.priority === 'medium' ? 'bg-yellow-100' :
                            'bg-green-100'
                          }`}>
                            {getTypeIcon(alert.type)}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {alert.title}
                          </h3>
                          {getPriorityBadge(alert.priority)}
                        </div>

                        <p className="text-gray-600 mb-3">
                          {alert.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>متوقع في: <FormattedDate dateString={alert.predictedDate} /></span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Target className="w-4 h-4" />
                            <span>المنطقة المتأثرة: {alert.affectedArea}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Brain className="w-4 h-4" />
                            <span>مدعوم بالذكاء الاصطناعي</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-gray-600">الثقة:</span>
                          <Progress value={alert.confidence * 100} className="flex-1 h-2" />
                          <span className="text-xs text-gray-600">{Math.round(alert.confidence * 100)}%</span>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-900 mb-1">الإجراء الموصى به:</p>
                          <p className="text-sm text-blue-700">{alert.recommendedAction}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {alert.status === 'active' && (
                          <>
                            <Button variant="outline" size="sm" onClick={() => handleAcknowledgeAlert(alert.id)}>
                              <Eye className="w-4 h-4 mr-1" />
                              تأكيد
                            </Button>
                            <Button size="sm" onClick={() => handleResolveAlert(alert.id)}>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              حل
                            </Button>
                          </>
                        )}
                        {alert.status === 'acknowledged' && (
                          <Button size="sm" onClick={() => handleResolveAlert(alert.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            حل
                          </Button>
                        )}
                        {alert.status === 'resolved' && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            محلول
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="mb-2">لا توجد تنبيهات نشطة حالياً</p>
              <p className="text-sm">ستظهر التنبيهات الجديدة هنا عند توفرها</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* معلومات إضافية */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h3 className="font-medium text-gray-900">كيف تعمل التنبيهات الاستباقية؟</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-600" />
              <span>تحليل البيانات التاريخية والنماذج التنبؤية</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-600" />
              <span>كشف الأنماط والمخاطر المحتملة مسبقاً</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PredictiveAlerts;
