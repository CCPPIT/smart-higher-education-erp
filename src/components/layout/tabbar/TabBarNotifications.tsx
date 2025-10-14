'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  unread: boolean;
}

interface TabBarNotificationsProps {
  notifications?: NotificationItem[];
  className?: string;
}

const defaultNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'مراسلة جديدة',
    message: 'تم استلام مراسلة جديدة من وزارة التعليم',
    time: 'قبل 5 دقائق',
    type: 'info',
    unread: true
  },
  {
    id: '2',
    title: 'اجتماع مقرر',
    message: 'اجتماع مجلس الإدارة سيعقد غداً الساعة 10 صباحاً',
    time: 'قبل ساعة',
    type: 'warning',
    unread: true
  },
  {
    id: '3',
    title: 'تحديث النظام',
    message: 'تم تحديث النظام بنجاح إلى الإصدار 2.1.0',
    time: 'أمس',
    type: 'success',
    unread: false
  }
];

export const TabBarNotifications: React.FC<TabBarNotificationsProps> = ({
  notifications = defaultNotifications,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-600';
      case 'warning': return 'bg-yellow-100 text-yellow-600';
      case 'error': return 'bg-red-100 text-red-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className={cn("relative", className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell className="w-5 h-5" />

        {/* شارة التنبيهات الجديدة */}
        {unreadCount > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* قائمة التنبيهات */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900">التنبيهات</h3>
                <p className="text-sm text-gray-600">
                  {unreadCount} تنبيه جديد
                </p>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification, index) => {
                  const Icon = getNotificationIcon(notification.type);

                  return (
                    <motion.div
                      key={notification.id}
                      className={cn(
                        "p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors",
                        notification.unread && "bg-blue-50/50"
                      )}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          getNotificationColor(notification.type)
                        )}>
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>

                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-gray-200">
                <Button variant="outline" className="w-full">
                  عرض جميع التنبيهات
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
