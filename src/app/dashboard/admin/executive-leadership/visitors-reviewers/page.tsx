'use client';

import React from 'react';
import { ContentArea } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function PlaceholderPage() {
  return (
    <ContentArea>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              صفحة قيد التطوير
            </h1>
            <p className="text-gray-600 mt-1">
              هذه الصفحة قيد التطوير وسيتم إضافتها قريباً
            </p>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800 border-0">
            قيد التطوير
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>محتوى الصفحة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              سيتم تطوير محتوى هذه الصفحة قريباً مع جميع المميزات والوظائف المطلوبة.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </ContentArea>
  );
}
