'use client';

import React from 'react';
import { ContentArea, MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Users, Clock, Calculator, Award, UserCheck, Calendar } from 'lucide-react';

const HRPage = () => {
  return (
    <ContentArea>

    
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة */}
        <motion.div
          className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden"
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
              الموارد البشرية
            </motion.h1>
            <motion.p
              className="text-pink-100 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              إدارة الموظفين والحضور وكشوف المرتبات والتدريب
            </motion.p>
          </div>
        </motion.div>

        {/* محتوى الصفحة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-800">
                <Users className="w-5 h-5" />
                إدارة الموظفين
              </CardTitle>
              <CardDescription className="text-pink-700">
                إدارة شاملة لجميع الموظفين والعاملين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">عرض الموظفين</Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Clock className="w-5 h-5" />
                الحضور والانصراف
              </CardTitle>
              <CardDescription className="text-orange-700">
                متابعة حضور وانصراف الموظفين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">عرض سجلات الحضور</Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Calculator className="w-5 h-5" />
                كشوف المرتبات
              </CardTitle>
              <CardDescription className="text-purple-700">
                إدارة كشوف المرتبات والرواتب
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">عرض كشوف المرتبات</Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentArea>
  );
};

export default HRPage;
