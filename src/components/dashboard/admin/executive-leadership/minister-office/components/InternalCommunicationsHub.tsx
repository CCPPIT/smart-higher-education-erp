'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, Bell } from 'lucide-react';

export default function InternalCommunicationsHub() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            مركز التواصل الداخلي
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-blue-300" />
          <p className="text-gray-500">منصة التواصل الداخلي والنشرات الرسمية</p>
        </CardContent>
      </Card>
    </div>
  );
}
