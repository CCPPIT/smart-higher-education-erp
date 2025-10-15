'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, Eye, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SecurityPage() {
  return (
    <ContentArea>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Shield className="w-8 h-8 text-red-600" />
              الأمان والحماية
            </h1>
            <p className="text-gray-600 mt-1">
              إدارة أمان النظام والحماية من التهديدات السيبرانية
            </p>
          </div>
          <Badge className="bg-green-100 text-green-800 border-0">
            آمن
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">حالة الأمان</p>
                  <p className="text-2xl font-bold text-green-600">ممتاز</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">التهديدات المكتشفة</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">المستخدمين النشطين</p>
                  <p className="text-2xl font-bold text-blue-600">247</p>
                </div>
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الجلسات النشطة</p>
                  <p className="text-2xl font-bold text-purple-600">89</p>
                </div>
                <Key className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-600" />
                إعدادات الأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">التحقق بخطوتين</span>
                <Badge className="bg-green-100 text-green-800">مفعل</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">تشفير البيانات</span>
                <Badge className="bg-green-100 text-green-800">مفعل</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">مراقبة النشاط</span>
                <Badge className="bg-green-100 text-green-800">مفعل</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                التنبيهات الأمنية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">لا توجد تهديدات أمنية حالياً</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700">آخر فحص أمني: قبل ساعتين</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentArea>
  );
}
