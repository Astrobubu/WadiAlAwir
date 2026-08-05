import type { LocaleString } from './sanity'

export const CATEGORIES = ['exterior', 'interior', 'lighting', 'utility'] as const
export type ProductCategory = (typeof CATEGORIES)[number]

export interface CategoryContent {
  slug: ProductCategory
  name: LocaleString
  eyebrow: LocaleString
  title: LocaleString
  description: LocaleString
  intro: { en: string[]; ar: string[] }
  tipsTitle: LocaleString
  tips: { en: string[]; ar: string[] }
}

export const categoryContent: Record<ProductCategory, CategoryContent> = {
  exterior: {
    slug: 'exterior',
    name: { en: 'Exterior', ar: 'الإكسسوارات الخارجية' },
    eyebrow: { en: 'EXTERIOR ACCESSORIES', ar: 'إكسسوارات خارجية' },
    title: {
      en: 'Exterior Accessories for Jetour T2 and ROX 01',
      ar: 'إكسسوارات خارجية لجيتور T2 وروكس 01',
    },
    description: {
      en: 'Browse exterior accessories for Jetour T2, ROX 01 and ROX Adamas, with product details, vehicle compatibility and installation support in Al Awir, Dubai.',
      ar: 'تصفح الإكسسوارات الخارجية لجيتور T2 وروكس 01 وروكس أداماس، مع تفاصيل كل منتج وتوافقه مع السيارة وخدمة التركيب في العوير، دبي.',
    },
    intro: {
      en: [
        'Exterior accessories can change how a vehicle looks, but the best choices also solve a practical need. Mud guards and fender protection help manage road spray, while side steps, ladders and storage accessories can make everyday access easier. Grilles, light surrounds, spoilers and spare-wheel covers are mainly style decisions, so fit, finish and compatibility matter as much as the design itself.',
        'This collection brings together exterior parts available for the Jetour T2, ROX 01 and ROX Adamas. Each product page shows the compatible vehicle, price, available images and any listed warranty information. If you are combining several parts, ask the team to confirm how the finishes work together before installation. You can also visit the Al Awir shop to compare the part against your vehicle in person.',
      ],
      ar: [
        'قد تغيّر الإكسسوارات الخارجية مظهر السيارة، لكن الاختيار الأفضل هو ما يجمع بين الشكل والفائدة. تساعد واقيات الطين وبطانة الرفارف في الحد من آثار الطريق، بينما تسهّل الدرجات الجانبية والسلالم وصناديق التخزين الاستخدام اليومي. أما الشبك والجناح وغطاء الإطار الاحتياطي فهي اختيارات جمالية في المقام الأول، لذلك يجب التأكد من دقة المقاس وجودة التشطيب وتوافق القطعة مع السيارة.',
        'تجمع هذه الصفحة القطع الخارجية المتوفرة لجيتور T2 وروكس 01 وروكس أداماس. توضح صفحة كل منتج السيارة المتوافقة والسعر والصور المتاحة وأي معلومات مذكورة عن الضمان. وإذا كنت تخطط لتركيب أكثر من قطعة، يمكنك التواصل مع الفريق للتأكد من تناسق الألوان والتشطيبات قبل التركيب، أو زيارة متجر العوير لمعاينة القطعة على سيارتك.',
      ],
    },
    tipsTitle: { en: 'What to check before installation', ar: 'ما الذي يجب التحقق منه قبل التركيب؟' },
    tips: {
      en: [
        'Confirm the exact model and model year, especially when a part is available for more than one vehicle.',
        'Check whether drilling, wiring or removal of an original panel is required before approving the work.',
        'Compare colour, texture and finish beside the vehicle rather than relying only on a screen image.',
        'Ask which care steps are recommended after installation so trims, lights and coatings keep their finish.',
      ],
      ar: [
        'أكد موديل السيارة وسنة الصنع بدقة، خصوصاً عندما تتوفر القطعة لأكثر من سيارة.',
        'اسأل قبل بدء العمل ما إذا كان التركيب يتطلب تثقيباً أو تمديد أسلاك أو فك قطعة أصلية.',
        'قارن اللون والملمس والتشطيب بجانب السيارة بدلاً من الاعتماد على صورة الشاشة فقط.',
        'استفسر عن طريقة العناية المناسبة بعد التركيب للحفاظ على تشطيب القطع والإضاءة والطلاء.',
      ],
    },
  },
  interior: {
    slug: 'interior',
    name: { en: 'Interior', ar: 'الإكسسوارات الداخلية' },
    eyebrow: { en: 'INTERIOR ACCESSORIES', ar: 'إكسسوارات داخلية' },
    title: {
      en: 'Interior Accessories for Jetour T2 and ROX 01',
      ar: 'إكسسوارات داخلية لجيتور T2 وروكس 01',
    },
    description: {
      en: 'Find mats, protectors, storage and cabin upgrades for Jetour T2, ROX 01 and ROX Adamas, available with fitting support in Al Awir, Dubai.',
      ar: 'اكتشف الفرش وقطع الحماية والتخزين وتطويرات المقصورة لجيتور T2 وروكس 01 وروكس أداماس مع خدمة التركيب في العوير، دبي.',
    },
    intro: {
      en: [
        'Interior accessories should make the cabin easier to use and easier to keep clean. Floor mats, seat-area covers and screen protectors focus on protection, while phone holders, storage pieces and control-panel accessories improve daily convenience. Decorative items can personalise the cabin, but they should never obstruct controls, vents, airbags or the driver’s view.',
        'The products below are grouped by vehicle so you can check compatibility before ordering. Review the photos and product details, then confirm the exact fit with the Wadi Al Awir team if your vehicle has a different trim level or interior package. Professional fitting is especially useful for pieces that need precise alignment around screens, handles and console panels.',
      ],
      ar: [
        'يفترض أن تجعل الإكسسوارات الداخلية المقصورة أسهل استخداماً وتنظيفاً. يركز فرش الأرضية وأغطية منطقة المقاعد وحماية الشاشة على المحافظة على الأجزاء الأصلية، بينما تضيف حوامل الهاتف وقطع التخزين وإكسسوارات لوحة التحكم فائدة يومية. ويمكن للقطع الجمالية أن تمنح المقصورة طابعاً خاصاً، بشرط ألا تعيق أدوات التحكم أو فتحات التكييف أو الوسائد الهوائية أو مجال رؤية السائق.',
        'رُتبت المنتجات أدناه حسب السيارة لتسهيل التحقق من التوافق قبل الطلب. راجع الصور والتفاصيل، ثم أكد المقاس مع فريق وادي العوير إذا كانت سيارتك بفئة تجهيز أو مقصورة مختلفة. ويكون التركيب الاحترافي مهماً خصوصاً للقطع التي تحتاج إلى محاذاة دقيقة حول الشاشات والمقابض والكونسول.',
      ],
    },
    tipsTitle: { en: 'How to choose cabin accessories', ar: 'كيف تختار إكسسوارات المقصورة؟' },
    tips: {
      en: [
        'Start with protection for the areas you touch or clean most often, then add convenience upgrades.',
        'Check that mats lock into place and do not move toward the pedals.',
        'Choose mounts and storage pieces that keep controls, vents and the driver’s view clear.',
        'Confirm the colour and trim match under natural light before fixing decorative pieces permanently.',
      ],
      ar: [
        'ابدأ بحماية المناطق الأكثر استخداماً أو تنظيفاً، ثم أضف القطع التي تسهّل الاستخدام اليومي.',
        'تأكد من ثبات الفرش في مكانه وعدم تحركه باتجاه الدواسات.',
        'اختر الحوامل وقطع التخزين التي لا تحجب أدوات التحكم أو فتحات التكييف أو مجال الرؤية.',
        'تحقق من توافق اللون والتشطيب تحت ضوء طبيعي قبل تثبيت القطع الجمالية نهائياً.',
      ],
    },
  },
  lighting: {
    slug: 'lighting',
    name: { en: 'Lighting', ar: 'الإضاءة' },
    eyebrow: { en: 'VEHICLE LIGHTING', ar: 'إضاءة السيارات' },
    title: {
      en: 'Lighting Upgrades for Jetour T2 and ROX 01',
      ar: 'تطويرات الإضاءة لجيتور T2 وروكس 01',
    },
    description: {
      en: 'Explore exterior and ambient lighting upgrades for Jetour T2 and ROX 01, with compatibility checks and professional installation in Al Awir, Dubai.',
      ar: 'استعرض تطويرات الإضاءة الخارجية والمحيطية لجيتور T2 وروكس 01 مع التحقق من التوافق والتركيب الاحترافي في العوير، دبي.',
    },
    intro: {
      en: [
        'Lighting upgrades need more than a visual match. The housing must fit correctly, the wiring should be protected and the beam or ambient effect should work without distracting the driver. Replacement lamps, roof lights and cabin ambient systems also place different demands on the vehicle, so installation details are important.',
        'Use this collection to compare the lighting products currently listed for supported vehicles. Product pages show images, pricing and vehicle compatibility. Before installation, confirm whether the item replaces an original component or adds a new circuit, and ask how switches, controls and cable routing will be handled. The team can inspect the vehicle in Al Awir before recommending the installation approach.',
      ],
      ar: [
        'تحتاج تطويرات الإضاءة إلى أكثر من توافق الشكل. يجب أن يثبت الهيكل بدقة، وأن تكون التمديدات محمية، وأن تعمل الإضاءة الخارجية أو المحيطية من دون إزعاج السائق. كما تختلف متطلبات المصابيح البديلة وكشافات السقف وأنظمة الإضاءة الداخلية، لذلك تُعد تفاصيل التركيب جزءاً أساسياً من الاختيار.',
        'يمكنك استخدام هذه الصفحة لمقارنة منتجات الإضاءة المدرجة للسيارات المدعومة. تعرض صفحة كل منتج الصور والسعر والسيارة المتوافقة. وقبل التركيب، تأكد مما إذا كانت القطعة تستبدل جزءاً أصلياً أو تضيف دائرة جديدة، واسأل عن طريقة التحكم ومسار الأسلاك. ويمكن للفريق فحص السيارة في العوير قبل اقتراح أسلوب التركيب المناسب.',
      ],
    },
    tipsTitle: { en: 'Questions to ask about lighting', ar: 'أسئلة مهمة قبل تركيب الإضاءة' },
    tips: {
      en: [
        'Confirm the part is made for the exact vehicle and that all required brackets and connectors are included.',
        'Ask how wiring will be routed and protected from heat, movement and moisture.',
        'Check the controls and light output in person before the installation is considered complete.',
        'Keep any removed original parts if the upgrade is reversible.',
      ],
      ar: [
        'تأكد من أن القطعة مخصصة لسيارتك وأن جميع القواعد والوصلات المطلوبة متوفرة.',
        'اسأل عن مسار الأسلاك وطريقة حمايتها من الحرارة والحركة والرطوبة.',
        'اختبر أدوات التحكم وشدة الإضاءة بنفسك قبل اعتماد انتهاء التركيب.',
        'احتفظ بالقطع الأصلية التي تمت إزالتها إذا كان من الممكن إعادة السيارة إلى وضعها السابق.',
      ],
    },
  },
  utility: {
    slug: 'utility',
    name: { en: 'Utility', ar: 'الإكسسوارات العملية' },
    eyebrow: { en: 'PRACTICAL UPGRADES', ar: 'تطويرات عملية' },
    title: {
      en: 'Practical Accessories for Jetour T2 and ROX 01',
      ar: 'إكسسوارات عملية لجيتور T2 وروكس 01',
    },
    description: {
      en: 'Shop practical storage, access and everyday-use accessories for Jetour T2 and ROX 01, with fitting support from Wadi Al Awir in Dubai.',
      ar: 'تسوق إكسسوارات التخزين والوصول والاستخدام اليومي لجيتور T2 وروكس 01 مع خدمة التركيب من وادي العوير في دبي.',
    },
    intro: {
      en: [
        'Utility accessories earn their place by solving a repeat problem. A storage box should organise items without creating rattles, a phone holder should keep the screen visible without blocking the road, and access accessories should feel stable in normal use. The right product depends on how you use the vehicle, not simply on how many features it has.',
        'Browse the practical accessories below and compare them by compatible vehicle, installation position and intended use. Product pages include the current listed price and available images. If you are unsure whether an item works with another accessory already installed, send the team a photo on WhatsApp or bring the vehicle to the Al Awir shop for a fit check.',
      ],
      ar: [
        'تثبت الإكسسوارات العملية قيمتها عندما تحل مشكلة متكررة. يجب أن ينظم صندوق التخزين الأغراض من دون أصوات مزعجة، وأن يثبت حامل الهاتف الشاشة في موضع واضح من دون حجب الطريق، وأن تكون قطع الوصول ثابتة في الاستخدام المعتاد. لذلك يعتمد الاختيار الصحيح على طريقة استخدامك للسيارة، لا على عدد المزايا فقط.',
        'تصفح الإكسسوارات العملية أدناه وقارن بينها حسب السيارة المتوافقة ومكان التركيب والغرض من الاستخدام. تتضمن صفحات المنتجات السعر المدرج حالياً والصور المتاحة. وإذا لم تكن متأكداً من توافق قطعة مع إكسسوار مركب مسبقاً، أرسل صورة للفريق عبر واتساب أو أحضر السيارة إلى متجر العوير لفحص المقاس.',
      ],
    },
    tipsTitle: { en: 'A simple usefulness test', ar: 'اختبار بسيط لمعرفة فائدة القطعة' },
    tips: {
      en: [
        'Name the recurring problem the accessory will solve before buying it.',
        'Check that the installed item will not restrict movement, visibility or access to controls.',
        'Prefer a secure vehicle-specific fit over a universal part that can move or rattle.',
        'Ask to see how the accessory is removed or adjusted before leaving the shop.',
      ],
      ar: [
        'حدد المشكلة المتكررة التي ستعالجها القطعة قبل شرائها.',
        'تأكد من أن القطعة بعد تركيبها لا تحد الحركة أو الرؤية أو الوصول إلى أدوات التحكم.',
        'فضّل المقاس المخصص والثابت على القطعة العامة التي قد تتحرك أو تصدر صوتاً.',
        'اطلب شرح طريقة فك الإكسسوار أو تعديله قبل مغادرة المتجر.',
      ],
    },
  },
}

export function isProductCategory(value: string): value is ProductCategory {
  return CATEGORIES.includes(value as ProductCategory)
}

export function getCategoryContent(value: string) {
  return isProductCategory(value) ? categoryContent[value] : null
}
