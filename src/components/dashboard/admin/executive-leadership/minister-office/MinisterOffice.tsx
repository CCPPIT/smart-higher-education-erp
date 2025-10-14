'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { motion } from 'framer-motion';
import {
  MinisterHeader,
  MinisterStats,
  RecentActivities,
  UpcomingMeetings,
  AISuggestions,
  Notifications
} from './components';

export default function MinisterOffice() {
  return (
    <ContentArea>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة مع الإحصائيات العامة */}
        <MinisterHeader />

        {/* الإحصائيات الرئيسية */}
        <MinisterStats />

        {/* قسم الأنشطة والاجتماعات */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentActivities />
          <UpcomingMeetings />
        </div>

        {/* أدوات المساعد الذكي والتنبيهات */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AISuggestions />
          <Notifications />
        </div>
      </motion.div>
    </ContentArea>
  );
}
