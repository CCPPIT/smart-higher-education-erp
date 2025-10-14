'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { motion } from 'framer-motion';
import {
  DeputyHeader,
  KeyMetrics,
  DepartmentStatus,
  UrgentTasks,
  MonthlyGoals,
  DailyActivity
} from './components';

export default function DeputyMinisterOffice() {
  return (
    <ContentArea>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة مع الإحصائيات العامة */}
        <DeputyHeader />

        {/* المؤشرات الرئيسية */}
        <KeyMetrics />

        {/* قسم حالة الإدارات والمهام العاجلة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DepartmentStatus />
          <UrgentTasks />
        </div>

        {/* أهداف الشهر ونشاط اليوم */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyGoals />
          <DailyActivity />
        </div>
      </motion.div>
    </ContentArea>
  );
}
