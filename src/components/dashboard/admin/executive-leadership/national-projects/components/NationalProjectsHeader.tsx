import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

interface NationalProjectsHeaderProps {
  className?: string;
}

export const NationalProjectsHeader: React.FC<NationalProjectsHeaderProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-800 rounded-2xl p-8 text-white ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-4 bg-white/20 rounded-xl">
          <Target className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">مكتب المدير التنفيذي للمشاريع الوطنية</h1>
          <p className="text-emerald-100 text-lg">الإشراف على المشاريع الوطنية الكبرى والمبادرات الحكومية</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">20</div>
          <div className="text-sm text-emerald-100">أعضاء الفريق</div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">15</div>
          <div className="text-sm text-emerald-100">مشاريع نشطة</div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">8</div>
          <div className="text-sm text-emerald-100">مشاريع مكتملة</div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">2.5مليار</div>
          <div className="text-sm text-emerald-100">الميزانية</div>
        </div>
      </div>
    </motion.div>
  );
};
