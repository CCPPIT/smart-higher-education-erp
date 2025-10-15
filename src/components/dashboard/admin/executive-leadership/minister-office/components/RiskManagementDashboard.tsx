'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, TrendingUp, CheckCircle, Clock, Target } from 'lucide-react';

interface Risk {
  id: string;
  title: string;
  description: string;
  probability: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  status: 'identified' | 'assessed' | 'mitigated' | 'closed';
  owner: string;
  dueDate: string;
  aiRecommendation?: string;
}

export default function RiskManagementDashboard() {
  const [risks] = useState<Risk[]>([
    {
      id: 'risk-1',
      title: 'تأخير في مشاريع البنية التحتية',
      description: 'احتمالية تأخير في إنجاز مشاريع البنية التحتية بسبب نقص الموارد',
      probability: 75,
      impact: 'high',
      status: 'assessed',
      owner: 'مدير المشاريع',
      dueDate: '2024-02-15',
      aiRecommendation: 'زيادة الموارد الفنية وتطبيق نظام مراقبة متقدم'
    },
    {
      id: 'risk-2',
      title: 'زيادة في التكاليف التشغيلية',
      description: 'ارتفاع محتمل في التكاليف التشغيلية بنسبة 15%',
      probability: 60,
      impact: 'medium',
      status: 'mitigated',
      owner: 'مدير المالية',
      dueDate: '2024-02-20'
    }
  ]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'identified': return 'bg-blue-100 text-blue-800';
      case 'assessed': return 'bg-yellow-100 text-yellow-800';
      case 'mitigated': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* رأس إدارة المخاطر */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            لوحة إدارة المخاطر والمخاطر
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            إدارة شاملة واستباقية للمخاطر مع تحليل ذكي وتوصيات وقائية
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
            <CheckCircle className="w-3 h-3 mr-1" />
            مخاطر تحت السيطرة
          </Badge>
          <Button variant="outline">
            <Target className="w-4 h-4 mr-2" />
            تحليل جديد
          </Button>
        </div>
      </div>

      {/* إحصائيات المخاطر */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-red-600">مخاطر حرجة</p>
                <p className="text-2xl font-bold text-red-900">
                  {risks.filter(r => r.impact === 'critical').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-orange-600">قيد التقييم</p>
                <p className="text-2xl font-bold text-orange-900">
                  {risks.filter(r => r.status === 'assessed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600">تم التخفيف</p>
                <p className="text-2xl font-bold text-green-900">
                  {risks.filter(r => r.status === 'mitigated').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600">احتمالية منخفضة</p>
                <p className="text-2xl font-bold text-blue-900">
                  {risks.filter(r => r.probability < 50).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* قائمة المخاطر */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المخاطر الحالية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {risks.map((risk) => (
              <div key={risk.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{risk.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getImpactColor(risk.impact)}>
                      {risk.impact === 'critical' ? 'حرج' :
                       risk.impact === 'high' ? 'عالي' :
                       risk.impact === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                    <Badge className={getStatusColor(risk.status)}>
                      {risk.status === 'identified' ? 'محدد' :
                       risk.status === 'assessed' ? 'مقيم' :
                       risk.status === 'mitigated' ? 'مخفف' : 'مغلق'}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">احتمالية:</span>
                    <div className="flex-1">
                      <Progress value={risk.probability} className="h-2" />
                      <span className="text-xs text-gray-500 mt-1">{risk.probability}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">المسؤول:</span>
                    <span>{risk.owner}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">تاريخ الاستحقاق:</span>
                    <span>{new Date(risk.dueDate).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>

                {risk.aiRecommendation && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-sm text-blue-900 mb-1">توصية الذكاء الاصطناعي:</h5>
                    <p className="text-xs text-blue-700">{risk.aiRecommendation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
