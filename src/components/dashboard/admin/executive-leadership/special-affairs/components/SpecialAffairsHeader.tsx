import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface SpecialAffairsHeaderProps {
  className?: string;
}

export const SpecialAffairsHeader: React.FC<SpecialAffairsHeaderProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-red-600 via-rose-600 to-red-800 rounded-2xl p-8 text-white relative overflow-hidden ${className}`}
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
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">مكتب الشؤون الخاصة</h1>
            <p className="text-red-100 text-lg">إدارة الملفات الحساسة والمشاريع الخاصة بالوزارة</p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-red-100">أعضاء الفريق</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-red-100">مشاريع نشطة</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">45</div>
            <div className="text-sm text-red-100">ملفات مصنفة</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">99%</div>
            <div className="text-sm text-red-100">أمان البيانات</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
