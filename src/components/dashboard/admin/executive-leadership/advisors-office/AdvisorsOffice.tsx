'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { motion } from 'framer-motion';
import {
  AdvisoryHeader,
  AdvisoryMetrics,
  ActiveConsultations,
  ExpertTeam,
  PerformanceReports
} from './components';

export default function AdvisorsOffice() {
  return (
    <ContentArea>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة مع الإحصائيات العامة */}
        <AdvisoryHeader />

        {/* المؤشرات الاستشارية */}
        <AdvisoryMetrics />

        {/* قسم الاستشارات وفريق المستشارين */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ActiveConsultations />
          <ExpertTeam />
        </div>

        {/* التقارير والتحليلات */}
        <PerformanceReports />
      </motion.div>
    </ContentArea>
  );
}
