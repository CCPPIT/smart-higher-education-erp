'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Crown, Users, Shield, Star, Building2, Target, MessageSquare, TrendingUp, Award } from 'lucide-react';

interface ExecutiveOffice {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  status: 'نشط' | 'قيد التطوير' | 'مخطط له';
  priority: 'عالي' | 'متوسط' | 'منخفض';
  teamSize: number;
  currentProjects: number;
  completedTasks: number;
}

const executiveOffices: ExecutiveOffice[] = [
  {
    id: 'minister-office',
    title: 'مكتب الوزير',
    description: 'القيادة العليا والتوجيه الاستراتيجي',
    icon: Crown,
    gradient: 'from-purple-500 to-pink-500',
    status: 'نشط',
    priority: 'عالي',
    teamSize: 12,
    currentProjects: 8,
    completedTasks: 156
  },
  {
    id: 'deputy-office',
    title: 'مكتب نائب الوزير',
    description: 'الإشراف على العمليات اليومية والتنفيذ',
    icon: Users,
    gradient: 'from-blue-500 to-cyan-500',
    status: 'نشط',
    priority: 'عالي',
    teamSize: 10,
    currentProjects: 6,
    completedTasks: 134
  },
  {
    id: 'assistant-office',
    title: 'مكتب مساعد الوزير',
    description: 'دعم الوزير في المهام الإدارية والتنسيقية',
    icon: Shield,
    gradient: 'from-green-500 to-emerald-500',
    status: 'نشط',
    priority: 'عالي',
    teamSize: 8,
    currentProjects: 5,
    completedTasks: 98
  },
  {
    id: 'advisors-office',
    title: 'مكتب المستشارين',
    description: 'تقديم الاستشارات الاستراتيجية والفنية',
    icon: Star,
    gradient: 'from-orange-500 to-amber-500',
    status: 'نشط',
    priority: 'متوسط',
    teamSize: 6,
    currentProjects: 4,
    completedTasks: 76
  },
  {
    id: 'special-affairs',
    title: 'مكتب الشؤون الخاصة',
    description: 'إدارة الملفات الخاصة والسرية',
    icon: Shield,
    gradient: 'from-red-500 to-rose-500',
    status: 'نشط',
    priority: 'عالي',
    teamSize: 5,
    currentProjects: 3,
    completedTasks: 45
  },
  {
    id: 'general-secretariat',
    title: 'الأمانة العامة للوزارة',
    description: 'تنسيق الأعمال الإدارية والإجرائية',
    icon: Building2,
    gradient: 'from-indigo-500 to-purple-500',
    status: 'نشط',
    priority: 'عالي',
    teamSize: 15,
    currentProjects: 12,
    completedTasks: 203
  },
  {
    id: 'national-projects',
    title: 'مكتب المدير التنفيذي للمشاريع الوطنية',
    description: 'الإشراف على المشاريع الوطنية الكبرى والمبادرات الحكومية',
    icon: Target,
    gradient: 'from-emerald-500 to-green-600',
    status: 'نشط',
    priority: 'عالي',
    teamSize: 20,
    currentProjects: 15,
    completedTasks: 189
  },
  {
    id: 'spokesperson',
    title: 'مكتب المتحدث الرسمي',
    description: 'إدارة التواصل الإعلامي والعلاقات العامة للوزارة',
    icon: MessageSquare,
    gradient: 'from-cyan-500 to-blue-500',
    status: 'نشط',
    priority: 'متوسط',
    teamSize: 8,
    currentProjects: 6,
    completedTasks: 112
  },
  {
    id: 'planning-followup',
    title: 'مكتب التخطيط والمتابعة الوزارية',
    description: 'تخطيط ومتابعة الأداء وتقييم الإنجازات على مستوى الوزارة',
    icon: TrendingUp,
    gradient: 'from-violet-500 to-purple-500',
    status: 'نشط',
    priority: 'عالي',
    teamSize: 10,
    currentProjects: 8,
    completedTasks: 145
  },
  {
    id: 'protocol-office',
    title: 'مكتب البروتوكول والعلاقات الرسمية',
    description: 'إدارة البروتوكول الرسمي والعلاقات الدولية والدبلوماسية',
    icon: Award,
    gradient: 'from-yellow-500 to-amber-500',
    status: 'نشط',
    priority: 'متوسط',
    teamSize: 7,
    currentProjects: 4,
    completedTasks: 67
  }
];

const ExecutiveLeadershipPage = () => {
  const totalTeamMembers = executiveOffices.reduce((sum, office) => sum + office.teamSize, 0);
  const totalProjects = executiveOffices.reduce((sum, office) => sum + office.currentProjects, 0);
  const totalTasks = executiveOffices.reduce((sum, office) => sum + office.completedTasks, 0);

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
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                القيادة العليا
              </h1>
              <p className="text-gray-600 mt-1">إدارة وتنسيق أعلى مستويات الإدارة في الوزارة</p>
            </div>
          </div>

          {/* إحصائيات عامة */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900">{totalTeamMembers}</div>
                <div className="text-sm text-blue-700">إجمالي أعضاء الفريق</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-900">{totalProjects}</div>
                <div className="text-sm text-green-700">المشاريع الجارية</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-900">{totalTasks}</div>
                <div className="text-sm text-purple-700">المهام المنجزة</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* قائمة المكاتب */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {executiveOffices.map((office, index) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${office.gradient}`}>
                      <office.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge
                      variant={office.status === 'نشط' ? 'default' : office.status === 'قيد التطوير' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {office.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-right">{office.title}</CardTitle>
                  <CardDescription className="text-right text-sm">
                    {office.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* مؤشرات الأداء */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-sm font-semibold text-blue-900">{office.teamSize}</div>
                        <div className="text-xs text-blue-700">فريق</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-sm font-semibold text-green-900">{office.currentProjects}</div>
                        <div className="text-xs text-green-700">مشاريع</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <div className="text-sm font-semibold text-purple-900">{office.completedTasks}</div>
                        <div className="text-xs text-purple-700">مهام</div>
                      </div>
                    </div>

                    {/* شريط الأولوية */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">الأولوية:</span>
                      <Badge
                        variant={office.priority === 'عالي' ? 'destructive' : office.priority === 'متوسط' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {office.priority}
                      </Badge>
                    </div>

                    <Button
                      className="w-full group-hover:scale-105 transition-transform"
                      variant="outline"
                    >
                      عرض التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* قسم التقارير والإحصائيات */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                تقرير الأداء الشهري
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>نسبة إنجاز المشاريع</span>
                  <span className="font-semibold text-green-600">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>رضا الموظفين</span>
                  <span className="font-semibold text-blue-600">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>كفاءة التواصل</span>
                  <span className="font-semibold text-purple-600">89%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                الاجتماعات القادمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">اجتماع مجلس الوزارة</div>
                    <div className="text-sm text-gray-600">غداً 10:00 ص</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">مراجعة المشاريع الوطنية</div>
                    <div className="text-sm text-gray-600">بعد غد 2:00 م</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </ContentArea>
  );
};

export default ExecutiveLeadershipPage;
