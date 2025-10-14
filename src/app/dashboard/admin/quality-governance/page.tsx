'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Target, Award, BarChart3, Lightbulb, Zap, Activity, Users, Shield } from 'lucide-react';

const QualityGovernancePage = () => {
  const departments = [
    {
      id: 'quality-excellence',
      title: 'إدارة الجودة والتميز المؤسسي',
      description: 'ضمان جودة الخدمات والتميز في الأداء',
      icon: Award,
      href: '/dashboard/admin/quality-governance/quality-excellence',
      status: 'نشط',
      gradient: 'from-emerald-500 to-green-500',
      employees: 18
    },
    {
      id: 'strategic-planning',
      title: 'إدارة التخطيط الاستراتيجي',
      description: 'تطوير الخطط الاستراتيجية والتشغيلية',
      icon: Target,
      href: '/dashboard/admin/quality-governance/strategic-planning',
      status: 'نشط',
      gradient: 'from-blue-500 to-indigo-500',
      employees: 12
    },
    {
      id: 'institutional-performance',
      title: 'إدارة الأداء المؤسسي',
      description: 'قياس وتحسين الأداء المؤسسي',
      icon: BarChart3,
      href: '/dashboard/admin/quality-governance/institutional-performance',
      status: 'نشط',
      gradient: 'from-purple-500 to-pink-500',
      employees: 15
    },
    {
      id: 'risk-management',
      title: 'إدارة إدارة المخاطر',
      description: 'تحديد وإدارة المخاطر المؤسسية',
      icon: Shield,
      href: '/dashboard/admin/quality-governance/risk-management',
      status: 'نشط',
      gradient: 'from-red-500 to-orange-500',
      employees: 10
    },
    {
      id: 'continuous-improvement',
      title: 'إدارة التحسين المستمر',
      description: 'تطبيق منهجيات التحسين المستمر',
      icon: TrendingUp,
      href: '/dashboard/admin/quality-governance/continuous-improvement',
      status: 'نشط',
      gradient: 'from-cyan-500 to-blue-500',
      employees: 8
    },
    {
      id: 'efficiency-initiatives',
      title: 'إدارة مبادرات الكفاءة المؤسسية',
      description: 'تحسين الكفاءة والفعالية المؤسسية',
      icon: Zap,
      href: '/dashboard/admin/quality-governance/efficiency-initiatives',
      status: 'نشط',
      gradient: 'from-yellow-500 to-orange-500',
      employees: 14
    }
  ];

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
          className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden"
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
              الجودة والحوكمة والأداء - الفئة الثالثة
            </motion.h1>
            <motion.p
              className="text-emerald-100 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              إدارات الجودة والتخطيط الاستراتيجي وإدارة الأداء المؤسسي
            </motion.p>
          </div>
        </motion.div>

        {/* إحصائيات سريعة */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { title: 'مؤشر الجودة', value: '94%', icon: Award, color: 'text-emerald-600' },
            { title: 'مؤشر الأداء', value: '87%', icon: TrendingUp, color: 'text-blue-600' },
            { title: 'المخاطر المدارة', value: '156', icon: Shield, color: 'text-purple-600' },
            { title: 'المبادرات النشطة', value: '23', icon: Lightbulb, color: 'text-orange-600' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* الإدارات */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">الإدارات الرئيسية</h2>
            <Badge className="bg-emerald-100 text-emerald-800">الفئة الثالثة</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={dept.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-r ${dept.gradient} rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {dept.status}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2">{dept.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{dept.description}</p>
                  <p className="text-xs text-gray-500 mb-4">{dept.employees} موظف</p>

                  <Button className="w-full">
                    الدخول إلى الإدارة
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* مؤشرات الأداء الرئيسية */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Activity className="w-5 h-5" />
                حالة المشاريع الحالية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">برنامج تحسين الجودة</span>
                  <Badge className="bg-green-100 text-green-800">مكتمل 85%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">تطوير نظام إدارة الأداء</span>
                  <Badge className="bg-blue-100 text-blue-800">قيد التنفيذ</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">مراجعة استراتيجية 2024</span>
                  <Badge className="bg-yellow-100 text-yellow-800">في المراجعة</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">تقييم المخاطر المؤسسية</span>
                  <Badge className="bg-green-100 text-green-800">مكتمل</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <CheckCircle className="w-5 h-5" />
                أهداف التميز المؤسسي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">الحصول على شهادة الجودة</span>
                  <span className="font-medium text-green-600">✓ مكتمل</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">تطبيق نظام إدارة المخاطر</span>
                  <span className="font-medium text-green-600">✓ مكتمل</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">تطوير نظام قياس الأداء</span>
                  <span className="font-medium text-blue-600">قيد التنفيذ</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">تحقيق أهداف الاستدامة</span>
                  <span className="font-medium text-yellow-600">في التقدم</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </ContentArea>
  );
};

export default QualityGovernancePage;
