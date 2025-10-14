import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface AdvisoryHeaderProps {
  className?: string;
}

export const AdvisoryHeader: React.FC<AdvisoryHeaderProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-amber-600 via-orange-600 to-amber-800 rounded-2xl p-8 text-white relative overflow-hidden ${className}`}
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
            <Star className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">مكتب المستشارين</h1>
            <p className="text-amber-100 text-lg">تقديم الاستشارات الاستراتيجية والفنية لدعم اتخاذ القرارات</p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">6</div>
            <div className="text-sm text-amber-100">المستشارين</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-amber-100">مشاريع نشطة</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">76</div>
            <div className="text-sm text-amber-100">استشارات مكتملة</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">96%</div>
            <div className="text-sm text-amber-100">معدل الرضا</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
