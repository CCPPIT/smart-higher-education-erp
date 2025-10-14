'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { motion } from 'framer-motion';
import {
  SecretariatHeader,
  AdministrativeMetrics,
  DepartmentStatus,
  TeamMembers,
  PerformanceReports,
  RecentActivities
} from './components';

export default function GeneralSecretariat() {
  return (
    <ContentArea>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة مع الإحصائيات العامة */}
        <SecretariatHeader />

        {/* المؤشرات الإدارية */}
        <AdministrativeMetrics />

        {/* قسم حالة الإدارات وأعضاء الفريق */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DepartmentStatus />
          <TeamMembers />
        </div>

        {/* تقرير الأداء والأنشطة الأخيرة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceReports />
          <RecentActivities />
        </div>
      </motion.div>
    </ContentArea>
  );
}
