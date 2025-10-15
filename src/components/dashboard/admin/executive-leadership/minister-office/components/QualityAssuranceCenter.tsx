'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield } from 'lucide-react';

export default function QualityAssuranceCenter() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            مركز مراقبة الجودة والمعايير
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Shield className="w-16 h-16 mx-auto mb-4 text-green-300" />
          <p className="text-gray-500">مراقبة الجودة وضمان الامتثال للمعايير الحكومية</p>
        </CardContent>
      </Card>
    </div>
  );
}
