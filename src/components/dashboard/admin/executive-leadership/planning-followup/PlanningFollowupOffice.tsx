'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { motion } from 'framer-motion';
import {
  PlanningFollowupHeader,
  PlanningMetrics,
  MinistryGoals,
  UpcomingMeetings
} from './components';

export default function PlanningFollowupOffice() {
  return (
    <ContentArea>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة مع الإحصائيات العامة */}
        <PlanningFollowupHeader />

        {/* المؤشرات الرئيسية */}
        <PlanningMetrics />

        {/* أهداف الوزارة واجتماعات المتابعة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MinistryGoals />
          <UpcomingMeetings />
        </div>
      </motion.div>
    </ContentArea>
  );
}
