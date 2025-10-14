'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { motion } from 'framer-motion';
import {
  NationalProjectsHeader,
  ProjectMetrics,
  MajorProjects,
  PerformanceReport
} from './components';

export default function NationalProjectsOffice() {
  return (
    <ContentArea>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة مع الإحصائيات العامة */}
        <NationalProjectsHeader />

        {/* المؤشرات الرئيسية */}
        <ProjectMetrics />

        {/* المشاريع الكبرى وحالة التقدم */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MajorProjects />
          <PerformanceReport />
        </div>
      </motion.div>
    </ContentArea>
  );
}
