

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { SidebarSubNavigationItem } from './SidebarSubNavigationItem';
import Link from 'next/link';

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

interface SidebarNavigationItemProps {
  item: NavigationItem;
  isActive: boolean;
  isOpen: boolean;
  isExpanded: boolean;
  onToggle: (itemId: string) => void;
  level?: number;
}

export const SidebarNavigationItem: React.FC<SidebarNavigationItemProps> = React.memo(({
  item,
  isActive,
  isOpen,
  isExpanded,
  onToggle,
  level = 0
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  const hasChildren = useMemo(() => item.children && item.children.length > 0, [item.children]);

  const handleToggle = useCallback(() => {
    if (hasChildren) {
      onToggle(item.id);
    }
  }, [hasChildren, onToggle, item.id]);

  const handleHoverStart = useCallback(() => setHovered(true), []);
  const handleHoverEnd = useCallback(() => setHovered(false), []);

  const buttonClassName = useMemo(() => cn(
    "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
    isActive
      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-purple-500/25`
      : "hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 text-gray-700 hover:text-gray-900"
  ), [isActive, item.gradient]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: level * 0.05 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      {/* العنصر الرئيسي */}
      <Link href={item.href}>
        <motion.button
          onClick={handleToggle}
          className={buttonClassName}
          whileHover={{
            scale: 1.02,
            y: -1
          }}
          whileTap={{
            scale: 0.98
          }}
        >
          {/* خلفية متحركة */}
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              layoutId="activeBackground"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}

          {/* أيقونة متحركة */}
          <motion.div
            className="relative z-10"
            animate={isActive ? {
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>

          {/* النص والشارة */}
          {isOpen && (
            <motion.div
              className="flex-1 text-right relative z-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {hasChildren && (
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </motion.div>
                  )}
                  <span className="font-medium text-sm">{item.title}</span>
                </div>

                {item.badge && (
                  <motion.div
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-bold",
                      isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                    )}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.badge}
                  </motion.div>
                )}
              </div>

              {item.description && (
                <p className="text-xs opacity-80 mt-1">{item.description}</p>
              )}
            </motion.div>
          )}

          {/* تأثير التوهج */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              x: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      </Link>

      {/* العناصر الفرعية */}
      <AnimatePresence>
        {hasChildren && isExpanded && isOpen && item.children && (
          <motion.div
            initial={{ opacity: 0, height: 0, x: 20 }}
            animate={{ opacity: 1, height: "auto", x: 0 }}
            exit={{ opacity: 0, height: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-2 mr-4 space-y-1 border-r border-gray-200 pr-4"
          >
            {item.children.map((child, childIndex) => (
              <SidebarSubNavigationItem
                key={child.id}
                item={child}
                isActive={isActive}
                isOpen={isOpen}
                level={level + 1}
                index={childIndex}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
       