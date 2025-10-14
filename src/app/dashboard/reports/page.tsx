'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, FileText, Download, Calendar } from 'lucide-react';

const ReportsPage = () => {
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
          className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden"
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
              التقارير والإحصائيات
            </motion.h1>
            <motion.p
              className="text-violet-100 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              تقارير شاملة وإحصائيات متقدمة لجميع أنشطة النظام
            </motion.p>
          </div>
        </motion.div>

        {/* محتوى الصفحة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <BarChart3 className="w-5 h-5" />
                التقارير الأكاديمية
              </CardTitle>
              <CardDescription className="text-blue-700">
                تقارير شاملة عن الأداء الأكاديمي والطلاب
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">عرض التقارير الأكاديمية</Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <TrendingUp className="w-5 h-5" />
                التقارير المالية
              </CardTitle>
              <CardDescription className="text-green-700">
                تقارير مالية شاملة وتحليلات مالية متقدمة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">عرض التقارير المالية</Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <PieChart className="w-5 h-5" />
                تقارير الموارد البشرية
              </CardTitle>
              <CardDescription className="text-purple-700">
                تقارير شاملة عن الموظفين والأداء البشري
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">عرض تقارير الموارد البشرية</Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default ReportsPage;
