import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 بدء إدخال البيانات التجريبية...');

  // إنشاء مستخدمين تجريبيين
  const ministerUser = await prisma.user.upsert({
    where: { email: 'minister@education.gov' },
    update: {},
    create: {
      email: 'minister@education.gov',
      name: 'د. أحمد محمد الوزير',
      role: 'minister',
      department: 'مكتب الوزير',
      permissions: {
        canCreateDecisions: true,
        canApproveDecisions: true,
        canSignDocuments: true,
        canViewAllReports: true,
        canAccessAIAssistant: true,
        canManageMeetings: true,
      },
    },
  });

  const deputyUser = await prisma.user.upsert({
    where: { email: 'deputy@education.gov' },
    update: {},
    create: {
      email: 'deputy@education.gov',
      name: 'أ. سارة أحمد نائب الوزير',
      role: 'deputy_minister',
      department: 'مكتب نائب الوزير',
      permissions: {
        canCreateDecisions: true,
        canApproveDecisions: false,
        canSignDocuments: false,
        canViewAllReports: true,
        canAccessAIAssistant: true,
        canManageMeetings: true,
      },
    },
  });

  const directorUser = await prisma.user.upsert({
    where: { email: 'director@education.gov' },
    update: {},
    create: {
      email: 'director@education.gov',
      name: 'د. محمد علي مدير عام',
      role: 'director',
      department: 'الشؤون الأكاديمية',
      permissions: {
        canCreateDecisions: false,
        canApproveDecisions: false,
        canSignDocuments: false,
        canViewAllReports: false,
        canAccessAIAssistant: false,
        canManageMeetings: false,
      },
    },
  });

  console.log('✅ تم إنشاء المستخدمين');

  // إنشاء مراسلات تجريبية
  const correspondence1 = await prisma.ministerCorrespondence.create({
    data: {
      subject: 'طلب اعتماد ميزانية الجامعات للعام 2024',
      content: 'بناءً على الدراسات والتحليلات المقدمة من الإدارات المختصة، نطلب اعتماد ميزانية الجامعات للعام الأكاديمي 2024 بقيمة 2.5 مليار ريال سعودي.',
      senderId: directorUser.id,
      senderType: 'internal',
      priority: 'high',
      category: 'request',
      dueDate: new Date('2024-12-31'),
    },
  });

  const correspondence2 = await prisma.ministerCorrespondence.create({
    data: {
      subject: 'تقرير عن تطوير المناهج التعليمية',
      content: 'يسرنا تقديم تقرير شامل عن تطوير المناهج التعليمية وفقاً لأحدث المعايير الدولية والتطورات التقنية.',
      senderId: directorUser.id,
      senderType: 'internal',
      priority: 'medium',
      category: 'information',
    },
  });

  console.log('✅ تم إنشاء المراسلات');

  // إنشاء قرارات تجريبية
  const decision1 = await prisma.ministerDecision.create({
    data: {
      title: 'اعتماد برنامج التعليم الإلكتروني الجديد',
      description: 'اعتماد برنامج التعليم الإلكتروني المتطور للجامعات السعودية مع توفير الدعم الفني والتدريب اللازم.',
      decisionType: 'academic',
      priority: 'high',
      decisionNumber: 'MO-2024-001',
      budget: 50000000,
      implementationDate: new Date('2024-03-01'),
      status: 'approved',
      approvedBy: ministerUser.id,
      approvedAt: new Date(),
    },
  });

  const decision2 = await prisma.ministerDecision.create({
    data: {
      title: 'زيادة رواتب أعضاء هيئة التدريس',
      description: 'زيادة رواتب أعضاء هيئة التدريس بنسبة 15% ابتداءً من العام الأكاديمي القادم.',
      decisionType: 'financial',
      priority: 'high',
      decisionNumber: 'MO-2024-002',
      budget: 150000000,
      implementationDate: new Date('2024-09-01'),
      status: 'review',
    },
  });

  console.log('✅ تم إنشاء القرارات');

  // إنشاء اجتماعات تجريبية
  const meeting1 = await prisma.ministerMeeting.create({
    data: {
      title: 'اجتماع مجلس التعليم العالي',
      description: 'مناقشة تطوير السياسات التعليمية واعتماد البرامج الجديدة',
      meetingType: 'regular',
      scheduledDate: new Date('2024-02-15T10:00:00Z'),
      location: 'قاعة الاجتماعات الرئيسية - الدور الثامن',
      status: 'completed',
      actualStartTime: new Date('2024-02-15T10:15:00Z'),
      actualEndTime: new Date('2024-02-15T12:30:00Z'),
      agenda: [
        'مناقشة تطوير المناهج',
        'اعتماد برنامج التعليم الإلكتروني',
        'زيادة رواتب أعضاء هيئة التدريس',
        'خطط التوسع في الجامعات'
      ],
      attendees: [
        { name: 'د. أحمد محمد الوزير', role: 'رئيس الاجتماع' },
        { name: 'أ. سارة أحمد نائب الوزير', role: 'نائب رئيس' },
        { name: 'د. محمد علي مدير عام', role: 'عضو' },
        { name: 'د. فاطمة حسن مدير أكاديمي', role: 'عضو' }
      ],
      minutes: 'تم مناقشة جميع النقاط المدرجة في جدول الأعمال واتخاذ القرارات المناسبة.',
      followUpActions: [
        'إعداد تقرير مفصل عن برنامج التعليم الإلكتروني',
        'دراسة تأثير زيادة الرواتب على الميزانية',
        'تحديد موعد الاجتماع القادم'
      ],
    },
  });

  const meeting2 = await prisma.ministerMeeting.create({
    data: {
      title: 'اجتماع طارئ لمناقشة أزمة الجامعات',
      description: 'مناقشة طارئة لأزمة نقص المقاعد في الجامعات الحكومية',
      meetingType: 'emergency',
      scheduledDate: new Date('2024-02-20T14:00:00Z'),
      location: 'قاعة الاجتماعات الرئيسية',
      status: 'scheduled',
      agenda: [
        'تحليل أزمة نقص المقاعد',
        'اقتراح حلول فورية',
        'خطط التوسع العاجلة'
      ],
      attendees: [
        { name: 'د. أحمد محمد الوزير', role: 'رئيس الاجتماع' },
        { name: 'أ. سارة أحمد نائب الوزير', role: 'نائب رئيس' }
      ],
    },
  });

  console.log('✅ تم إنشاء الاجتماعات');

  // إنشاء تقارير تجريبية
  const report1 = await prisma.ministerReport.create({
    data: {
      title: 'تقرير الأداء الشهري - يناير 2024',
      type: 'monthly',
      category: 'performance',
      departmentId: directorUser.id,
      content: 'تقرير شامل عن أداء الوزارة خلال شهر يناير 2024 يشمل الإنجازات والتحديات والتوصيات.',
      summary: 'حققنا نمواً بنسبة 15% في عدد الطلاب المسجلين وتم إنجاز 85% من المشاريع المخططة.',
      metrics: {
        totalStudents: 45000,
        newEnrollments: 3200,
        graduationRate: 0.92,
        facultySatisfaction: 0.88,
        budgetUtilization: 0.76
      },
      recommendations: [
        'زيادة التركيز على البرامج التقنية',
        'تطوير برامج التدريب لأعضاء هيئة التدريس',
        'تحسين آليات التواصل مع الطلاب'
      ],
      priority: 'high',
      status: 'submitted',
      submittedAt: new Date(),
    },
  });

  const report2 = await prisma.ministerReport.create({
    data: {
      title: 'تقرير الميزانية الربع سنوي - الربع الأول 2024',
      type: 'quarterly',
      category: 'financial',
      departmentId: directorUser.id,
      content: 'تحليل مفصل لأداء الميزانية خلال الربع الأول من عام 2024.',
      summary: 'تم إنفاق 73% من الميزانية المخصصة مع تحقيق وفر بنسبة 12% في بعض البنود.',
      metrics: {
        totalBudget: 2000000000,
        spentAmount: 1460000000,
        savings: 240000000,
        efficiency: 0.88,
        compliance: 0.95
      },
      recommendations: [
        'إعادة تخصيص المدخرات للمشاريع ذات الأولوية',
        'تعزيز آليات الرقابة المالية'
      ],
      priority: 'medium',
      status: 'draft',
    },
  });

  console.log('✅ تم إنشاء التقارير');

  // إنشاء توقيعات رقمية تجريبية
  const signature1 = await prisma.digitalSignature.create({
    data: {
      documentId: decision1.id,
      documentType: 'decision',
      signerId: ministerUser.id,
      signerRole: 'minister',
      signatureHash: 'sha256:abc123def456',
      signatureMethod: 'digital',
      verificationData: {
        certificateInfo: 'شهادة التوقيع الرقمي لوزارة التعليم العالي',
        timestamp: new Date().toISOString(),
        algorithm: 'RSA-SHA256'
      },
    },
  });

  const signature2 = await prisma.digitalSignature.create({
    data: {
      documentId: correspondence1.id,
      documentType: 'correspondence',
      signerId: directorUser.id,
      signerRole: 'director',
      signatureHash: 'sha256:def789abc123',
      signatureMethod: 'digital',
      verificationData: {
        certificateInfo: 'شهادة التوقيع الرقمي للمدير العام',
        timestamp: new Date().toISOString(),
        algorithm: 'RSA-SHA256'
      },
    },
  });

  console.log('✅ تم إنشاء التوقيعات الرقمية');

  // إنشاء تنبيهات استباقية تجريبية
  const alert1 = await prisma.predictiveAlert.create({
    data: {
      title: 'موعد تقديم التقارير الشهرية',
      description: 'يجب تقديم التقارير الشهرية خلال الأسبوع القادم',
      type: 'deadline',
      priority: 'high',
      predictedDate: new Date('2024-02-28'),
      confidence: 0.95,
      impact: 'high',
      affectedArea: 'جميع الإدارات',
      recommendedAction: 'إعداد التقارير مسبقاً ومراجعتها قبل الموعد المحدد',
      relatedCorrespondenceId: correspondence1.id,
    },
  });

  const alert2 = await prisma.predictiveAlert.create({
    data: {
      title: 'زيادة متوقعة في طلبات القبول',
      description: 'تشير البيانات إلى زيادة بنسبة 25% في طلبات القبول للعام القادم',
      type: 'opportunity',
      priority: 'medium',
      predictedDate: new Date('2024-08-01'),
      confidence: 0.78,
      impact: 'medium',
      affectedArea: 'إدارة القبول والتسجيل',
      recommendedAction: 'التخطيط لزيادة السعة الاستيعابية للجامعات',
    },
  });

  console.log('✅ تم إنشاء التنبيهات الاستباقية');

  // إنشاء تحليلات أداء تجريبية
  const analytics1 = await prisma.performanceAnalytics.create({
    data: {
      period: 'monthly',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      metrics: {
        totalDecisions: 45,
        totalMeetings: 12,
        avgProcessingTime: 3.2,
        successRate: 0.89,
        budgetUtilization: 0.76,
        studentSatisfaction: 0.84,
        facultyProductivity: 0.91
      },
      insights: [
        'تحسن ملحوظ في رضا الطلاب بنسبة 12%',
        'زيادة في إنتاجية أعضاء هيئة التدريس',
        'تحسن في معدل معالجة القرارات الإدارية'
      ],
      recommendations: [
        'تعزيز برامج تطوير أعضاء هيئة التدريس',
        'توسيع استخدام التقنيات الرقمية في التعليم',
        'تحسين آليات التواصل مع الطلاب'
      ],
      trends: {
        decisions: 'up',
        meetings: 'up',
        performance: 'up',
        satisfaction: 'up'
      },
      benchmarks: [
        'أداء أفضل من المعدل الوطني بنسبة 15%',
        'معدل رضا يفوق المتوسط العالمي'
      ],
    },
  });

  console.log('✅ تم إنشاء تحليلات الأداء');

  // إنشاء أرشيف تجريبي
  const archive1 = await prisma.archive.create({
    data: {
      title: 'قرار اعتماد برنامج التعليم الإلكتروني',
      description: 'القرار الوزاري رقم MO-2024-001 الخاص باعتماد برنامج التعليم الإلكتروني',
      category: 'decision',
      archiveType: 'digital',
      relatedId: decision1.id,
      relatedType: 'MinisterDecision',
      accessLevel: 'restricted',
      retentionPeriod: 10,
      archivedBy: ministerUser.id,
      tags: ['تعليم إلكتروني', 'تطوير', 'قرار وزاري', '2024'],
    },
  });

  console.log('✅ تم إنشاء الأرشيف');

  // إنشاء تفاعلات مع المساعد الافتراضي
  const aiResponse1 = await prisma.aiAssistant.create({
    data: {
      query: 'ما هي أحدث الإحصائيات حول أداء الجامعات؟',
      response: 'بناءً على البيانات المتاحة، بلغ عدد الطلاب المسجلين في الجامعات السعودية 450,000 طالب للعام الأكاديمي 2024، مع نسبة رضا تصل إلى 84%. كما حققت الجامعات نمواً بنسبة 15% في البرامج التقنية.',
      confidence: 0.92,
      context: {
        dataSource: 'تقارير الأداء الشهرية',
        lastUpdated: new Date().toISOString()
      },
      processingTime: 145,
      modelUsed: 'gpt-4-turbo',
    },
  });

  console.log('✅ تم إنشاء تفاعلات المساعد الافتراضي');

  // إنشاء تكامل خارجي تجريبي
  const externalApi = await prisma.externalApiIntegration.create({
    data: {
      name: 'نظام التعليم الإلكتروني الوطني',
      description: 'تكامل مع منصة التعليم الإلكتروني الوطنية لمزامنة البيانات',
      baseUrl: 'https://elearning.gov.sa/api',
      apiKey: 'encrypted-api-key-12345',
      status: 'active',
      syncFrequency: 'daily',
      endpoints: {
        students: '/students',
        courses: '/courses',
        grades: '/grades',
        attendance: '/attendance'
      },
      authentication: {
        type: 'api_key',
        headerName: 'X-API-Key'
      },
      rateLimit: 1000,
    },
  });

  console.log('✅ تم إنشاء التكامل الخارجي');

  // إنشاء سجلات API تجريبية
  await prisma.apiLog.createMany({
    data: [
      {
        integrationId: externalApi.id,
        endpoint: '/students',
        method: 'GET',
        statusCode: 200,
        responseTime: 245,
        success: true,
        requestData: { page: 1, limit: 100 },
        responseData: { count: 100, students: [] }
      },
      {
        integrationId: externalApi.id,
        endpoint: '/courses',
        method: 'POST',
        statusCode: 201,
        responseTime: 156,
        success: true,
        requestData: { title: 'مقدمة في الذكاء الاصطناعي', code: 'CS101' }
      },
      {
        integrationId: externalApi.id,
        endpoint: '/grades',
        method: 'GET',
        statusCode: 500,
        responseTime: 1023,
        success: false,
        errorMessage: 'خطأ في قاعدة البيانات الخارجية'
      }
    ]
  });

  console.log('✅ تم إنشاء سجلات API');

  console.log('🎉 تم إدخال جميع البيانات التجريبية بنجاح!');
  console.log(`📊 إجمالي السجلات المُنشأة:`);
  console.log(`   - المستخدمين: 3`);
  console.log(`   - المراسلات: 2`);
  console.log(`   - القرارات: 2`);
  console.log(`   - الاجتماعات: 2`);
  console.log(`   - التقارير: 2`);
  console.log(`   - التوقيعات الرقمية: 2`);
  console.log(`   - التنبيهات الاستباقية: 2`);
  console.log(`   - تحليلات الأداء: 1`);
  console.log(`   - الأرشيف: 1`);
  console.log(`   - تفاعلات المساعد: 1`);
  console.log(`   - التكامل الخارجي: 1`);
  console.log(`   - سجلات API: 3`);

  console.log('\n🌟 النظام جاهز للاستخدام مع بيانات تجريبية حقيقية!');
}

main()
  .catch((e) => {
    console.error('❌ خطأ في إدخال البيانات التجريبية:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
