'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { motion } from 'framer-motion';
import {
  AssistantHeader,
  OperationalMetrics,
  CoordinationTasks,
  TeamMembers,
  UpcomingDeadlines,
  PerformanceReports
} from './components';

export default function AssistantMinisterOffice() {
  return (
    <ContentArea>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة مع الإحصائيات العامة */}
        <AssistantHeader />

        {/* المؤشرات التشغيلية */}
        <OperationalMetrics />

        {/* قسم مهام التنسيق وأعضاء الفريق */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CoordinationTasks />
          <TeamMembers />
        </div>

        {/* المواعيد النهائية والتقارير */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingDeadlines />
          <PerformanceReports />
        </div>
      </motion.div>
    </ContentArea>
  );
}
