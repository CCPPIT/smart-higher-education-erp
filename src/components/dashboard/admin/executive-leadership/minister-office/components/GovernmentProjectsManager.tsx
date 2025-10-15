'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Target } from 'lucide-react';

export default function GovernmentProjectsManager() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-green-600" />
            إدارة المشاريع الحكومية
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Target className="w-16 h-16 mx-auto mb-4 text-green-300" />
          <p className="text-gray-500">إدارة شاملة للمشاريع الحكومية الكبرى والاستراتيجية</p>
        </CardContent>
      </Card>
    </div>
  );
}
