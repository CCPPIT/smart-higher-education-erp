'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface ContentAreaProps {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  children,
  className,
  isLoading = false
}) => {
  const pathname = usePathname();

  return (
    <motion.main
      className={cn(
        "flex-1 relative overflow-y-auto overflow-x-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* خلفية متحركة خفيفة */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)",
          backgroundSize: "100% 100%"
        }}
      />

      {/* منطقة المحتوى الرئيسية */}
      <div className="relative z-10 p-4 lg:p-6 h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.02 }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
            className="h-full"
          >
            {isLoading ? (
              <LoadingState />
            ) : (
              <div className="h-full">
                {children}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* عناصر زخرفية متحركة */}
      <FloatingElements />
    </motion.main>
  );
};

// مكون حالة التحميل
const LoadingState = () => {
  return (
    <motion.div
      className="flex items-center justify-center h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center space-y-6">
        {/* دائرة التحميل المتحركة */}
        <motion.div
          className="relative w-16 h-16 mx-auto"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 rounded-full animate-pulse"></div>
        </motion.div>

        {/* رسالة التحميل */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">جاري التحميل...</h3>
          <p className="text-sm text-gray-600">يرجى الانتظار قليلاً</p>
        </motion.div>

        {/* نقاط متحركة */}
        <motion.div
          className="flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// مكون العناصر الزخرفية المتحركة
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* العناصر الزخرفية العائمة */}
      {[
        { size: 'w-32 h-32', color: 'bg-blue-200/20', position: 'top-20 left-20', animation: { y: [0, -30, 0], rotate: [0, 180, 360] } },
        { size: 'w-24 h-24', color: 'bg-purple-200/20', position: 'top-40 right-32', animation: { y: [0, 20, 0], scale: [1, 1.2, 1] } },
        { size: 'w-20 h-20', color: 'bg-pink-200/20', position: 'bottom-32 left-40', animation: { x: [0, -20, 0], rotate: [0, -180, -360] } },
        { size: 'w-16 h-16', color: 'bg-indigo-200/20', position: 'bottom-20 right-20', animation: { x: [0, 15, 0], scale: [1, 0.8, 1] } }
      ].map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} ${element.color} rounded-full blur-xl`}
          style={{
            left: element.position.includes('left') ? element.position.split(' ')[1] : 'auto',
            right: element.position.includes('right') ? element.position.split(' ')[1] : 'auto',
            top: element.position.includes('top') ? element.position.split(' ')[0] : 'auto',
            bottom: element.position.includes('bottom') ? element.position.split(' ')[0] : 'auto'
          }}
          animate={element.animation}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* خطوط متدرجة متحركة */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-purple-300/30 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

// مكون انتقالات الصفحات
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className
}) => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      className={cn("min-h-full", className)}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 1.02 }}
      transition={{
        duration: 0.4,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default ContentArea;
