'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck } from 'lucide-react';

export default function HRManagementSuite() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            نظام إدارة الموارد البشرية المتكامل
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <UserCheck className="w-16 h-16 mx-auto mb-4 text-blue-300" />
          <p className="text-gray-500">إدارة شاملة للموارد البشرية والتوظيف والتدريب</p>
        </CardContent>
      </Card>
    </div>
  );
}
