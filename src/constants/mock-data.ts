// Types 
import { Article } from '@/types/article';

// Homepage Articals Carousel Mock Data
export const articles: Article[] = [
    {
        id: 1,
        title: "مستقبل السفر في عالم ما بعد الجائحة",
        description: "استكشاف كيفية تكيُّف صناعة السفر مع التحديات الجديدة وتغيُّر سلوكيات المسافرين في المشهد العالمي الحالي.",
        department: "اتجاهات السفر",
        blogName: "رؤى وندرلست"
    },
    {
        id: 2,
        title: "10 جواهر خفية في جنوب شرق آسيا يجب أن تزورها",
        description: "اكتشف الوجهات غير المطروقة في جنوب شرق آسيا التي تقدّم تجارب فريدة بعيداً عن الزحام السياحي.",
        department: "دليل الوجهات",
        blogName: "يوميات المستكشف"
    },
    {
        id: 3,
        title: "السفر المستدام: كيفية تقليل بصمتك الكربونية",
        description: "نصائح واستراتيجيات عملية للمسافرين الواعين بيئياً لتقليل تأثيرهم على البيئة أثناء استكشاف العالم.",
        department: "السياحة البيئية",
        blogName: "المسافر الأخضر"
    },
    {
        id: 4,
        title: "الدليل الشامل لوجهات الرحّال الرقمي",
        description: "أفضل مدن العالم للرحّالين الرقميين توفر إنترنت موثوقاً ومساحات عمل مشتركة ومجتمعات نابضة بالحياة.",
        department: "العمل والسفر",
        blogName: "حياة الرحّال"
    },
    {
        id: 5,
        title: "مغامرات الطهي: جولات طعام الشارع حول العالم",
        description: "رحلة ذواق عبر أفضل أسواق طعام الشارع عالمياً وما يجب تذوقه في كل وجهة.",
        department: "الطعام والثقافة",
        blogName: "تذوّق العالم"
    },
    {
        id: 6,
        title: "حيل السفر العائلي: إجازات خالية من التوتر مع الأطفال",
        description: "نصائح الخبراء في التخطيط للعطلات العائلية والاستمتاع بها بما يناسب جميع الأعمار والاهتمامات.",
        department: "السفر العائلي",
        blogName: "رحلات سعيدة"
    }
];


// Homepage Destinations Mock Data
export const destinations = [
    { name: "نيويورك", url: "/flights-to/nyc/cheap-flights-to-new-york" },
    { name: "ميامي", url: "/flights-to/mia/cheap-flights-to-miami" },
    { name: "لوس أنجليس", url: "/flights-to/lax/cheap-flights-to-los-angeles" },
    { name: "واشنطن", url: "/flights-to/was/cheap-flights-to-washington-dc" },
    { name: "أورلاندو", url: "/flights-to/orl/cheap-flights-to-orlando" },
    { name: "شيكاغو", url: "/flights-to/chi/cheap-flights-to-chicago" },
    { name: "لاس فيغاس", url: "/flights-to/las/cheap-flights-to-las-vegas-nv" },
    { name: "دالاس", url: "/flights-to/dfw/cheap-flights-to-dallas-tx" },
    { name: "ديترويت", url: "/flights-to/dtt/cheap-flights-to-detroit" },
    { name: "سان فرانسسكو", url: "/flights-to/sfo/cheap-flights-to-san-francisco" }
];