'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Clock, MapPin, Users, Phone, Radio, Activity, Shield, Zap } from 'lucide-react';

interface Crisis {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'monitoring' | 'resolved';
  location: string;
  affectedAreas: string[];
  responseTeams: string[];
  startTime: string;
  estimatedEndTime?: string;
  casualties?: number;
  propertyDamage?: string;
  aiAnalysis?: string;
}

export default function CrisisManagementSystem() {
  const [activeCrises, setActiveCrises] = useState<Crisis[]>([
    {
      id: 'crisis-1',
      title: 'عاصفة رملية شديدة',
      description: 'عاصفة رملية تؤثر على المناطق الشمالية من المملكة',
      severity: 'high',
      status: 'active',
      location: 'المناطق الشمالية',
      affectedAreas: ['الح frontière الشمالية', 'الجوف', 'حائل'],
      responseTeams: ['فريق الدفاع المدني', 'فريق الإنقاذ', 'فريق الدعم اللوجستي'],
      startTime: new Date().toISOString(),
      casualties: 12,
      propertyDamage: 'أضرار متوسطة في البنية التحتية',
      aiAnalysis: 'توقعات بانحسار العاصفة خلال 6 ساعات'
    }
  ]);

  const [selectedCrisis, setSelectedCrisis] = useState<Crisis | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'monitoring': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* رأس نظام إدارة الأزمات */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-600" />
            نظام إدارة الأزمات والطوارئ
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            إدارة شاملة ومتكاملة للأزمات والطوارئ مع استجابة سريعة ومنسقة
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
            <Activity className="w-3 h-3 mr-1" />
            نظام طوارئ نشط
          </Badge>
          <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
            <Radio className="w-4 h-4 mr-2" />
            إعلان طوارئ جديدة
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة للأزمات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-red-600">أزمات نشطة</p>
                <p className="text-2xl font-bold text-red-900">
                  {activeCrises.filter(c => c.status === 'active').length}
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
                <p className="text-sm text-orange-600">قيد المراقبة</p>
                <p className="text-2xl font-bold text-orange-900">
                  {activeCrises.filter(c => c.status === 'monitoring').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600">فرق الاستجابة</p>
                <p className="text-2xl font-bold text-blue-900">
                  {activeCrises.reduce((acc, c) => acc + c.responseTeams.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600">محلولة اليوم</p>
                <p className="text-2xl font-bold text-green-900">
                  {activeCrises.filter(c => c.status === 'resolved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تبويبات إدارة الأزمات */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">الأزمات النشطة</TabsTrigger>
          <TabsTrigger value="monitoring">قيد المراقبة</TabsTrigger>
          <TabsTrigger value="resolved">المحلولة</TabsTrigger>
          <TabsTrigger value="resources">الموارد والفرق</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeCrises.filter(crisis => crisis.status === 'active').map((crisis) => (
              <Card key={crisis.id} className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        {crisis.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getSeverityColor(crisis.severity)}>
                          خطورة {crisis.severity === 'critical' ? 'حرجة' :
                                 crisis.severity === 'high' ? 'عالية' :
                                 crisis.severity === 'medium' ? 'متوسطة' : 'منخفضة'}
                        </Badge>
                        <Badge className={getStatusColor(crisis.status)}>
                          {crisis.status === 'active' ? 'نشطة' :
                           crisis.status === 'monitoring' ? 'مراقبة' : 'محلولة'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{crisis.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">الموقع:</span>
                      <span>{crisis.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">البداية:</span>
                      <span>{new Date(crisis.startTime).toLocaleString('ar-SA')}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">المناطق المتأثرة:</h4>
                    <div className="flex flex-wrap gap-1">
                      {crisis.affectedAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">فرق الاستجابة:</h4>
                    <div className="flex flex-wrap gap-1">
                      {crisis.responseTeams.map((team, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {crisis.aiAnalysis && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-sm text-blue-900 mb-1">تحليل الذكاء الاصطناعي:</h4>
                      <p className="text-xs text-blue-700">{crisis.aiAnalysis}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="w-16 h-16 mx-auto mb-4 text-blue-300" />
              <p className="text-gray-500">لا توجد أزمات قيد المراقبة حالياً</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-green-300" />
              <p className="text-gray-500">لا توجد أزمات محلولة اليوم</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-purple-300" />
              <p className="text-gray-500">إدارة موارد وفرق الاستجابة للطوارئ</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
