'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Home,
  Users,
  FileText,
  Settings,
  TrendingUp,
  Activity,
  Crown,
  Building2,
  Calendar,
  Bell,
  CheckCircle,
  Clock,
  Target,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  PieChart
} from 'lucide-react';

export default function MainDashboard() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('ar-SA'));
  }, []);

  const quickStats = [
    {
      title: 'إجمالي المستخدمين',
      value: '2,847',
      change: '+15%',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'الجلسات النشطة',
      value: '156',
      change: '+8%',
      icon: Activity,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      title: 'المهام المكتملة',
      value: '1,234',
      change: '+23%',
      icon: CheckCircle,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      title: 'وقت الاستجابة',
      value: '0.8s',
      change: 'ممتاز',
      icon: Clock,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'د. أحمد محمد',
      action: 'قام بتحديث ملف تعليمات السلامة',
      time: 'منذ 5 دقائق',
      type: 'تحديث',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 2,
      user: 'أ. سارة أحمد',
      action: 'أكملت مهمة مراجعة التقارير الشهرية',
      time: 'منذ 15 دقيقة',
      type: 'إنجاز',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 3,
      user: 'م. محمد علي',
      action: 'أنشأ اجتماعاً جديداً لفريق التطوير',
      time: 'منذ 30 دقيقة',
      type: 'جديد',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: 4,
      user: 'د. فاطمة حسن',
      action: 'رفعت تقريراً عن أداء القسم الأكاديمي',
      time: 'منذ ساعة',
      type: 'رفع',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const systemModules = [
    {
      title: 'الإدارة العامة',
      description: 'إدارة المستخدمين والأدوار والصلاحيات',
      icon: Settings,
      href: '/dashboard/admin',
      gradient: 'from-gray-500 to-slate-500',
      badge: 'إدارة'
    },
    {
      title: 'القيادة العليا',
      description: 'مكاتب القيادة العليا والإدارات الاستراتيجية',
      icon: Crown,
      href: '/dashboard/admin/executive-leadership',
      gradient: 'from-amber-500 to-orange-500',
      badge: 'استراتيجي'
    },
    {
      title: 'الأكاديمي',
      description: 'إدارة الشؤون التعليمية والأكاديمية',
      icon: GraduationCap,
      href: '/dashboard/academic',
      gradient: 'from-blue-500 to-indigo-500',
      badge: 'تعليمي'
    },
    {
      title: 'المالي',
      description: 'إدارة الشؤون المالية والمحاسبة',
      icon: PieChart,
      href: '/dashboard/financial',
      gradient: 'from-green-500 to-teal-500',
      badge: 'مالي'
    },
    {
      title: 'الموارد البشرية',
      description: 'إدارة الموظفين والموارد البشرية',
      icon: Users,
      href: '/dashboard/hr',
      gradient: 'from-pink-500 to-rose-500',
      badge: 'موارد بشرية'
    },
    {
      title: 'التقارير',
      description: 'عرض وإنشاء التقارير والإحصائيات',
      icon: TrendingUp,
      href: '/dashboard/reports',
      gradient: 'from-violet-500 to-purple-500',
      badge: 'تحليلي'
    }
  ];

  return (
   
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* رأس لوحة التحكم */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Home className="w-8 h-8 text-blue-600" />
              لوحة التحكم الرئيسية
            </h1>
            <p className="text-gray-600 mt-1">
              مرحباً بك في نظام إدارة التعليم العالي الذكي
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 border-0">
              <div className="w-2 h-2 bg-green-500 rounded-full ml-1"></div>
              النظام متاح
            </Badge>
            <div className="text-sm text-gray-500">
              آخر تحديث: {currentDate || 'جاري التحميل...'}
            </div>
          </div>
        </div>

        {/* الإحصائيات السريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 bg-gradient-to-br ${stat.bgGradient} rounded-lg`}>
                      <stat.icon className={`w-6 h-6 text-transparent bg-gradient-to-br ${stat.gradient} bg-clip-text`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* النظام الرئيسي والأنشطة الحديثة */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* وحدات النظام */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  وحدات النظام الرئيسية
                </CardTitle>
                <CardDescription>
                  اختر الوحدة التي تريد العمل عليها
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {systemModules.map((module, index) => (
                    <motion.div
                      key={module.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-auto p-4 flex flex-col items-start gap-3 hover:shadow-md transition-all"
                        asChild
                      >
                        <a href={module.href}>
                          <div className="flex items-center gap-3 w-full">
                            <div className={`p-2 bg-gradient-to-br ${module.gradient} rounded-lg`}>
                              <module.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 text-right">
                              <h3 className="font-semibold text-gray-900">{module.title}</h3>
                              <p className="text-sm text-gray-600">{module.description}</p>
                            </div>
                          </div>
                          <Badge className="bg-gray-100 text-gray-800 border-0 text-xs">
                            {module.badge}
                          </Badge>
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* الأنشطة الحديثة */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-600" />
                  الأنشطة الحديثة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`p-1 bg-gray-100 rounded-full`}>
                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            {activity.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  عرض جميع الأنشطة
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* التنبيهات والإعلانات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">مرحباً بك في نظام التعليم العالي الذكي</h3>
                  <p className="text-gray-600 mt-1">
                    نظام متطور يساعدك في إدارة جميع جوانب التعليم العالي بكفاءة وفعالية
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  ابدأ الآن
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
  
  );
}
