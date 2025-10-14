'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { motion } from 'framer-motion';
import {
  ProtocolOfficeHeader,
  ProtocolMetrics,
  UpcomingEvents,
  InternationalRelations
} from './components';

export default function ProtocolOffice() {
  return (
    <ContentArea>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة مع الإحصائيات العامة */}
        <ProtocolOfficeHeader />

        {/* المؤشرات الرئيسية */}
        <ProtocolMetrics />

        {/* الفعاليات والعلاقات الدولية */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UpcomingEvents />
          <InternationalRelations />
        </div>
      </motion.div>
    </ContentArea>
  );
}
