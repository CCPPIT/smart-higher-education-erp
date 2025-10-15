'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  BookOpen,
  Zap,
  Brain,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { useMinisterOfficeStore, useMinisterOfficeActions, useMinisterOfficeState } from '@/stores/minister-office';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface PerformanceAnalyticsProps {
  className?: string;
}

const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ className }) => {
  const {
    analytics,
    loading
  } = useMinisterOfficeState();

  const {
    generateAnalytics,
    fetchAnalytics
  } = useMinisterOfficeActions();

  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedStartDate, setSelectedStartDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split('T')[0];
  });
  const [selectedEndDate, setSelectedEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      fetchAnalytics({
        period: selectedPeriod as any,
        startDate: new Date(selectedStartDate),
        endDate: new Date(selectedEndDate)
      });
    }
  }, [selectedPeriod, selectedStartDate, selectedEndDate, fetchAnalytics]);

  const handleGenerateAnalytics = async () => {
    try {
      await generateAnalytics({
        period: selectedPeriod as any,
        startDate: new Date(selectedStartDate),
        endDate: new Date(selectedEndDate)
      });
    } catch (error) {
      console.error('فشل في إنشاء التحليلات:', error);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading.analytics) {
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
      {/* رأس نظام التحليلات */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            تحليل الأداء الوزاري عبر الذكاء الاصطناعي
          </h2>
          <p className="text-gray-600 mt-1">
            تحليلات متقدمة ورؤى ذكية لأداء مكتب الوزير والتنبؤ بالاتجاهات المستقبلية
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">يومي</SelectItem>
              <SelectItem value="weekly">أسبوعي</SelectItem>
              <SelectItem value="monthly">شهري</SelectItem>
              <SelectItem value="quarterly">ربع سنوي</SelectItem>
              <SelectItem value="yearly">سنوي</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleGenerateAnalytics} className="bg-purple-600 hover:bg-purple-700">
            <Zap className="w-4 h-4 mr-2" />
            تحليل جديد
          </Button>
        </div>
      </div>

      {/* فلاتر التاريخ */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ البداية
              </label>
              <input
                type="date"
                value={selectedStartDate}
                onChange={(e) => setSelectedStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ النهاية
              </label>
              <input
                type="date"
                value={selectedEndDate}
                onChange={(e) => setSelectedEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* مؤشرات الأداء الرئيسية */}
      {analytics && analytics.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">إجمالي القرارات</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {analytics[0]?.metrics?.totalDecisions || 0}
                      </p>
                      <p className={`text-sm flex items-center gap-1 ${getTrendColor(analytics[0]?.trends?.decisions || 'neutral')}`}>
                        {getTrendIcon(analytics[0]?.trends?.decisions || 'neutral')}
                        {analytics[0]?.trends?.decisions === 'up' ? 'زيادة' : analytics[0]?.trends?.decisions === 'down' ? 'انخفاض' : 'مستقر'}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">متوسط وقت المعالجة</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {analytics[0]?.metrics?.avgProcessingTime || 0}
                      </p>
                      <p className="text-sm text-gray-500">يوم</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">معدل النجاح</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {Math.round((analytics[0]?.metrics?.successRate || 0) * 100)}%
                      </p>
                      <Progress
                        value={(analytics[0]?.metrics?.successRate || 0) * 100}
                        className="w-full mt-2"
                      />
                    </div>
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">الاجتماعات المنعقدة</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {analytics[0]?.metrics?.totalMeetings || 0}
                      </p>
                      <p className={`text-sm flex items-center gap-1 ${getTrendColor(analytics[0]?.trends?.meetings || 'neutral')}`}>
                        {getTrendIcon(analytics[0]?.trends?.meetings || 'neutral')}
                        اجتماع
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* الرؤى والتحليلات */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    الرؤى الرئيسية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics[0]?.insights?.map((insight: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{insight}</p>
                    </div>
                  )) || (
                    <div className="text-center py-4 text-gray-500">
                      <Lightbulb className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p>لا توجد رؤى متاحة حالياً</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    التوصيات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics[0]?.recommendations?.map((recommendation: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{recommendation}</p>
                    </div>
                  )) || (
                    <div className="text-center py-4 text-gray-500">
                      <Target className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p>لا توجد توصيات متاحة حالياً</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* اتجاهات الأداء */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  اتجاهات الأداء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics[0]?.trends && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className={`text-2xl font-bold flex items-center justify-center gap-2 ${getTrendColor(analytics[0]?.trends?.decisions)}`}>
                            {getTrendIcon(analytics[0]?.trends?.decisions)}
                            {analytics[0]?.trends?.decisions === 'up' ? 'تصاعدي' : analytics[0]?.trends?.decisions === 'down' ? 'تنازلي' : 'مستقر'}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">اتجاه القرارات</p>
                        </div>

                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className={`text-2xl font-bold flex items-center justify-center gap-2 ${getTrendColor(analytics[0]?.trends?.meetings)}`}>
                            {getTrendIcon(analytics[0]?.trends?.meetings)}
                            {analytics[0]?.trends?.meetings === 'up' ? 'تصاعدي' : analytics[0]?.trends?.meetings === 'down' ? 'تنازلي' : 'مستقر'}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">اتجاه الاجتماعات</p>
                        </div>

                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className={`text-2xl font-bold flex items-center justify-center gap-2 ${getTrendColor(analytics[0]?.trends?.performance)}`}>
                            {getTrendIcon(analytics[0]?.trends?.performance)}
                            {analytics[0]?.trends?.performance === 'up' ? 'تصاعدي' : analytics[0]?.trends?.performance === 'down' ? 'تنازلي' : 'مستقر'}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">اتجاه الأداء العام</p>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium text-gray-900">مقارنة مع المعايير</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analytics[0]?.benchmarks?.map((benchmark: any, index: number) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-700">{benchmark}</p>
                        </div>
                      )) || (
                        <div className="col-span-2 text-center py-4 text-gray-500">
                          <Award className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p>لا توجد مقارنات متاحة حالياً</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* معلومات التحليل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    معلومات التحليل الذكي
                  </h3>
                  <Badge className="bg-green-100 text-green-800 border-0">
                    مدعوم بالذكاء الاصطناعي
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>فترة التحليل: {selectedStartDate} إلى {selectedEndDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span>نوع التحليل: {selectedPeriod === 'daily' ? 'يومي' :
                      selectedPeriod === 'weekly' ? 'أسبوعي' :
                      selectedPeriod === 'monthly' ? 'شهري' :
                      selectedPeriod === 'quarterly' ? 'ربع سنوي' : 'سنوي'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-600" />
                    <span>مدعوم بـ: GPT-4 ونماذج متقدمة أخرى</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {!analytics && (
        <div className="text-center py-12">
          <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            لا توجد تحليلات متاحة
          </h3>
          <p className="text-gray-600 mb-4">
            قم بإنشاء تحليل جديد للحصول على رؤى ذكية حول أداء مكتب الوزير
          </p>
          <Button onClick={handleGenerateAnalytics} className="bg-purple-600 hover:bg-purple-700">
            <Zap className="w-4 h-4 mr-2" />
            إنشاء تحليل جديد
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default PerformanceAnalytics;
