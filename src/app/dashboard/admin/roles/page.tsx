'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Shield, Plus, Edit, Trash2, Eye, Users } from 'lucide-react';

const RolesPage = () => {
  const roles = [
    {
      id: '1',
      name: 'مدير النظام',
      description: 'صلاحيات كاملة على النظام',
      users: 3,
      permissions: ['قراءة', 'كتابة', 'حذف', 'إدارة المستخدمين']
    },
    {
      id: '2',
      name: 'مدير أكاديمي',
      description: 'إدارة الشؤون الأكاديمية والطلاب',
      users: 12,
      permissions: ['قراءة', 'كتابة', 'إدارة الطلاب']
    },
    {
      id: '3',
      name: 'موظف مالي',
      description: 'إدارة الشؤون المالية والمدفوعات',
      users: 8,
      permissions: ['قراءة', 'كتابة', 'إدارة المدفوعات']
    }
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
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden"
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
              الأدوار والصلاحيات
            </motion.h1>
            <motion.p
              className="text-purple-100 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              إدارة الأدوار والصلاحيات للمستخدمين
            </motion.p>
          </div>
        </motion.div>

        {/* محتوى الصفحة */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Plus className="w-4 h-4 mr-2" />
              إضافة دور جديد
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-purple-100 text-purple-800">
                  {role.users} مستخدمين
                </Badge>
              </div>

              <h3 className="font-bold text-lg text-gray-900 mb-2">{role.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{role.description}</p>

              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">الصلاحيات:</h4>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((permission) => (
                    <Badge key={permission} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default RolesPage;
