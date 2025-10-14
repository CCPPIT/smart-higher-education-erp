'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { motion } from 'framer-motion';
import {
  SpokespersonHeader,
  CommunicationMetrics,
  UpcomingEvents,
  PerformanceReport
} from './components';

export default function SpokespersonOffice() {
  return (
    <ContentArea>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة مع الإحصائيات العامة */}
        <SpokespersonHeader />

        {/* المؤشرات الرئيسية */}
        <CommunicationMetrics />

        {/* الفعاليات الإعلامية وتقرير الأداء */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UpcomingEvents />
          <PerformanceReport />
        </div>
      </motion.div>
    </ContentArea>
  );
}
