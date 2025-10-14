'use client';

import React from 'react';
import { ContentArea, MainLayout } from '@/components/layout';
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
  Building2
} from 'lucide-react';

const AdminDashboard = () => {
  const statsCards = [
    {
      title: 'إجمالي المستخدمين',
      value: '1,234',
      change: '+12%',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'الجلسات النشطة',
      value: '89',
      change: '+5%',
      icon: Activity,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      title: 'الملفات المرفوعة',
      value: '2,456',
      change: '+23%',
      icon: FileText,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      title: 'النظام متاح',
      value: '99.9%',
      change: 'مستقر',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
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
        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                className={`relative overflow-hidden rounded-xl ${stat.bgGradient} p-6 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    {stat.title}
                  </CardTitle>
                  <motion.div
                    className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient}`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </motion.div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-600">
                    {stat.change}
                  </p>
                </CardContent>
              </motion.div>
            );
          })}
        </div>

        {/* قسم الوصول السريع */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-purple-200/50">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-pink-100/30"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <CardHeader className="relative z-10">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Crown className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <CardTitle className="text-purple-800">الوصول السريع</CardTitle>
                  <CardDescription className="text-purple-700">
                    الوصول السريع إلى أهم الوظائف والأقسام
                  </CardDescription>
                </div>
              </motion.div>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'مكتب الوزير', icon: Crown, href: '/dashboard/admin/minister-office', description: 'إدارة المراسلات والقرارات' },
                  { title: 'إدارة المستخدمين', icon: Users, href: '/dashboard/admin/users', description: 'إدارة حسابات المستخدمين' },
                  { title: 'إدارة الأقسام', icon: Building2, href: '/dashboard/admin/departments', description: 'تنظيم الهيكل الإداري' },
                  { title: 'التقارير والإحصائيات', icon: TrendingUp, href: '/dashboard/reports', description: 'عرض التقارير والإحصائيات' },
                  { title: 'إعدادات النظام', icon: Settings, href: '/dashboard/settings', description: 'تكوين النظام والإعدادات' },
                  { title: 'سجل التدقيق', icon: Activity, href: '/dashboard/admin/audit', description: 'مراجعة سجل الأنشطة' }
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.button
                      key={item.title}
                      className="flex items-center gap-3 p-4 bg-white/70 rounded-lg border border-gray-200/50 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.02,
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300"
                        whileHover={{ rotate: 5 }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </motion.div>

                      <div className="text-right flex-1">
                        <p className="font-medium text-sm text-gray-800 group-hover:text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* قسم الأنشطة الأخيرة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 border-green-200/50">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-emerald-100/30"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <CardHeader className="relative z-10">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Activity className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <CardTitle className="text-green-800">الأنشطة الأخيرة</CardTitle>
                  <CardDescription className="text-green-700">
                    آخر التحديثات والأنشطة في النظام
                  </CardDescription>
                </div>
              </motion.div>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="space-y-3">
                {[
                  { activity: 'تم إنشاء قرار وزاري جديد', user: 'أحمد محمد', time: 'قبل 10 دقائق', type: 'قرار' },
                  { activity: 'تم تحديث حالة مراسلة', user: 'فاطمة علي', time: 'قبل 30 دقيقة', type: 'مراسلة' },
                  { activity: 'تم جدولة اجتماع جديد', user: 'محمد أحمد', time: 'قبل ساعتين', type: 'اجتماع' },
                  { activity: 'تم رفع تقرير أداء شهري', user: 'سارة خالد', time: 'أمس', type: 'تقرير' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/70 rounded-lg border border-green-200/50 backdrop-blur-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-green-600 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{activity.activity}</p>
                      <p className="text-xs text-gray-600">بواسطة {activity.user} • {activity.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </ContentArea>
  );
};

export default AdminDashboard;
