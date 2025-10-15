'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Folder,
  Search,
  Upload,
  Download,
  Share,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  Star,
  Archive,
  Filter,
  SortAsc,
  Grid,
  List,
  Plus,
  MoreVertical,
  Copy,
  Move,
  Tag,
  Calendar,
  User,
  Clock,
  AlertTriangle,
  CheckCircle,
  Brain,
  Zap,
  Bot,
  Scan,
  FileCheck,
  FileX,
  FileSearch,
  FolderOpen,
  FolderPlus,
  RefreshCw,
  Settings,
  Info,
  History,
  Link,
  Image,
  Video,
  Music,
  File,
  Database,
  Cloud,
  Shield,
  Key,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Printer,
  Mail,
  MessageSquare,
  Bell,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { trpc } from '@/trpc/client';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  mimeType: string;
  url: string;
  thumbnail?: string;
  folderId?: string;
  folderName?: string;
  status: 'active' | 'archived' | 'deleted' | 'processing';
  accessLevel: 'public' | 'restricted' | 'confidential';
  tags: string[];
  category: string;
  description?: string;
  author: string;
  authorName: string;
  collaborators: string[];
  version: number;
  totalVersions: number;
  isLocked: boolean;
  lockedBy?: string;
  lastModified: string;
  createdAt: string;
  aiAnalyzed: boolean;
  aiSummary?: string;
  aiKeywords?: string[];
  aiSentiment?: 'positive' | 'negative' | 'neutral';
  securityLevel: 'low' | 'medium' | 'high' | 'critical';
  expiryDate?: string;
  viewCount: number;
  downloadCount: number;
  shareCount: number;
}

interface Folder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  color: string;
  icon: string;
  accessLevel: 'public' | 'restricted' | 'confidential';
  tags: string[];
  documents: Document[];
  subfolders: Folder[];
  createdBy: string;
  createdAt: string;
  isShared: boolean;
  aiOrganized: boolean;
}

interface DocumentActivity {
  id: string;
  documentId: string;
  userId: string;
  userName: string;
  action: 'created' | 'edited' | 'viewed' | 'downloaded' | 'shared' | 'commented' | 'approved';
  timestamp: string;
  details?: string;
  ipAddress?: string;
  device?: string;
}

interface SmartDocumentManagerProps {
  className?: string;
}

