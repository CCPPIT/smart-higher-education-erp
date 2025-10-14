import { z } from 'zod';

// مخططات التحقق من البيانات لمكتب الوزير

// مخطط المراسلات الوزارية
export const correspondenceSchema = z.object({
  subject: z.string().min(1, 'العنوان مطلوب'),
  content: z.string().min(1, 'المحتوى مطلوب'),
  senderId: z.string(),
  senderType: z.enum(['internal', 'external']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  category: z.enum(['decision', 'information', 'request', 'complaint']),
  attachments: z.array(z.any()).optional(),
  dueDate: z.date().optional(),
});

// مخطط القرارات الوزارية
export const decisionSchema = z.object({
  title: z.string().min(1, 'عنوان القرار مطلوب'),
  description: z.string().min(1, 'وصف القرار مطلوب'),
  decisionType: z.enum(['administrative', 'financial', 'academic', 'policy']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  decisionNumber: z.string().min(1, 'رقم القرار مطلوب'),
  budget: z.number().positive().optional(),
  implementationDate: z.date().optional(),
});

// مخطط الاجتماعات الوزارية
export const meetingSchema = z.object({
  title: z.string().min(1, 'عنوان الاجتماع مطلوب'),
  description: z.string().min(1, 'وصف الاجتماع مطلوب'),
  meetingType: z.enum(['regular', 'emergency', 'committee', 'bilateral']),
  scheduledDate: z.date(),
  location: z.string().optional(),
  virtualLink: z.string().optional(),
  agenda: z.array(z.any()).optional(),
  attendees: z.array(z.any()).optional(),
});

// مخطط التقارير
export const reportSchema = z.object({
  title: z.string().min(1, 'عنوان التقرير مطلوب'),
  type: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'annual', 'emergency']),
  category: z.enum(['performance', 'financial', 'academic', 'administrative']),
  departmentId: z.string(),
  content: z.string().min(1, 'محتوى التقرير مطلوب'),
  summary: z.string().optional(),
  metrics: z.any().optional(),
  recommendations: z.array(z.any()).optional(),
  attachments: z.array(z.any()).optional(),
});

// مخطط التوقيع الرقمي
export const digitalSignatureSchema = z.object({
  documentId: z.string(),
  documentType: z.enum(['decision', 'correspondence', 'report', 'contract']),
  signerId: z.string(),
  signerRole: z.enum(['minister', 'deputy', 'director']),
  signatureHash: z.string(),
  signatureMethod: z.enum(['digital', 'biometric', 'certificate']).default('digital'),
  verificationData: z.any().optional(),
});

// مخطط الأرشفة
export const archiveSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(['decision', 'correspondence', 'report', 'meeting', 'document']),
  relatedId: z.string(),
  relatedType: z.string(),
  filePath: z.string().optional(),
  metadata: z.any().optional(),
  accessLevel: z.enum(['public', 'restricted', 'confidential']).default('restricted'),
  retentionPeriod: z.number().default(5),
  tags: z.array(z.string()).optional(),
});

// مخطط المساعد الافتراضي
export const aiAssistantSchema = z.object({
  query: z.string().min(1, 'السؤال مطلوب'),
  context: z.any().optional(),
});

// مخطط التنبيهات الاستباقية
export const alertSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.enum(['deadline', 'performance', 'risk', 'opportunity', 'maintenance']),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  predictedDate: z.date(),
  confidence: z.number().min(0).max(1),
  impact: z.enum(['low', 'medium', 'high', 'critical']),
  affectedArea: z.string(),
  recommendedAction: z.string(),
  aiGenerated: z.boolean().default(true),
});

// مخطط تحليلات الأداء
export const analyticsSchema = z.object({
  period: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
  startDate: z.date(),
  endDate: z.date(),
  metrics: z.any(),
  insights: z.array(z.string()),
  recommendations: z.array(z.string()),
  trends: z.array(z.string()),
  benchmarks: z.array(z.string()),
});

// أنواع TypeScript المُستمدة من المخططات
export type CorrespondenceInput = z.infer<typeof correspondenceSchema>;
export type DecisionInput = z.infer<typeof decisionSchema>;
export type MeetingInput = z.infer<typeof meetingSchema>;
export type ReportInput = z.infer<typeof reportSchema>;
export type DigitalSignatureInput = z.infer<typeof digitalSignatureSchema>;
export type ArchiveInput = z.infer<typeof archiveSchema>;
export type AiAssistantInput = z.infer<typeof aiAssistantSchema>;
export type AlertInput = z.infer<typeof alertSchema>;
export type AnalyticsInput = z.infer<typeof analyticsSchema>;

// مخططات الاستعلامات والفلترة
export const correspondenceFiltersSchema = z.object({
  status: z.string().optional(),
  priority: z.string().optional(),
  category: z.string().optional(),
  limit: z.number().default(50),
  offset: z.number().default(0),
});

export const decisionFiltersSchema = z.object({
  status: z.string().optional(),
  type: z.string().optional(),
  priority: z.string().optional(),
  limit: z.number().default(50),
  offset: z.number().default(0),
});

export const meetingFiltersSchema = z.object({
  status: z.string().optional(),
  type: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  limit: z.number().default(50),
  offset: z.number().default(0),
});

export const reportFiltersSchema = z.object({
  type: z.string().optional(),
  category: z.string().optional(),
  departmentId: z.string().optional(),
  status: z.string().optional(),
  limit: z.number().default(50),
  offset: z.number().default(0),
});

export const alertFiltersSchema = z.object({
  priority: z.string().optional(),
  type: z.string().optional(),
  limit: z.number().default(20),
  offset: z.number().default(0),
});

export const archiveSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  accessLevel: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  limit: z.number().default(50),
  offset: z.number().default(0),
});

// أنواع الاستعلامات
export type CorrespondenceFilters = z.infer<typeof correspondenceFiltersSchema>;
export type DecisionFilters = z.infer<typeof decisionFiltersSchema>;
export type MeetingFilters = z.infer<typeof meetingFiltersSchema>;
export type ReportFilters = z.infer<typeof reportFiltersSchema>;
export type AlertFilters = z.infer<typeof alertFiltersSchema>;
export type ArchiveSearch = z.infer<typeof archiveSearchSchema>;
