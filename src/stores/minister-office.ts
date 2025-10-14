import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
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

// حالة الـ store
interface MinisterOfficeState {
  // البيانات
  correspondence: MinisterCorrespondence[];
  decisions: MinisterDecision[];
  meetings: MinisterMeeting[];
  reports: MinisterReport[];
  alerts: PredictiveAlert[];

  // حالة التحميل
  loading: {
    correspondence: boolean;
    decisions: boolean;
    meetings: boolean;
    reports: boolean;
    alerts: boolean;
    dashboard: boolean;
  };

  // الأخطاء
  errors: {
    correspondence: string | null;
    decisions: string | null;
    meetings: string | null;
    reports: string | null;
    alerts: string | null;
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

    // إدارة القرارات
    setDecisions: (decisions: MinisterDecision[]) => void;
    addDecision: (decision: MinisterDecision) => void;
    updateDecision: (id: string, updates: Partial<MinisterDecision>) => void;
    removeDecision: (id: string) => void;

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

    // إدارة التنبيهات
    setAlerts: (alerts: PredictiveAlert[]) => void;
    addAlert: (alert: PredictiveAlert) => void;
    updateAlert: (id: string, updates: Partial<PredictiveAlert>) => void;
    removeAlert: (id: string) => void;
    acknowledgeAlert: (id: string, acknowledgedBy: string) => void;
    resolveAlert: (id: string) => void;

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
  loading: {
    correspondence: false,
    decisions: false,
    meetings: false,
    reports: false,
    alerts: false,
    dashboard: false,
  },
  errors: {
    correspondence: null,
    decisions: null,
    meetings: null,
    reports: null,
    alerts: null,
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

          // إدارة القرارات
          setDecisions: (decisions) =>
            set({ decisions }, false, 'setDecisions'),

          addDecision: (decision) =>
            set(
              (state) => ({
                decisions: [decision, ...state.decisions],
              }),
              false,
              'addDecision'
            ),

          updateDecision: (id, updates) =>
            set(
              (state) => ({
                decisions: state.decisions.map((item) =>
                  item.id === id ? { ...item, ...updates } : item
                ),
              }),
              false,
              'updateDecision'
            ),

          removeDecision: (id) =>
            set(
              (state) => ({
                decisions: state.decisions.filter((item) => item.id !== id),
              }),
              false,
              'removeDecision'
            ),

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
          setReports: (reports) =>
            set({ reports }, false, 'setReports'),

          addReport: (report) =>
            set(
              (state) => ({
                reports: [report, ...state.reports],
              }),
              false,
              'addReport'
            ),

          updateReport: (id, updates) =>
            set(
              (state) => ({
                reports: state.reports.map((item) =>
                  item.id === id ? { ...item, ...updates } : item
                ),
              }),
              false,
              'updateReport'
            ),

          removeReport: (id) =>
            set(
              (state) => ({
                reports: state.reports.filter((item) => item.id !== id),
              }),
              false,
              'removeReport'
            ),

          // إدارة التنبيهات
          setAlerts: (alerts) =>
            set({ alerts }, false, 'setAlerts'),

          addAlert: (alert) =>
            set(
              (state) => ({
                alerts: [alert, ...state.alerts],
              }),
              false,
              'addAlert'
            ),

          updateAlert: (id, updates) =>
            set(
              (state) => ({
                alerts: state.alerts.map((item) =>
                  item.id === id ? { ...item, ...updates } : item
                ),
              }),
              false,
              'updateAlert'
            ),

          removeAlert: (id) =>
            set(
              (state) => ({
                alerts: state.alerts.filter((item) => item.id !== id),
              }),
              false,
              'removeAlert'
            ),

          acknowledgeAlert: (id, acknowledgedBy) =>
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

          resolveAlert: (id) =>
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

// استخدام مختصر للحالة
export const useMinisterOfficeState = () => useMinisterOfficeStore((state) => ({
  correspondence: state.correspondence,
  decisions: state.decisions,
  meetings: state.meetings,
  reports: state.reports,
  alerts: state.alerts,
  loading: state.loading,
  errors: state.errors,
  filters: state.filters,
  dashboardStats: state.dashboardStats,
}));