export const SmartDocumentManager: React.FC<SmartDocumentManagerProps> = ({ className = "" }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'tree'>('grid');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isAIAnalysisRunning, setIsAIAnalysisRunning] = useState(false);

  // جلب البيانات من tRPC
  const { data: folders = [], isLoading: foldersLoading } = trpc.ministerOffice.documents.getFolders.useQuery({
    parentId: selectedFolder || undefined
  });

  const { data: documents = [], isLoading: documentsLoading } = trpc.ministerOffice.documents.getDocuments.useQuery({
    folderId: selectedFolder || undefined,
    category: selectedCategory,
    search: searchQuery,
    sortBy: sortBy as any,
    limit: 50
  });

  const { data: recentActivity = [], isLoading: activityLoading } = trpc.ministerOffice.documents.getActivity.useQuery({
    limit: 20
  });

  // تحليل الوثائق بالذكاء الاصطناعي
  const analyzeDocumentsWithAI = async () => {
    setIsAIAnalysisRunning(true);
    try {
      await trpc.ministerOffice.documents.analyzeWithAI.mutate({
        documentIds: selectedDocuments.length > 0 ? selectedDocuments : undefined,
        folderId: selectedFolder || undefined
      });
      toast.success('تم تحليل الوثائق بالذكاء الاصطناعي');
    } catch (error) {
      toast.error('فشل في تحليل الوثائق');
    } finally {
      setIsAIAnalysisRunning(false);
    }
  };

  // البحث الذكي في المحتوى
  const smartSearch = async (query: string) => {
    if (!query.trim()) return;

    try {
      const results = await trpc.ministerOffice.documents.smartSearch.query({
        query,
        includeContent: true,
        includeMetadata: true,
        limit: 20
      });
      // عرض نتائج البحث
      console.log('Smart search results:', results);
    } catch (error) {
      toast.error('فشل في البحث الذكي');
    }
  };

  // تنظيم الوثائق تلقائياً
  const autoOrganizeDocuments = async () => {
    try {
      await trpc.ministerOffice.documents.autoOrganize.mutate({
        folderId: selectedFolder || undefined
      });
      toast.success('تم تنظيم الوثائق تلقائياً');
    } catch (error) {
      toast.error('فشل في تنظيم الوثائق');
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5 text-green-600" />;
    if (type.startsWith('video/')) return <Video className="w-5 h-5 text-blue-600" />;
    if (type.startsWith('audio/')) return <Music className="w-5 h-5 text-purple-600" />;
    if (type.includes('pdf')) return <FileText className="w-5 h-5 text-red-600" />;
    if (type.includes('document') || type.includes('word')) return <FileText className="w-5 h-5 text-blue-600" />;
    if (type.includes('spreadsheet') || type.includes('excel')) return <BarChart3 className="w-5 h-5 text-green-600" />;
    if (type.includes('presentation') || type.includes('powerpoint')) return <PieChart className="w-5 h-5 text-orange-600" />;
    return <File className="w-5 h-5 text-gray-600" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 بايت';
    const k = 1024;
    const sizes = ['بايت', 'كيلوبايت', 'ميغابايت', 'غيغابايت'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSecurityBadge = (level: string) => {
    const configs = {
      low: { label: 'منخفض', color: 'bg-green-100 text-green-800' },
      medium: { label: 'متوسط', color: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'عالي', color: 'bg-orange-100 text-orange-800' },
      critical: { label: 'حرج', color: 'bg-red-100 text-red-800' }
    };
    const config = configs[level as keyof typeof configs] || configs.medium;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  return (
    <motion.div
      className={`space-y-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* رأس نظام إدارة الوثائق الذكي */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            نظام إدارة الوثائق والملفات الذكي
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            إدارة متقدمة للوثائق مع تحليل بالذكاء الاصطناعي والتنظيم التلقائي
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
            <Brain className="w-3 h-3 mr-1" />
            مدعوم بالذكاء الاصطناعي
          </Badge>
          <Button
            onClick={analyzeDocumentsWithAI}
            disabled={isAIAnalysisRunning || selectedDocuments.length === 0}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isAIAnalysisRunning ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Brain className="w-4 h-4 mr-2" />
            )}
            تحليل بالذكاء الاصطناعي
          </Button>
          <Button
            onClick={autoOrganizeDocuments}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <Zap className="w-4 h-4 mr-2" />
            تنظيم تلقائي
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload className="w-4 h-4 mr-2" />
            رفع وثائق
          </Button>
        </div>
      </div>

      {/* لوحة التحكم والفلاتر */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وضع العرض
                </label>
                <Select value={viewMode} onValueChange={(value: 'grid' | 'list' | 'tree') => setViewMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">شبكة</SelectItem>
                    <SelectItem value="list">قائمة</SelectItem>
                    <SelectItem value="tree">شجرة المجلدات</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الترتيب حسب
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">التاريخ</SelectItem>
                    <SelectItem value="name">الاسم</SelectItem>
                    <SelectItem value="size">الحجم</SelectItem>
                    <SelectItem value="type">النوع</SelectItem>
                    <SelectItem value="relevance">الصلة (ذكي)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الوثائق والمحتوى..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => smartSearch(searchQuery)}
                  disabled={!searchQuery.trim()}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  بحث ذكي
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  عرض الوثائق المؤرشفة
                </label>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  التحقق التلقائي من النسخ
                </label>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                تصدير البيانات
              </Button>
              <Button variant="outline" onClick={() => setIsCreateFolderModalOpen(true)}>
                <FolderPlus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي الوثائق</p>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">محللة بالذكاء الاصطناعي</p>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.filter((d: Document) => d.aiAnalyzed).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">مستوى الأمان</p>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.filter((d: Document) => d.securityLevel === 'high' || d.securityLevel === 'critical').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">النشاط اليومي</p>
                <p className="text-2xl font-bold text-gray-900">
                  {recentActivity.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* الشريط الجانبي - المجلدات */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="w-5 h-5 text-blue-600" />
                المجلدات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {foldersLoading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : (
                folders.map((folder: Folder) => (
                  <motion.div
                    key={folder.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedFolder === folder.id ? 'bg-blue-100 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedFolder(folder.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${folder.color}`}>
                      <span className="text-white font-bold text-sm">{folder.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900">{folder.name}</h4>
                      <p className="text-xs text-gray-600">{folder.documents.length} وثيقة</p>
                    </div>
                    {folder.aiOrganized && (
                      <Badge className="bg-purple-100 text-purple-800 text-xs">
                        <Brain className="w-3 h-3 mr-1" />
                        ذكي
                      </Badge>
                    )}
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>

          {/* أنشطة حديثة */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                الأنشطة الحديثة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activityLoading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : (
                recentActivity.slice(0, 5).map((activity: DocumentActivity) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {activity.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.userName}
                      </p>
                      <p className="text-xs text-gray-600">
                        {activity.action === 'created' ? 'أنشأ وثيقة' :
                         activity.action === 'edited' ? 'عدل وثيقة' :
                         activity.action === 'viewed' ? 'عرض وثيقة' :
                         activity.action === 'downloaded' ? 'حمل وثيقة' :
                         activity.action === 'shared' ? 'شارك وثيقة' : 'علق على وثيقة'}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleTimeString('ar-SA')}
                    </span>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* منطقة الوثائق الرئيسية */}
        <div className="lg:col-span-3 space-y-6">
          {/* شريط أدوات الوثائق */}
          {selectedDocuments.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedDocuments.length === documents.filter((d: Document) => d.status === 'active').length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedDocuments(documents.filter((d: Document) => d.status === 'active').map(d => d.id));
                        } else {
                          setSelectedDocuments([]);
                        }
                      }}
                    />
                    <span className="text-sm font-medium">
                      تم تحديد {selectedDocuments.length} وثيقة
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      مشاركة
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      تحميل
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="w-4 h-4 mr-2" />
                      أرشفة
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      حذف
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* عرض الشبكة */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {documentsLoading ? (
                [...Array(8)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                documents.map((document: Document) => (
                  <motion.div
                    key={document.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
                      selectedDocuments.includes(document.id) ? 'ring-2 ring-blue-500' : ''
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedDocuments.includes(document.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedDocuments([...selectedDocuments, document.id]);
                              } else {
                                setSelectedDocuments(selectedDocuments.filter(id => id !== document.id));
                              }
                            }}
                            className="mt-1"
                          />

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getFileIcon(document.mimeType)}
                              <span className="text-xs text-gray-500">
                                {document.version > 1 && `v${document.version}`}
                              </span>
                            </div>

                            <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                              {document.name}
                            </h3>

                            <p className="text-xs text-gray-600 mb-2">
                              {formatFileSize(document.size)} • {document.category}
                            </p>

                            <div className="flex items-center gap-2 mb-2">
                              {getSecurityBadge(document.securityLevel)}
                              {document.aiAnalyzed && (
                                <Badge className="bg-purple-100 text-purple-800 text-xs">
                                  <Brain className="w-3 h-3 mr-1" />
                                  محلل
                                </Badge>
                              )}
                            </div>

                            {document.aiSummary && (
                              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                {document.aiSummary}
                              </p>
                            )}

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{document.authorName}</span>
                              <span>{new Date(document.lastModified).toLocaleDateString('ar-SA')}</span>
                            </div>
                          </div>

                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* عرض القائمة */}
          {viewMode === 'list' && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {documents.map((document: Document) => (
                    <motion.div
                      key={document.id}
                      className={`flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors ${
                        selectedDocuments.includes(document.id) ? 'bg-blue-50 border border-blue-200' : ''
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Checkbox
                        checked={selectedDocuments.includes(document.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedDocuments([...selectedDocuments, document.id]);
                          } else {
                            setSelectedDocuments(selectedDocuments.filter(id => id !== document.id));
                          }
                        }}
                      />

                      {getFileIcon(document.mimeType)}

                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{document.name}</h4>
                        <p className="text-sm text-gray-600">
                          {document.description || 'لا يوجد وصف'} • {formatFileSize(document.size)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {getSecurityBadge(document.securityLevel)}
                        {document.aiAnalyzed && (
                          <Badge className="bg-purple-100 text-purple-800 text-xs">
                            <Brain className="w-3 h-3 mr-1" />
                            محلل
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* عرض شجرة المجلدات */}
          {viewMode === 'tree' && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {folders.map((folder: Folder) => (
                    <motion.div
                      key={folder.id}
                      className="border rounded-lg p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${folder.color}`}>
                          <span className="text-white font-bold text-sm">{folder.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{folder.name}</h4>
                          <p className="text-sm text-gray-600">{folder.description}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          {folder.documents.length} وثيقة
                        </Badge>
                      </div>

                      {folder.documents.length > 0 && (
                        <div className="ml-11 space-y-2">
                          {folder.documents.slice(0, 3).map((document: Document) => (
                            <div key={document.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              {getFileIcon(document.mimeType)}
                              <span className="text-sm text-gray-700">{document.name}</span>
                              <span className="text-xs text-gray-500 ml-auto">
                                {formatFileSize(document.size)}
                              </span>
                            </div>
                          ))}
                          {folder.documents.length > 3 && (
                            <p className="text-sm text-gray-500 ml-6">
                              و {folder.documents.length - 3} وثيقة أخرى...
                            </p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* معلومات النظام الذكي */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Brain className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                كيف يعمل نظام إدارة الوثائق الذكي؟
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Scan className="w-4 h-4 text-blue-600" />
                  <span>تحليل محتوى الوثائق واستخراج المعلومات</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-green-600" />
                  <span>تصنيف تلقائي وإنشاء وسوم ذكية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span>تشفير متقدم وحماية البيانات الحساسة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-orange-600" />
                  <span>بحث ذكي في المحتوى والخصائص</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SmartDocumentManager;
