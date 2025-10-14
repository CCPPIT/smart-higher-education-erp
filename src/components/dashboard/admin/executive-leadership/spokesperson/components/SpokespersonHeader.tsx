import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface SpokespersonHeaderProps {
  className?: string;
}

export const SpokespersonHeader: React.FC<SpokespersonHeaderProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-800 rounded-2xl p-8 text-white ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-4 bg-white/20 rounded-xl">
          <MessageSquare className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">مكتب المتحدث الرسمي</h1>
          <p className="text-cyan-100 text-lg">إدارة التواصل الإعلامي والعلاقات العامة للوزارة</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">8</div>
          <div className="text-sm text-cyan-100">أعضاء الفريق</div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">6</div>
          <div className="text-sm text-cyan-100">حملات نشطة</div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">112</div>
          <div className="text-sm text-cyan-100">بيانات صحفية</div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">89%</div>
          <div className="text-sm text-cyan-100">معدل الرضا</div>
        </div>
      </div>
    </motion.div>
  );
};
