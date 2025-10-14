'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Crown, Home, Building2, Users, TrendingUp } from 'lucide-react';
import { SidebarHeader, SidebarNavigation, SidebarFooter } from './sidebar';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  className?: string;
}

const ResponsiveSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  isMobile = false,
  className
}) => {
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 border-r border-gray-200 w-full">
      <SidebarHeader isOpen={isOpen} isMobile={isMobile} />
      <SidebarNavigation isOpen={isOpen} />
      <SidebarFooter isOpen={isOpen} />
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* خلفية شفافة */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
            />

            {/* الشريط الجانبي */}
            <motion.div
              className="fixed left-0 top-0 h-full w-80 z-50 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      className={cn(
        "relative h-full transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "w-80" : "w-20",
        className
      )}
      animate={{
        width: isOpen ? 320 : 80
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="h-full w-full">
        <SidebarContent />
      </div>
    </motion.div>
  );
};

export default ResponsiveSidebar;
