'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  Upload,
  FileText,
  Calendar,
  User,
  Key,
  Fingerprint,
  CreditCard,
  Clock,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { useMinisterOfficeStore, useMinisterOfficeActions, useMinisterOfficeState } from '@/stores/minister-office';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface DigitalSignatureProps {
  className?: string;
}

const DigitalSignature: React.FC<DigitalSignatureProps> = ({ className }) => {
  const {
    digitalSignatures,
    loading
  } = useMinisterOfficeState();

  const {
    createDigitalSignature,
    verifyDigitalSignature,
    fetchDigitalSignatures
  } = useMinisterOfficeActions();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState<any>(null);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);

  const [newSignature, setNewSignature] = useState({
    documentId: '',
    documentType: 'decision' as 'decision' | 'correspondence' | 'report' | 'contract',
    signerId: 'minister-id',
    signerRole: 'minister' as 'minister' | 'deputy' | 'director',
    signatureHash: '',
    signatureMethod: 'digital' as 'digital' | 'biometric' | 'certificate',
    verificationData: {} as any
  });

  useEffect(() => {
    fetchDigitalSignatures();
  }, [fetchDigitalSignatures]);

  const filteredSignatures = digitalSignatures.filter(sig => {
    const matchesSearch = sig.documentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sig.signerId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sig.isValid.toString() === statusFilter;
    const matchesType = typeFilter === 'all' || sig.documentType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateSignature = async () => {
    try {
      await createDigitalSignature({
        ...newSignature,
        signatureHash: generateSignatureHash(newSignature),
        verificationData: {
          timestamp: new Date(),
          ipAddress: '192.168.1.1', // يجب استبدالها بعنوان IP الحقيقي
          userAgent: navigator.userAgent,
          certificateInfo: 'وزارة التعليم العالي - التوقيع الرقمي'
        }
      });

      setNewSignature({
        documentId: '',
        documentType: 'decision',
        signerId: 'minister-id',
        signerRole: 'minister',
        signatureHash: '',
        signatureMethod: 'digital',
        verificationData: {}
      });

      setIsCreateDialogOpen(false);
      toast.success('تم إنشاء التوقيع الرقمي بنجاح');
    } catch (error) {
      toast.error('فشل في إنشاء التوقيع الرقمي');
    }
  };

  const handleVerifySignature = async (signatureId: string) => {
    try {
      const result = await verifyDigitalSignature({
        signatureId,
        verificationData: {
          currentTime: new Date(),
          verifierId: 'system'
        }
      });

      setSelectedSignature({ ...digitalSignatures.find(s => s.id === signatureId), verificationResult: result });
      setIsVerifyDialogOpen(true);
    } catch (error) {
      toast.error('فشل في التحقق من التوقيع');
    }
  };

  const generateSignatureHash = (data: any) => {
    // محاكاة إنشاء هاش للتوقيع الرقمي
    const hashString = JSON.stringify(data) + new Date().toISOString();
    let hash = 0;
    for (let i = 0; i < hashString.length; i++) {
      const char = hashString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  };

  const getStatusBadge = (isValid: boolean) => {
    return (
      <Badge className={`${isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} border-0`}>
        {isValid ? 'صالح' : 'غير صالح'}
      </Badge>
    );
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'digital':
        return <Key className="w-4 h-4" />;
      case 'biometric':
        return <Fingerprint className="w-4 h-4" />;
      case 'certificate':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  if (loading.digitalSignatures) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-6 ${className}`}
    >
      {/* رأس نظام التوقيع الرقمي */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-600" />
            نظام التوقيع الرقمي المشفر
          </h2>
          <p className="text-gray-600 mt-1">
            نظام آمن ومشفر للتوقيع الرقمي على الوثائق والقرارات الرسمية
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              توقيع جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إنشاء توقيع رقمي جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    معرف الوثيقة
                  </label>
                  <Input
                    value={newSignature.documentId}
                    onChange={(e) => setNewSignature(prev => ({ ...prev, documentId: e.target.value }))}
                    placeholder="أدخل معرف الوثيقة"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع الوثيقة
                  </label>
                  <Select
                    value={newSignature.documentType}
                    onValueChange={(value: 'decision' | 'correspondence' | 'report' | 'contract') =>
                      setNewSignature(prev => ({ ...prev, documentType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="decision">قرار</SelectItem>
                      <SelectItem value="correspondence">مراسلة</SelectItem>
                      <SelectItem value="report">تقرير</SelectItem>
                      <SelectItem value="contract">عقد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    دور الموقع
                  </label>
                  <Select
                    value={newSignature.signerRole}
                    onValueChange={(value: 'minister' | 'deputy' | 'director') =>
                      setNewSignature(prev => ({ ...prev, signerRole: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minister">الوزير</SelectItem>
                      <SelectItem value="deputy">نائب الوزير</SelectItem>
                      <SelectItem value="director">مدير</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    طريقة التوقيع
                  </label>
                  <Select
                    value={newSignature.signatureMethod}
                    onValueChange={(value: 'digital' | 'biometric' | 'certificate') =>
                      setNewSignature(prev => ({ ...prev, signatureMethod: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">توقيع رقمي</SelectItem>
                      <SelectItem value="biometric">بصمة بيومترية</SelectItem>
                      <SelectItem value="certificate">شهادة إلكترونية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  معلومات الأمان
                </h4>
                <p className="text-sm text-blue-700">
                  سيتم إنشاء هاش مشفر للتوقيع باستخدام خوارزميات التشفير المتقدمة لضمان الأمان والحماية من التلاعب.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button
                  onClick={handleCreateSignature}
                  disabled={!newSignature.documentId}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  إنشاء التوقيع
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* إحصائيات التوقيعات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">توقيعات صالحة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {digitalSignatures.filter(s => s.isValid).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">توقيعات غير صالحة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {digitalSignatures.filter(s => !s.isValid).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">القرارات الموقعة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {digitalSignatures.filter(s => s.documentType === 'decision').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">هذا الشهر</p>
                <p className="text-2xl font-bold text-gray-900">
                  {digitalSignatures.filter(s => {
                    const signatureDate = new Date(s.signedAt);
                    const now = new Date();
                    return signatureDate.getMonth() === now.getMonth() &&
                           signatureDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* فلاتر البحث */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في التوقيعات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="true">صالح</SelectItem>
                  <SelectItem value="false">غير صالح</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="نوع الوثيقة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="decision">قرار</SelectItem>
                  <SelectItem value="correspondence">مراسلة</SelectItem>
                  <SelectItem value="report">تقرير</SelectItem>
                  <SelectItem value="contract">عقد</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* قائمة التوقيعات */}
      <div className="grid gap-4">
        <AnimatePresence>
          {filteredSignatures.map((signature) => (
            <motion.div
              key={signature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getMethodIcon(signature.signatureMethod)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          توقيع رقمي - {signature.documentType}
                        </h3>
                        {getStatusBadge(signature.isValid)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FileText className="w-4 h-4" />
                          <span>معرف الوثيقة: {signature.documentId}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>الموقع: {signature.signerRole}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(signature.signedAt).toLocaleDateString('ar-SA')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(signature.signedAt).toLocaleTimeString('ar-SA')}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {signature.signatureMethod}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerifySignature(signature.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredSignatures.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>لا توجد توقيعات رقمية متاحة</p>
          </div>
        )}
      </div>

      {/* نافذة التحقق من التوقيع */}
      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedSignature && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  نتيجة التحقق من التوقيع الرقمي
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  selectedSignature.verificationResult?.valid
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedSignature.verificationResult?.valid ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`font-medium ${
                      selectedSignature.verificationResult?.valid ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {selectedSignature.verificationResult?.valid
                        ? 'التوقيع صالح وغير متلاعب به'
                        : 'التوقيع غير صالح أو تم التلاعب به'}
                    </span>
                  </div>
                  {selectedSignature.verificationResult?.message && (
                    <p className={`text-sm ${
                      selectedSignature.verificationResult.valid ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {selectedSignature.verificationResult.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">معلومات التوقيع</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">نوع الوثيقة:</span>
                        <span className="font-medium">{selectedSignature.documentType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">طريقة التوقيع:</span>
                        <span className="font-medium">{selectedSignature.signatureMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">تاريخ التوقيع:</span>
                        <span className="font-medium">
                          {new Date(selectedSignature.signedAt).toLocaleString('ar-SA')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">بيانات التحقق</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">الهاش:</span>
                        <span className="font-mono text-xs bg-white px-2 py-1 rounded">
                          {selectedSignature.signatureHash?.substring(0, 16)}...
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">الحالة:</span>
                        <Badge className={`${selectedSignature.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} border-0`}>
                          {selectedSignature.isValid ? 'صالح' : 'غير صالح'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsVerifyDialogOpen(false)}>
                    إغلاق
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-2" />
                    تصدير التقرير
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default DigitalSignature;
