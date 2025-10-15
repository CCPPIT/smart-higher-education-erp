'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare,
  Plus,
  Calendar,
  Clock,
  Users,
  Target,
  AlertTriangle,
  TrendingUp,
  Brain,
  Zap,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  AlertCircle,
  Lightbulb,
  Timer,
  BarChart3,
  PieChart,
  Activity,
  Flag,
  Star,
  Archive,
  Share,
  Download,
  RefreshCw,
  Settings,
  Bell,
  User,
  Building,
  FileText,
  Link,
  MessageSquare,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  GripVertical,
  Copy,
  Move,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { trpc } from '@/trpc/client';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  startDate: string;
  endDate: string;
  budget?: number;
  team: string[];
  manager: string;
  tags: string[];
  aiGenerated: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  assigneeName?: string;
  projectId: string;
  parentTaskId?: string;
  estimatedHours?: number;
  actualHours?: number;
  dueDate?: string;
  tags: string[];
  subtasks: Task[];
  dependencies: string[];
  aiSuggested: boolean;
  aiInsights?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  workload: number;
  skills: string[];
  availability: number;
}

interface IntelligentTaskManagerProps {
  className?: string;
}

export const IntelligentTaskManager: React.FC<IntelligentTaskManagerProps> = ({ className = "" }) => {
  const [selectedView, setSelectedView] = useState<'kanban' | 'list' | 'calendar' | 'gantt'>('kanban');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // جلب البيانات من tRPC
  const { data: projects = [], isLoading: projectsLoading } = trpc.ministerOffice.projects.getAll.useQuery({
    status: selectedFilter,
    limit: 50
  });

  const { data: tasks = [], isLoading: tasksLoading } = trpc.ministerOffice.tasks.getAll.useQuery({
    projectId: selectedProject || undefined,
    status: selectedFilter,
    limit: 100
  });

  const { data: teamMembers = [], isLoading: membersLoading } = trpc.ministerOffice.projects.getTeamMembers.useQuery({
    projectId: selectedProject || undefined
  });

  // توليد اقتراحات ذكية للمهام
  const generateTaskSuggestions = async () => {
    setIsGenerating(true);
    try {
      await fetch('/api/trpc/ministerOffice.tasks.generateAISuggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            projectId: selectedProject || undefined
          }
        }),
      });
      toast.success('تم توليد اقتراحات ذكية للمهام');
    } catch (error) {
      toast.error('فشل في توليد الاقتراحات الذكية');
    } finally {
      setIsGenerating(false);
    }
  };

  // تحسين توزيع المهام بالذكاء الاصطناعي
  const optimizeTaskAssignment = async () => {
    setIsOptimizing(true);
    try {
      await fetch('/api/trpc/ministerOffice.tasks.optimizeAssignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            projectId: selectedProject || undefined
          }
        }),
      });
      toast.success('تم تحسين توزيع المهام بالذكاء الاصطناعي');
    } catch (error) {
      toast.error('فشل في تحسين توزيع المهام');
    } finally {
      setIsOptimizing(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      planning: 'bg-gray-100 text-gray-800',
      active: 'bg-blue-100 text-blue-800',
      on_hold: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.planning;
  };

  const getTaskStatusColor = (status: string) => {
    const colors = {
      todo: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      review: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.todo;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'high': return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'medium': return <Clock className="w-4 h-4 text-blue-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <motion.div
      className={`space-y-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* رأس نظام إدارة المهام الذكي */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-green-600" />
            نظام إدارة المهام والمشاريع الذكي
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            إدارة متقدمة للمهام والمشاريع مع اقتراحات الذكاء الاصطناعي والتتبع التلقائي
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
            <Brain className="w-3 h-3 mr-1" />
            مدعوم بالذكاء الاصطناعي
          </Badge>
          <Button
            onClick={generateTaskSuggestions}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <Brain className="w-4 h-4 mr-2" />
            توليد اقتراحات ذكية
          </Button>
          <Button
            onClick={optimizeTaskAssignment}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Zap className="w-4 h-4 mr-2" />
            تحسين التوزيع التلقائي
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsProjectModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            مشروع جديد
          </Button>
        </div>
      </div>

      {/* لوحة التحكم والفلاتر */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وضع العرض
                </label>
                <Select value={selectedView} onValueChange={(value: 'kanban' | 'list' | 'calendar' | 'gantt') => setSelectedView(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kanban">لوحة كانبان</SelectItem>
                    <SelectItem value="list">قائمة</SelectItem>
                    <SelectItem value="calendar">تقويم</SelectItem>
                    <SelectItem value="gantt">غانت</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الفلتر
                </label>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المشاريع</SelectItem>
                    <SelectItem value="active">نشطة</SelectItem>
                    <SelectItem value="planning">تخطيط</SelectItem>
                    <SelectItem value="completed">مكتملة</SelectItem>
                    <SelectItem value="on_hold">متوقفة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البحث
                </label>
                <div className="relative">
                  <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="البحث في المهام والمشاريع..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  عرض المكتملة
                </label>
                <Checkbox
                  checked={showCompleted}
                  onCheckedChange={(checked) => setShowCompleted(checked === true)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المشروع المحدد
                </label>
                <Select value={selectedProject || 'all'} onValueChange={(value) => setSelectedProject(value === 'all' ? null : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="جميع المشاريع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المشاريع</SelectItem>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                تصدير البيانات
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4" />
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
                <CheckSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">المشاريع النشطة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.filter((p) => p.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">المهام المكتملة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tasks.filter((t: Task) => t.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">اقتراحات الذكاء الاصطناعي</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tasks.filter((t: Task) => t.aiSuggested).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Timer className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">متوسط وقت الإنجاز</p>
                <p className="text-2xl font-bold text-gray-900">2.3 أيام</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* المحتوى الرئيسي حسب وضع العرض */}
      {selectedView === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* عمود المهام المطلوبة */}
          <Card className="bg-gray-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Target className="w-5 h-5" />
                مطلوبة ({tasks.filter((t: Task) => t.status === 'todo').length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks
                .filter((task: Task) => task.status === 'todo')
                .map((task: Task) => (
                  <motion.div
                    key={task.id}
                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox className="mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900 mb-1">
                          {task.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-2">
                          {getPriorityIcon(task.priority)}
                          <Badge className={getTaskStatusColor(task.status)}>
                            {task.status === 'todo' ? 'مطلوبة' : task.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </CardContent>
          </Card>

          {/* عمود المهام قيد التنفيذ */}
          <Card className="bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Activity className="w-5 h-5" />
                قيد التنفيذ ({tasks.filter((t: Task) => t.status === 'in_progress').length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks
                .filter((task: Task) => task.status === 'in_progress')
                .map((task: Task) => (
                  <motion.div
                    key={task.id}
                    className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Activity className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900 mb-1">
                          {task.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {task.assigneeName || 'غير محدد'}
                        </p>
                        <Progress value={65} className="h-1 mb-2" />
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">65% مكتمل</span>
                          <span className="text-blue-600">يومين متبقيين</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </CardContent>
          </Card>

          {/* عمود المهام قيد المراجعة */}
          <Card className="bg-yellow-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                <Eye className="w-5 h-5" />
                قيد المراجعة ({tasks.filter((t: Task) => t.status === 'review').length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks
                .filter((task: Task) => task.status === 'review')
                .map((task: Task) => (
                  <motion.div
                    key={task.id}
                    className="bg-white p-4 rounded-lg border border-yellow-200 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Eye className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900 mb-1">
                          {task.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          بانتظار مراجعة المدير
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                            مراجعة مطلوبة
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </CardContent>
          </Card>

          {/* عمود المهام المكتملة */}
          <Card className="bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                مكتملة ({tasks.filter((t: Task) => t.status === 'completed').length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks
                .filter((task: Task) => task.status === 'completed')
                .slice(0, 5)
                .map((task: Task) => (
                  <motion.div
                    key={task.id}
                    className="bg-white p-4 rounded-lg border border-green-200 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900 mb-1">
                          {task.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                          مكتملة بنجاح
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* عرض القائمة */}
      {selectedView === 'list' && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {tasks.map((task: Task) => (
                <motion.div
                  key={task.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Checkbox checked={task.status === 'completed'} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(task.priority)}
                    <Badge className={getTaskStatusColor(task.status)}>
                      {task.status === 'todo' ? 'مطلوبة' :
                       task.status === 'in_progress' ? 'قيد التنفيذ' :
                       task.status === 'review' ? 'مراجعة' :
                       task.status === 'completed' ? 'مكتملة' : 'ملغية'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
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

      {/* عرض التقويم */}
      {selectedView === 'calendar' && (
        <Card>
          <CardContent className="p-6">
            <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">عرض التقويم التفاعلي</p>
                <p className="text-sm text-gray-400 mt-2">تطوير قيد التنفيذ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* عرض غانت */}
      {selectedView === 'gantt' && (
        <Card>
          <CardContent className="p-6">
            <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">مخطط غانت التفاعلي</p>
                <p className="text-sm text-gray-400 mt-2">تطوير قيد التنفيذ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* لوحة أعضاء الفريق وتوزيع العبء */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              أعضاء الفريق وتوزيع العبء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{member.workload}%</div>
                    <Progress value={member.workload} className="w-20 h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              اقتراحات الذكاء الاصطناعي للمهام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks
                .filter((task: Task) => task.aiSuggested)
                .slice(0, 3)
                .map((task: Task) => (
                  <div key={task.id} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900 mb-1">
                          {task.title}
                        </h4>
                        {task.aiInsights && (
                          <p className="text-xs text-purple-700">{task.aiInsights}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
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
                كيف يعمل نظام إدارة المهام الذكي؟
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>توزيع المهام التلقائي حسب المهارات والتوفر</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span>اقتراح مهام جديدة بناءً على التحليل التنبؤي</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-orange-600" />
                  <span>تنبؤ المواعيد النهائية وتحذير من التأخير</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <span>تحسين سير العمل وتقليل الوقت المستهلك</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IntelligentTaskManager;
