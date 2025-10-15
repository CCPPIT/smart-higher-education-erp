'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Lock, Shield, Eye, AlertTriangle, CheckCircle } from 'lucide-react';

const SecurityPage = () => {
  const securityStats = [
    { title: 'حالة الأمان', value: 'ممتاز', status: 'success' },
    { title: 'آخر فحص أمني', value: 'قبل ساعتين', status: 'success' },
    { title: 'محاولات الاختراق', value: '0', status: 'success' },
    { title: 'النسخ الاحتياطي', value: 'نشط', status: 'success' }
  ];

  return (
    <MainLayout>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة */}
        <motion.div
          className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10">
            <motion.h1
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              الأمان والحماية
            </motion.h1>
            <motion.p
              className="text-red-100 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              مراقبة وحماية أمنية متقدمة للنظام
            </motion.p>
          </div>
        </motion.div>

        {/* إحصائيات الأمان */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                {stat.status === 'success' ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* إجراءات الأمان */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <Lock className="w-5 h-5" />
                إدارة كلمات المرور
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">إدارة كلمات المرور</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Eye className="w-5 h-5" />
                مراقبة النشاط
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">عرض سجل النشاط</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Shield className="w-5 h-5" />
                إعدادات الحماية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">تكوين الحماية</Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default SecurityPage;
