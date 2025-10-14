'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  Building2,
  Users,
  FileText,
  Settings,
  BarChart3,
  Crown,
  Activity
} from 'lucide-react';
import {
  TabBarHeader,
  TabBarSearch,
  TabBarActions,
  TabBarNotifications,
  TabBarUserMenu,
  TabBarStatus
} from './tabbar';

interface TabBarProps {
  isVisible?: boolean;
  className?: string;
}

const ResponsiveTabBar: React.FC<TabBarProps> = ({
  isVisible = true,
  className
}) => {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    // تحديث التاريخ فقط على العميل لتجنب مشكلة Hydration
    const date = new Date().toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(date);
  }, []);

  const getCurrentPageInfo = () => {
    if (pathname.includes('/minister-office')) {
      return {
        title: 'مكتب الوزير',
        subtitle: currentDate,
        icon: Crown
      };
    }
    if (pathname.includes('/admin')) {
      return {
        title: 'الإدارة العامة',
        subtitle: currentDate,
        icon: Building2
      };
    }
    if (pathname.includes('/academic')) {
      return {
        title: 'الشؤون الأكاديمية',
        subtitle: currentDate,
        icon: Users
      };
    }
    if (pathname.includes('/financial')) {
      return {
        title: 'الشؤون المالية',
        subtitle: currentDate,
        icon: BarChart3
      };
    }
    if (pathname.includes('/hr')) {
      return {
        title: 'الموارد البشرية',
        subtitle: currentDate,
        icon: Users
      };
    }
    if (pathname.includes('/reports')) {
      return {
        title: 'التقارير والإحصائيات',
        subtitle: currentDate,
        icon: BarChart3
      };
    }
    if (pathname.includes('/settings')) {
      return {
        title: 'الإعدادات والتكوين',
        subtitle: currentDate,
        icon: Settings
      };
    }
    return {
      title: 'لوحة التحكم الرئيسية',
      subtitle: currentDate,
      icon: Home
    };
  };

  const pageInfo = getCurrentPageInfo();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg",
            className
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="px-4 lg:px-6 py-3">
            <div className="flex items-center justify-between">
              {/* الجانب الأيسر - معلومات الصفحة الحالية والحالة */}
              <div className="flex items-center gap-4">
                <TabBarHeader
                  pageTitle={pageInfo.title}
                  pageSubtitle={pageInfo.subtitle}
                  pageIcon={pageInfo.icon}
                />

                {/* مؤشرات الحالة السريعة */}
                <TabBarStatus />
              </div>

              {/* الجانب الأيمن - البحث والإجراءات والتنبيهات */}
              <div className="flex items-center gap-2">
                <TabBarSearch />
                <TabBarActions />
                <TabBarNotifications />
                <TabBarUserMenu />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveTabBar;
