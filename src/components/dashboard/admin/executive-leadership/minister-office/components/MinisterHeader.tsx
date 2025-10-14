import React from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

interface MinisterHeaderProps {
  className?: string;
}

export const MinisterHeader: React.FC<MinisterHeaderProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 rounded-2xl p-8 text-white relative overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/10"
        animate={{
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10">
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-4 bg-white/20 rounded-xl">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">مكتب الوزير</h1>
            <p className="text-purple-100 text-lg">القيادة العليا والتوجيه الاستراتيجي للوزارة</p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-purple-100">أعضاء الفريق</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-purple-100">مشاريع نشطة</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-purple-100">مهام مكتملة</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">98%</div>
            <div className="text-sm text-purple-100">معدل الإنجاز</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
