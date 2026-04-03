/* ============================================================
   products.js  --  Wadi Al Awir Car Accessories
   Product data, car models, services, and DOM rendering
   ============================================================ */

const PRODUCTS = [
  {
    id: "mud-guard",
    name: { en: "4Pcs Mud Guard - Front & Rear Splash Guards", ar: "واقي طين 4 قطع - أمامي وخلفي" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 150,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "Heavy-duty splash guards that protect from road debris, stones, water, and mud. Snap-on design, no drilling required.",
      ar: "واقيات طين متينة تحمي من الحصى والماء والطين. تصميم سهل بدون حفر"
    },
    features: {
      en: ["Heavy-duty flexible plastic", "Textured surface disperses debris", "No drilling installation", "Front and rear coverage"],
      ar: ["بلاستيك مرن متين", "سطح محبب لتشتيت الحطام", "تركيب بدون حفر", "تغطية أمامية وخلفية"]
    },
    images: [
      "4Pcs Mud guard Fit for JETOUR T2 Front and Rear Splash Guards/71kuuco8CqL._AC_SL1500_.jpg",
      "4Pcs Mud guard Fit for JETOUR T2 Front and Rear Splash Guards/61+VE37EBeL._AC_SL1000_.jpg",
      "4Pcs Mud guard Fit for JETOUR T2 Front and Rear Splash Guards/615s2rJBdzL._AC_SL1000_.jpg",
      "4Pcs Mud guard Fit for JETOUR T2 Front and Rear Splash Guards/61ukrptug9L._AC_SL1000_.jpg"
    ],
    thumbnail: "4Pcs Mud guard Fit for JETOUR T2 Front and Rear Splash Guards/71kuuco8CqL._AC_SL1500_.jpg",
    badge: null
  },
  {
    id: "ambient-lighting",
    name: { en: "Automotive Ambient Lighting System", ar: "نظام إضاءة محيطية للسيارة" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 600,
    currency: "AED",
    warranty: "1 year",
    category: "lighting",
    description: {
      en: "Custom-fit ambient lighting with multi-color adjustment and stepless brightness control. Non-destructive installation.",
      ar: "إضاءة محيطية مخصصة مع تعديل متعدد الألوان والتحكم في السطوع. تركيب بدون تعديل"
    },
    features: {
      en: ["Multi-color gentle adjustment", "Stepless brightness control", "No drilling or wire cutting", "Temperature resistant: -30\u00B0C to 70\u00B0C", "1 Year Warranty"],
      ar: ["تعديل ألوان متعدد", "تحكم سلس بالسطوع", "بدون حفر أو قطع أسلاك", "مقاوم للحرارة: -30 إلى 70 درجة", "ضمان سنة"]
    },
    images: [
      "Automotive 318 Ambient Lighting for Chery Jetour T2 & Jetour T2 PHEV/4_6bd5af70-49e4-4adf-8306-f2f32c8e7128_720x.jpg",
      "Automotive 318 Ambient Lighting for Chery Jetour T2 & Jetour T2 PHEV/66_cf63fb6b-9524-4dc1-a82e-0f4ee54a6357_1800x1800.webp",
      "Automotive 318 Ambient Lighting for Chery Jetour T2 & Jetour T2 PHEV/8_ec135337-b9ed-4b8c-9fdb-257f85e6b1da_1800x1800.webp",
      "Automotive 318 Ambient Lighting for Chery Jetour T2 & Jetour T2 PHEV/9_c3d54028-1ae9-44a9-844f-be9971ce947d_1800x1800.webp"
    ],
    thumbnail: "Automotive 318 Ambient Lighting for Chery Jetour T2 & Jetour T2 PHEV/4_6bd5af70-49e4-4adf-8306-f2f32c8e7128_720x.jpg",
    badge: "warranty"
  },
  {
    id: "brake-caliper",
    name: { en: "Brake Caliper Cover Set", ar: "غطاء فرامل كاليبر" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 600,
    currency: "AED",
    warranty: "1 year",
    category: "exterior",
    description: {
      en: "Premium brake caliper protective covers for enhanced style and protection.",
      ar: "أغطية كاليبر فرامل فاخرة لتعزيز المظهر والحماية"
    },
    features: {
      en: ["Premium quality finish", "Easy installation", "Multiple color options", "Protective design", "1 Year Warranty"],
      ar: ["جودة تشطيب ممتازة", "تركيب سهل", "خيارات ألوان متعددة", "تصميم واقي", "ضمان سنة"]
    },
    images: [
      "Brake Caliper Cover Jetour T2/2ff5dfab-51bc-4a9f-b953-e2a6f6ff037a.jpg",
      "Brake Caliper Cover Jetour T2/57_a3094dd3-dcb6-432a-8ead-4b014a85dd09.webp",
      "Brake Caliper Cover Jetour T2/58_ad3c7463-9b27-453a-b0ac-4b9d40c04f09.webp"
    ],
    thumbnail: "Brake Caliper Cover Jetour T2/2ff5dfab-51bc-4a9f-b953-e2a6f6ff037a.jpg",
    badge: "warranty"
  },
  {
    id: "door-handle-protector",
    name: { en: "Interior Door Handle Protectors", ar: "حماية مقابض الأبواب الداخلية" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 150,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "Stainless steel door handle protectors with wire-drawing technology. Prevents scratches and paint chipping.",
      ar: "حماية مقابض أبواب من الستانلس ستيل. تمنع الخدوش وتقشر الطلاء"
    },
    features: {
      en: ["Stainless steel construction", "Wire-drawing metallic texture", "High scratch resistance", "Prevents paint chipping", "Easy peel-and-stick install"],
      ar: ["صناعة ستانلس ستيل", "ملمس معدني أنيق", "مقاومة عالية للخدوش", "يمنع تقشر الطلاء", "تركيب لاصق سهل"]
    },
    images: [
      "Interior Door Handle Protectors for Jetour T2 & Chery Jetour T2 PHEV/22_665831f9-3d6a-4f65-83cb-b1788dcc32f1_1800x1800.webp",
      "Interior Door Handle Protectors for Jetour T2 & Chery Jetour T2 PHEV/23_04632e01-7905-4153-9797-f1bd80d813af_720x.webp",
      "Interior Door Handle Protectors for Jetour T2 & Chery Jetour T2 PHEV/24_1c7cd893-69bf-40fd-90f2-157574031524_1800x1800.webp",
      "Interior Door Handle Protectors for Jetour T2 & Chery Jetour T2 PHEV/26_1725b773-ab70-45b2-be6e-4cd4b27a9126_720x.webp"
    ],
    thumbnail: "Interior Door Handle Protectors for Jetour T2 & Chery Jetour T2 PHEV/22_665831f9-3d6a-4f65-83cb-b1788dcc32f1_1800x1800.webp",
    badge: null
  },
  {
    id: "mud-flaps",
    name: { en: "Jetour T2 Mud Flaps", ar: "واقيات طين جيتور T2" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 150,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "Specially designed mud flaps to reduce dirt, stones, and water spray. Preserves paintwork.",
      ar: "واقيات طين مصممة خصيصاً لتقليل الأوساخ والحصى ورذاذ الماء"
    },
    features: {
      en: ["Custom Jetour T2 fitment", "Reduces road spray", "Preserves paint finish", "Durable material", "All-weather protection"],
      ar: ["مقاس مخصص لجيتور T2", "يقلل رذاذ الطريق", "يحافظ على الطلاء", "مادة متينة", "حماية لجميع الأجواء"]
    },
    images: [
      "Jetour T2 mud flaps/1b751199-7fad-479a-9e80-4087f97db92f.webp",
      "Jetour T2 mud flaps/1314a5e0-c92a-4530-815a-080d43a211f1.jpg",
      "Jetour T2 mud flaps/3d2f08d4-5ebf-46d8-a4f4-63f48f6cd0df.webp",
      "Jetour T2 mud flaps/5a6bf4ec-a75d-4867-a627-58943391e5e6.jpg"
    ],
    thumbnail: "Jetour T2 mud flaps/1b751199-7fad-479a-9e80-4087f97db92f.webp",
    badge: null
  },
  {
    id: "tow-bar",
    name: { en: "Rear Bumper Steel Tow Bar", ar: "حامل سحب فولاذي خلفي" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 800,
    currency: "AED",
    warranty: null,
    category: "utility",
    description: {
      en: "Factory-direct rear bumper steel tow bar for towing capability. Heavy-duty construction.",
      ar: "حامل سحب فولاذي خلفي مباشر من المصنع. بناء شديد التحمل"
    },
    features: {
      en: ["Heavy-duty steel construction", "Factory direct quality", "Secure rear bumper mount", "Professional towing capability", "Durable finish"],
      ar: ["بناء فولاذي متين", "جودة مباشرة من المصنع", "تثبيت آمن على المصد الخلفي", "قدرة سحب احترافية", "تشطيب متين"]
    },
    images: [
      "Rear Bumper Steel Tow Bar for Jetour T2 Accessories Factory Direct Trailer Bar Popular Exterior Car Accessories Hot Sale/Hb0ac5473be0f43e29c2e89a00a59f167E.jpg",
      "Rear Bumper Steel Tow Bar for Jetour T2 Accessories Factory Direct Trailer Bar Popular Exterior Car Accessories Hot Sale/H5b5baa7d838c4977b46b9844fa758d446.jpg",
      "Rear Bumper Steel Tow Bar for Jetour T2 Accessories Factory Direct Trailer Bar Popular Exterior Car Accessories Hot Sale/H69fec78b49874b01b627d47a96e393859.jpg"
    ],
    thumbnail: "Rear Bumper Steel Tow Bar for Jetour T2 Accessories Factory Direct Trailer Bar Popular Exterior Car Accessories Hot Sale/Hb0ac5473be0f43e29c2e89a00a59f167E.jpg",
    badge: null
  },
  {
    id: "crystal-gear-lever",
    name: { en: "Crystal Gear Lever Handle", ar: "مقبض ناقل الحركة كريستال" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 200,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "Premium crystal gear lever handle for Jetour T2. Elegant design that upgrades your interior with a luxurious look.",
      ar: "مقبض ناقل حركة كريستال فاخر لجيتور T2. تصميم أنيق يرتقي بداخلية سيارتك بمظهر فخم"
    },
    features: {
      en: ["Crystal-cut premium design", "Direct fit for Jetour T2", "Easy plug-and-play installation", "Luxury interior upgrade"],
      ar: ["تصميم كريستالي فاخر", "مقاس مباشر لجيتور T2", "تركيب سهل بدون تعديل", "ترقية فاخرة للداخلية"]
    },
    images: [
      "Crystal Gear Lever Handle Jetour T2/jetour-t2-crystal-gear-lever-handle-front.jpg",
      "Crystal Gear Lever Handle Jetour T2/jetour-t2-crystal-gear-lever-handle-installed.jpg"
    ],
    thumbnail: "Crystal Gear Lever Handle Jetour T2/jetour-t2-crystal-gear-lever-handle-front.jpg",
    badge: null
  },
  {
    id: "fog-light",
    name: { en: "Fog Light with Fitting", ar: "ضوء ضباب مع التركيب" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 700,
    currency: "AED",
    warranty: null,
    category: "lighting",
    description: {
      en: "High-performance fog lights for Jetour T2. Price includes professional fitting and installation.",
      ar: "أضواء ضباب عالية الأداء لجيتور T2. السعر يشمل التركيب الاحترافي"
    },
    features: {
      en: ["High-visibility fog lights", "Professional fitting included", "Direct fit for Jetour T2", "Enhanced driving safety"],
      ar: ["أضواء ضباب عالية الوضوح", "التركيب الاحترافي مشمول", "مقاس مباشر لجيتور T2", "أمان قيادة محسّن"]
    },
    images: [
      "Fog Light Jetour T2/jetour-t2-fog-light-front-view.webp",
      "Fog Light Jetour T2/jetour-t2-fog-light-close-up.webp",
      "Fog Light Jetour T2/jetour-t2-fog-light-installed.webp",
      "Fog Light Jetour T2/jetour-t2-fog-light-detail.webp",
      "Fog Light Jetour T2/jetour-t2-fog-light-pair.webp"
    ],
    thumbnail: "Fog Light Jetour T2/jetour-t2-fog-light-front-view.webp",
    badge: null
  },
  {
    id: "spare-tire-cover",
    name: { en: "Spare Tire Cover", ar: "غطاء الإطار الاحتياطي" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 650,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "Premium spare tire cover for Jetour T2. Protects your spare wheel from sun, rain, and road dust with a sleek look.",
      ar: "غطاء إطار احتياطي فاخر لجيتور T2. يحمي العجلة الاحتياطية من الشمس والمطر والغبار بمظهر أنيق"
    },
    features: {
      en: ["Custom fit for Jetour T2", "Weather-resistant material", "UV & dust protection", "Easy installation"],
      ar: ["مقاس مخصص لجيتور T2", "مادة مقاومة للطقس", "حماية من الأشعة والغبار", "تركيب سهل"]
    },
    images: [
      "Spare Tire Cover Jetour T2/jetour-t2-spare-tire-cover-front.webp",
      "Spare Tire Cover Jetour T2/jetour-t2-spare-tire-cover-installed.webp",
      "Spare Tire Cover Jetour T2/jetour-t2-spare-tire-cover-detail.webp"
    ],
    thumbnail: "Spare Tire Cover Jetour T2/jetour-t2-spare-tire-cover-front.webp",
    badge: null
  },
  {
    id: "under-seats-cover",
    name: { en: "Under Seats Cover (Set)", ar: "غطاء أسفل المقاعد (طقم)" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 75,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "Protective under-seat covers for Jetour T2. Prevents dust, debris, and small items from getting under your seats.",
      ar: "أغطية حماية أسفل المقاعد لجيتور T2. تمنع الغبار والأوساخ والأغراض الصغيرة من الوصول تحت المقاعد"
    },
    features: {
      en: ["Full set included", "Custom fit for Jetour T2", "Easy to install and remove", "Keeps under-seat area clean"],
      ar: ["طقم كامل", "مقاس مخصص لجيتور T2", "سهل التركيب والإزالة", "يحافظ على نظافة أسفل المقعد"]
    },
    images: [
      "Under Seats Cover Jetour T2/jetour-t2-under-seats-cover-front.jpg",
      "Under Seats Cover Jetour T2/jetour-t2-under-seats-cover-rear.webp",
      "Under Seats Cover Jetour T2/jetour-t2-under-seats-cover-installed.webp",
      "Under Seats Cover Jetour T2/jetour-t2-under-seats-cover-detail.jpg"
    ],
    thumbnail: "Under Seats Cover Jetour T2/jetour-t2-under-seats-cover-front.jpg",
    badge: null
  },
  {
    id: "hr-wheel-spacer",
    name: { en: "H&R TRAK+ Wheel Spacer Set", ar: "طقم فواصل عجلات H&R TRAK+" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 1500,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "German-made H&R TRAK+ wheel spacers for Jetour T2. Improves handling, stability, and gives a wider aggressive stance. Includes lug nuts and hardware.",
      ar: "فواصل عجلات H&R TRAK+ صناعة ألمانية لجيتور T2. تحسّن الثبات والتحكم وتعطي مظهراً عريضاً وعدوانياً. تشمل الصواميل والقطع"
    },
    features: {
      en: ["Made in Germany by H&R", "TRAK+ hub-centric design", "Improved handling & stability", "Wider aggressive stance", "Includes lug nuts & hardware"],
      ar: ["صناعة ألمانية من H&R", "تصميم TRAK+ متمركز على المحور", "تحسين الثبات والتحكم", "مظهر عريض وعدواني", "يشمل الصواميل والقطع"]
    },
    images: [
      "HR Wheel Spacer Jetour T2/jetour-t2-hr-trak-wheel-spacer-set.jpg"
    ],
    thumbnail: "HR Wheel Spacer Jetour T2/jetour-t2-hr-trak-wheel-spacer-set.jpg",
    badge: null
  },
  {
    id: "phone-holder",
    name: { en: "Phone Holder Mount", ar: "حامل هاتف للسيارة" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 100,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "Custom-fit phone holder mount for Jetour T2. Screen-mounted bracket with multiple holder options including wireless fast charger.",
      ar: "حامل هاتف مخصص لجيتور T2. قاعدة تثبيت على الشاشة مع خيارات متعددة بما في ذلك شاحن لاسلكي سريع"
    },
    features: {
      en: ["Custom fit for Jetour T2 screen", "Multiple holder styles available", "Wireless fast charging option", "Stable no-shake mount"],
      ar: ["مقاس مخصص لشاشة جيتور T2", "عدة أنماط حامل متوفرة", "خيار شحن لاسلكي سريع", "تثبيت ثابت بدون اهتزاز"]
    },
    images: [
      "Phone Holder Jetour T2/jetour-t2-phone-holder-mount.jpg"
    ],
    thumbnail: "Phone Holder Jetour T2/jetour-t2-phone-holder-mount.jpg",
    badge: null
  },
  {
    id: "screen-protector",
    name: { en: "Dashboard Screen Protector Set", ar: "طقم حماية شاشة لوحة القيادة" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 200,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "Tempered glass screen protector set for Jetour T2 dashboard and instrument cluster. Anti-scratch, anti-fingerprint, HD clarity.",
      ar: "طقم حماية شاشة زجاج مقوى للوحة القيادة وعداد جيتور T2. مضاد للخدش وبصمات الأصابع، وضوح عالي"
    },
    features: {
      en: ["Covers main screen + instrument cluster", "Tempered glass protection", "Anti-scratch & anti-fingerprint", "HD clarity, no bubbles"],
      ar: ["يغطي الشاشة الرئيسية + عداد السرعة", "حماية زجاج مقوى", "مضاد للخدش وبصمات الأصابع", "وضوح عالي بدون فقاعات"]
    },
    images: [
      "Screen Protector Jetour T2/jetour-t2-screen-protector-dashboard.jpg"
    ],
    thumbnail: "Screen Protector Jetour T2/jetour-t2-screen-protector-dashboard.jpg",
    badge: null
  },
  {
    id: "central-control-pad",
    name: { en: "Central Control Wireless Charger Pad & Cup Holder Set", ar: "وسادة شحن لاسلكي وحامل أكواب للكونسول المركزي" },
    carModel: "jetour-t2",
    carYear: "2023-2025",
    price: 250,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "3-piece silicone pad set for Jetour T2 central console. Covers wireless charger, cup holder, and armrest box. Non-slip, dustproof, and shockproof. Available in White, Orange, and Black.",
      ar: "طقم وسادات سيليكون 3 قطع للكونسول المركزي لجيتور T2. يغطي الشاحن اللاسلكي وحامل الأكواب وصندوق المسند. مانع للانزلاق ومقاوم للغبار والصدمات. متوفر بالأبيض والبرتقالي والأسود"
    },
    features: {
      en: ["3-piece set: charger pad + cup holder + armrest box", "Non-slip silicone material", "Dustproof & shockproof protection", "Wireless charger compatible", "Easy to install and remove for cleaning"],
      ar: ["طقم 3 قطع: وسادة شاحن + حامل أكواب + صندوق مسند", "مادة سيليكون مانعة للانزلاق", "حماية من الغبار والصدمات", "متوافق مع الشحن اللاسلكي", "سهل التركيب والإزالة للتنظيف"]
    },
    images: [
      "Central Control Pad Jetour T2/before-after.jpg",
      "Central Control Pad Jetour T2/parts-layout.jpg",
      "Central Control Pad Jetour T2/installed-white.jpg",
      "Central Control Pad Jetour T2/installed-orange.jpg",
      "Central Control Pad Jetour T2/variant-white.jpg",
      "Central Control Pad Jetour T2/variant-black.jpg",
      "Central Control Pad Jetour T2/variant-orange.jpg"
    ],
    thumbnail: "Central Control Pad Jetour T2/before-after.jpg",
    badge: null,
    variants: [
      { id: "white", name: { en: "White", ar: "أبيض" }, color: "#E8E8E8", imageIndex: 4 },
      { id: "orange", name: { en: "Orange", ar: "برتقالي" }, color: "#C67A3C", imageIndex: 6 },
      { id: "black", name: { en: "Black", ar: "أسود" }, color: "#2A2A2A", imageIndex: 5 }
    ]
  },
];

const CAR_MODELS = [
  {
    id: "jetour-t2",
    name: { en: "Jetour T2", ar: "جيتور T2" },
    years: "2023-2024",
    heroImage: "assets/cars/jetour-t2.jpg",
    productCount: 14
  }
];

const SERVICES = [
  {
    id: "window-tinting",
    name: { en: "Window Tinting", ar: "تظليل الزجاج" },
    description: { en: "Professional Nano window tinting. Clear from inside, dark outside. 10-year warranty.", ar: "تظليل نانو احترافي. شفاف من الداخل، غامق من الخارج. ضمان 10 سنوات" },
    icon: "tint",
    packages: [
      {
        name: { en: "Saloon Car", ar: "سيارة صالون" },
        price: 600,
        currency: "AED",
        features: {
          en: ["Nano Tint", "10 Years Warranty", "Clear from Inside", "Dark Outside", "99% Heat Rejection", "100% UV Rejection"],
          ar: ["تظليل نانو", "ضمان 10 سنوات", "شفاف من الداخل", "غامق من الخارج", "عزل حراري 99%", "حماية من الأشعة 100%"]
        }
      },
      {
        name: { en: "SUV Car", ar: "سيارة دفع رباعي" },
        price: 700,
        currency: "AED",
        features: {
          en: ["Nano Tint", "10 Years Warranty", "Clear from Inside", "Dark Outside", "99% Heat Rejection", "100% UV Rejection"],
          ar: ["تظليل نانو", "ضمان 10 سنوات", "شفاف من الداخل", "غامق من الخارج", "عزل حراري 99%", "حماية من الأشعة 100%"]
        }
      },
      {
        name: { en: "Windshield Only", ar: "الزجاج الأمامي فقط" },
        price: 200,
        currency: "AED",
        features: {
          en: ["99% Heat Rejection", "100% UV Rejection"],
          ar: ["عزل حراري 99%", "حماية من الأشعة 100%"]
        }
      }
    ]
  },
  {
    id: "ppf",
    name: { en: "Paint Protection Film", ar: "فيلم حماية الطلاء" },
    description: { en: "Invisible urethane film protecting from stone chips, scratches, and road debris. Self-healing technology.", ar: "فيلم يوريثان شفاف يحمي من الحصى والخدوش. تقنية الشفاء الذاتي" },
    icon: "shield"
  },
  {
    id: "ceramic-coating",
    name: { en: "Ceramic Coating", ar: "طلاء سيراميك" },
    description: { en: "Advanced nano-ceramic coating providing durable hydrophobic protection with superior gloss and easy cleaning.", ar: "طلاء نانو سيراميك متقدم يوفر حماية مائية متينة مع لمعان فائق" },
    icon: "droplets"
  },
  {
    id: "detailing",
    name: { en: "Car Detailing", ar: "تفصيل السيارة" },
    description: { en: "Full interior and exterior detailing. Deep cleaning, paint correction, leather treatment, and showroom finish.", ar: "تنظيف داخلي وخارجي شامل. تصحيح طلاء ومعالجة جلد وتشطيب معرض" },
    icon: "sparkles"
  },
  {
    id: "accessories",
    name: { en: "Custom Accessories", ar: "إكسسوارات مخصصة" },
    description: { en: "Wide range of car accessories for all models. Professional installation by experienced technicians.", ar: "مجموعة واسعة من إكسسوارات السيارات. تركيب احترافي من فنيين ذوي خبرة" },
    icon: "wrench"
  }
];

/* ----------------------------------------------------------
   SVG icon map for services
   ---------------------------------------------------------- */
var SERVICE_ICONS = {
  tint: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C12 2 5 10 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 10 12 2 12 2Z"/><line x1="8" y1="14" x2="16" y2="14" opacity="0.5"/><line x1="9" y1="17" x2="15" y2="17" opacity="0.5"/></svg>',

  shield: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 7V12C3 17.25 6.75 21.5 12 22.5C17.25 21.5 21 17.25 21 12V7L12 2Z"/><polyline points="9 12 11 14 15 10"/></svg>',

  droplets: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C12 2 7 8.5 7 12.5C7 15.26 9.24 17.5 12 17.5C14.76 17.5 17 15.26 17 12.5C17 8.5 12 2 12 2Z"/><path d="M6 18C6 18 4 20 4 21C4 22.1 4.9 23 6 23C7.1 23 8 22.1 8 21C8 20 6 18 6 18Z" opacity="0.6"/><path d="M18 16C18 16 16 18 16 19C16 20.1 16.9 21 18 21C19.1 21 20 20.1 20 19C20 18 18 16 18 16Z" opacity="0.6"/></svg>',

  sparkles: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z"/><path d="M19 15L20 17.5L22.5 18.5L20 19.5L19 22L18 19.5L15.5 18.5L18 17.5L19 15Z" opacity="0.6"/><path d="M5 2L5.5 4L7.5 4.5L5.5 5L5 7L4.5 5L2.5 4.5L4.5 4L5 2Z" opacity="0.6"/></svg>',

  wrench: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>'
};

/* ----------------------------------------------------------
   Utility helpers
   ---------------------------------------------------------- */
function getProductById(id) {
  return PRODUCTS.find(function (p) { return p.id === id; }) || null;
}

function getProductsByCategory(category) {
  if (!category || category === 'all') return PRODUCTS;
  return PRODUCTS.filter(function (p) { return p.category === category; });
}

/* ----------------------------------------------------------
   renderCarModels(lang)
   ---------------------------------------------------------- */
function renderCarModels(lang) {
  lang = lang || 'en';
  var grid = document.getElementById('car-model-grid');
  if (!grid) return;

  grid.innerHTML = CAR_MODELS.map(function (car) {
    return '<div class="car-card animate-in" data-car-id="' + car.id + '" onclick="window.filterByCar(\'' + car.id + '\')">' +
      '<div class="car-card__image-wrap">' +
        '<img class="car-card__image" src="' + car.heroImage + '" alt="' + car.name[lang] + '" loading="lazy">' +
      '</div>' +
      '<div class="car-card__info">' +
        '<h3 class="car-card__name">' + car.name[lang] + '</h3>' +
        '<p class="car-card__year">' + car.years + '</p>' +
        '<span class="car-card__count">' + car.productCount + ' ' + (lang === 'ar' ? 'منتج' : 'Products') + '</span>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* ----------------------------------------------------------
   renderProducts(lang, category)
   ---------------------------------------------------------- */
function renderProducts(lang, category, carModel, limit) {
  lang = lang || 'en';
  category = category || 'all';
  carModel = carModel || 'all';
  var grid = document.getElementById('product-grid');
  if (!grid) return;

  var filtered = PRODUCTS;
  if (category !== 'all') {
    filtered = filtered.filter(function (p) { return p.category === category; });
  }
  if (carModel !== 'all') {
    filtered = filtered.filter(function (p) { return p.carModel === carModel; });
  }
  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  grid.innerHTML = filtered.map(function (product) {
    var badgeHTML = '';
    if (product.badge) {
      var badgeLabel = product.badge === 'warranty'
        ? (lang === 'ar' ? 'ضمان' : 'Warranty')
        : (lang === 'ar' ? 'رائج' : 'Popular');
      badgeHTML = '<span class="product-card__badge product-card__badge--' + product.badge + '">' + badgeLabel + '</span>';
    }

    /* Find car model name */
    var carName = '';
    if (typeof window.CAR_MODELS !== 'undefined') {
      var car = window.CAR_MODELS.find(function(c) { return c.id === product.carModel; });
      if (car) carName = car.name[lang];
    }

    return '<a class="product-card animate-in" data-product-id="' + product.id + '" data-category="' + product.category + '" href="product.html?id=' + product.id + '">' +
      '<div class="product-card__image-wrap">' +
        '<img class="product-card__image" src="' + product.thumbnail + '" alt="' + product.name[lang] + '" loading="lazy">' +
        badgeHTML +
      '</div>' +
      '<div class="product-card__body">' +
        '<span class="product-card__car">' + carName + '</span>' +
        '<h3 class="product-card__name">' + product.name[lang] + '</h3>' +
        '<div class="product-card__price">' +
          '<span>' + product.price + '</span>' +
          '<span class="product-card__price-currency">' + product.currency + '</span>' +
        '</div>' +
      '</div>' +
    '</a>';
  }).join('');
}

/* ----------------------------------------------------------
   renderServices(lang)
   ---------------------------------------------------------- */
function renderServices(lang) {
  lang = lang || 'en';
  var grid = document.getElementById('services-grid');
  if (!grid) return;

  var inquireLabel = lang === 'ar' ? 'استفسار' : 'Inquire';

  grid.innerHTML = SERVICES.map(function (service) {
    var iconSVG = SERVICE_ICONS[service.icon] || '';

    var waURL = (typeof window.getServiceWhatsAppURL === 'function')
      ? window.getServiceWhatsAppURL(service, lang)
      : '#';

    var packagesHTML = '';
    if (service.packages && service.packages.length) {
      packagesHTML = '<div class="service-card__packages">' +
        service.packages.map(function (pkg) {
          var featuresHTML = pkg.features[lang].map(function (f) {
            return '<li>' + f + '</li>';
          }).join('');
          return '<div class="service-package">' +
            '<div class="service-package__header">' +
              '<span class="service-package__name">' + pkg.name[lang] + '</span>' +
              '<span class="service-package__price">' + pkg.price + ' <small>' + pkg.currency + '</small></span>' +
            '</div>' +
            '<ul class="service-package__features">' + featuresHTML + '</ul>' +
          '</div>';
        }).join('') +
      '</div>';
    }

    return '<div class="service-card animate-in' + (service.packages ? ' service-card--has-packages' : '') + '">' +
      '<div class="service-card__icon">' + iconSVG + '</div>' +
      '<h3 class="service-card__name">' + service.name[lang] + '</h3>' +
      '<p class="service-card__desc">' + service.description[lang] + '</p>' +
      packagesHTML +
      '<a href="' + waURL + '" target="_blank" rel="noopener" class="btn btn--outline btn--sm service-card__cta">' + inquireLabel + '</a>' +
    '</div>';
  }).join('');
}

/* ----------------------------------------------------------
   Expose globals
   ---------------------------------------------------------- */
window.PRODUCTS = PRODUCTS;
window.CAR_MODELS = CAR_MODELS;
window.SERVICES = SERVICES;
window.renderCarModels = renderCarModels;
window.renderProducts = renderProducts;
window.renderServices = renderServices;
window.getProductById = getProductById;
window.getProductsByCategory = getProductsByCategory;
