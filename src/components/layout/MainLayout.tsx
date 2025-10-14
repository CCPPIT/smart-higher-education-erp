'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import ResponsiveSidebar from './ResponsiveSidebar';
import ResponsiveTabBar from './ResponsiveTabBar';
import ContentArea from './ContentArea';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const pathname = usePathname();

  // التحقق من حجم الشاشة
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // إخفاء شريط التبويبات في بعض الصفحات
  useEffect(() => {
    const hiddenTabBarRoutes = ['/login', '/register', '/forgot-password'];
    setTabBarVisible(!hiddenTabBarRoutes.includes(pathname));
  }, [pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={cn(
      "flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden",
      className
    )}>
      {/* الشريط الجانبي */}
      <ResponsiveSidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        isMobile={isMobile}
        className="flex-shrink-0"
      />

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* شريط التبويبات العلوي */}
        {tabBarVisible && <ResponsiveTabBar />}

        {/* منطقة المحتوى */}
        <ContentArea className="flex-1">
          {children}
        </ContentArea>
      </div>

      {/* زر التبديل للهاتف المحمول */}
      <AnimatePresence>
        {isMobile && (
          <motion.button
            onClick={toggleSidebar}
            className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;
