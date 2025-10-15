'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Video,
  Users,
  FileText,
  Calendar,
  Share,
  Search,
  Plus,
  Send,
  Smile,
  Paperclip,
  MoreVertical,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  ScreenShare,
  Settings,
  Bell,
  BellOff,
  UserPlus,
  Hash,
  AtSign,
  Image,
  File,
  Link,
  Download,
  Edit,
  Trash2,
  Flag,
  Pin,
  Star,
  Heart,
  ThumbsUp,
  MessageSquare,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  X,
  ChevronDown,
  ChevronRight,
  Filter,
  SortAsc,
  RefreshCw,
  Zap,
  Brain,
  Bot,
  Globe,
  Lock,
  Unlock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Building,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { trpc } from '@/trpc/client';

interface Message {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  timestamp: string;
  type: 'text' | 'file' | 'image' | 'system' | 'ai_response';
  reactions: { emoji: string; users: string[] }[];
  replies: Message[];
  attachments?: { name: string; url: string; type: string; size: number }[];
  isEdited: boolean;
  isPinned: boolean;
  mentions: string[];
  aiGenerated?: boolean;
  aiConfidence?: number;
}

interface Channel {
  id: string;
  name: string;
  description: string;
  type: 'public' | 'private' | 'direct';
  members: string[];
  unreadCount: number;
  lastMessage?: Message;
  createdAt: string;
  isArchived: boolean;
  aiEnabled: boolean;
}

interface VideoCall {
  id: string;
  channelId: string;
  participants: { id: string; name: string; avatar?: string; isMuted: boolean; isVideoOn: boolean }[];
  status: 'waiting' | 'active' | 'ended';
  startedAt?: string;
  duration?: number;
  recording?: boolean;
}

interface CollaborationWorkspace {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  members: string[];
  channels: Channel[];
  files: { name: string; url: string; type: string; size: number; uploadedBy: string; uploadedAt: string }[];
  tasks: string[];
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
}

interface IntelligentCollaborationPlatformProps {
  className?: string;
}

