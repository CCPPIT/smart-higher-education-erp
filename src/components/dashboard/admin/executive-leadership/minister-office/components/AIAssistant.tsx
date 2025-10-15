'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  MessageCircle,
  User,
  Clock,
  Lightbulb,
  Zap,
  Brain,
  History,
  Trash2,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { useMinisterOfficeStore, useMinisterOfficeActions, useMinisterOfficeState } from '@/stores/minister-office';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface AIAssistantProps {
  className?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ className }) => {
  const {
    aiAssistantHistory,
    loading
  } = useMinisterOfficeState();

  const {
    askAIAssistant,
    fetchAIAssistantHistory
  } = useMinisterOfficeActions();

  const [activeTab, setActiveTab] = useState('chat');
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAIAssistantHistory({ limit: 50, offset: 0 });
  }, [fetchAIAssistantHistory]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
      isAI: false
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await askAIAssistant({
        query: currentMessage,
        context: {
          currentPage: 'minister-office',
          userRole: 'minister'
        }
      });

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.response,
        timestamp: new Date(),
        isAI: true,
        confidence: aiResponse.confidence,
        suggestions: aiResponse.suggestions
      };

      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: 'عذراً، حدث خطأ في الاتصال بالمساعد الذكي. يرجى المحاولة مرة أخرى.',
        timestamp: new Date(),
        isAI: false
      };

      setChatMessages(prev => [...prev, errorMessage]);
      toast.error('فشل في الاتصال بالمساعد الذكي');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearHistory = () => {
    setChatMessages([]);
    toast.success('تم مسح تاريخ المحادثة');
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('تم نسخ الرسالة');
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Date(timestamp).toLocaleString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-6 ${className}`}
    >
      {/* رأس المساعد الافتراضي */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-600" />
            المساعد الافتراضي للوزير
          </h2>
          <p className="text-gray-600 mt-1">
            مساعد ذكي يعمل بالذكاء الاصطناعي لمساعدتك في اتخاذ القرارات وإدارة المهام
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800 border-0">
            <Zap className="w-3 h-3 mr-1" />
            متصل
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={clearHistory}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* تبويبات المساعد */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            المحادثة النشطة
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            تاريخ المحادثات ({aiAssistantHistory.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="h-[500px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                محادثة مع المساعد الذكي
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* منطقة الرسائل */}
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-4 py-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="mb-2">مرحباً! أنا مساعدك الذكي</p>
                      <p className="text-sm">اطرح عليّ أي سؤال حول إدارة مكتب الوزير</p>
                    </div>
                  ) : (
                    chatMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`max-w-[80%] ${message.isAI ? 'mr-auto' : 'ml-auto'}`}>
                          <div className={`rounded-lg p-3 ${
                            message.type === 'error'
                              ? 'bg-red-50 border border-red-200'
                              : message.isAI
                                ? 'bg-purple-50 border border-purple-200'
                                : 'bg-blue-600 text-white'
                          }`}>
                            <div className="flex items-start gap-2">
                              <div className={`p-1 rounded-full ${
                                message.isAI ? 'bg-purple-100' : 'bg-blue-100'
                              }`}>
                                {message.isAI ? (
                                  <Bot className="w-3 h-3 text-purple-600" />
                                ) : (
                                  <User className="w-3 h-3 text-blue-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm">{message.content}</p>
                                {message.confidence && (
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className="text-xs">
                                      دقة: {Math.round(message.confidence * 100)}%
                                    </Badge>
                                    {message.suggestions && message.suggestions.length > 0 && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2 text-xs"
                                        onClick={() => {
                                          // يمكن إضافة منطق لعرض الاقتراحات
                                        }}
                                      >
                                        <Lightbulb className="w-3 h-3 mr-1" />
                                        اقتراحات
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                                  onClick={() => copyMessage(message.content)}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                                {message.isAI && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 opacity-60 hover:opacity-100 text-green-600"
                                    >
                                      <ThumbsUp className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 opacity-60 hover:opacity-100 text-red-600"
                                    >
                                      <ThumbsDown className="w-3 h-3" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 text-center">
                            {formatTimestamp(message.timestamp)}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-purple-100 rounded-full">
                            <Bot className="w-3 h-3 text-purple-600" />
                          </div>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* منطقة إدخال الرسالة */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اطرح سؤالك على المساعد الذكي..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isTyping}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  اضغط Enter للإرسال، Shift + Enter للسطر الجديد
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-gray-600" />
                تاريخ المحادثات السابقة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {aiAssistantHistory.length > 0 ? (
                    aiAssistantHistory.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-purple-600" />
                            <Badge variant="outline" className="text-xs">
                              دقة: {Math.round(item.confidence * 100)}%
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(item.timestamp)}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-blue-50 p-2 rounded text-sm">
                            <p className="font-medium text-blue-900">السؤال:</p>
                            <p className="text-blue-700">{item.query}</p>
                          </div>

                          <div className="bg-purple-50 p-2 rounded text-sm">
                            <p className="font-medium text-purple-900">الرد:</p>
                            <p className="text-purple-700">{item.response}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>زمن المعالجة: {item.processingTime}ms</span>
                            <span>•</span>
                            <span>نموذج: {item.modelUsed}</span>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => {
                              setCurrentMessage(item.query);
                              setActiveTab('chat');
                            }}
                          >
                            إعادة طرح السؤال
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>لا يوجد تاريخ محادثات سابق</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* نصائح سريعة */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium text-gray-900">نصائح لاستخدام المساعد الذكي</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-600" />
              <span>اطرح أسئلة محددة للحصول على إجابات أفضل</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-600" />
              <span>استخدم السياق للحصول على إجابات مخصصة</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIAssistant;
