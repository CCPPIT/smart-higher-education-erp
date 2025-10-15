'use client';

import React, { useState } from 'react';
import { ContentArea } from '@/components/layout';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MinisterHeader,
  MinisterStats,
  RecentActivities,
  UpcomingMeetings,
  AISuggestions,
  Notifications,
  CorrespondenceSystem,
  DecisionDashboard,
  PerformanceAnalytics,
  MeetingManager,
  DigitalSignature,
  InstantReports,
  GovernmentIntegration,
  SmartArchive,
  AIAssistant,
  PredictiveAlerts,
  AdvancedPredictiveAnalytics,
  IntelligentKPIDashboard,
  IntelligentTaskManager,
  IntelligentCollaborationPlatform,
  SmartDocumentManager,
  CrisisManagementSystem,
  FinancialPerformanceMonitor,
  RiskManagementDashboard,
  InternalCommunicationsHub,
  GovernmentProjectsManager,
  QualityAssuranceCenter,
  HRManagementSuite,
  ComplianceAuditSystem,
  EventsConferencesManager,
  EnvironmentalSustainabilityMonitor
} from './components';

export default function MinisterOffice() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <ContentArea>
      <motion.div
        className="space-y-8 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* رأس الصفحة */}
        <MinisterHeader />

        {/* تبويبات مكتب الوزير */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1 overflow-x-auto">
            <TabsTrigger value="overview" className="text-xs lg:text-sm">نظرة عامة</TabsTrigger>
            <TabsTrigger value="correspondence" className="text-xs lg:text-sm">المراسلات</TabsTrigger>
            <TabsTrigger value="decisions" className="text-xs lg:text-sm">القرارات</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs lg:text-sm">التحليلات</TabsTrigger>
            <TabsTrigger value="meetings" className="text-xs lg:text-sm">الاجتماعات</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs lg:text-sm">المهام</TabsTrigger>
            <TabsTrigger value="collaboration" className="text-xs lg:text-sm">التعاون</TabsTrigger>
            <TabsTrigger value="documents" className="text-xs lg:text-sm">الوثائق</TabsTrigger>
            <TabsTrigger value="crisis" className="text-xs lg:text-sm">إدارة الأزمات</TabsTrigger>
            <TabsTrigger value="financial" className="text-xs lg:text-sm">الأداء المالي</TabsTrigger>
            <TabsTrigger value="risk" className="text-xs lg:text-sm">إدارة المخاطر</TabsTrigger>
            <TabsTrigger value="communications" className="text-xs lg:text-sm">التواصل الداخلي</TabsTrigger>
            <TabsTrigger value="projects" className="text-xs lg:text-sm">المشاريع الحكومية</TabsTrigger>
            <TabsTrigger value="quality" className="text-xs lg:text-sm">مراقبة الجودة</TabsTrigger>
            <TabsTrigger value="hr" className="text-xs lg:text-sm">الموارد البشرية</TabsTrigger>
            <TabsTrigger value="compliance" className="text-xs lg:text-sm">الامتثال والتدقيق</TabsTrigger>
            <TabsTrigger value="events" className="text-xs lg:text-sm">الفعاليات</TabsTrigger>
            <TabsTrigger value="environmental" className="text-xs lg:text-sm">البيئة والاستدامة</TabsTrigger>
            <TabsTrigger value="signatures" className="text-xs lg:text-sm">التوقيعات</TabsTrigger>
            <TabsTrigger value="reports" className="text-xs lg:text-sm">التقارير</TabsTrigger>
            <TabsTrigger value="integration" className="text-xs lg:text-sm">التكامل</TabsTrigger>
            <TabsTrigger value="archive" className="text-xs lg:text-sm">الأرشيف</TabsTrigger>
            <TabsTrigger value="ai-assistant" className="text-xs lg:text-sm">المساعد الذكي</TabsTrigger>
            <TabsTrigger value="predictive" className="text-xs lg:text-sm">التحليلات التنبؤية</TabsTrigger>
            <TabsTrigger value="kpi-dashboard" className="text-xs lg:text-sm">لوحة KPI الذكية</TabsTrigger>
          </TabsList>

          {/* تبويب النظرة العامة */}
          <TabsContent value="overview" className="space-y-8">
            <MinisterStats />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentActivities />
              <UpcomingMeetings />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AISuggestions />
              <Notifications />
              <PredictiveAlerts />
            </div>
          </TabsContent>

          {/* تبويب نظام إدارة المراسلات */}
          <TabsContent value="correspondence">
            <CorrespondenceSystem />
          </TabsContent>

          {/* تبويب لوحة تحكم القرارات */}
          <TabsContent value="decisions">
            <DecisionDashboard />
          </TabsContent>

          {/* تبويب تحليل الأداء بالذكاء الاصطناعي */}
          <TabsContent value="analytics">
            <PerformanceAnalytics />
          </TabsContent>

          {/* تبويب إدارة الاجتماعات */}
          <TabsContent value="meetings">
            <MeetingManager />
          </TabsContent>

          {/* تبويب المهام والمشاريع الذكي */}
          <TabsContent value="tasks">
            <IntelligentTaskManager />
          </TabsContent>

          {/* تبويب منصة التعاون الذكية */}
          <TabsContent value="collaboration">
            <IntelligentCollaborationPlatform />
          </TabsContent>

          {/* تبويب نظام إدارة الوثائق الذكي */}
          <TabsContent value="documents">
            <SmartDocumentManager />
          </TabsContent>

          {/* تبويب إدارة الأزمات والطوارئ */}
          <TabsContent value="crisis">
            <CrisisManagementSystem />
          </TabsContent>

          {/* تبويب مراقبة الأداء المالي */}
          <TabsContent value="financial">
            <FinancialPerformanceMonitor />
          </TabsContent>

          {/* تبويب إدارة المخاطر */}
          <TabsContent value="risk">
            <RiskManagementDashboard />
          </TabsContent>

          {/* تبويب التواصل الداخلي */}
          <TabsContent value="communications">
            <InternalCommunicationsHub />
          </TabsContent>

          {/* تبويب إدارة المشاريع الحكومية */}
          <TabsContent value="projects">
            <GovernmentProjectsManager />
          </TabsContent>

          {/* تبويب مراقبة الجودة */}
          <TabsContent value="quality">
            <QualityAssuranceCenter />
          </TabsContent>

          {/* تبويب إدارة الموارد البشرية */}
          <TabsContent value="hr">
            <HRManagementSuite />
          </TabsContent>

          {/* تبويب الامتثال والتدقيق */}
          <TabsContent value="compliance">
            <ComplianceAuditSystem />
          </TabsContent>

          {/* تبويب إدارة الفعاليات والمؤتمرات */}
          <TabsContent value="events">
            <EventsConferencesManager />
          </TabsContent>

          {/* تبويب مراقبة الأداء البيئي والاستدامة */}
          <TabsContent value="environmental">
            <EnvironmentalSustainabilityMonitor />
          </TabsContent>

          {/* تبويب نظام التقارير الفورية */}
          <TabsContent value="reports">
            <InstantReports />
          </TabsContent>

          {/* تبويب التكامل مع الجهات الحكومية */}
          <TabsContent value="integration">
            <GovernmentIntegration />
          </TabsContent>

          {/* تبويب الأرشفة الذكية */}
          <TabsContent value="archive">
            <SmartArchive />
          </TabsContent>

          {/* تبويب المساعد الافتراضي */}
          <TabsContent value="ai-assistant">
            <AIAssistant />
          </TabsContent>

          {/* تبويب التحليلات التنبؤية المتقدمة */}
          <TabsContent value="predictive">
            <AdvancedPredictiveAnalytics />
          </TabsContent>

          {/* تبويب لوحة KPI الذكية */}
          <TabsContent value="kpi-dashboard">
            <IntelligentKPIDashboard />
          </TabsContent>
        </Tabs>
      </motion.div>
    </ContentArea>
  );
}
