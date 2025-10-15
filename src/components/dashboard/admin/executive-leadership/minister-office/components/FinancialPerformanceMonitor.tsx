'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Target, PieChart, BarChart3 } from 'lucide-react';

interface FinancialMetric {
  id: string;
  title: string;
  currentValue: number;
  previousValue: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: 'revenue' | 'expense' | 'budget' | 'savings';
}

export default function FinancialPerformanceMonitor() {
  const [metrics] = useState<FinancialMetric[]>([
    {
      id: 'revenue-1',
      title: 'الإيرادات الشهرية',
      currentValue: 12500000,
      previousValue: 11800000,
      target: 13000000,
      unit: 'ريال',
      trend: 'up',
      category: 'revenue'
    },
    {
      id: 'expense-1',
      title: 'المصروفات التشغيلية',
      currentValue: 8200000,
      previousValue: 8500000,
      target: 8000000,
      unit: 'ريال',
      trend: 'down',
      category: 'expense'
    },
    {
      id: 'budget-1',
      title: 'التنفيذ الميزاني',
      currentValue: 78,
      previousValue: 75,
      target: 85,
      unit: '%',
      trend: 'up',
      category: 'budget'
    }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ar-SA').format(value);
  };

  return (
    <div className="space-y-6">
      {/* رأس مراقبة الأداء المالي */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-600" />
            مراقبة الأداء المالي والميزانية
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            تتبع شامل للأداء المالي والميزانية مع تحليلات متقدمة وتوقعات دقيقة
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
            <BarChart3 className="w-3 h-3 mr-1" />
            أداء مالي ممتاز
          </Badge>
          <Button variant="outline">
            <PieChart className="w-4 h-4 mr-2" />
            تقرير مفصل
          </Button>
        </div>
      </div>

      {/* مؤشرات الأداء المالي الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.id} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                {metric.title}
                {getTrendIcon(metric.trend)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-gray-900">
                {metric.unit === 'ريال' ? formatCurrency(metric.currentValue) : `${metric.currentValue}${metric.unit}`}
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                  {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : ''}
                  {Math.abs(((metric.currentValue - metric.previousValue) / metric.previousValue) * 100).toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500">مقابل الشهر السابق</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">التقدم نحو الهدف</span>
                  <span className="font-medium">{((metric.currentValue / metric.target) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(metric.currentValue / metric.target) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* تحليلات مالية متقدمة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              توزيع الميزانية حسب القطاعات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { sector: 'التعليم', amount: 4500000, percentage: 45, color: 'bg-blue-500' },
                { sector: 'الصحة', amount: 3200000, percentage: 32, color: 'bg-green-500' },
                { sector: 'البنية التحتية', amount: 1800000, percentage: 18, color: 'bg-orange-500' },
                { sector: 'الأخرى', amount: 500000, percentage: 5, color: 'bg-gray-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded ${item.color}`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{item.sector}</span>
                      <span className="text-sm text-gray-600">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                  <span className="font-medium">{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              التوقعات المالية للربع القادم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">الإيرادات المتوقعة</p>
                  <p className="text-sm text-green-700">زيادة بنسبة 12%</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-green-900">{formatCurrency(14200000)}</p>
                  <p className="text-sm text-green-600">الربع القادم</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">المصروفات المتوقعة</p>
                  <p className="text-sm text-blue-700">انخفاض بنسبة 3%</p>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-blue-900">{formatCurrency(7950000)}</p>
                  <p className="text-sm text-blue-600">الربع القادم</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
