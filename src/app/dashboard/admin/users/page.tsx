'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Users, UserPlus, Search, Filter } from 'lucide-react';

const UsersPage = () => {
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
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden"
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
              إدارة المستخدمين
            </motion.h1>
            <motion.p
              className="text-blue-100 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              إدارة شاملة لحسابات المستخدمين والصلاحيات
            </motion.p>
          </div>
        </motion.div>

        {/* محتوى الصفحة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Users className="w-5 h-5" />
                إجمالي المستخدمين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,234</p>
              <p className="text-sm text-gray-600">مستخدم نشط</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <UserPlus className="w-5 h-5" />
                مستخدمين جدد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">45</p>
              <p className="text-sm text-gray-600">هذا الشهر</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Search className="w-5 h-5" />
                البحث والتصفية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">البحث المتقدم</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Filter className="w-5 h-5" />
                إدارة الصلاحيات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">إدارة الأدوار</Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default UsersPage;
