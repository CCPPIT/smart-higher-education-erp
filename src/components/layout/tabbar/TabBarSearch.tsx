'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TabBarSearchProps {
  className?: string;
}

export const TabBarSearch: React.FC<TabBarSearchProps> = ({
  className = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div
      className={`relative hidden sm:block ${className}`}
      animate={{
        scale: isFocused ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={{
          scale: isFocused ? [1, 1.02] : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="البحث في النظام..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pr-10 w-64 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
        />
      </motion.div>

      {/* نتائج البحث السريع */}
      <AnimatePresence>
        {searchQuery && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2">
              <p className="text-sm text-gray-600">البحث عن: "{searchQuery}"</p>
              <div className="mt-2 space-y-1">
                {['المراسلات', 'القرارات', 'الاجتماعات'].map((result, index) => (
                  <motion.button
                    key={result}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {result}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
