import type { LocaleString } from './sanity'
import { cache } from 'react'
import { getSupabaseArticles } from './supabase/articles'

export interface ArticleSection {
  heading: LocaleString
  paragraphs: { en: string[]; ar: string[] }
  bullets?: { en: string[]; ar: string[] }
}

export interface Article {
  slug: string
  title: LocaleString
  excerpt: LocaleString
  category: LocaleString
  publishedAt: string
  updatedAt: string
  readingTime: LocaleString
  intro: { en: string[]; ar: string[] }
  sections: ArticleSection[]
}

export const articles: Article[] = [
  {
    slug: 'jetour-t2-accessories-buying-guide-dubai',
    title: {
      en: 'Jetour T2 Accessories in Dubai: A Practical Buyer’s Guide',
      ar: 'دليل عملي لاختيار إكسسوارات جيتور T2 في دبي',
    },
    excerpt: {
      en: 'A step-by-step guide to choosing exterior, interior and lighting upgrades for a Jetour T2, with practical checks for fit, installation and everyday use.',
      ar: 'دليل خطوة بخطوة لاختيار الإكسسوارات الخارجية والداخلية والإضاءة لجيتور T2، مع فحوصات عملية للمقاس والتركيب والاستخدام اليومي.',
    },
    category: { en: 'Buying Guide', ar: 'دليل شراء' },
    publishedAt: '2026-08-04',
    updatedAt: '2026-08-04',
    readingTime: { en: '10 min read', ar: 'قراءة 10 دقائق' },
    intro: {
      en: [
        'The Jetour T2 gives owners plenty of room to personalise the vehicle, from simple cabin protection to a full exterior restyle. That choice is useful, but it can also make the first purchase confusing. Two accessories may look similar online while using different mounting points, finishes or wiring. A part that suits a display vehicle may also be unnecessary for the way you use yours.',
        'A better approach is to start with your daily needs, confirm compatibility, and build the vehicle in a sensible order. This guide explains how to compare Jetour T2 accessories in Dubai without treating every upgrade as essential. It focuses on the questions worth asking before installation, how to group purchases, and which details should be checked in person.',
      ],
      ar: [
        'تمنح جيتور T2 مالكها خيارات واسعة للتخصيص، من حماية المقصورة البسيطة إلى تغيير المظهر الخارجي بالكامل. لكن كثرة الخيارات قد تجعل أول عملية شراء محيّرة؛ فقد تبدو قطعتان متشابهتين في الصور بينما تختلفان في نقاط التثبيت أو التشطيب أو التمديدات الكهربائية. كما أن القطعة المناسبة لسيارة عرض قد لا تكون ضرورية لطريقة استخدامك أنت.',
        'النهج الأفضل هو البدء باحتياجاتك اليومية، ثم التأكد من التوافق، وترتيب التعديلات بشكل منطقي. يشرح هذا الدليل كيفية مقارنة إكسسوارات جيتور T2 في دبي من دون اعتبار كل تطوير ضرورياً، ويركز على الأسئلة المهمة قبل التركيب، وطريقة تجميع المشتريات، والتفاصيل التي ينبغي فحصها على الطبيعة.',
      ],
    },
    sections: [
      {
        heading: {
          en: '1. Start with the problem, not the product',
          ar: '1. ابدأ بالمشكلة لا بالمنتج',
        },
        paragraphs: {
          en: [
            'Before looking at a catalogue, write down what you want to improve. Perhaps sand and road spray are reaching the lower body, loose items move around the cabin, the phone has no secure position, or the original look simply feels too plain. A clear problem gives you a useful way to judge whether an accessory deserves space and budget.',
            'Separate those needs into protection, convenience and appearance. Protection usually comes first because it helps preserve frequently used surfaces. Convenience comes next when an accessory removes a repeated annoyance. Appearance is personal and can be added gradually once the practical base feels right. This order prevents a common outcome: spending heavily on visible pieces while still living with the small issues that affect every drive.',
            'Also consider how long you plan to keep the vehicle and whether you prefer reversible changes. Clip-in, bolt-on and model-specific pieces can often be removed more easily than parts that require cutting, drilling or permanent adhesive. Reversibility does not automatically make a product better, but it should be part of the decision.',
          ],
          ar: [
            'قبل تصفح الكتالوج، اكتب ما الذي تريد تحسينه فعلاً. قد تكون الأتربة ورذاذ الطريق يصلان إلى أسفل الهيكل، أو تتحرك الأغراض داخل المقصورة، أو لا يوجد موضع ثابت للهاتف، أو ترغب ببساطة في مظهر مختلف. عندما تكون المشكلة واضحة يصبح من السهل معرفة ما إذا كانت القطعة تستحق المساحة والتكلفة.',
            'قسّم احتياجاتك إلى حماية وراحة ومظهر. تبدأ الأولوية غالباً بالحماية للمحافظة على الأسطح كثيرة الاستخدام، ثم تأتي الراحة عندما تعالج القطعة مشكلة متكررة، أما التغييرات الجمالية فيمكن إضافتها تدريجياً بعد اكتمال الأساس العملي. هذا الترتيب يمنع إنفاق الجزء الأكبر من الميزانية على قطع بارزة مع بقاء المشكلات الصغيرة التي تلاحظها في كل قيادة.',
            'فكّر أيضاً في المدة التي تنوي الاحتفاظ فيها بالسيارة، وما إذا كنت تفضل تعديلات يمكن إزالتها. تكون القطع المخصصة التي تُثبت بالمشابك أو البراغي أسهل عادة في الرجوع عنها من القطع التي تتطلب قصاً أو تثقيباً أو لاصقاً دائماً. قابلية الإزالة ليست المعيار الوحيد، لكنها جزء مهم من القرار.',
          ],
        },
        bullets: {
          en: [
            'Protection: mats, screen protection, handle and panel protection, mud guards.',
            'Convenience: phone mounts, storage, steps and access accessories.',
            'Appearance: grilles, lighting accents, covers, badges and spoilers.',
          ],
          ar: [
            'الحماية: الفرش، حماية الشاشة، حماية المقابض واللوحات، وواقيات الطين.',
            'الراحة: حوامل الهاتف، التخزين، الدرجات وقطع تسهيل الوصول.',
            'المظهر: الشبك، إضافات الإضاءة، الأغطية، الشعارات والجناح.',
          ],
        },
      },
      {
        heading: {
          en: '2. Build the exterior in layers',
          ar: '2. طوّر المظهر الخارجي على مراحل',
        },
        paragraphs: {
          en: [
            'Exterior changes have the biggest visual impact, which makes it tempting to order several pieces at once. The safer method is to establish one design direction and add layers. Begin with protective or functional pieces, then choose one visual theme for the larger items. A grille, spare-wheel cover, spoiler and lighting treatment should look like parts of the same vehicle rather than four unrelated ideas.',
            'Fit is especially visible outside. Even a small gap, uneven edge or colour mismatch can stand out across a large body panel. Ask to see close photos of the mounting area, not only a finished promotional image. If a part comes in gloss black, matte black, carbon-style or body colour, compare the finish beside existing trim under daylight. Screen colours can hide differences that become obvious after installation.',
            'Weight and mounting method matter for ladders, storage boxes, tow-related accessories and larger metal pieces. Confirm which points carry the load and whether the part is decorative or intended for real use. A visual accessory should never be assumed to have a load rating. If the intended use involves carrying weight or towing, request the relevant product specification before making the decision.',
          ],
          ar: [
            'تترك التعديلات الخارجية الأثر البصري الأكبر، ولذلك يسهل طلب عدة قطع دفعة واحدة. لكن الأسلوب الأكثر اتزاناً هو اختيار اتجاه تصميم واحد ثم البناء عليه على مراحل. ابدأ بالقطع العملية أو الواقية، وبعدها اختر طابعاً واضحاً للقطع الكبيرة. من الأفضل أن يبدو الشبك وغطاء الإطار والجناح والإضاءة أجزاءً من سيارة واحدة، لا أفكاراً منفصلة.',
            'دقة المقاس واضحة جداً في الخارج؛ فالفجوة الصغيرة أو الحافة غير المتساوية أو اختلاف اللون قد يظهر على الفور. اطلب صوراً قريبة لمنطقة التثبيت، وليس صورة دعائية نهائية فقط. وإذا كانت القطعة متوفرة بالأسود اللامع أو المطفي أو بتشطيب يشبه الكربون أو بلون الهيكل، فقارنها بقطع السيارة تحت ضوء النهار، لأن ألوان الشاشة قد تخفي فرقاً يظهر بعد التركيب.',
            'يهم الوزن وطريقة التثبيت في السلالم وصناديق التخزين والقطع المرتبطة بالسحب والقطع المعدنية الكبيرة. تأكد من نقاط تثبيت الحمل، وما إذا كانت القطعة للزينة أو للاستخدام الفعلي. ولا تفترض أن الإكسسوار البصري يتحمل وزناً محدداً؛ فإذا كان الاستخدام يشمل حملاً أو سحباً، اطلب مواصفات المنتج ذات الصلة قبل اتخاذ القرار.',
          ],
        },
      },
      {
        heading: {
          en: '3. Make the cabin easier to live with',
          ar: '3. اجعل المقصورة أسهل في الاستخدام اليومي',
        },
        paragraphs: {
          en: [
            'Interior accessories are closest to you every day, so small design details matter. A floor mat should sit flat, lock into the intended points and stay clear of the pedals. A phone holder should keep the device visible without covering the road, a vent or a control. Storage pieces should remain quiet and reachable without creating sharp edges or interfering with seats and doors.',
            'Start with the areas that collect wear: the floor, screens, handles, loading surfaces and frequently touched trim. After that, add organisation. It is often better to install one storage solution that fits correctly than several universal organisers that move around. Vehicle-specific pieces usually make better use of the T2’s available spaces and tend to look integrated rather than added later.',
            'Decorative cabin pieces require restraint. A crystal-style gear handle, ambient panel or trim cover can change the atmosphere, but it should still feel comfortable and keep every symbol and control easy to read. Before permanent adhesive is used, place the part in position, sit in the driver’s seat and check it in daylight and at night.',
          ],
          ar: [
            'الإكسسوارات الداخلية هي الأقرب إليك كل يوم، لذلك تهم التفاصيل الصغيرة. يجب أن يكون فرش الأرضية مستوياً وثابتاً وبعيداً عن الدواسات. وينبغي أن يثبت حامل الهاتف الجهاز في موضع واضح من دون حجب الطريق أو فتحة التكييف أو أحد الأزرار. كما يجب أن تبقى قطع التخزين هادئة وسهلة الوصول وألا تعيق المقاعد أو الأبواب.',
            'ابدأ بالمناطق الأكثر عرضة للاستخدام: الأرضية والشاشات والمقابض وأسطح التحميل والقطع التي تلمسها باستمرار. بعد ذلك أضف حلول التنظيم. وغالباً يكون تركيب قطعة تخزين واحدة مناسبة أفضل من عدة منظمات عامة تتحرك داخل السيارة. تستفيد القطع المخصصة لجيتور T2 من المساحات المتاحة بشكل أفضل وتبدو جزءاً من المقصورة.',
            'تحتاج القطع الجمالية داخل المقصورة إلى توازن. يمكن لمقبض ناقل الحركة أو لوحة الإضاءة المحيطية أو غطاء التشطيب أن يغير الأجواء، لكن يجب أن يبقى مريحاً وألا يخفي أي رمز أو زر. وقبل استخدام اللاصق الدائم، ضع القطعة في موضعها واجلس في مقعد السائق وافحصها نهاراً وليلاً.',
          ],
        },
      },
      {
        heading: {
          en: '4. Treat lighting as an installation project',
          ar: '4. تعامل مع الإضاءة كمشروع تركيب متكامل',
        },
        paragraphs: {
          en: [
            'Lighting products should be assessed as electrical and visual upgrades together. A headlight, tail light, fog light, roof light or ambient system needs the correct housing and connectors, but it also needs sensible cable routing and controls. Ask whether the product replaces an original unit or adds a new circuit, and whether any dashboard messages or original functions could be affected.',
            'The finished result should be tested before trim panels are closed. Check every mode, switch and animation that is part of the product. For exterior lights, look at alignment and consistency on both sides of the vehicle. For cabin lighting, sit in the driver’s position and confirm that reflections or bright points do not become distracting at night.',
            'Keep removed original parts when practical. Lighting preferences change, and an owner may later want to restore the original look or troubleshoot a fault. Label small connectors and hardware so the original parts can be matched to their positions.',
          ],
          ar: [
            'ينبغي تقييم منتجات الإضاءة كتطوير كهربائي وبصري في الوقت نفسه. يحتاج المصباح الأمامي أو الخلفي أو مصباح الضباب أو كشاف السقف أو نظام الإضاءة المحيطية إلى هيكل ووصلات مناسبة، كما يحتاج إلى مسار منظم للأسلاك وطريقة تحكم واضحة. اسأل ما إذا كانت القطعة تستبدل وحدة أصلية أو تضيف دائرة جديدة، وما إذا كان يمكن أن تتأثر أي وظيفة أصلية أو تظهر رسالة في لوحة العدادات.',
            'يجب اختبار النتيجة قبل إغلاق ألواح المقصورة. جرّب كل وضع ومفتاح وحركة ضوئية تتضمنها القطعة. وفي الإضاءة الخارجية، افحص المحاذاة وتساوي الجانبين. أما داخل المقصورة، فاجلس في مكان السائق وتأكد من أن الانعكاسات أو النقاط الساطعة لا تسبب تشتيتاً ليلاً.',
            'احتفظ بالقطع الأصلية التي تمت إزالتها متى كان ذلك عملياً. قد تتغير تفضيلاتك، أو ترغب لاحقاً في استعادة الشكل الأصلي أو فحص عطل. ضع علامات على الوصلات والقطع الصغيرة حتى يسهل إعادتها إلى أماكنها الصحيحة.',
          ],
        },
      },
      {
        heading: {
          en: '5. Confirm compatibility beyond the model name',
          ar: '5. تحقق من التوافق بما يتجاوز اسم الموديل',
        },
        paragraphs: {
          en: [
            '“Fits Jetour T2” is a starting point, not the complete compatibility check. Confirm the model year, trim, left- or right-hand installation position, existing factory options and any previous modifications. A screen protector depends on the exact display shape. A body accessory may depend on bumper or grille design. An electrical part may use a connector that changed between production batches.',
            'Use clear photos when asking remotely. Include a wide photo that identifies the area and a close photo of the mounting point or connector. If the part replaces something, photograph the original piece as well. Measurements can help, but they should support a model-specific check rather than replace it.',
            'When several accessories meet in one area, check them together. A grille protector can affect the space available for lighting. A storage box may share mounting points with another rear accessory. A thick floor mat can change how another footwell item sits. Planning those interactions before installation saves rework.',
          ],
          ar: [
            'عبارة «مناسب لجيتور T2» هي نقطة بداية وليست فحص التوافق كاملاً. تأكد من سنة الصنع والفئة وجهة التركيب والتجهيزات الأصلية وأي تعديلات سابقة. تعتمد حماية الشاشة على شكل الشاشة بدقة، وقد تعتمد القطعة الخارجية على تصميم الصدام أو الشبك، وقد تستخدم القطعة الكهربائية وصلة تختلف بين دفعات الإنتاج.',
            'استخدم صوراً واضحة عند الاستفسار عن بُعد. أرسل صورة واسعة تحدد المنطقة، وصورة قريبة لنقطة التثبيت أو الوصلة. وإذا كانت القطعة ستستبدل جزءاً موجوداً، فصوّر الجزء الأصلي أيضاً. تساعد القياسات، لكنها تدعم التحقق المخصص ولا تحل محله.',
            'عندما تجتمع عدة إكسسوارات في منطقة واحدة، افحص توافقها معاً. قد يقلل واقي الشبك المساحة المتاحة للإضاءة، وقد يشترك صندوق تخزين مع قطعة خلفية أخرى في نقاط التثبيت، وقد يغير الفرش السميك وضع قطعة أخرى في منطقة القدمين. التخطيط لهذه العلاقات قبل التركيب يوفر إعادة العمل.',
          ],
        },
        bullets: {
          en: [
            'Vehicle model, model year and trim level.',
            'Exact mounting point, connector and included hardware.',
            'Interaction with accessories already fitted nearby.',
            'Whether the installation is reversible and which original parts should be kept.',
          ],
          ar: [
            'موديل السيارة وسنة الصنع وفئة التجهيز.',
            'نقطة التثبيت والوصلة والملحقات المرفقة بدقة.',
            'توافق القطعة مع الإكسسوارات المركبة في المنطقة نفسها.',
            'إمكانية الرجوع عن التعديل والقطع الأصلية التي ينبغي الاحتفاظ بها.',
          ],
        },
      },
      {
        heading: {
          en: '6. Plan the budget around installation order',
          ar: '6. رتّب الميزانية حسب تسلسل التركيب',
        },
        paragraphs: {
          en: [
            'A useful budget includes the product, installation and any supporting work. Some accessories are independent, while others are easier to fit before a related trim piece or electrical system. If you plan a grille, front lighting and a protector, discuss the complete front-end plan first. The same applies to console trim and ambient lighting inside the cabin.',
            'Group work that requires access to the same panels, but do not group unrelated purchases only to finish the vehicle quickly. A phased plan lets you use each change and decide whether the next one is still valuable. It also makes it easier to identify the source of a rattle, warning or fit issue because fewer things changed at once.',
            'Prioritise products with a clear everyday benefit, then reserve part of the budget for the pieces that define the final look. Keep a simple list of the product name, price, installation date and any warranty information provided for that specific item. This record is useful for care, troubleshooting and future resale conversations.',
          ],
          ar: [
            'تشمل الميزانية العملية سعر المنتج والتركيب وأي عمل مساند. بعض الإكسسوارات مستقلة، بينما يسهل تركيب بعضها قبل قطعة تشطيب أو نظام كهربائي مرتبط. فإذا كنت تخطط لتركيب شبك وإضاءة أمامية وواقٍ، ناقش الخطة الكاملة للواجهة أولاً. وينطبق الأمر نفسه على تشطيبات الكونسول والإضاءة المحيطية داخل المقصورة.',
            'اجمع الأعمال التي تحتاج إلى الوصول إلى الألواح نفسها، لكن لا تجمع مشتريات غير مرتبطة فقط لإنهاء السيارة بسرعة. يتيح التنفيذ على مراحل تجربة كل تغيير وتحديد ما إذا كانت الخطوة التالية لا تزال مفيدة. كما يسهل اكتشاف مصدر أي صوت أو رسالة تحذير أو مشكلة في المقاس لأن عدد التغييرات في كل مرة يكون أقل.',
            'امنح الأولوية للمنتجات ذات الفائدة اليومية الواضحة، ثم خصص جزءاً من الميزانية للقطع التي تحدد الشكل النهائي. احتفظ بقائمة بسيطة تتضمن اسم المنتج وسعره وتاريخ تركيبه وأي معلومات ضمان مذكورة له. يفيد هذا السجل في العناية والفحص والنقاش عند بيع السيارة مستقبلاً.',
          ],
        },
      },
      {
        heading: {
          en: '7. Use an in-person handover checklist',
          ar: '7. استخدم قائمة فحص عند استلام السيارة',
        },
        paragraphs: {
          en: [
            'Do not judge an installation from a few steps away. Walk around the vehicle and inspect even gaps, straight edges and secure mounting. Open nearby doors, the bonnet, tailgate and storage compartments to make sure the new part does not touch or restrict movement. Inside, move the seats and use every control near the installation area.',
            'For electrical products, test them with the vehicle on and off as appropriate. Confirm switches, remotes and app controls, and check that the instrument panel shows no unexpected message. For adhesive pieces, ask about the settling time before washing, moving or placing load on the part. For removable accessories, ask for a quick demonstration of adjustment and removal.',
            'If something looks different from the agreed product or position, raise it before leaving. It is easier to compare the result with the product photos and correct alignment while the vehicle and installation tools are still present.',
          ],
          ar: [
            'لا تحكم على التركيب من مسافة بعيدة. تحرك حول السيارة وافحص تساوي الفواصل واستقامة الحواف وثبات القطعة. افتح الأبواب القريبة وغطاء المحرك والباب الخلفي وصناديق التخزين للتأكد من أن القطعة الجديدة لا تلامسها أو تحد حركتها. وفي الداخل، حرّك المقاعد واستخدم كل زر قريب من منطقة العمل.',
            'اختبر المنتجات الكهربائية في أوضاع التشغيل المناسبة. جرّب المفاتيح وأجهزة التحكم والتطبيق إن وجد، وتأكد من عدم ظهور رسالة غير متوقعة في لوحة العدادات. واسأل عن مدة ثبات اللاصق قبل الغسيل أو الحركة أو وضع حمل على القطعة. أما القطع القابلة للإزالة فاطلب شرحاً سريعاً لطريقة تعديلها وفكها.',
            'إذا بدت النتيجة مختلفة عن المنتج أو الموضع المتفق عليه، ناقش الأمر قبل المغادرة. تكون مقارنة النتيجة بالصور وتصحيح المحاذاة أسهل بينما السيارة وأدوات التركيب لا تزال في المكان.',
          ],
        },
      },
      {
        heading: {
          en: '8. Choose a sensible first package',
          ar: '8. اختر باقة أولى متوازنة',
        },
        paragraphs: {
          en: [
            'For many owners, a sensible first package is smaller than expected: cabin and screen protection, one storage or phone solution, and the exterior protection that matches normal driving. Use the vehicle for a few weeks after those changes. The accessories you still think about are more likely to solve a real need than the pieces that were attractive only during the first catalogue browse.',
            'When you are ready for appearance upgrades, choose a focal point. A front-end change, a lighting theme or a coordinated set of black exterior details can be more coherent than adding one item from every category. Take fresh photos after each phase; they help you see whether the next planned piece improves the design or makes it busier.',
            'The full Wadi Al Awir catalogue can be browsed by vehicle and by category. Use the individual product pages to compare price, images and listed compatibility, then confirm the final fit and installation details with the team before ordering. That short check is the difference between buying an accessory because it is available and choosing one because it belongs on your Jetour T2.',
          ],
          ar: [
            'بالنسبة إلى كثير من الملاك، تكون الباقة الأولى المناسبة أصغر مما يتوقعون: حماية للمقصورة والشاشة، وحل واحد للتخزين أو الهاتف، والحماية الخارجية التي تناسب القيادة المعتادة. استخدم السيارة لبضعة أسابيع بعد هذه الخطوات. الإكسسوارات التي تظل تفكر فيها بعد التجربة غالباً ما تعالج حاجة حقيقية، بعكس القطع التي جذبتك فقط عند تصفح الكتالوج أول مرة.',
            'وعندما تنتقل إلى تطوير المظهر، اختر نقطة تركيز واحدة. قد يكون تعديل الواجهة أو طابع إضاءة محدد أو مجموعة متناسقة من التفاصيل السوداء أكثر انسجاماً من إضافة قطعة من كل فئة. التقط صوراً جديدة بعد كل مرحلة؛ فهي تساعدك على معرفة ما إذا كانت القطعة التالية ستطور التصميم أم تجعله مزدحماً.',
            'يمكن تصفح كتالوج وادي العوير حسب السيارة وحسب الفئة. استخدم صفحات المنتجات لمقارنة السعر والصور والتوافق المدرج، ثم أكد المقاس النهائي وتفاصيل التركيب مع الفريق قبل الطلب. هذا الفحص القصير هو الفارق بين شراء إكسسوار لأنه متوفر واختياره لأنه مناسب فعلاً لجيتور T2 الخاصة بك.',
          ],
        },
      },
      {
        heading: {
          en: '9. Look after the installation, not only the accessory',
          ar: '9. اعتنِ بالتركيب وليس بالإكسسوار فقط',
        },
        paragraphs: {
          en: [
            'The first days after installation are a useful inspection period. Listen for a new rattle, check that adhesive edges remain flat, and look again at fasteners after normal driving. Exterior pieces should stay clear of moving panels, and cabin accessories should remain stable when the vehicle turns or stops. If a light, switch or control behaves differently, record when it happens and contact the installer rather than repeatedly adjusting wiring yourself.',
            'Cleaning methods should suit the finish. Harsh chemicals, stiff brushes and high-pressure water used too close to an edge can shorten the life of trim, film and adhesive-mounted parts. Ask which products are suitable for gloss, matte, painted and coated surfaces. Keep a photo of the product on the day it was fitted; it gives you a simple reference when checking wear later.',
            'Finally, review the vehicle as a complete system. An accessory may fit correctly on its own but need a small adjustment after another part is installed nearby. A short follow-up check keeps the build tidy and helps each upgrade continue doing the job you bought it for.',
          ],
          ar: [
            'تُعد الأيام الأولى بعد التركيب فترة مفيدة للفحص. انتبه إلى أي صوت جديد، وتأكد من بقاء حواف اللاصق مستوية، وافحص نقاط التثبيت مرة أخرى بعد القيادة المعتادة. يجب أن تبقى القطع الخارجية بعيدة عن الأجزاء المتحركة، وأن تظل إكسسوارات المقصورة ثابتة عند الانعطاف أو التوقف. وإذا تغير سلوك مصباح أو مفتاح أو أداة تحكم، فسجل وقت حدوث ذلك وتواصل مع الجهة التي ركبت القطعة بدلاً من تعديل الأسلاك بنفسك مراراً.',
            'يجب أن تناسب طريقة التنظيف نوع التشطيب. قد تقلل المواد القوية والفرش الخشنة والمياه عالية الضغط المستخدمة قرب الحواف من عمر قطع الزينة والأفلام والقطع المثبتة باللاصق. اسأل عن المنتجات المناسبة للأسطح اللامعة والمطفية والمطلية والمحمية بطبقة إضافية. واحتفظ بصورة للقطعة يوم تركيبها لتكون مرجعاً بسيطاً عند فحص التغير مع الوقت.',
            'وفي النهاية، راجع السيارة كنظام متكامل. قد تكون القطعة مثبتة بشكل صحيح وحدها، ثم تحتاج إلى تعديل بسيط بعد إضافة إكسسوار آخر قريب منها. يساعد الفحص اللاحق القصير على بقاء التعديلات مرتبة وعلى استمرار كل قطعة في أداء الغرض الذي اشتريتها من أجله.',
          ],
        },
      },
    ],
  },
]

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug) ?? null
}

export const getAllArticles = cache(async (): Promise<Article[]> => {
  return (await getSupabaseArticles()) ?? articles
})

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  const currentArticles = await getAllArticles()
  return currentArticles.find((article) => article.slug === slug) ?? null
})
