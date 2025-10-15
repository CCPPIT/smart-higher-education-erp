'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users } from 'lucide-react';

export default function EventsConferencesManager() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            نظام إدارة الفعاليات والمؤتمرات
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Users className="w-16 h-16 mx-auto mb-4 text-orange-300" />
          <p className="text-gray-500">إدارة شاملة للفعاليات والمؤتمرات الحكومية</p>
        </CardContent>
      </Card>
    </div>
  );
}
