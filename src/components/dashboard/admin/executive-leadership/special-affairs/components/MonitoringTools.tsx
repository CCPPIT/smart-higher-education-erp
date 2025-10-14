import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter, Archive, AlertTriangle, Eye } from 'lucide-react';

interface MonitoringToolsProps {
  className?: string;
}

export const MonitoringTools: React.FC<MonitoringToolsProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            أدوات المراقبة والتدقيق
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Eye className="w-6 h-6" />
              <span className="text-sm">مراقبة الوصول</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Filter className="w-6 h-6" />
              <span className="text-sm">تصفية السجلات</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Archive className="w-6 h-6" />
              <span className="text-sm">الأرشفة الآمنة</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-sm">التنبيهات الأمنية</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
