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
      "Automotive 318 Ambient Lighting for Chery Jetour T2 & Jetour T2 PHEV/66_cf63fb6b-9524-4dc1-a82e-0f4ee54a6357_1800x1800.webp",
      "Automotive 318 Ambient Lighting for Chery Jetour T2 & Jetour T2 PHEV/4_6bd5af70-49e4-4adf-8306-f2f32c8e7128_720x.jpg",
      "Automotive 318 Ambient Lighting for Chery Jetour T2 & Jetour T2 PHEV/8_ec135337-b9ed-4b8c-9fdb-257f85e6b1da_1800x1800.webp",
      "Automotive 318 Ambient Lighting for Chery Jetour T2 & Jetour T2 PHEV/9_c3d54028-1ae9-44a9-844f-be9971ce947d_1800x1800.webp"
    ],
    thumbnail: "Automotive 318 Ambient Lighting for Chery Jetour T2 & Jetour T2 PHEV/66_cf63fb6b-9524-4dc1-a82e-0f4ee54a6357_1800x1800.webp",
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
    thumbnail: "Rear Bumper Steel Tow Bar for Jetour T2 Accessories Factory Direct Trailer Bar Popular Exterior Car Accessories Hot Sale/H69fec78b49874b01b627d47a96e393859.jpg",
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
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 250,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "3-piece silicone pad set for ROX 01 central console. Covers wireless charger, cup holder, and armrest box. Non-slip, dustproof, and shockproof. Available in White, Orange, and Black.",
      ar: "طقم وسادات سيليكون 3 قطع للكونسول المركزي لروكس 01. يغطي الشاحن اللاسلكي وحامل الأكواب وصندوق المسند. مانع للانزلاق ومقاوم للغبار والصدمات. متوفر بالأبيض والبرتقالي والأسود"
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
  {
    id: "rox-01-spoiler",
    name: { en: "Rear Spoiler Wing (Glossy Black)", ar: "جناح سبويلر خلفي (أسود لامع)" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 500,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "Glossy black rear spoiler wing for ROX 01. Enhances the sporty look and improves aerodynamics.",
      ar: "جناح سبويلر خلفي أسود لامع لروكس 01. يعزز المظهر الرياضي ويحسن الديناميكا الهوائية"
    },
    features: {
      en: ["Glossy black finish", "Custom fit for ROX 01", "Improved aerodynamics", "Easy bolt-on installation"],
      ar: ["لون أسود لامع", "مقاس مخصص لروكس 01", "ديناميكا هوائية محسّنة", "تركيب سهل بمسامير"]
    },
    images: [
      "Spoiler Jetour ROX 01/jetour-rox-01-spoiler-side-view.webp",
      "Spoiler Jetour ROX 01/jetour-rox-01-spoiler-installed.jpg",
      "Spoiler Jetour ROX 01/jetour-rox-01-spoiler-close-up.webp",
      "Spoiler Jetour ROX 01/jetour-rox-01-spoiler-rear.webp"
    ],
    thumbnail: "Spoiler Jetour ROX 01/jetour-rox-01-spoiler-side-view.webp",
    badge: null
  },
  {
    id: "rox-01-mud-flaps",
    name: { en: "4Pcs Mudguards Mud Flaps", ar: "واقي طين 4 قطع" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 250,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "4-piece mud flaps set for ROX 01. Protects car fenders from road debris, mud, and water splash.",
      ar: "طقم واقي طين 4 قطع لروكس 01. يحمي رفارف السيارة من الحصى والطين ورذاذ الماء"
    },
    features: {
      en: ["4-piece set (front & rear)", "Custom fit for ROX 01", "Durable flexible material", "No drilling installation"],
      ar: ["طقم 4 قطع (أمامي وخلفي)", "مقاس مخصص لروكس 01", "مادة مرنة متينة", "تركيب بدون حفر"]
    },
    images: [
      "Mud Flaps Jetour ROX 01/jetour-rox-01-mud-flaps-front.jpg",
      "Mud Flaps Jetour ROX 01/jetour-rox-01-mud-flaps-rear.jpg",
      "Mud Flaps Jetour ROX 01/jetour-rox-01-mud-flaps-installed.jpg"
    ],
    thumbnail: "Mud Flaps Jetour ROX 01/jetour-rox-01-mud-flaps-front.jpg",
    badge: null
  },
  {
    id: "rox-01-hr-wheel-spacer",
    name: { en: "H&R TRAK+ Wheel Spacer Set", ar: "طقم فواصل عجلات H&R TRAK+" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 1800,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "German-made H&R TRAK+ wheel spacers for ROX 01. Improves handling, stability, and gives a wider aggressive stance. Includes lug nuts and hardware.",
      ar: "فواصل عجلات H&R TRAK+ صناعة ألمانية لروكس 01. تحسّن الثبات والتحكم وتعطي مظهراً عريضاً وعدوانياً. تشمل الصواميل والقطع"
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
    id: "rox-01-brake-caliper",
    name: { en: "Brake Caliper Cover Set", ar: "غطاء فرامل كاليبر" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 750,
    currency: "AED",
    warranty: "1 year",
    category: "exterior",
    description: {
      en: "Premium ROX-branded brake caliper covers. Available in multiple colors for a custom sporty look. 1 year warranty included.",
      ar: "أغطية كاليبر فرامل بعلامة ROX. متوفرة بألوان متعددة لمظهر رياضي مخصص. ضمان سنة"
    },
    features: {
      en: ["ROX branded design", "Multiple color options", "Easy installation", "Protective design", "1 Year Warranty"],
      ar: ["تصميم بعلامة ROX", "خيارات ألوان متعددة", "تركيب سهل", "تصميم واقي", "ضمان سنة"]
    },
    images: [
      "Brake Caliper Cover Jetour ROX 01/jetour-rox-01-brake-caliper-cover-colors.png"
    ],
    thumbnail: "Brake Caliper Cover Jetour ROX 01/jetour-rox-01-brake-caliper-cover-colors.png",
    badge: "warranty"
  },
  {
    id: "rox-01-phone-holder",
    name: { en: "Car Phone Holder Bracket", ar: "حامل هاتف للسيارة" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 100,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "Custom-fit phone holder bracket for ROX 01. Stable mount with easy access to your phone while driving.",
      ar: "حامل هاتف مخصص لروكس 01. تثبيت ثابت مع سهولة الوصول للهاتف أثناء القيادة"
    },
    features: {
      en: ["Custom fit for ROX 01", "Stable no-shake mount", "Easy installation", "360° adjustable angle"],
      ar: ["مقاس مخصص لروكس 01", "تثبيت ثابت بدون اهتزاز", "تركيب سهل", "زاوية قابلة للتعديل 360°"]
    },
    images: [
      "Phone Holder Jetour ROX 01/jetour-rox-01-phone-holder-bracket.jpg",
      "Phone Holder Jetour ROX 01/jetour-rox-01-phone-holder-installed.jpg"
    ],
    thumbnail: "Phone Holder Jetour ROX 01/jetour-rox-01-phone-holder-bracket.jpg",
    badge: null
  },
  {
    id: "rox-01-screen-protector",
    name: { en: "Dashboard Screen Protector Set", ar: "طقم حماية شاشة لوحة القيادة" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 250,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "Tempered glass screen protector set for ROX 01 dashboard and instrument cluster. Anti-scratch, anti-fingerprint, HD clarity.",
      ar: "طقم حماية شاشة زجاج مقوى للوحة القيادة وعداد جيتور روكس 01. مضاد للخدش وبصمات الأصابع، وضوح عالي"
    },
    features: {
      en: ["Covers main screen + instrument cluster", "Tempered glass protection", "Anti-scratch & anti-fingerprint", "HD clarity, no bubbles"],
      ar: ["يغطي الشاشة الرئيسية + عداد السرعة", "حماية زجاج مقوى", "مضاد للخدش وبصمات الأصابع", "وضوح عالي بدون فقاعات"]
    },
    images: [
      "Screen Protector Jetour ROX 01/jetour-rox-01-screen-protector-dashboard.jpg"
    ],
    thumbnail: "Screen Protector Jetour ROX 01/jetour-rox-01-screen-protector-dashboard.jpg",
    badge: null
  },
  {
    id: "car-mat-2ply-t2",
    name: { en: "3D Car Floor Mat - 2 Ply Water Resistant", ar: "دعاسات سيارة ثلاثية الأبعاد - طبقتين مقاومة للماء" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 450,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "Premium 2-ply 3D molded car floor mats for Jetour T2. Water resistant with raised edges for full protection against spills, mud, and dirt.",
      ar: "دعاسات أرضية ثلاثية الأبعاد بطبقتين لجيتور T2. مقاومة للماء مع حواف مرتفعة لحماية كاملة من الانسكابات والطين والأوساخ"
    },
    features: {
      en: ["2-ply heavy-duty construction", "3D molded perfect fit", "Water resistant surface", "Raised edges trap spills", "Full set: front & rear"],
      ar: ["بناء متين بطبقتين", "قالب ثلاثي الأبعاد بمقاس مثالي", "سطح مقاوم للماء", "حواف مرتفعة تحتجز الانسكابات", "طقم كامل: أمامي وخلفي"]
    },
    images: [
      "Car Mat 2 Ply Jetour T2/jetour-t2-3d-floor-mat-set.jpg",
      "Car Mat 2 Ply Jetour T2/jetour-t2-3d-floor-mat-driver.jpg",
      "Car Mat 2 Ply Jetour T2/jetour-t2-3d-floor-mat-rear.jpg"
    ],
    thumbnail: "Car Mat 2 Ply Jetour T2/jetour-t2-3d-floor-mat-set.jpg",
    badge: null
  },
  {
    id: "car-mat-t2",
    name: { en: "Carpet Car Floor Mat Set", ar: "طقم دعاسات سيارة قماش" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 350,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "Custom-fit carpet floor mats for Jetour T2 with embroidered T2 logo. Soft fabric finish with anti-slip backing.",
      ar: "دعاسات أرضية قماش بمقاس مخصص لجيتور T2 مع شعار T2 مطرز. تشطيب قماشي ناعم مع قاعدة مانعة للانزلاق"
    },
    features: {
      en: ["Custom-fit for Jetour T2", "Embroidered T2 logo", "Soft carpet finish", "Anti-slip backing", "Full set: front & rear"],
      ar: ["مقاس مخصص لجيتور T2", "شعار T2 مطرز", "تشطيب قماشي ناعم", "قاعدة مانعة للانزلاق", "طقم كامل: أمامي وخلفي"]
    },
    images: [
      "Car Mat Jetour T2/jetour-t2-carpet-floor-mat-set.jpg"
    ],
    thumbnail: "Car Mat Jetour T2/jetour-t2-carpet-floor-mat-set.jpg",
    badge: null
  },
  {
    id: "rox-01-car-mat",
    name: { en: "Carpet Car Floor Mat Set", ar: "طقم دعاسات سيارة قماش" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 500,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "Custom-fit carpet floor mats for Jetour ROX 01. Full coverage set with anti-slip backing. Available in white, black, and red.",
      ar: "دعاسات أرضية قماش بمقاس مخصص لجيتور روكس 01. طقم تغطية كاملة مع قاعدة مانعة للانزلاق. متوفرة بالأبيض والأسود والأحمر"
    },
    features: {
      en: ["Custom-fit for ROX 01", "Full 3-row coverage", "Anti-slip backing", "Available in 3 colors", "Soft carpet finish"],
      ar: ["مقاس مخصص لروكس 01", "تغطية كاملة 3 صفوف", "قاعدة مانعة للانزلاق", "متوفرة بـ 3 ألوان", "تشطيب قماشي ناعم"]
    },
    images: [
      "Car Mat Jetour ROX 01/jetour-rox-01-carpet-mat-white.jpg",
      "Car Mat Jetour ROX 01/jetour-rox-01-carpet-mat-black.jpg",
      "Car Mat Jetour ROX 01/jetour-rox-01-carpet-mat-red.jpg"
    ],
    thumbnail: "Car Mat Jetour ROX 01/jetour-rox-01-carpet-mat-white.jpg",
    badge: null,
    variants: [
      { id: "white", name: { en: "White", ar: "أبيض" }, color: "#C8C0B8", imageIndex: 0 },
      { id: "black", name: { en: "Black", ar: "أسود" }, color: "#2A2A2A", imageIndex: 1 },
      { id: "red", name: { en: "Red", ar: "أحمر" }, color: "#C44B2F", imageIndex: 2 }
    ]
  },
  {
    id: "dubai-ambient-panel",
    name: { en: "Side Ambient Light Panel - Dubai Edition", ar: "لوحة إضاءة جانبية - إصدار دبي" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 750,
    currency: "AED",
    warranty: null,
    category: "lighting",
    description: {
      en: "Exclusive Dubai Edition side ambient light panel featuring the iconic Dubai skyline with Burj Khalifa, Burj Al Arab, and Jetour T2 silhouette. Multi-color LED illumination.",
      ar: "لوحة إضاءة جانبية حصرية إصدار دبي تتميز بأفق دبي الشهير مع برج خليفة وبرج العرب وصورة جيتور T2. إضاءة LED متعددة الألوان"
    },
    features: {
      en: ["Dubai skyline design with iconic landmarks", "Multi-color LED illumination", "Includes Jetour T2 silhouette", "Dashboard panel replacement", "Exclusive Dubai Edition"],
      ar: ["تصميم أفق دبي مع معالم شهيرة", "إضاءة LED متعددة الألوان", "يتضمن صورة جيتور T2", "بديل لوحة القيادة", "إصدار دبي الحصري"]
    },
    images: [
      "Side Ambient Light Panel Dubai Edition Jetour T2/jetour-t2-dubai-ambient-panel-blue.webp",
      "Side Ambient Light Panel Dubai Edition Jetour T2/jetour-t2-dubai-ambient-panel-green.webp",
      "Side Ambient Light Panel Dubai Edition Jetour T2/jetour-t2-dubai-ambient-panel-pink.webp"
    ],
    thumbnail: "Side Ambient Light Panel Dubai Edition Jetour T2/jetour-t2-dubai-ambient-panel-blue.webp",
    badge: null
  },
  {
    id: "original-spare-tire-cover",
    name: { en: "Original Spare Tire Cover", ar: "غطاء الإطار الاحتياطي الأصلي" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 1000,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "Original gloss black spare tire cover for Jetour T2. OEM-style design with premium finish, direct replacement for the factory spare tire housing.",
      ar: "غطاء إطار احتياطي أصلي أسود لامع لجيتور T2. تصميم بمواصفات المصنع مع تشطيب فاخر، بديل مباشر لحاوية الإطار الاحتياطي"
    },
    features: {
      en: ["OEM-style original design", "Gloss black premium finish", "Direct factory replacement", "Durable weather-resistant material", "Perfect fit for Jetour T2"],
      ar: ["تصميم أصلي بمواصفات المصنع", "تشطيب أسود لامع فاخر", "بديل مباشر للمصنع", "مادة متينة مقاومة للعوامل الجوية", "مقاس مثالي لجيتور T2"]
    },
    images: [
      "Original Spare Tire Cover Jetour T2/jetour-t2-original-spare-tire-cover.jpg"
    ],
    thumbnail: "Original Spare Tire Cover Jetour T2/jetour-t2-original-spare-tire-cover.jpg",
    badge: null
  },
  {
    id: "key-cover-t2",
    name: { en: "Leather Key Cover Case", ar: "غطاء مفتاح جلد" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 50,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "Premium leather key case for Jetour T2. Handstitched full-flip design with keyring attachment. Available in multiple colors.",
      ar: "غطاء مفتاح جلد فاخر لجيتور T2. تصميم قلاب كامل مخيط يدوياً مع حلقة مفاتيح. متوفر بعدة ألوان"
    },
    features: {
      en: ["Premium leather material", "Handstitched finish", "Full-flip protective design", "Keyring attachment included", "Available in multiple colors"],
      ar: ["جلد فاخر", "تشطيب مخيط يدوياً", "تصميم قلاب كامل للحماية", "حلقة مفاتيح مرفقة", "متوفر بعدة ألوان"]
    },
    images: [
      "Key Cover Jetour T2/jetour-t2-key-cover-orange.jpg",
      "Key Cover Jetour T2/jetour-t2-key-cover-green-black.jpg",
      "Key Cover Jetour T2/jetour-t2-key-cover-black.png"
    ],
    thumbnail: "Key Cover Jetour T2/jetour-t2-key-cover-green-black.jpg",
    badge: null
  },
  {
    id: "dashcam-mirror-t2",
    name: { en: "Dash Cam Rearview Mirror - Original Cable", ar: "كاميرا مرآة رؤية خلفية - كيبل أصلي" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 1350,
    currency: "AED",
    warranty: null,
    category: "interior",
    description: {
      en: "Custom-fit electronic rearview mirror dash cam for Jetour T2 with original cable integration. 2K front recording, 1080P rear streaming, 9.66-inch IPS HD screen with 24-hour parking surveillance.",
      ar: "كاميرا مرآة رؤية خلفية إلكترونية مخصصة لجيتور T2 مع توصيل كيبل أصلي. تسجيل أمامي 2K، بث خلفي 1080P، شاشة IPS عالية الدقة 9.66 بوصة مع مراقبة وقوف 24 ساعة"
    },
    features: {
      en: ["2K WDR front recording", "1080P rear-view streaming", "9.66-inch IPS HD screen", "Original cable - hidden wiring", "24-hour parking surveillance", "120° wide angle AHD camera"],
      ar: ["تسجيل أمامي 2K عالي الوضوح", "بث خلفي 1080P", "شاشة IPS عالية الدقة 9.66 بوصة", "كيبل أصلي - أسلاك مخفية", "مراقبة وقوف 24 ساعة", "كاميرا زاوية واسعة 120 درجة"]
    },
    images: [
      "Dash Cam Mirror Jetour T2/jetour-t2-dashcam-mirror-reversing.webp",
      "Dash Cam Mirror Jetour T2/jetour-t2-dashcam-mirror-bracket.webp",
      "Dash Cam Mirror Jetour T2/jetour-t2-dashcam-mirror-features.webp"
    ],
    thumbnail: "Dash Cam Mirror Jetour T2/jetour-t2-dashcam-mirror-reversing.webp",
    badge: null
  },
  {
    id: "defender-headlights-t2",
    name: { en: "Defender Style LED Headlights", ar: "مصابيح أمامية LED بتصميم ديفندر" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 2500,
    currency: "AED",
    warranty: null,
    category: "lighting",
    description: {
      en: "Defender-style LED headlight set for Jetour T2. Round halo DRL design with projector lens for a bold, iconic look. Direct plug-and-play replacement.",
      ar: "طقم مصابيح أمامية LED بتصميم ديفندر لجيتور T2. تصميم هالة دائرية مع عدسة بروجكتور لمظهر جريء. تركيب مباشر بدون تعديل"
    },
    features: {
      en: ["Defender-style round halo design", "LED projector lens", "Plug-and-play installation", "Pair set: left & right", "Bold iconic look"],
      ar: ["تصميم هالة دائرية بأسلوب ديفندر", "عدسة بروجكتور LED", "تركيب مباشر بدون تعديل", "طقم: يمين ويسار", "مظهر جريء وأيقوني"]
    },
    images: [
      "Defender Style Headlights Jetour T2/jetour-t2-defender-style-headlights.jpg"
    ],
    thumbnail: "Defender Style Headlights Jetour T2/jetour-t2-defender-style-headlights.jpg",
    badge: null
  },
  {
    id: "defender-tail-lights-t2",
    name: { en: "Defender Style LED Tail Lights", ar: "مصابيح خلفية LED بتصميم ديفندر" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 1800,
    currency: "AED",
    warranty: null,
    category: "lighting",
    description: {
      en: "Defender-style LED tail lights for Jetour T2. Square red LED signature with smoked black housing for a rugged, premium look. Direct replacement.",
      ar: "مصابيح خلفية LED بتصميم ديفندر لجيتور T2. توقيع LED أحمر مربع مع إطار أسود مدخن لمظهر متين وفاخر. بديل مباشر"
    },
    features: {
      en: ["Defender-style square LED design", "Smoked black housing", "Red LED signature", "Direct replacement", "Pair set: left & right"],
      ar: ["تصميم LED مربع بأسلوب ديفندر", "إطار أسود مدخن", "توقيع LED أحمر", "بديل مباشر", "طقم: يمين ويسار"]
    },
    images: [
      "Defender Style Tail Lights Jetour T2/jetour-t2-defender-style-tail-light.jpg"
    ],
    thumbnail: "Defender Style Tail Lights Jetour T2/jetour-t2-defender-style-tail-light.jpg",
    badge: null
  },
  {
    id: "rox-01-rear-fender-liner",
    name: { en: "Rear Fender Liner", ar: "بطانة رفرف خلفي" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 250,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "Rear fender liner for Jetour ROX 01. Protects the inner fender from mud, rocks, and road debris. Durable plastic construction with direct-fit installation.",
      ar: "بطانة رفرف خلفي لجيتور روكس 01. تحمي الرفرف الداخلي من الطين والحصى وحطام الطريق. بلاستيك متين بتركيب مباشر"
    },
    features: {
      en: ["Direct-fit for ROX 01", "Durable plastic construction", "Protects from mud & debris", "Easy bolt-on installation", "Rear coverage"],
      ar: ["مقاس مباشر لروكس 01", "بلاستيك متين", "حماية من الطين والحطام", "تركيب سهل بالبراغي", "تغطية خلفية"]
    },
    images: [
      "Rear Fender Liner Jetour ROX 01/jetour-rox-01-rear-fender-liner.jpg"
    ],
    thumbnail: "Rear Fender Liner Jetour ROX 01/jetour-rox-01-rear-fender-liner.jpg",
    badge: null
  },
  {
    id: "rox-01-badge-emblem",
    name: { en: "ROX 01 Chrome Badge Emblem", ar: "شعار ROX 01 كروم" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 200,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "Chrome 'ROX 01' badge emblem lettering set. 3D chrome finish with self-adhesive backing for easy installation.",
      ar: "طقم شعار حروف ROX 01 كروم. تشطيب كروم ثلاثي الأبعاد مع لاصق ذاتي لتركيب سهل"
    },
    features: {
      en: ["3D chrome finish", "Self-adhesive backing", "ROX + 01 lettering set", "Direct replacement or upgrade", "Weather resistant"],
      ar: ["تشطيب كروم ثلاثي الأبعاد", "لاصق ذاتي", "طقم حروف ROX + 01", "بديل مباشر أو ترقية", "مقاوم للعوامل الجوية"]
    },
    images: [
      "ROX 01 Badge Emblem/jetour-rox-01-badge-emblem.jpg"
    ],
    thumbnail: "ROX 01 Badge Emblem/jetour-rox-01-badge-emblem.jpg",
    badge: null
  },
  {
    id: "rim-t2-2112",
    name: { en: "20\" Alloy Rim - 2112 Gloss Black Milling (4 Pcs)", ar: "جنط 20 بوصة - 2112 أسود لامع (4 قطع)" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 3800,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "20\" Fuel-style alloy rim set (4 pieces) for Jetour T2. 20x9, 5x114/108, ET:15, CB:73. Gloss black with milling detail. 4x4 off-road design.",
      ar: "طقم جنوط 20 بوصة (4 قطع) لجيتور T2. 20x9، 5x114/108، ET:15، CB:73. أسود لامع مع تفاصيل مطحونة. تصميم 4x4 للطرق الوعرة"
    },
    features: {
      en: ["20x9 size", "5x114/108 bolt pattern", "Gloss black milling finish", "4x4 off-road style", "Set of 4 pieces"],
      ar: ["مقاس 20x9", "تقسيمة 5x114/108", "أسود لامع مع تفاصيل مطحونة", "تصميم 4x4 للطرق الوعرة", "طقم 4 قطع"]
    },
    images: [
      "Rims Jetour T2/jetour-t2-rim-2112-gloss-black-milling.jpg"
    ],
    thumbnail: "Rims Jetour T2/jetour-t2-rim-2112-gloss-black-milling.jpg",
    badge: null
  },
  {
    id: "rim-t2-zs019",
    name: { en: "20\" Alloy Rim - ZS019 Hyper Black M Lip (4 Pcs)", ar: "جنط 20 بوصة - ZS019 أسود هايبر (4 قطع)" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 3500,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "20\" 5-spoke alloy rim set (4 pieces) for Jetour T2. 20x9, 5x108, ET:35, CB:73.1. Hyper black with machined lip. Sporty concave design.",
      ar: "طقم جنوط 20 بوصة 5 أذرع (4 قطع) لجيتور T2. 20x9، 5x108، ET:35، CB:73.1. أسود هايبر مع حافة مصقولة. تصميم رياضي مقعر"
    },
    features: {
      en: ["20x9 size", "5x108 bolt pattern", "Hyper black machined lip", "5-spoke concave design", "Set of 4 pieces"],
      ar: ["مقاس 20x9", "تقسيمة 5x108", "أسود هايبر مع حافة مصقولة", "تصميم 5 أذرع مقعر", "طقم 4 قطع"]
    },
    images: [
      "Rims Jetour T2/jetour-t2-rim-zs019-hyper-black.jpg"
    ],
    thumbnail: "Rims Jetour T2/jetour-t2-rim-zs019-hyper-black.jpg",
    badge: null
  },
  {
    id: "rim-t2-3134",
    name: { en: "20\" Alloy Rim - 3134 Gloss Carbon (4 Pcs)", ar: "جنط 20 بوصة - 3134 كربون لامع (4 قطع)" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 3800,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "20\" mesh-style alloy rim set (4 pieces) for Jetour T2. 20x8.5, 5x108, ET:45, CB:63.4. Gloss carbon finish with intricate mesh spoke design.",
      ar: "طقم جنوط 20 بوصة شبكية (4 قطع) لجيتور T2. 20x8.5، 5x108، ET:45، CB:63.4. كربون لامع مع تصميم أذرع شبكية"
    },
    features: {
      en: ["20x8.5 size", "5x108 bolt pattern", "Gloss carbon finish", "Mesh spoke design", "Set of 4 pieces"],
      ar: ["مقاس 20x8.5", "تقسيمة 5x108", "تشطيب كربون لامع", "تصميم أذرع شبكية", "طقم 4 قطع"]
    },
    images: [
      "Rims Jetour T2/jetour-t2-rim-3134-gloss-carbon.jpg"
    ],
    thumbnail: "Rims Jetour T2/jetour-t2-rim-3134-gloss-carbon.jpg",
    badge: null
  },
  {
    id: "rim-t2-0376",
    name: { en: "20\" Alloy Rim - 0376 Hyper Black (4 Pcs)", ar: "جنط 20 بوصة - 0376 أسود هايبر (4 قطع)" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 3800,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "20\" multi-spoke alloy rim set (4 pieces) for Jetour T2. 20x9, 5x108, ET:35, CB:65.1. Hyper black finish with directional spoke pattern.",
      ar: "طقم جنوط 20 بوصة متعددة الأذرع (4 قطع) لجيتور T2. 20x9، 5x108، ET:35، CB:65.1. أسود هايبر مع نمط أذرع اتجاهي"
    },
    features: {
      en: ["20x9 size", "5x108 bolt pattern", "Hyper black finish", "Multi-spoke directional design", "Set of 4 pieces"],
      ar: ["مقاس 20x9", "تقسيمة 5x108", "تشطيب أسود هايبر", "تصميم أذرع اتجاهي", "طقم 4 قطع"]
    },
    images: [
      "Rims Jetour T2/jetour-t2-rim-0376-hyper-black.jpg"
    ],
    thumbnail: "Rims Jetour T2/jetour-t2-rim-0376-hyper-black.jpg",
    badge: null
  },
  {
    id: "rim-t2-0319",
    name: { en: "20\" Alloy Rim - 0319 Gloss Black (4 Pcs)", ar: "جنط 20 بوصة - 0319 أسود لامع (4 قطع)" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 4000,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "20\" alloy rim set (4 pieces) for Jetour T2. 20x8, 5x108, ET:45, CB:63.3. Full gloss black with angular Y-spoke design.",
      ar: "طقم جنوط 20 بوصة (4 قطع) لجيتور T2. 20x8، 5x108، ET:45، CB:63.3. أسود لامع بالكامل مع تصميم أذرع Y زاوية"
    },
    features: {
      en: ["20x8 size", "5x108 bolt pattern", "Full gloss black", "Angular Y-spoke design", "Set of 4 pieces"],
      ar: ["مقاس 20x8", "تقسيمة 5x108", "أسود لامع بالكامل", "تصميم أذرع Y زاوية", "طقم 4 قطع"]
    },
    images: [
      "Rims Jetour T2/jetour-t2-rim-0319-black.jpg"
    ],
    thumbnail: "Rims Jetour T2/jetour-t2-rim-0319-black.jpg",
    badge: null
  },
  {
    id: "rim-t2-xf015",
    name: { en: "20\" Alloy Rim - XF015 Hyper Black (4 Pcs)", ar: "جنط 20 بوصة - XF015 أسود هايبر (4 قطع)" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 3800,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "20\" alloy rim set (4 pieces) for Jetour T2. 20x8, 5x108, ET:35, CB:73.1. Hyper black with fine multi-spoke mesh pattern.",
      ar: "طقم جنوط 20 بوصة (4 قطع) لجيتور T2. 20x8، 5x108، ET:35، CB:73.1. أسود هايبر مع نمط شبكي متعدد الأذرع"
    },
    features: {
      en: ["20x8 size", "5x108 bolt pattern", "Hyper black finish", "Fine multi-spoke mesh", "Set of 4 pieces"],
      ar: ["مقاس 20x8", "تقسيمة 5x108", "تشطيب أسود هايبر", "شبكة أذرع دقيقة", "طقم 4 قطع"]
    },
    images: [
      "Rims Jetour T2/jetour-t2-rim-xf015-hyper-black.jpg"
    ],
    thumbnail: "Rims Jetour T2/jetour-t2-rim-xf015-hyper-black.jpg",
    badge: null
  },
  {
    id: "rim-t2-fc030",
    name: { en: "20\" Alloy Rim - FC030 Hyper Black (4 Pcs)", ar: "جنط 20 بوصة - FC030 أسود هايبر (4 قطع)" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 3800,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "20\" alloy rim set (4 pieces) for Jetour T2. 20x8.5, 5x108, ET:35, CB:73.1. Hyper black with clean split 10-spoke design.",
      ar: "طقم جنوط 20 بوصة (4 قطع) لجيتور T2. 20x8.5، 5x108، ET:35، CB:73.1. أسود هايبر مع تصميم 10 أذرع مقسمة"
    },
    features: {
      en: ["20x8.5 size", "5x108 bolt pattern", "Hyper black finish", "Split 10-spoke design", "Set of 4 pieces"],
      ar: ["مقاس 20x8.5", "تقسيمة 5x108", "تشطيب أسود هايبر", "تصميم 10 أذرع مقسمة", "طقم 4 قطع"]
    },
    images: [
      "Rims Jetour T2/jetour-t2-rim-fc030-hyper-black.jpg"
    ],
    thumbnail: "Rims Jetour T2/jetour-t2-rim-fc030-hyper-black.jpg",
    badge: null
  },
  {
    id: "rim-rox01-yf5705",
    name: { en: "22\" Alloy Rim - YF5705 Matt Black Milling Spoke (4 Pcs)", ar: "جنط 22 بوصة - YF5705 أسود مطفي (4 قطع)" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 4500,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "22\" alloy rim set (4 pieces) for Jetour ROX 01. 22x9, 5x120, ET:35, CB:72. Matt black with milling spoke detail. AMG-style star design.",
      ar: "طقم جنوط 22 بوصة (4 قطع) لجيتور روكس 01. 22x9، 5x120، ET:35، CB:72. أسود مطفي مع تفاصيل أذرع مطحونة. تصميم نجمة بأسلوب AMG"
    },
    features: {
      en: ["22x9 size", "5x120 bolt pattern", "Matt black milling spoke", "AMG-style star design", "Set of 4 pieces"],
      ar: ["مقاس 22x9", "تقسيمة 5x120", "أذرع مطحونة أسود مطفي", "تصميم نجمة بأسلوب AMG", "طقم 4 قطع"]
    },
    images: [
      "Rims Jetour ROX 01/jetour-rox-01-rim-yf5705-matt-black.jpg"
    ],
    thumbnail: "Rims Jetour ROX 01/jetour-rox-01-rim-yf5705-matt-black.jpg",
    badge: null
  },
  {
    id: "rim-rox01-536",
    name: { en: "22\" Alloy Rim - 536 Gloss Black Swirl (4 Pcs)", ar: "جنط 22 بوصة - 536 أسود لامع حلزوني (4 قطع)" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 4000,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "22\" alloy rim set (4 pieces) for Jetour ROX 01. 22x8.5, 5x112/120, ET:38, CB:74.1. Full gloss black with bold swirl spoke design.",
      ar: "طقم جنوط 22 بوصة (4 قطع) لجيتور روكس 01. 22x8.5، 5x112/120، ET:38، CB:74.1. أسود لامع مع تصميم أذرع حلزونية جريئة"
    },
    features: {
      en: ["22x8.5 size", "5x112/120 bolt pattern", "Full gloss black", "Swirl spoke design", "Set of 4 pieces"],
      ar: ["مقاس 22x8.5", "تقسيمة 5x112/120", "أسود لامع بالكامل", "تصميم أذرع حلزونية", "طقم 4 قطع"]
    },
    images: [
      "Rims Jetour ROX 01/jetour-rox-01-rim-536-gloss-black.jpg"
    ],
    thumbnail: "Rims Jetour ROX 01/jetour-rox-01-rim-536-gloss-black.jpg",
    badge: null
  },
  {
    id: "rim-rox01-m121",
    name: { en: "22\" Alloy Rim - M121 Gloss Black M Face (4 Pcs)", ar: "جنط 22 بوصة - M121 أسود لامع (4 قطع)" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 4500,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "22\" MKW alloy rim set (4 pieces) for Jetour ROX 01. 22x9, 5x115/120, ET:18, CB:74.1. Gloss black with machined face. Angular geometric design.",
      ar: "طقم جنوط MKW 22 بوصة (4 قطع) لجيتور روكس 01. 22x9، 5x115/120، ET:18، CB:74.1. أسود لامع مع وجه مصقول. تصميم هندسي زاوي"
    },
    features: {
      en: ["22x9 size", "5x115/120 bolt pattern", "Gloss black machined face", "Angular geometric design", "Set of 4 pieces"],
      ar: ["مقاس 22x9", "تقسيمة 5x115/120", "أسود لامع مع وجه مصقول", "تصميم هندسي زاوي", "طقم 4 قطع"]
    },
    images: [
      "Rims Jetour ROX 01/jetour-rox-01-rim-m121-gloss-black-mface.jpg"
    ],
    thumbnail: "Rims Jetour ROX 01/jetour-rox-01-rim-m121-gloss-black-mface.jpg",
    badge: null
  },
  {
    id: "rim-rox01-m122",
    name: { en: "22\" Alloy Rim - M122 Gloss Black M Face (4 Pcs)", ar: "جنط 22 بوصة - M122 أسود لامع (4 قطع)" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 4200,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "22\" MKW alloy rim set (4 pieces) for Jetour ROX 01. 22x9, 5x115/120, ET:18, CB:74.1. Gloss black with machined face. Multi-spoke turbine design.",
      ar: "طقم جنوط MKW 22 بوصة (4 قطع) لجيتور روكس 01. 22x9، 5x115/120، ET:18، CB:74.1. أسود لامع مع وجه مصقول. تصميم توربين متعدد الأذرع"
    },
    features: {
      en: ["22x9 size", "5x115/120 bolt pattern", "Gloss black machined face", "Multi-spoke turbine design", "Set of 4 pieces"],
      ar: ["مقاس 22x9", "تقسيمة 5x115/120", "أسود لامع مع وجه مصقول", "تصميم توربين متعدد الأذرع", "طقم 4 قطع"]
    },
    images: [
      "Rims Jetour ROX 01/jetour-rox-01-rim-m122-gloss-black-mface.jpg"
    ],
    thumbnail: "Rims Jetour ROX 01/jetour-rox-01-rim-m122-gloss-black-mface.jpg",
    badge: null
  },
  {
    id: "rim-rox01-0389",
    name: { en: "22\" Alloy Rim - 0389 BMF Maybach Style (4 Pcs)", ar: "جنط 22 بوصة - 0389 بأسلوب مايباخ (4 قطع)" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 4500,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "22\" Maybach-style alloy rim set (4 pieces) for Jetour ROX 01. 22x9, 5x120, ET:35, CB:72.5. Black machined face with classic multi-spoke turbine design.",
      ar: "طقم جنوط 22 بوصة بأسلوب مايباخ (4 قطع) لجيتور روكس 01. 22x9، 5x120، ET:35، CB:72.5. أسود مع وجه مصقول وتصميم توربين كلاسيكي"
    },
    features: {
      en: ["22x9 size", "5x120 bolt pattern", "Black machined face (BMF)", "Maybach-style turbine design", "Set of 4 pieces"],
      ar: ["مقاس 22x9", "تقسيمة 5x120", "أسود مع وجه مصقول", "تصميم توربين بأسلوب مايباخ", "طقم 4 قطع"]
    },
    images: [
      "Rims Jetour ROX 01/jetour-rox-01-rim-0389-bmf.jpg"
    ],
    thumbnail: "Rims Jetour ROX 01/jetour-rox-01-rim-0389-bmf.jpg",
    badge: null
  },
  {
    id: "rox-01-number-plate-cover",
    name: { en: "Rear Number Plate Cover", ar: "غطاء لوحة أرقام خلفي" },
    carModel: "jetour-rox-01",
    carYear: "2024-2025",
    price: 300,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "Rear number plate cover for Jetour ROX 01 with ROX branding. Smoked black finish for a clean, premium look.",
      ar: "غطاء لوحة أرقام خلفي لجيتور روكس 01 مع شعار ROX. تشطيب أسود مدخن لمظهر أنيق وفاخر"
    },
    features: {
      en: ["ROX branded design", "Smoked black finish", "Direct-fit for ROX 01", "Premium clean look", "Easy installation"],
      ar: ["تصميم بشعار ROX", "تشطيب أسود مدخن", "مقاس مباشر لروكس 01", "مظهر أنيق وفاخر", "تركيب سهل"]
    },
    images: [
      "Rear Number Plate Cover Jetour ROX 01/jetour-rox-01-rear-number-plate-cover.jpg"
    ],
    thumbnail: "Rear Number Plate Cover Jetour ROX 01/jetour-rox-01-rear-number-plate-cover.jpg",
    badge: null
  },
  {
    id: "original-brake-pad-t2",
    name: { en: "Original Brake Pad Set", ar: "طقم فحمات فرامل أصلي" },
    carModel: "jetour-t2",
    carYear: "2023-2024",
    price: 1000,
    currency: "AED",
    warranty: null,
    category: "exterior",
    description: {
      en: "Original brake pad set for Jetour T2. OEM-spec ceramic brake pads for reliable stopping power and long pad life.",
      ar: "طقم فحمات فرامل أصلي لجيتور T2. فحمات سيراميك بمواصفات المصنع لقوة فرملة موثوقة وعمر طويل"
    },
    features: {
      en: ["OEM original specification", "Ceramic compound", "Reliable stopping power", "Long pad life", "Direct fit for Jetour T2"],
      ar: ["مواصفات المصنع الأصلية", "مركب سيراميك", "قوة فرملة موثوقة", "عمر طويل للفحمات", "مقاس مباشر لجيتور T2"]
    },
    images: [
      "Original Brake Pad Jetour T2/jetour-t2-original-brake-pad.png"
    ],
    thumbnail: "Original Brake Pad Jetour T2/jetour-t2-original-brake-pad.png",
    badge: null
  }
];

const CAR_MODELS = [
  {
    id: "jetour-t2",
    name: { en: "Jetour T2", ar: "جيتور T2" },
    years: "2023-2024",
    heroImage: "assets/cars/jetour-t2.jpg",
    productCount: 29
  },
  {
    id: "jetour-rox-01",
    name: { en: "ROX 01", ar: "روكس 01" },
    years: "2024-2025",
    heroImage: "assets/cars/rox-01.jpg",
    productCount: 16
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
        '<img class="car-card__image img-lazy" src="' + car.heroImage + '" alt="' + car.name[lang] + '" loading="lazy" onload="this.classList.add(\'img-lazy--loaded\')">' +
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
        '<img class="product-card__image img-lazy" src="' + (typeof getThumb === 'function' ? getThumb(product.thumbnail) : product.thumbnail) + '" alt="' + product.name[lang] + '" loading="lazy" onload="this.classList.add(\'img-lazy--loaded\')">' +
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

    var waMsg = (typeof window.getServiceWhatsAppURL === 'function')
      ? window.getServiceWhatsAppURL(service, lang)
      : '';

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
      '<a href="#" onclick="event.preventDefault(); window.openWhatsApp(\'' + waMsg.replace(/'/g, "\\'") + '\');" class="btn btn--outline btn--sm service-card__cta">' + inquireLabel + '</a>' +
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
