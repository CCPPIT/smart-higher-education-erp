import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface ProtocolOfficeHeaderProps {
  className?: string;
}

export const ProtocolOfficeHeader: React.FC<ProtocolOfficeHeaderProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-800 rounded-2xl p-8 text-white ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-4 bg-white/20 rounded-xl">
          <Award className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">مكتب البروتوكول والعلاقات الرسمية</h1>
          <p className="text-yellow-100 text-lg">إدارة البروتوكول الرسمي والعلاقات الدولية والدبلوماسية</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">7</div>
          <div className="text-sm text-yellow-100">أعضاء الفريق</div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">4</div>
          <div className="text-sm text-yellow-100">فعاليات نشطة</div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">67</div>
          <div className="text-sm text-yellow-100">زيارات رسمية</div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">23</div>
          <div className="text-sm text-yellow-100">علاقات دولية</div>
        </div>
      </div>
    </motion.div>
  );
};
