'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Building2, Plus, Edit, Trash2, Eye } from 'lucide-react';

const DepartmentsPage = () => {
  const departments = [
    { id: '1', name: 'الشؤون الأكاديمية', employees: 45, status: 'نشط' },
    { id: '2', name: 'الشؤون المالية', employees: 23, status: 'نشط' },
    { id: '3', name: 'الموارد البشرية', employees: 18, status: 'نشط' },
    { id: '4', name: 'تقنية المعلومات', employees: 32, status: 'نشط' }
  ];

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
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white relative overflow-hidden"
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
              إدارة الإدارات
            </motion.h1>
            <motion.p
              className="text-green-100 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              تنظيم وإدارة الهيكل الإداري للمؤسسة
            </motion.p>
          </div>
        </motion.div>

        {/* محتوى الصفحة */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
              <Plus className="w-4 h-4 mr-2" />
              إضافة إدارة جديدة
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {dept.status}
                </Badge>
              </div>

              <h3 className="font-bold text-lg text-gray-900 mb-2">{dept.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{dept.employees} موظف</p>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default DepartmentsPage;
