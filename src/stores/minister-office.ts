import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import {
  CorrespondenceInput,
  DecisionInput,
  MeetingInput,
  ReportInput,
  AlertInput,
  type CorrespondenceFilters,
  type DecisionFilters,
  type MeetingFilters,
  type ReportFilters,
  type AlertFilters,
} from '@/schemas/minister-office';
import { trpc } from '@/trpc/client';

// أنواع البيانات
interface MinisterCorrespondence {
  id: string;
  subject: string;
  content: string;
  senderId: string;
  senderType: 'internal' | 'external';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'archived';
  category: 'decision' | 'information' | 'request' | 'complaint';
  attachments?: any[];
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface MinisterDecision {
  id: string;
  title: string;
  description: string;
  decisionType: 'administrative' | 'financial' | 'academic' | 'policy';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'review' | 'approved' | 'implemented' | 'cancelled';
  decisionNumber: string;
  approvedBy?: string;
  approvedAt?: Date;
  implementationDate?: Date;
  budget?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface MinisterMeeting {
  id: string;
  title: string;
  description: string;
  meetingType: 'regular' | 'emergency' | 'committee' | 'bilateral';
  scheduledDate: Date;
  actualStartTime?: Date;
  actualEndTime?: Date;
  location?: string;
  virtualLink?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'postponed';
  agenda?: any[];
  attendees?: any[];
  minutes?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MinisterReport {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'emergency';
  category: 'performance' | 'financial' | 'academic' | 'administrative';
  departmentId: string;
  content: string;
  summary?: string;
  metrics?: any;
  recommendations?: any[];
  attachments?: any[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'submitted' | 'reviewed' | 'approved';
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PredictiveAlert {
  id: string;
  title: string;
  description: string;
  type: 'deadline' | 'performance' | 'risk' | 'opportunity' | 'maintenance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
  predictedDate: Date;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  affectedArea: string;
  recommendedAction: string;
  aiGenerated: boolean;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface ExternalApiIntegration {
  id: string;
  name: string;
  description: string;
  baseUrl: string;
  apiKey: string;
  status: 'active' | 'inactive' | 'error';
  lastSync?: Date;
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  endpoints?: any[];
  authentication?: any;
  rateLimit: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiLog {
  id: string;
  integrationId: string;
  endpoint: string;
  method: string;
  requestData?: any;
  responseData?: any;
  statusCode: number;
  responseTime: number;
  success: boolean;
  errorMessage?: string;
  timestamp: Date;
}

interface DigitalSignature {
  id: string;
  documentId: string;
  documentType: 'decision' | 'correspondence' | 'report' | 'contract';
  signerId: string;
  signerRole: 'minister' | 'deputy' | 'director';
  signatureHash: string;
  signatureMethod: 'digital' | 'biometric' | 'certificate';
  signedAt: Date;
  isValid: boolean;
  verificationData?: any;
  createdAt: Date;
}

interface Archive {
  id: string;
  title: string;
  description: string;
  category: 'decision' | 'correspondence' | 'report' | 'meeting' | 'document';
  archiveType: 'digital' | 'physical' | 'hybrid';
  relatedId: string;
  relatedType: string;
  filePath?: string;
  metadata?: any;
  accessLevel: 'public' | 'restricted' | 'confidential';
  retentionPeriod: number;
  archivedAt: Date;
  archivedBy: string;
  tags?: string[];
  createdAt: Date;
}

interface AiAssistant {
  id: string;
  query: string;
  response: string;
  confidence: number;
  context?: any;
  suggestions?: any[];
  relatedData?: any[];
  processingTime: number;
  modelUsed: string;
  timestamp: Date;
}

interface PerformanceAnalytics {
  id: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: Date;
  endDate: Date;
  metrics?: any;
  insights?: string[];
  recommendations?: string[];
  trends?: any;
  benchmarks?: string[];
  generatedAt: Date;
  aiGenerated: boolean;
}

// حالة الـ store
interface MinisterOfficeState {
  // البيانات
  correspondence: MinisterCorrespondence[];
  decisions: MinisterDecision[];
  meetings: MinisterMeeting[];
  reports: MinisterReport[];
  alerts: PredictiveAlert[];
  externalApis: ExternalApiIntegration[];
  apiLogs: ApiLog[];
  digitalSignatures: DigitalSignature[];
  archives: Archive[];
  aiAssistantHistory: AiAssistant[];
  analytics: PerformanceAnalytics[];

  // حالة التحميل
  loading: {
    correspondence: boolean;
    decisions: boolean;
    meetings: boolean;
    reports: boolean;
    alerts: boolean;
    externalApis: boolean;
    apiLogs: boolean;
    digitalSignatures: boolean;
    archives: boolean;
    aiAssistant: boolean;
    analytics: boolean;
    dashboard: boolean;
  };

  // الأخطاء
  errors: {
    correspondence: string | null;
    decisions: string | null;
    meetings: string | null;
    reports: string | null;
    alerts: string | null;
    externalApis: string | null;
    apiLogs: string | null;
    digitalSignatures: string | null;
    archives: string | null;
    aiAssistant: string | null;
    analytics: string | null;
    dashboard: string | null;
  };

  // فلاتر البحث
  filters: {
    correspondence: CorrespondenceFilters;
    decisions: DecisionFilters;
    meetings: MeetingFilters;
    reports: ReportFilters;
    alerts: AlertFilters;
  };

  // إحصائيات لوحة التحكم
  dashboardStats: {
    totalCorrespondence: number;
    totalDecisions: number;
    totalMeetings: number;
    totalReports: number;
    activeAlerts: number;
    pendingSignatures: number;
  } | null;

  // الإجراءات
  actions: {
    // إدارة المراسلات
    setCorrespondence: (correspondence: MinisterCorrespondence[]) => void;
    addCorrespondence: (correspondence: MinisterCorrespondence) => void;
    updateCorrespondence: (id: string, updates: Partial<MinisterCorrespondence>) => void;
    removeCorrespondence: (id: string) => void;

    // إدارة القرارات - دوال tRPC
    createDecision: (decisionData: Omit<MinisterDecision, 'id' | 'createdAt' | 'updatedAt'>) => Promise<MinisterDecision>;
    fetchDecisions: (filters?: any) => Promise<void>;
    updateDecision: (id: string, updates: Partial<MinisterDecision>) => void;
    deleteDecision: (id: string) => Promise<void>;

    // إدارة الاجتماعات
    setMeetings: (meetings: MinisterMeeting[]) => void;
    addMeeting: (meeting: MinisterMeeting) => void;
    updateMeeting: (id: string, updates: Partial<MinisterMeeting>) => void;
    removeMeeting: (id: string) => void;

    // إدارة التقارير
    setReports: (reports: MinisterReport[]) => void;
    addReport: (report: MinisterReport) => void;
    updateReport: (id: string, updates: Partial<MinisterReport>) => void;
    removeReport: (id: string) => void;

    // إدارة التكامل الحكومي
    setExternalApis: (apis: ExternalApiIntegration[]) => void;
    addExternalApi: (api: ExternalApiIntegration) => void;
    updateExternalApi: (id: string, updates: Partial<ExternalApiIntegration>) => void;
    removeExternalApi: (id: string) => void;

    // إدارة سجلات API
    setApiLogs: (logs: ApiLog[]) => void;
    addApiLog: (log: ApiLog) => void;

    // إدارة التوقيعات الرقمية
    setDigitalSignatures: (signatures: DigitalSignature[]) => void;
    addDigitalSignature: (signature: DigitalSignature) => void;
    updateDigitalSignature: (id: string, updates: Partial<DigitalSignature>) => void;
    removeDigitalSignature: (id: string) => void;

    // إدارة الأرشيف
    setArchives: (archives: Archive[]) => void;
    addArchive: (archive: Archive) => void;
    updateArchive: (id: string, updates: Partial<Archive>) => void;
    removeArchive: (id: string) => void;

    // إدارة المساعد الذكي
    setAiAssistantHistory: (history: AiAssistant[]) => void;
    addAiAssistantMessage: (message: AiAssistant) => void;
    askAIAssistant: (data: { query: string; context?: any }) => Promise<AiAssistant>;
    fetchAIAssistantHistory: (filters?: any) => Promise<void>;

    // إدارة التحليلات
    setAnalytics: (analytics: PerformanceAnalytics[]) => void;
    addAnalytics: (analytics: PerformanceAnalytics) => void;
    generateAnalytics: (data: { period: string; startDate: Date; endDate: Date }) => Promise<PerformanceAnalytics>;
    fetchAnalytics: (filters?: any) => Promise<void>;

    // حالة التحميل
    setLoading: (section: keyof MinisterOfficeState['loading'], loading: boolean) => void;

    // الأخطاء
    setError: (section: keyof MinisterOfficeState['errors'], error: string | null) => void;

    // الفلاتر
    setCorrespondenceFilters: (filters: CorrespondenceFilters) => void;
    setDecisionFilters: (filters: DecisionFilters) => void;
    setMeetingFilters: (filters: MeetingFilters) => void;
    setReportFilters: (filters: ReportFilters) => void;
    setAlertFilters: (filters: AlertFilters) => void;

    // إحصائيات لوحة التحكم
    setDashboardStats: (stats: MinisterOfficeState['dashboardStats']) => void;

    // إعادة تعيين البيانات
    reset: () => void;
  };
}

// القيم الافتراضية
const defaultFilters = {
  correspondence: { limit: 50, offset: 0 },
  decisions: { limit: 50, offset: 0 },
  meetings: { limit: 50, offset: 0 },
  reports: { limit: 50, offset: 0 },
  alerts: { limit: 20, offset: 0 },
};

const initialState = {
  correspondence: [],
  decisions: [],
  meetings: [],
  reports: [],
  alerts: [],
  externalApis: [],
  apiLogs: [],
  digitalSignatures: [],
  archives: [],
  aiAssistantHistory: [],
  analytics: [],
  loading: {
    correspondence: false,
    decisions: false,
    meetings: false,
    reports: false,
    alerts: false,
    externalApis: false,
    apiLogs: false,
    digitalSignatures: false,
    archives: false,
    aiAssistant: false,
    analytics: false,
    dashboard: false,
  },
  errors: {
    correspondence: null,
    decisions: null,
    meetings: null,
    reports: null,
    alerts: null,
    externalApis: null,
    apiLogs: null,
    digitalSignatures: null,
    archives: null,
    aiAssistant: null,
    analytics: null,
    dashboard: null,
  },
  filters: defaultFilters,
  dashboardStats: null,
};

// إنشاء الـ store
export const useMinisterOfficeStore = create<MinisterOfficeState & { actions: MinisterOfficeState['actions'] }>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        actions: {
          // إدارة المراسلات
          setCorrespondence: (correspondence) =>
            set({ correspondence }, false, 'setCorrespondence'),

          addCorrespondence: (correspondence) =>
            set(
              (state) => ({
                correspondence: [correspondence, ...state.correspondence],
              }),
              false,
              'addCorrespondence'
            ),

          updateCorrespondence: (id, updates) =>
            set(
              (state) => ({
                correspondence: state.correspondence.map((item) =>
                  item.id === id ? { ...item, ...updates } : item
                ),
              }),
              false,
              'updateCorrespondence'
            ),

          removeCorrespondence: (id) =>
            set(
              (state) => ({
                correspondence: state.correspondence.filter((item) => item.id !== id),
              }),
              false,
              'removeCorrespondence'
            ),

          // إدارة القرارات - دوال tRPC
          createDecision: async (decisionData) => {
            // هنا سيتم استدعاء tRPC
            // للآن سنضيف القرار محلياً
            const newDecision = {
              id: `decision-${Date.now()}`,
              ...decisionData,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            set(
              (state) => ({
                decisions: [newDecision, ...state.decisions],
              }),
              false,
              'createDecision'
            );
            return newDecision;
          },

          fetchDecisions: async (filters) => {
            set({ loading: { ...get().loading, decisions: true } });
            try {
              const result = await trpc.ministerOffice.decisions.getAll.query({
                limit: filters?.limit || 50,
                offset: filters?.offset || 0,
                status: filters?.status,
                type: filters?.type,
                priority: filters?.priority
              });
              set({ decisions: result }, false, 'fetchDecisions');
            } catch (error) {
              set({ errors: { ...get().errors, decisions: error instanceof Error ? error.message : 'خطأ غير معروف' } });
            } finally {
              set({ loading: { ...get().loading, decisions: false } });
            }
          },

          updateDecision: (id, updates) =>
            set(
              (state) => ({
                decisions: state.decisions.map((item) =>
                  item.id === id ? { ...item, ...updates, updatedAt: new Date() } : item
                ),
              }),
              false,
              'updateDecision'
            ),

          deleteDecision: async (id) => {
            // هنا سيتم استدعاء tRPC
            set(
              (state) => ({
                decisions: state.decisions.filter((item) => item.id !== id),
              }),
              false,
              'deleteDecision'
            );
          },

          // إدارة الاجتماعات
          setMeetings: (meetings) =>
            set({ meetings }, false, 'setMeetings'),

          addMeeting: (meeting) =>
            set(
              (state) => ({
                meetings: [meeting, ...state.meetings],
              }),
              false,
              'addMeeting'
            ),

          updateMeeting: (id, updates) =>
            set(
              (state) => ({
                meetings: state.meetings.map((item) =>
                  item.id === id ? { ...item, ...updates } : item
                ),
              }),
              false,
              'updateMeeting'
            ),

          removeMeeting: (id) =>
            set(
              (state) => ({
                meetings: state.meetings.filter((item) => item.id !== id),
              }),
              false,
              'removeMeeting'
            ),

          // إدارة التقارير
          setReports: (reports: MinisterReport[]) =>
            set({ reports }, false, 'setReports'),

          addReport: (report: MinisterReport) =>
            set(
              (state) => ({
                reports: [report, ...state.reports],
              }),
              false,
              'addReport'
            ),

          updateReport: (id: string, updates: Partial<MinisterReport>) =>
            set(
              (state) => ({
                reports: state.reports.map((item) =>
                  item.id === id ? { ...item, ...updates } : item
                ),
              }),
              false,
              'updateReport'
            ),

          removeReport: (id: string) =>
            set(
              (state) => ({
                reports: state.reports.filter((item) => item.id !== id),
              }),
              false,
              'removeReport'
            ),

          // إدارة التنبيهات
          setAlerts: (alerts: PredictiveAlert[]) =>
            set({ alerts }, false, 'setAlerts'),

          addAlert: (alert: PredictiveAlert) =>
            set(
              (state) => ({
                alerts: [alert, ...state.alerts],
              }),
              false,
              'addAlert'
            ),

          updateAlert: (id: string, updates: Partial<PredictiveAlert>) =>
            set(
              (state) => ({
                alerts: state.alerts.map((item) =>
                  item.id === id ? { ...item, ...updates } : item
                ),
              }),
              false,
              'updateAlert'
            ),

          removeAlert: (id: string) =>
            set(
              (state) => ({
                alerts: state.alerts.filter((item) => item.id !== id),
              }),
              false,
              'removeAlert'
            ),

          fetchActiveAlerts: async (filters) => {
            set({ loading: { ...get().loading, alerts: true } });
            try {
              // هنا سيتم استدعاء tRPC لجلب التنبيهات النشطة
              // للآن سنستخدم البيانات الموجودة في الـ store
              set({ loading: { ...get().loading, alerts: false } });
            } catch (error) {
              set({
                errors: { ...get().errors, alerts: error instanceof Error ? error.message : 'خطأ غير معروف' },
                loading: { ...get().loading, alerts: false }
              });
            }
          },

          acknowledgeAlert: (id: string, acknowledgedBy: string) =>
            set(
              (state) => ({
                alerts: state.alerts.map((item) =>
                  item.id === id
                    ? {
                        ...item,
                        status: 'acknowledged' as const,
                        acknowledgedAt: new Date(),
                        acknowledgedBy,
                      }
                    : item
                ),
              }),
              false,
              'acknowledgeAlert'
            ),

          resolveAlert: (id: string) =>
            set(
              (state) => ({
                alerts: state.alerts.map((item) =>
                  item.id === id
                    ? {
                        ...item,
                        status: 'resolved' as const,
                        resolvedAt: new Date(),
                      }
                    : item
                ),
              }),
              false,
              'resolveAlert'
            ),

          // إدارة التكامل الحكومي
          setExternalApis: (apis) =>
            set({ externalApis: apis }, false, 'setExternalApis'),

          addExternalApi: (api) =>
            set(
              (state) => ({
                externalApis: [api, ...state.externalApis],
              }),
              false,
              'addExternalApi'
            ),

          updateExternalApi: (id, updates) =>
            set(
              (state) => ({
                externalApis: state.externalApis.map((item) =>
                  item.id === id ? { ...item, ...updates } : item
                ),
              }),
              false,
              'updateExternalApi'
            ),

          removeExternalApi: (id) =>
            set(
              (state) => ({
                externalApis: state.externalApis.filter((item) => item.id !== id),
              }),
              false,
              'removeExternalApi'
            ),

          // إدارة سجلات API
          setApiLogs: (logs) =>
            set({ apiLogs: logs }, false, 'setApiLogs'),

          addApiLog: (log) =>
            set(
              (state) => ({
                apiLogs: [log, ...state.apiLogs],
              }),
              false,
              'addApiLog'
            ),

          // إدارة التوقيعات الرقمية
          setDigitalSignatures: (signatures) =>
            set({ digitalSignatures: signatures }, false, 'setDigitalSignatures'),

          addDigitalSignature: (signature) =>
            set(
              (state) => ({
                digitalSignatures: [signature, ...state.digitalSignatures],
              }),
              false,
              'addDigitalSignature'
            ),

          updateDigitalSignature: (id, updates) =>
            set(
              (state) => ({
                digitalSignatures: state.digitalSignatures.map((item) =>
                  item.id === id ? { ...item, ...updates } : item
                ),
              }),
              false,
              'updateDigitalSignature'
            ),

          removeDigitalSignature: (id) =>
            set(
              (state) => ({
                digitalSignatures: state.digitalSignatures.filter((item) => item.id !== id),
              }),
              false,
              'removeDigitalSignature'
            ),

          // إدارة الأرشيف
          setArchives: (archives) =>
            set({ archives: archives }, false, 'setArchives'),

          addArchive: (archive) =>
            set(
              (state) => ({
                archives: [archive, ...state.archives],
              }),
              false,
              'addArchive'
            ),

          updateArchive: (id, updates) =>
            set(
              (state) => ({
                archives: state.archives.map((item) =>
                  item.id === id ? { ...item, ...updates } : item
                ),
              }),
              false,
              'updateArchive'
            ),

          removeArchive: (id) =>
            set(
              (state) => ({
                archives: state.archives.filter((item) => item.id !== id),
              }),
              false,
              'removeArchive'
            ),

          // إدارة المساعد الذكي
          setAiAssistantHistory: (history) =>
            set({ aiAssistantHistory: history }, false, 'setAiAssistantHistory'),

          addAiAssistantMessage: (message) =>
            set(
              (state) => ({
                aiAssistantHistory: [message, ...state.aiAssistantHistory],
              }),
              false,
              'addAiAssistantMessage'
            ),

          askAIAssistant: async (data) => {
            // هنا سيتم استدعاء نموذج الذكاء الاصطناعي
            set({ loading: { ...get().loading, aiAssistant: true } });
            try {
              // محاكاة استدعاء AI
              await new Promise(resolve => setTimeout(resolve, 1500));

              const response = {
                id: `ai-${Date.now()}`,
                query: data.query,
                response: 'هذا رد تجريبي من المساعد الذكي. سيتم تطوير هذا النظام قريباً.',
                confidence: 0.8,
                context: data.context,
                processingTime: 150,
                modelUsed: 'gpt-3.5-turbo',
                timestamp: new Date(),
              };

              set(
                (state) => ({
                  aiAssistantHistory: [response, ...state.aiAssistantHistory],
                }),
                false,
                'askAIAssistant'
              );

              return response;
            } catch (error) {
              set({ errors: { ...get().errors, aiAssistant: error instanceof Error ? error.message : 'خطأ غير معروف' } });
              throw error;
            } finally {
              set({ loading: { ...get().loading, aiAssistant: false } });
            }
          },

          fetchAIAssistantHistory: async (filters) => {
            // هنا سيتم استدعاء tRPC
            set({ loading: { ...get().loading, aiAssistant: true } });
            try {
              // محاكاة استدعاء API
              await new Promise(resolve => setTimeout(resolve, 1000));
              // البيانات ستكون موجودة بالفعل في الـ state
            } catch (error) {
              set({ errors: { ...get().errors, aiAssistant: error instanceof Error ? error.message : 'خطأ غير معروف' } });
            } finally {
              set({ loading: { ...get().loading, aiAssistant: false } });
            }
          },

          // إدارة التحليلات
          setAnalytics: (analytics) =>
            set({ analytics: analytics }, false, 'setAnalytics'),

          addAnalytics: (analytics) =>
            set(
              (state) => ({
                analytics: [analytics, ...state.analytics],
              }),
              false,
              'addAnalytics'
            ),

          generateAnalytics: async (data) => {
            // هنا سيتم استدعاء tRPC أو حساب التحليلات
            set({ loading: { ...get().loading, analytics: true } });
            try {
              // محاكاة حساب التحليلات
              const newAnalytics: PerformanceAnalytics = {
                id: `analytics-${Date.now()}`,
                period: data.period as 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly',
                startDate: data.startDate,
                endDate: data.endDate,
                metrics: {
                  totalDecisions: Math.floor(Math.random() * 100),
                  totalMeetings: Math.floor(Math.random() * 50),
                  avgProcessingTime: Math.floor(Math.random() * 30) + 10,
                  successRate: Math.random() * 0.3 + 0.7,
                },
                insights: ['تحليل تجريبي للأداء'],
                recommendations: ['توصية تجريبية للتحسين'],
                trends: {
                  decisions: Math.random() > 0.5 ? 'up' : 'down',
                  meetings: Math.random() > 0.5 ? 'up' : 'down',
                  performance: Math.random() > 0.5 ? 'up' : 'down'
                },
                benchmarks: ['مقارنة مع المعايير القياسية'],
                generatedAt: new Date(),
                aiGenerated: true,
              };

              set(
                (state) => ({
                  analytics: [newAnalytics, ...state.analytics],
                }),
                false,
                'generateAnalytics'
              );

              return newAnalytics;
            } catch (error) {
              set({ errors: { ...get().errors, analytics: error instanceof Error ? error.message : 'خطأ غير معروف' } });
              throw error;
            } finally {
              set({ loading: { ...get().loading, analytics: false } });
            }
          },

          fetchAnalytics: async (filters) => {
            // هنا سيتم استدعاء tRPC
            set({ loading: { ...get().loading, analytics: true } });
            try {
              // محاكاة استدعاء API
              await new Promise(resolve => setTimeout(resolve, 1000));
              // البيانات ستكون موجودة بالفعل في الـ state
            } catch (error) {
              set({ errors: { ...get().errors, analytics: error instanceof Error ? error.message : 'خطأ غير معروف' } });
            } finally {
              set({ loading: { ...get().loading, analytics: false } });
            }
          },

          // حالة التحميل
          setLoading: (section, loading) =>
            set(
              (state) => ({
                loading: { ...state.loading, [section]: loading },
              }),
              false,
              `setLoading-${section}`
            ),

          // الأخطاء
          setError: (section, error) =>
            set(
              (state) => ({
                errors: { ...state.errors, [section]: error },
              }),
              false,
              `setError-${section}`
            ),

          // الفلاتر
          setCorrespondenceFilters: (filters) =>
            set(
              (state) => ({
                filters: { ...state.filters, correspondence: filters },
              }),
              false,
              'setCorrespondenceFilters'
            ),

          setDecisionFilters: (filters) =>
            set(
              (state) => ({
                filters: { ...state.filters, decisions: filters },
              }),
              false,
              'setDecisionFilters'
            ),

          setMeetingFilters: (filters) =>
            set(
              (state) => ({
                filters: { ...state.filters, meetings: filters },
              }),
              false,
              'setMeetingFilters'
            ),

          setReportFilters: (filters) =>
            set(
              (state) => ({
                filters: { ...state.filters, reports: filters },
              }),
              false,
              'setReportFilters'
            ),

          setAlertFilters: (filters) =>
            set(
              (state) => ({
                filters: { ...state.filters, alerts: filters },
              }),
              false,
              'setAlertFilters'
            ),

          // إحصائيات لوحة التحكم
          setDashboardStats: (stats) =>
            set({ dashboardStats: stats }, false, 'setDashboardStats'),

          // إعادة تعيين البيانات
          reset: () =>
            set(initialState, false, 'reset'),
        },
      }),
      {
        name: 'minister-office-store',
        partialize: (state) => ({
          filters: state.filters,
          // لا نحفظ البيانات الحساسة في localStorage
        }),
      }
    ),
    { name: 'MinisterOfficeStore' }
  )
);

// استخدام مختصر للـ actions
export const useMinisterOfficeActions = () => useMinisterOfficeStore((state) => state.actions);

// استخدام مختصر للحالة مع shallow comparison لتجنب infinite loop
export const useMinisterOfficeState = () =>
  useMinisterOfficeStore(
    (state) => ({
      correspondence: state.correspondence,
      decisions: state.decisions,
      meetings: state.meetings,
      reports: state.reports,
      alerts: state.alerts,
      externalApis: state.externalApis,
      apiLogs: state.apiLogs,
      digitalSignatures: state.digitalSignatures,
      archives: state.archives,
      aiAssistantHistory: state.aiAssistantHistory,
      analytics: state.analytics,
      loading: state.loading,
      errors: state.errors,
      filters: state.filters,
      dashboardStats: state.dashboardStats,
    }),
    shallow
  );
