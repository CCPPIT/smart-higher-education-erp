import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface PlanningFollowupHeaderProps {
  className?: string;
}

export const PlanningFollowupHeader: React.FC<PlanningFollowupHeaderProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-violet-600 via-purple-600 to-violet-800 rounded-2xl p-8 text-white ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-4 bg-white/20 rounded-xl">
          <TrendingUp className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">مكتب التخطيط والمتابعة الوزارية</h1>
          <p className="text-violet-100 text-lg">تخطيط ومتابعة الأداء وتقييم الإنجازات على مستوى الوزارة</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">10</div>
          <div className="text-sm text-violet-100">أعضاء الفريق</div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">8</div>
          <div className="text-sm text-violet-100">خطط نشطة</div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">145</div>
          <div className="text-sm text-violet-100">خطط مكتملة</div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">92%</div>
          <div className="text-sm text-violet-100">معدل الإنجاز</div>
        </div>
      </div>
    </motion.div>
  );
};
