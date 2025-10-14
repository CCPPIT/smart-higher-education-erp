'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Activity, Search, Filter, Download, Eye } from 'lucide-react';

const AuditPage = () => {
  const auditLogs = [
    {
      id: '1',
      user: 'أحمد محمد',
      action: 'تسجيل دخول',
      timestamp: '2024-01-15 10:30:00',
      ip: '192.168.1.100',
      status: 'نجح'
    },
    {
      id: '2',
      user: 'فاطمة علي',
      action: 'إنشاء قرار وزاري',
      timestamp: '2024-01-15 09:15:00',
      ip: '192.168.1.101',
      status: 'نجح'
    },
    {
      id: '3',
      user: 'محمد حسن',
      action: 'تعديل ملف مستخدم',
      timestamp: '2024-01-15 08:45:00',
      ip: '192.168.1.102',
      status: 'نجح'
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
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden"
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
              سجل التدقيق
            </motion.h1>
            <motion.p
              className="text-indigo-100 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              مراجعة شاملة لجميع أنشطة النظام والمستخدمين
            </motion.p>
          </div>
        </motion.div>

        {/* أدوات البحث والتصفية */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex gap-2">
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              بحث متقدم
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              تصفية
            </Button>
          </div>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500">
            <Download className="w-4 h-4 mr-2" />
            تصدير السجل
          </Button>
        </div>

        {/* سجل التدقيق */}
        <div className="space-y-4">
          {auditLogs.map((log, index) => (
            <motion.div
              key={log.id}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{log.user}</p>
                    <p className="text-sm text-gray-600">{log.action}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600">{log.timestamp}</p>
                  <p className="text-xs text-gray-500">{log.ip}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={log.status === 'نجح' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {log.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default AuditPage;
