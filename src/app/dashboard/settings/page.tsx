'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Settings, Shield, Database, Globe, Bell, Palette } from 'lucide-react';

const SettingsPage = () => {
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
          className="bg-gradient-to-r from-gray-600 via-slate-600 to-zinc-600 rounded-2xl p-8 text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/10"
            animate={{
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="relative z-10">
            <motion.h1
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              الإعدادات والتكوين
            </motion.h1>
            <motion.p
              className="text-gray-100 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              إعدادات النظام والتكوين والتكاملات والنسخ الاحتياطي
            </motion.p>
          </div>
        </motion.div>

        {/* محتوى الصفحة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Settings className="w-5 h-5" />
                إعدادات النظام
              </CardTitle>
              <CardDescription className="text-gray-700">
                إعدادات عامة للنظام والتكوين الأساسي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">عرض إعدادات النظام</Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Globe className="w-5 h-5" />
                التكاملات
              </CardTitle>
              <CardDescription className="text-blue-700">
                إدارة التكامل مع الأنظمة الأخرى
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">إدارة التكاملات</Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Bell className="w-5 h-5" />
                إعدادات التنبيهات
              </CardTitle>
              <CardDescription className="text-green-700">
                تكوين نظام التنبيهات والإشعارات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">إعدادات التنبيهات</Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default SettingsPage;