export const IntelligentCollaborationPlatform: React.FC<IntelligentCollaborationPlatformProps> = ({ className = "" }) => {
  const [activeWorkspace, setActiveWorkspace] = useState<string | null>(null);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('messages');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // جلب البيانات من tRPC
  const { data: workspaces = [], isLoading: workspacesLoading } = trpc.ministerOffice.collaboration.getWorkspaces.useQuery();
  const { data: channels = [], isLoading: channelsLoading } = trpc.ministerOffice.collaboration.getChannels.useQuery({
    workspaceId: activeWorkspace || undefined
  });
  const { data: messages = [], isLoading: messagesLoading } = trpc.ministerOffice.collaboration.getMessages.useQuery({
    channelId: activeChannel || '',
    limit: 50
  });

  // مراقبة الرسائل الجديدة في الوقت الفعلي (محلي مؤقتاً)
  // const { data: realTimeMessages } = trpc.ministerOffice.collaboration.subscribeToChannel.useQuery(
  //   { channelId: activeChannel || '' },
  //   { enabled: !!activeChannel }
  // );

  // إرسال رسالة
  const sendMessageMutation = trpc.ministerOffice.collaboration.sendMessage.useMutation();

  const sendMessage = async () => {
    if (!messageInput.trim() || !activeChannel) return;

    try {
      await sendMessageMutation.mutateAsync({
        channelId: activeChannel,
        content: messageInput,
        type: 'text'
      });
      setMessageInput('');
    } catch (error) {
      toast.error('فشل في إرسال الرسالة');
    }
  };

  // إجراء مكالمة فيديو
  const startVideoCallMutation = trpc.ministerOffice.collaboration.startVideoCall.useMutation();

  const startVideoCall = async () => {
    if (!activeChannel) return;

    try {
      await startVideoCallMutation.mutateAsync({
        channelId: activeChannel
      });
      setIsVideoCallActive(true);
      toast.success('بدء مكالمة فيديو');
    } catch (error) {
      toast.error('فشل في بدء المكالمة');
    }
  };

  // توليد رد ذكي بالذكاء الاصطناعي
  const generateAIResponseMutation = trpc.ministerOffice.aiAssistant.ask.useMutation();
  const sendMessageMutation2 = trpc.ministerOffice.collaboration.sendMessage.useMutation();

  const generateAIResponse = async (context: string) => {
    try {
      const response = await generateAIResponseMutation.mutateAsync({
        query: `بناءً على السياق التالي، قدم رد ذكي ومفيد: ${context}`,
        context: { channelId: activeChannel, messageContext: context }
      });

      await sendMessageMutation2.mutateAsync({
        channelId: activeChannel || '',
        content: response.response,
        type: 'ai_response'
      });

      toast.success('تم توليد رد ذكي');
    } catch (error) {
      toast.error('فشل في توليد الرد الذكي');
    }
  };

  // البحث في الرسائل والملفات (محلي مؤقتاً)
  const searchContent = async (query: string) => {
    if (!query.trim()) return;

    try {
      // البحث محلي في الرسائل المحملة حالياً
      const filteredMessages = messages.filter((msg: Message) =>
        msg.content.toLowerCase().includes(query.toLowerCase()) ||
        msg.authorName.toLowerCase().includes(query.toLowerCase())
      );

      console.log('Search results:', filteredMessages);
      toast.success(`تم العثور على ${filteredMessages.length} نتيجة`);
    } catch (error) {
      toast.error('فشل في البحث');
    }
  };

  // تنسيق الوقت
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // الحصول على أيقونة نوع الرسالة
  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'file': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'image': return <Image className="w-4 h-4 text-green-600" />;
      case 'system': return <Settings className="w-4 h-4 text-gray-600" />;
      case 'ai_response': return <Brain className="w-4 h-4 text-purple-600" />;
      default: return <MessageCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <motion.div
      className={`space-y-8 ${className} ${isFullscreen ? 'fixed inset-0 bg-white z-50 p-6 overflow-hidden' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* رأس المنصة */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            منصة التعاون والتواصل الذكية
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            نظام متكامل للتعاون والتواصل مع إمكانيات الذكاء الاصطناعي المتقدمة
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
            <Brain className="w-3 h-3 mr-1" />
            مدعوم بالذكاء الاصطناعي
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button
            onClick={() => searchContent(searchQuery)}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <Search className="w-4 h-4 mr-2" />
            بحث ذكي
          </Button>
        </div>
      </div>

      {/* شريط البحث والفلاتر */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مساحة العمل
                </label>
                <Select value={activeWorkspace || ''} onValueChange={setActiveWorkspace}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر مساحة العمل" />
                  </SelectTrigger>
                  <SelectContent>
                    {workspaces.map((workspace: CollaborationWorkspace) => (
                      <SelectItem key={workspace.id} value={workspace.id}>
                        {workspace.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  القناة
                </label>
                <Select value={activeChannel || ''} onValueChange={setActiveChannel}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القناة" />
                  </SelectTrigger>
                  <SelectContent>
                    {channels.map((channel: Channel) => (
                      <SelectItem key={channel.id} value={channel.id}>
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4" />
                          {channel.name}
                          {channel.unreadCount > 0 && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              {channel.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الرسائل والملفات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  فلترة متقدمة
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  التنبيهات الصوتية
                </label>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  الوضع المظلم
                </label>
                <Switch />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={startVideoCall}
                disabled={!activeChannel}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Video className="w-4 h-4 mr-2" />
                مكالمة فيديو
              </Button>
              <Button variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* المحتوى الرئيسي */}
      <div className={`grid grid-cols-1 ${isFullscreen ? 'lg:grid-cols-1' : 'lg:grid-cols-4'} gap-8`}>
        {/* الشريط الجانبي - مساحات العمل والقنوات */}
        {!isFullscreen && (
          <div className="lg:col-span-1 space-y-6">
            {/* مساحات العمل */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  مساحات العمل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {workspacesLoading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg animate-pulse">
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  workspaces.map((workspace: CollaborationWorkspace) => (
                    <motion.div
                      key={workspace.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        activeWorkspace === workspace.id ? 'bg-blue-100 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveWorkspace(workspace.id)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${workspace.color}`}>
                        <span className="text-white font-bold text-sm">{workspace.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900">{workspace.name}</h4>
                        <p className="text-xs text-gray-600">{workspace.members.length} عضو</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* القنوات */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-green-600" />
                  القنوات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {channelsLoading ? (
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-gray-100 rounded animate-pulse">
                      <div className="w-4 h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded flex-1"></div>
                    </div>
                  ))
                ) : (
                  channels.map((channel: Channel) => (
                    <motion.div
                      key={channel.id}
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        activeChannel === channel.id ? 'bg-green-100 border border-green-200' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveChannel(channel.id)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Hash className="w-4 h-4 text-gray-600" />
                      <span className="flex-1 text-sm font-medium">{channel.name}</span>
                      {channel.unreadCount > 0 && (
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          {channel.unreadCount}
                        </Badge>
                      )}
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* أعضاء الفريق */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  أعضاء الفريق
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`/avatars/user-${i + 1}.jpg`} />
                      <AvatarFallback>ع{i + 1}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">عضو الفريق {i + 1}</p>
                      <p className="text-xs text-gray-600">متصل الآن</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* منطقة المحادثة الرئيسية */}
        <div className={`${isFullscreen ? 'lg:col-span-1' : 'lg:col-span-3'} space-y-6`}>
          {/* شريط أدوات المحادثة */}
          {activeChannel && (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Hash className="w-5 h-5 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {channels.find((c: Channel) => c.id === activeChannel)?.name || 'قناة عامة'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {channels.find((c: Channel) => c.id === activeChannel)?.members.length || 0} عضو
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <UserPlus className="w-4 h-4 mr-2" />
                      إضافة عضو
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* منطقة الرسائل */}
          <Card className="flex-1 flex flex-col" style={{ height: isFullscreen ? 'calc(100vh - 200px)' : '600px' }}>
            <CardContent className="p-0 flex-1 flex flex-col">
              {/* قائمة الرسائل */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messagesLoading ? (
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-3 animate-pulse">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  messages.map((message: Message) => (
                    <motion.div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'ai_response' ? 'bg-purple-50 p-3 rounded-lg' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={message.authorAvatar} />
                        <AvatarFallback>
                          {message.type === 'ai_response' ? <Brain className="w-4 h-4" /> : message.authorName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-gray-900">
                            {message.authorName}
                          </span>
                          {message.type === 'ai_response' && (
                            <Badge className="bg-purple-100 text-purple-800 text-xs">
                              <Brain className="w-3 h-3 mr-1" />
                              رد ذكي
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            {formatTime(message.timestamp)}
                          </span>
                          {message.isPinned && (
                            <Pin className="w-3 h-3 text-yellow-600" />
                          )}
                        </div>

                        <div className="text-sm text-gray-700 mb-2">
                          {message.content}
                        </div>

                        {/* المرفقات */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="flex gap-2 mb-2">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                                {getMessageIcon(attachment.type)}
                                <span className="text-sm">{attachment.name}</span>
                                <Button variant="ghost" size="sm">
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* التفاعلات */}
                        {message.reactions.length > 0 && (
                          <div className="flex gap-1">
                            {message.reactions.map((reaction, index) => (
                              <Button key={index} variant="outline" size="sm" className="h-6 px-2">
                                <span className="mr-1">{reaction.emoji}</span>
                                <span className="text-xs">{reaction.users.length}</span>
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* شريط إدخال الرسالة */}
              <div className="border-t p-4">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <Textarea
                      placeholder="اكتب رسالتك هنا... استخدم @ للإشارة للأعضاء و # للقنوات"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="min-h-[80px] resize-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={sendMessage}
                      disabled={!messageInput.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* شريط أدوات الذكاء الاصطناعي */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateAIResponse(messageInput)}
                    className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    رد ذكي
                  </Button>
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    اقتراحات
                  </Button>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                    <Zap className="w-4 h-4 mr-2" />
                    تلخيص تلقائي
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* مكالمة الفيديو */}
      {isVideoCallActive && (
        <Card className="fixed bottom-6 right-6 w-80 bg-black rounded-lg overflow-hidden shadow-2xl z-50">
          <CardContent className="p-0">
            <div className="relative">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <Video className="w-16 h-16 text-white" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                  <Mic className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                  <Camera className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                  <ScreenShare className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setIsVideoCallActive(false)}
                >
                  <PhoneOff className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* معلومات المنصة الذكية */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                كيف تعمل منصة التعاون الذكية؟
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span>رسائل فورية مع ترجمة تلقائية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-green-600" />
                  <span>مكالمات فيديو مشفرة وآمنة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span>ردود ذكية واقتراحات مفيدة</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-600" />
                  <span>مشاركة الملفات مع تعاون متقدم</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IntelligentCollaborationPlatform;
