import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

interface SecretariatHeaderProps {
  className?: string;
}

export const SecretariatHeader: React.FC<SecretariatHeaderProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-slate-600 via-gray-600 to-slate-800 rounded-2xl p-8 text-white ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative z-10">
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-4 bg-white/20 rounded-xl">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">الأمانة العامة للوزارة</h1>
            <p className="text-slate-100 text-lg">تنسيق الأعمال الإدارية والإجرائية بين الإدارات</p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">15</div>
            <div className="text-sm text-slate-100">أعضاء الفريق</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-slate-100">مشاريع نشطة</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">203</div>
            <div className="text-sm text-slate-100">مراسلات مكتملة</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-slate-100">معدل الإنجاز</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
