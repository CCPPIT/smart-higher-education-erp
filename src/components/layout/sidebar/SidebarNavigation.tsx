'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Home, Building2, Users, TrendingUp, Crown, FileText, CheckSquare, Calendar, Bot, Bell, Archive, PieChart, Settings, Shield, Lock, Database, Globe, UserCheck, Star, AlertTriangle, CheckCircle, Scale, Target, MessageSquare, Award } from 'lucide-react';
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

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  isOpen
}) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['minister-office']));

  // عناصر التنقل الرئيسية
  const navigationItems: NavigationItem[] = [
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
        { id: 'special-affairs', title: 'مكتب الشؤون الخاصة', icon: Shield, href: '/dashboard/admin/executive-leadership/special-affairs' },
        { id: 'general-secretariat', title: 'الأمانة العامة للوزارة', icon: Building2, href: '/dashboard/admin/executive-leadership/general-secretariat' },
        { id: 'national-projects', title: 'مكتب المدير التنفيذي للمشاريع الوطنية', icon: Target, href: '/dashboard/admin/executive-leadership/national-projects' },
        { id: 'spokesperson', title: 'مكتب المتحدث الرسمي', icon: MessageSquare, href: '/dashboard/admin/executive-leadership/spokesperson' },
        { id: 'planning-followup', title: 'مكتب التخطيط والمتابعة الوزارية', icon: TrendingUp, href: '/dashboard/admin/executive-leadership/planning-followup' },
        { id: 'protocol-office', title: 'مكتب البروتوكول والعلاقات الرسمية', icon: Award, href: '/dashboard/admin/executive-leadership/protocol-office' }
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
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

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
};
