import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

interface AISuggestionsProps {
  className?: string;
}

export const AISuggestions: React.FC<AISuggestionsProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`lg:col-span-2 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            المساعد الذكي
          </CardTitle>
          <CardDescription>
            نظام ذكي لمساعدة الوزير في اتخاذ القرارات وإدارة المهام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">اقتراحات اليوم</h4>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• مراجعة تقرير الأداء الشهري قبل الاجتماع</li>
                <li>• جدولة لقاء مع رؤساء الجامعات الجدد</li>
                <li>• متابعة حالة مشروع التعليم الرقمي</li>
              </ul>
            </div>
            <Button className="w-full">
              طلب تحليل شامل
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AISuggestions;
