'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { motion } from 'framer-motion';
import {
  SpecialAffairsHeader,
  SecurityMetrics,
  SensitiveProjects,
  AccessRequests,
  MonitoringTools,
  RecentActivities
} from './components';

export default function SpecialAffairsOffice() {
  return (
    <ContentArea>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة مع الإحصائيات العامة */}
        <SpecialAffairsHeader />

        {/* مؤشرات الأمان */}
        <SecurityMetrics />

        {/* المشاريع الحساسة وطلبات الوصول */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SensitiveProjects />
          <AccessRequests />
        </div>

        {/* أدوات المراقبة والنشاطات الأخيرة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonitoringTools />
          <RecentActivities />
        </div>
      </motion.div>
    </ContentArea>
  );
}
