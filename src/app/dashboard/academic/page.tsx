'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen, Award, Calendar, TrendingUp } from 'lucide-react';

const AcademicPage = () => {
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
          className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden"
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
              الشؤون الأكاديمية
            </motion.h1>
            <motion.p
              className="text-indigo-100 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              إدارة الطلاب وأعضاء هيئة التدريس والمناهج الدراسية
            </motion.p>
          </div>
        </motion.div>

        {/* محتوى الصفحة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Users className="w-5 h-5" />
                إدارة الطلاب
              </CardTitle>
              <CardDescription className="text-blue-700">
                إدارة شاملة لجميع الطلاب والمتدربين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">عرض تفاصيل الطلاب</Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <BookOpen className="w-5 h-5" />
                المناهج والمقررات
              </CardTitle>
              <CardDescription className="text-green-700">
                إدارة المناهج والمقررات الدراسية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">عرض المناهج</Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Award className="w-5 h-5" />
                أعضاء هيئة التدريس
              </CardTitle>
              <CardDescription className="text-purple-700">
                إدارة أعضاء هيئة التدريس والمحاضرين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">عرض الهيئة التدريسية</Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default AcademicPage;
