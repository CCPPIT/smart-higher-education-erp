'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Bell, LogOut, ChevronDown } from 'lucide-react';

interface UserMenuItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  action: () => void;
}

interface TabBarUserMenuProps {
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  menuItems?: UserMenuItem[];
  className?: string;
}

const defaultMenuItems: UserMenuItem[] = [
  { icon: User, title: 'الملف الشخصي', action: () => console.log('الملف الشخصي') },
  { icon: Settings, title: 'الإعدادات', action: () => console.log('الإعدادات') },
  { icon: Bell, title: 'التنبيهات', action: () => console.log('التنبيهات') }
];

export const TabBarUserMenu: React.FC<TabBarUserMenuProps> = ({
  userName = 'د. أحمد محمد',
  userRole = 'مدير النظام',
  menuItems = defaultMenuItems,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="font-medium text-sm hidden sm:block">{userName}</span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>

      {/* قائمة المستخدم */}
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
              className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{userName}</p>
                    <p className="text-sm text-gray-600">{userRole}</p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.title}
                      onClick={() => {
                        item.action();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Icon className="w-4 h-4 text-gray-600" />
                      {item.title}
                    </motion.button>
                  );
                })}
              </div>

              <div className="p-2 border-t border-gray-200">
                <motion.button
                  onClick={() => console.log('تسجيل الخروج')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  <LogOut className="w-4 h-4" />
                  تسجيل الخروج
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
