import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface AccessRequest {
  id: number;
  requester: string;
  file: string;
  reason: string;
  status: string;
}

interface AccessRequestsProps {
  requests?: AccessRequest[];
  className?: string;
}

export const AccessRequests: React.FC<AccessRequestsProps> = ({
  requests = [
    { id: 1, requester: 'د. أحمد محمد', file: 'تقرير التحليل الاستراتيجي', reason: 'مراجعة دورية', status: 'معتمد' },
    { id: 2, requester: 'فاطمة علي', file: 'بيانات المشاريع الحساسة', reason: 'تحديث البيانات', status: 'قيد المراجعة' },
    { id: 3, requester: 'خالد عبدالله', file: 'وثائق التعاون الدولي', reason: 'اجتماع رسمي', status: 'مرفوض' }
  ],
  className = ""
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            طلبات الوصول الأخيرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requests.map((request) => (
              <motion.div
                key={request.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: request.id * 0.1 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  request.status === 'معتمد' ? 'bg-green-100' :
                  request.status === 'قيد المراجعة' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  {request.status === 'معتمد' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                   request.status === 'قيد المراجعة' ? <Clock className="w-5 h-5 text-yellow-600" /> :
                   <AlertTriangle className="w-5 h-5 text-red-600" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{request.requester}</div>
                  <div className="text-xs text-gray-600">{request.file}</div>
                  <div className="text-xs text-gray-500">{request.reason}</div>
                </div>
                <Badge
                  variant={
                    request.status === 'معتمد' ? 'default' :
                    request.status === 'قيد المراجعة' ? 'secondary' : 'destructive'
                  }
                  className="text-xs"
                >
                  {request.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
