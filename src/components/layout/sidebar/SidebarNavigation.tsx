'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, Home, Building2, Users, TrendingUp, Crown, FileText, CheckSquare, Calendar, Bot, Bell, Archive, PieChart, Settings, Shield, Lock, Database, Globe, UserCheck, Star, AlertTriangle, CheckCircle, Scale, Target, MessageSquare, Award, Zap, Cpu, Book, Hand, Eye, RotateCcw, Building, BookOpen, Leaf, RefreshCw } from 'lucide-react';
import { SidebarNavigationItem } from './SidebarNavigationItem';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string | number;
  children?: NavigationItem[];
  gradient?: string;
  description?: string;
}

interface SidebarNavigationProps {
  isOpen: boolean;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = React.memo(({
  isOpen
}) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['minister-office', 'executive-leadership']));

  // تحسين البيانات باستخدام useMemo
  const navigationItems = useMemo((): NavigationItem[] => [
    {
      id: 'dashboard',
      title: 'لوحة التحكم الرئيسية',
      icon: Home,
      href: '/dashboard',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'نظرة عامة على النظام'
    },
    // {
    //   id: 'minister-office',
    //   title: 'مكتب الوزير',
    //   icon: Crown,
    //   href: '/dashboard/admin/minister-office',
    //   gradient: 'from-purple-500 to-pink-500',
    //   badge: 'رئيسي',
    //   description: 'نظام إدارة المراسلات والقرارات',
    //   children: [
    //     { id: 'overview', title: 'نظرة عامة', icon: TrendingUp, href: '/dashboard/admin/minister-office' },
    //     { id: 'correspondence', title: 'المراسلات', icon: FileText, href: '/dashboard/admin/minister-office/correspondence', badge: '156' },
    //     { id: 'decisions', title: 'القرارات', icon: CheckSquare, href: '/dashboard/admin/minister-office/decisions', badge: '23' },
    //     { id: 'meetings', title: 'الاجتماعات', icon: Calendar, href: '/dashboard/admin/minister-office/meetings', badge: '12' },
    //     { id: 'reports', title: 'التقارير', icon: TrendingUp, href: '/dashboard/admin/minister-office/reports', badge: '18' },
    //     { id: 'ai-assistant', title: 'المساعد الذكي', icon: Bot, href: '/dashboard/admin/minister-office/ai-assistant', badge: 'نشط' },
    //     { id: 'alerts', title: 'التنبيهات', icon: Bell, href: '/dashboard/admin/minister-office/alerts', badge: '5' },
    //     { id: 'archives', title: 'الأرشيف', icon: Archive, href: '/dashboard/admin/minister-office/archives', badge: 'مؤرشف' },
    //     { id: 'analytics', title: 'التحليلات', icon: PieChart, href: '/dashboard/admin/minister-office/analytics', badge: 'متقدم' }
    //   ]
    // },
    {
      id: 'executive-leadership',
      title: 'القيادة العليا',
      icon: Crown,
      href: '/dashboard/admin/executive-leadership',
      gradient: 'from-amber-500 to-orange-500',
      description: 'مكاتب القيادة العليا والإدارات الاستراتيجية',
      children: [
        { id: 'minister-office', title: 'مكتب الوزير', icon: Crown, href: '/dashboard/admin/executive-leadership/minister-office' },
        { id: 'deputy-office', title: 'مكتب نائب الوزير', icon: Users, href: '/dashboard/admin/executive-leadership/deputy-office' },
        { id: 'assistant-office', title: 'مكتب مساعد الوزير', icon: Shield, href: '/dashboard/admin/executive-leadership/assistant-office' },
        { id: 'advisors-office', title: 'مكتب المستشارين', icon: Star, href: '/dashboard/admin/executive-leadership/advisors-office' },
        { id: 'special-affairs-office', title: 'مكتب الشؤون الخاصة', icon: Shield, href: '/dashboard/admin/executive-leadership/special-affairs-office' },
        { id: 'general-secretariat', title: 'الأمانة العامة للوزارة', icon: Building2, href: '/dashboard/admin/executive-leadership/general-secretariat' },
        { id: 'national-projects', title: 'مكتب المدير التنفيذي للمشاريع الوطنية', icon: Target, href: '/dashboard/admin/executive-leadership/national-projects' },
        { id: 'spokesperson', title: 'مكتب المتحدث الرسمي', icon: MessageSquare, href: '/dashboard/admin/executive-leadership/spokesperson' },
        { id: 'planning-followup', title: 'مكتب التخطيط والمتابعة الوزارية', icon: TrendingUp, href: '/dashboard/admin/executive-leadership/planning-followup' },
        { id: 'protocol-office', title: 'مكتب البروتوكول والعلاقات الرسمية', icon: Award, href: '/dashboard/admin/executive-leadership/protocol-office' },

        // الأقسام الجديدة (21-100)
        { id: 'protocol-ceremonies', title: 'إدارة البروتوكول والمراسم', icon: Award, href: '/dashboard/admin/executive-leadership/protocol-ceremonies' },
        { id: 'conferences-events', title: 'إدارة المؤتمرات والفعاليات', icon: Calendar, href: '/dashboard/admin/executive-leadership/conferences-events' },
        { id: 'complaints-suggestions', title: 'إدارة الشكاوى والمقترحات', icon: MessageSquare, href: '/dashboard/admin/executive-leadership/complaints-suggestions' },
        { id: 'visitors-reviewers', title: 'إدارة المراجعين والزوار', icon: Users, href: '/dashboard/admin/executive-leadership/visitors-reviewers' },
        { id: 'international-relations', title: 'إدارة العلاقات العامة الدولية', icon: Globe, href: '/dashboard/admin/executive-leadership/international-relations' },
        { id: 'local-relations', title: 'إدارة العلاقات العامة المحلية', icon: Users, href: '/dashboard/admin/executive-leadership/local-relations' },
        { id: 'media-communication', title: 'إدارة التواصل الإعلامي', icon: MessageSquare, href: '/dashboard/admin/executive-leadership/media-communication' },
        { id: 'official-reports', title: 'إدارة إعداد التقارير الرسمية', icon: FileText, href: '/dashboard/admin/executive-leadership/official-reports' },
        { id: 'statistics-analysis', title: 'إدارة الإحصاء والتحليل الإداري', icon: PieChart, href: '/dashboard/admin/executive-leadership/statistics-analysis' },
        { id: 'performance-evaluation', title: 'إدارة تقييم الأداء التنفيذي', icon: CheckCircle, href: '/dashboard/admin/executive-leadership/performance-evaluation' },
        { id: 'national-initiatives', title: 'إدارة المبادرات الوطنية', icon: Target, href: '/dashboard/admin/executive-leadership/national-initiatives' },
        { id: 'decisions-followup', title: 'إدارة متابعة القرارات', icon: CheckSquare, href: '/dashboard/admin/executive-leadership/decisions-followup' },
        { id: 'government-policies', title: 'إدارة السياسات الحكومية', icon: FileText, href: '/dashboard/admin/executive-leadership/government-policies' },
        { id: 'crisis-emergency', title: 'إدارة الأزمات والطوارئ', icon: AlertTriangle, href: '/dashboard/admin/executive-leadership/crisis-emergency' },
        { id: 'transparency-integrity', title: 'إدارة الشفافية والنزاهة', icon: Shield, href: '/dashboard/admin/executive-leadership/transparency-integrity' },
        { id: 'organizational-development', title: 'إدارة التطوير التنظيمي', icon: TrendingUp, href: '/dashboard/admin/executive-leadership/organizational-development' },
        { id: 'internal-control', title: 'إدارة الرقابة الداخلية', icon: Shield, href: '/dashboard/admin/executive-leadership/internal-control' },
        { id: 'administrative-audit', title: 'إدارة التدقيق الإداري', icon: CheckCircle, href: '/dashboard/admin/executive-leadership/administrative-audit' },
        { id: 'government-contracts', title: 'إدارة العقود الحكومية', icon: FileText, href: '/dashboard/admin/executive-leadership/government-contracts' },
        { id: 'higher-budgets', title: 'إدارة الموازنات العليا', icon: PieChart, href: '/dashboard/admin/executive-leadership/higher-budgets' },
        { id: 'foreign-affairs', title: 'إدارة الشؤون الخارجية', icon: Globe, href: '/dashboard/admin/executive-leadership/foreign-affairs' },
        { id: 'universities-relations', title: 'إدارة العلاقات مع الجامعات', icon: Building2, href: '/dashboard/admin/executive-leadership/universities-relations' },
        { id: 'private-sector-relations', title: 'إدارة العلاقات مع القطاع الخاص', icon: Users, href: '/dashboard/admin/executive-leadership/private-sector-relations' },
        { id: 'international-cooperation', title: 'إدارة التعاون الدولي', icon: Globe, href: '/dashboard/admin/executive-leadership/international-cooperation' },
        { id: 'regional-organizations', title: 'إدارة المنظمات الإقليمية', icon: Users, href: '/dashboard/admin/executive-leadership/regional-organizations' },
        { id: 'royal-initiatives', title: 'إدارة المبادرات الملكية', icon: Crown, href: '/dashboard/admin/executive-leadership/royal-initiatives' },
        { id: 'strategic-analysis', title: 'إدارة التحليل الاستراتيجي', icon: TrendingUp, href: '/dashboard/admin/executive-leadership/strategic-analysis' },
        { id: 'projects-evaluation', title: 'إدارة تقييم المشاريع', icon: CheckCircle, href: '/dashboard/admin/executive-leadership/projects-evaluation' },
        { id: 'executive-performance', title: 'إدارة تطوير الأداء التنفيذي', icon: TrendingUp, href: '/dashboard/admin/executive-leadership/executive-performance' },
        { id: 'spending-efficiency', title: 'إدارة كفاءة الإنفاق', icon: PieChart, href: '/dashboard/admin/executive-leadership/spending-efficiency' },
        { id: 'procedures-unification', title: 'إدارة توحيد الإجراءات', icon: CheckCircle, href: '/dashboard/admin/executive-leadership/procedures-unification' },
        { id: 'systems-update', title: 'إدارة تحديث الأنظمة', icon: Settings, href: '/dashboard/admin/executive-leadership/systems-update' },
        { id: 'institutional-integration', title: 'إدارة التكامل المؤسسي', icon: Users, href: '/dashboard/admin/executive-leadership/institutional-integration' },
        { id: 'government-creativity', title: 'إدارة الإبداع الحكومي', icon: Zap, href: '/dashboard/admin/executive-leadership/government-creativity' },
        { id: 'strategic-initiatives', title: 'إدارة المبادرات الاستراتيجية', icon: Target, href: '/dashboard/admin/executive-leadership/strategic-initiatives' },
        { id: 'government-digitization', title: 'إدارة الرقمنة الحكومية', icon: Activity, href: '/dashboard/admin/executive-leadership/government-digitization' },
        { id: 'smart-operations', title: 'إدارة التشغيل الذكي', icon: Bot, href: '/dashboard/admin/executive-leadership/smart-operations' },
        { id: 'government-data', title: 'إدارة البيانات الحكومية', icon: Database, href: '/dashboard/admin/executive-leadership/government-data' },
        { id: 'data-governance', title: 'إدارة حوكمة البيانات', icon: Shield, href: '/dashboard/admin/executive-leadership/data-governance' },
        { id: 'ministerial-performance', title: 'إدارة تقارير الأداء الوزاري', icon: TrendingUp, href: '/dashboard/admin/executive-leadership/ministerial-performance' },
        { id: 'decision-support', title: 'إدارة دعم اتخاذ القرار', icon: Cpu, href: '/dashboard/admin/executive-leadership/decision-support' },
        { id: 'management-systems', title: 'إدارة نظم المعلومات الإدارية', icon: Settings, href: '/dashboard/admin/executive-leadership/management-systems' },
        { id: 'smart-applications', title: 'إدارة التطبيقات الذكية', icon: Activity, href: '/dashboard/admin/executive-leadership/smart-applications' },
        { id: 'process-automation', title: 'إدارة أتمتة العمليات', icon: Settings, href: '/dashboard/admin/executive-leadership/process-automation' },
        { id: 'electronic-documentation', title: 'إدارة التوثيق الإلكتروني', icon: FileText, href: '/dashboard/admin/executive-leadership/electronic-documentation' },
        { id: 'ai-services', title: 'إدارة خدمات الذكاء الاصطناعي', icon: Bot, href: '/dashboard/admin/executive-leadership/ai-services' },
        { id: 'employee-experience', title: 'إدارة تجربة الموظف', icon: Users, href: '/dashboard/admin/executive-leadership/employee-experience' },
        { id: 'beneficiary-experience', title: 'إدارة تجربة المستفيد', icon: Users, href: '/dashboard/admin/executive-leadership/beneficiary-experience' },
        { id: 'leadership-training', title: 'إدارة التدريب القيادي', icon: Award, href: '/dashboard/admin/executive-leadership/leadership-training' },
        { id: 'executive-development', title: 'إدارة التطوير التنفيذي', icon: TrendingUp, href: '/dashboard/admin/executive-leadership/executive-development' },
        { id: 'competency-assessment', title: 'إدارة تقييم الكفاءات', icon: CheckCircle, href: '/dashboard/admin/executive-leadership/competency-assessment' },
        { id: 'institutional-excellence', title: 'إدارة التميز المؤسسي', icon: Award, href: '/dashboard/admin/executive-leadership/institutional-excellence' },
        { id: 'intellectual-capital', title: 'إدارة رأس المال الفكري', icon: Book, href: '/dashboard/admin/executive-leadership/intellectual-capital' },
        { id: 'institutional-identity', title: 'إدارة الهوية المؤسسية', icon: Building2, href: '/dashboard/admin/executive-leadership/institutional-identity' },
        { id: 'awareness-education', title: 'إدارة التوعية والتثقيف', icon: Users, href: '/dashboard/admin/executive-leadership/awareness-education' },
        { id: 'institutional-culture', title: 'إدارة الثقافة المؤسسية', icon: Users, href: '/dashboard/admin/executive-leadership/institutional-culture' },
        { id: 'strategic-partnerships', title: 'إدارة الشراكات الاستراتيجية', icon: Hand, href: '/dashboard/admin/executive-leadership/strategic-partnerships' },
        { id: 'future-policies', title: 'إدارة السياسات المستقبلية', icon: FileText, href: '/dashboard/admin/executive-leadership/future-policies' },
        { id: 'future-foresight', title: 'إدارة استشراف المستقبل', icon: Eye, href: '/dashboard/admin/executive-leadership/future-foresight' },
        { id: 'institutional-transformation', title: 'إدارة التحول المؤسسي', icon: RotateCcw, href: '/dashboard/admin/executive-leadership/institutional-transformation' },
        { id: 'digital-performance', title: 'إدارة الأداء الرقمي', icon: Activity, href: '/dashboard/admin/executive-leadership/digital-performance' },
        { id: 'emerging-technologies', title: 'إدارة التقنيات الناشئة', icon: Activity, href: '/dashboard/admin/executive-leadership/emerging-technologies' },
        { id: 'senior-leadership-support', title: 'إدارة دعم القيادة العليا', icon: Crown, href: '/dashboard/admin/executive-leadership/senior-leadership-support' },
        { id: 'government-supervision', title: 'إدارة الرقابة الحكومية', icon: Shield, href: '/dashboard/admin/executive-leadership/government-supervision' },
        { id: 'ministerial-plans', title: 'إدارة متابعة الخطط الوزارية', icon: Calendar, href: '/dashboard/admin/executive-leadership/ministerial-plans' },
        { id: 'government-coordination', title: 'إدارة التنسيق الحكومي', icon: Users, href: '/dashboard/admin/executive-leadership/government-coordination' },
        { id: 'government-communication', title: 'إدارة الاتصال الحكومي', icon: MessageSquare, href: '/dashboard/admin/executive-leadership/government-communication' },
        { id: 'digital-media', title: 'إدارة الإعلام الرقمي', icon: MessageSquare, href: '/dashboard/admin/executive-leadership/digital-media' },
        { id: 'national-indicators', title: 'إدارة المؤشرات الوطنية', icon: PieChart, href: '/dashboard/admin/executive-leadership/national-indicators' },
        { id: 'internal-communication', title: 'إدارة الاتصال الداخلي', icon: MessageSquare, href: '/dashboard/admin/executive-leadership/internal-communication' },
        { id: 'national-strategy', title: 'إدارة الاستراتيجية الوطنية للتعليم العالي', icon: Target, href: '/dashboard/admin/executive-leadership/national-strategy' },
        { id: 'annual-plans', title: 'إدارة تقييم الخطط السنوية', icon: Calendar, href: '/dashboard/admin/executive-leadership/annual-plans' },
        { id: 'strategic-review', title: 'إدارة المراجعة الاستراتيجية', icon: CheckCircle, href: '/dashboard/admin/executive-leadership/strategic-review' },
        { id: 'senior-research', title: 'إدارة البحوث والسياسات العليا', icon: Book, href: '/dashboard/admin/executive-leadership/senior-research' },
        { id: 'government-studies', title: 'إدارة الدراسات الحكومية', icon: FileText, href: '/dashboard/admin/executive-leadership/government-studies' },
        { id: 'ministerial-decisions', title: 'إدارة توثيق القرارات الوزارية', icon: FileText, href: '/dashboard/admin/executive-leadership/ministerial-decisions' },
        { id: 'supreme-council', title: 'إدارة مجلس القيادة العليا', icon: Crown, href: '/dashboard/admin/executive-leadership/supreme-council' },
        { id: 'general-performance', title: 'إدارة متابعة الأداء العام', icon: TrendingUp, href: '/dashboard/admin/executive-leadership/general-performance' },
        { id: 'ministerial-documents-registry', title: 'سجل الوثائق الوزارية', icon: FileText, href: '/dashboard/admin/executive-leadership/ministerial-documents-registry' },
        { id: 'general-administrative', title: 'الإدارة العامة للشؤون الإدارية', icon: Building2, href: '/dashboard/admin/executive-leadership/general-administrative' },
        { id: 'general-legal', title: 'الإدارة العامة للشؤون القانونية', icon: Scale, href: '/dashboard/admin/executive-leadership/general-legal' },
        { id: 'institutional-governance', title: 'إدارة الحوكمة المؤسسية', icon: Shield, href: '/dashboard/admin/executive-leadership/institutional-governance' },
        { id: 'quality-excellence', title: 'إدارة الجودة والتميز', icon: Award, href: '/dashboard/admin/executive-leadership/quality-excellence' },
        { id: 'strategic-planning', title: 'إدارة التخطيط الاستراتيجي', icon: Target, href: '/dashboard/admin/executive-leadership/strategic-planning' },
        { id: 'institutional-performance', title: 'إدارة الأداء المؤسسي', icon: TrendingUp, href: '/dashboard/admin/executive-leadership/institutional-performance' },
        { id: 'risk-management', title: 'إدارة إدارة المخاطر', icon: Shield, href: '/dashboard/admin/executive-leadership/risk-management' },
        { id: 'institutional-communication', title: 'إدارة الاتصال المؤسسي', icon: MessageSquare, href: '/dashboard/admin/executive-leadership/institutional-communication' },
        { id: 'parliamentary-affairs', title: 'إدارة الشؤون البرلمانية', icon: Building, href: '/dashboard/admin/executive-leadership/parliamentary-affairs' },
        { id: 'educational-policies', title: 'إدارة السياسات التعليمية', icon: BookOpen, href: '/dashboard/admin/executive-leadership/educational-policies' },
        { id: 'government-relations', title: 'إدارة العلاقات الحكومية', icon: Users, href: '/dashboard/admin/executive-leadership/government-relations' },
        { id: 'digital-transformation', title: 'إدارة التحول الرقمي', icon: Activity, href: '/dashboard/admin/executive-leadership/digital-transformation' },
        { id: 'institutional-innovation', title: 'إدارة الابتكار المؤسسي', icon: Zap, href: '/dashboard/admin/executive-leadership/institutional-innovation' },
        { id: 'change-development', title: 'إدارة التغيير والتطوير', icon: RefreshCw, href: '/dashboard/admin/executive-leadership/change-development' },
        { id: 'sustainability', title: 'إدارة الاستدامة', icon: Leaf, href: '/dashboard/admin/executive-leadership/sustainability' },
        { id: 'cybersecurity', title: 'إدارة الأمن السيبراني', icon: Shield, href: '/dashboard/admin/executive-leadership/cybersecurity' },
        { id: 'knowledge-management', title: 'إدارة إدارة المعرفة', icon: BookOpen, href: '/dashboard/admin/executive-leadership/knowledge-management' },
        { id: 'mega-projects', title: 'إدارة المشاريع الكبرى', icon: Settings, href: '/dashboard/admin/executive-leadership/mega-projects' },
      ]
    },
    // {
    //   id: 'administrative-legal',
    //   title: 'الشؤون الإدارية والقانونية',
    //   icon: Scale,
    //   href: '/dashboard/admin/administrative-legal',
    //   gradient: 'from-blue-500 to-indigo-500',
    //   description: 'إدارات الشؤون الإدارية والقانونية والحوكمة',
    //   children: [
    //     { id: 'general-administrative', title: 'الإدارة العامة للشؤون الإدارية', icon: Users, href: '/dashboard/admin/administrative-legal/general-administrative' },
    //     { id: 'general-legal', title: 'الإدارة العامة للشؤون القانونية', icon: Scale, href: '/dashboard/admin/administrative-legal/general-legal' },
    //     { id: 'contracts-procurement', title: 'إدارة العقود والمشتريات العليا', icon: FileText, href: '/dashboard/admin/administrative-legal/contracts-procurement' },
    //     { id: 'archive-records', title: 'إدارة الأرشفة والمحفوظات الرسمية', icon: Archive, href: '/dashboard/admin/administrative-legal/archive-records' },
    //     { id: 'complaints-grievances', title: 'إدارة الشكاوى والمظالم', icon: AlertTriangle, href: '/dashboard/admin/administrative-legal/complaints-grievances' }
    //   ]
    // },
    // {
    //   id: 'quality-governance',
    //   title: 'الجودة والحوكمة والأداء',
    //   icon: CheckCircle,
    //   href: '/dashboard/admin/quality-governance',
    //   gradient: 'from-green-500 to-teal-500',
    //   description: 'إدارات الجودة والتخطيط الاستراتيجي والأداء'
    // },
    // {
    //   id: 'communication-relations',
    //   title: 'الاتصال والعلاقات',
    //   icon: Users,
    //   href: '/dashboard/admin/communication-relations',
    //   gradient: 'from-pink-500 to-rose-500',
    //   description: 'إدارات الاتصال والإعلام والعلاقات العامة'
    // },
    // {
    //   id: 'policies-development',
    //   title: 'السياسات والتطوير المؤسسي',
    //   icon: FileText,
    //   href: '/dashboard/admin/policies-development',
    //   gradient: 'from-violet-500 to-purple-500',
    //   description: 'إدارات السياسات والابتكار والتطوير'
    // },
    // {
    //   id: 'digital-transformation',
    //   title: 'التحول الرقمي والتقنية',
    //   icon: Activity,
    //   href: '/dashboard/admin/digital-transformation',
    //   gradient: 'from-cyan-500 to-blue-500',
    //   description: 'إدارات التحول الرقمي والأمن السيبراني'
    // },
    // {
    //   id: 'knowledge-research',
    //   title: 'المعرفة والبحوث والمعلومات',
    //   icon: Archive,
    //   href: '/dashboard/admin/knowledge-research',
    //   gradient: 'from-emerald-500 to-green-500',
    //   description: 'إدارات إدارة المعرفة والأرشفة الرقمية'
    // },
    // {
    //   id: 'mega-projects',
    //   title: 'المشاريع الكبرى والتنسيق الوطني',
    //   icon: Settings,
    //   href: '/dashboard/admin/mega-projects',
    //   gradient: 'from-orange-500 to-red-500',
    //   description: 'إدارات المشاريع الكبرى والمبادرات الوطنية'
    // },
    // {
    //   id: 'security-sustainability',
    //   title: 'الأمن والسلامة والاستدامة',
    //   icon: Shield,
    //   href: '/dashboard/admin/security-sustainability',
    //   gradient: 'from-red-500 to-orange-500',
    //   description: 'إدارات الأمن والسلامة والبيئة'
    // },
    {
      id: 'admin',
      title: 'الإدارة العامة',
      icon: Building2,
      href: '/dashboard/admin',
      gradient: 'from-green-500 to-emerald-500',
      description: 'إدارة النظام والمستخدمين',
      children: [
        { id: 'users', title: 'إدارة المستخدمين', icon: Users, href: '/dashboard/admin/users' },
        { id: 'departments', title: 'الإدارات', icon: Building2, href: '/dashboard/admin/departments' },
        { id: 'roles', title: 'الأدوار والصلاحيات', icon: Shield, href: '/dashboard/admin/roles' },
        { id: 'security', title: 'الأمان والحماية', icon: Lock, href: '/dashboard/admin/security' },
        { id: 'audit', title: 'سجل التدقيق', icon: Activity, href: '/dashboard/admin/audit' }
      ]
    }
  ], []);

  const isActive = useCallback((href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  }, [pathname]);

  const toggleExpanded = useCallback((itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  return (
    <motion.nav
      className="flex-1 overflow-y-auto p-4 space-y-2 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {navigationItems.map((item, index) => (
        <SidebarNavigationItem
          key={item.id}
          item={item}
          isActive={isActive(item.href)}
          isOpen={isOpen}
          isExpanded={expandedItems.has(item.id)}
          onToggle={toggleExpanded}
          level={index}
        />
      ))}
    </motion.nav>
  );
});
