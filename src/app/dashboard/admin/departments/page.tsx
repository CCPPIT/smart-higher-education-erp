'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Building2, Users, Plus, Edit, Trash2, Search, CheckCircle, TrendingUp } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
  status: 'نشط' | 'غير نشط';
  budget: number;
}

const departments: Department[] = [
  {
    id: '1',
    name: 'تقنية المعلومات',
    description: 'إدارة أنظمة الحاسوب وتقنية المعلومات',
    manager: 'د. أحمد محمد',
    employeeCount: 45,
    status: 'نشط',
    budget: 500000
  },
  {
    id: '2',
    name: 'الشؤون الأكاديمية',
    description: 'إدارة الشؤون التعليمية والأكاديمية',
    manager: 'د. فاطمة علي',
    employeeCount: 32,
    status: 'نشط',
    budget: 750000
  },
  {
    id: '3',
    name: 'الموارد البشرية',
    description: 'إدارة الموظفين والموارد البشرية',
    manager: 'أ. محمد سعد',
    employeeCount: 28,
    status: 'نشط',
    budget: 300000
  },
  {
    id: '4',
    name: 'الشؤون المالية',
    description: 'إدارة الشؤون المالية والمحاسبة',
    manager: 'أ. سارة أحمد',
    employeeCount: 18,
    status: 'نشط',
    budget: 400000
  }
];

export default function DepartmentsPage() {
  return (
    <ContentArea>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              إدارة الإدارات
            </h1>
            <p className="text-gray-600 mt-1">
              إدارة وتنظيم الهيكل التنظيمي للمؤسسة
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            إدارة جديدة
          </Button>
        </div>

        {/* إحصائيات الإدارات */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الإدارات</p>
                  <p className="text-3xl font-bold text-gray-900">{departments.length}</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الإدارات النشطة</p>
                  <p className="text-3xl font-bold text-green-600">
                    {departments.filter(d => d.status === 'نشط').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الموظفين</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {departments.reduce((sum, d) => sum + d.employeeCount, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الميزانية</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {departments.reduce((sum, d) => sum + d.budget, 0).toLocaleString()} ريال
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* قائمة الإدارات */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>الإدارات والأقسام</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث في الإدارات..."
                    className="pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((department) => (
                <motion.div
                  key={department.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{department.name}</h3>
                      <p className="text-sm text-gray-600">{department.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">
                          مدير: {department.manager}
                        </span>
                        <Badge className={`${
                          department.status === 'نشط'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {department.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">الموظفين</p>
                      <p className="font-semibold">{department.employeeCount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">الميزانية</p>
                      <p className="font-semibold">{department.budget.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </ContentArea>
  );
}
