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

// Helper function to format city names for display
export const formatCityName = (name: string): string => {
  return name
    .replace('city_', '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
};

export const formatCountryName = (name: string): string => {
  return name
    .replace('city_', '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
};

// Type definition for destination objects
export type CityDestination = {
  name: string;
  formattedName: string;
  url: string;
  code: string;
  countryCode: string;
  countryName: string;
};

type CountryDestination = {
  name: string; // Translation key (e.g., 'country_france')
  formattedName: string; // Formatted display name
  url: string; // Country-specific flight search URL
  countryCode: string; // ISO country code
  countryName: string; // Full country name
}

// Main cityDestinations array
export const cityDestinations: CityDestination[] = [
  { 
    name: 'city_paris',
    formattedName: formatCityName('city_paris'),
    url: '/flights-to?destination=CDG',
    code: 'CDG',
    countryCode: 'FR',
    countryName: 'France'
  },
  { 
    name: 'city_venice',
    formattedName: formatCityName('city_venice'),
    url: '/flights-to?destination=VCE',
    code: 'VCE',
    countryCode: 'IT',
    countryName: 'Italy'
  },
  { 
    name: 'city_santorini',
    formattedName: formatCityName('city_santorini'),
    url: '/flights-to?destination=JTR',
    code: 'JTR',
    countryCode: 'GR',
    countryName: 'Greece'
  },
  { 
    name: 'city_seville',
    formattedName: formatCityName('city_seville'),
    url: '/flights-to?destination=SVQ',
    code: 'SVQ',
    countryCode: 'ES',
    countryName: 'Spain'
  },
  { 
    name: 'city_marrakech',
    formattedName: formatCityName('city_marrakech'),
    url: '/flights-to?destination=RAK',
    code: 'RAK',
    countryCode: 'MA',
    countryName: 'Morocco'
  },
  { 
    name: 'city_prague',
    formattedName: formatCityName('city_prague'),
    url: '/flights-to?destination=PRG',
    code: 'PRG',
    countryCode: 'CZ',
    countryName: 'Czech Republic'
  },
  { 
    name: 'city_budapest',
    formattedName: formatCityName('city_budapest'),
    url: '/flights-to?destination=BUD',
    code: 'BUD',
    countryCode: 'HU',
    countryName: 'Hungary'
  },
  { 
    name: 'city_dubrovnik',
    formattedName: formatCityName('city_dubrovnik'),
    url: '/flights-to?destination=DBV',
    code: 'DBV',
    countryCode: 'HR',
    countryName: 'Croatia'
  },
  { 
    name: 'city_vienna',
    formattedName: formatCityName('city_vienna'),
    url: '/flights-to?destination=VIE',
    code: 'VIE',
    countryCode: 'AT',
    countryName: 'Austria'
  },
  { 
    name: 'city_kyoto',
    formattedName: formatCityName('city_kyoto'),
    url: '/flights-to?destination=UKY',
    code: 'UKY',
    countryCode: 'JP',
    countryName: 'Japan'
  },
  { 
    name: 'city_cairo',
    formattedName: formatCityName('city_cairo'),
    url: '/flights-to?destination=CAI',
    code: 'CAI',
    countryCode: 'EG',
    countryName: 'Egypt'
  },
  { 
    name: 'city_cusco',
    formattedName: formatCityName('city_cusco'),
    url: '/flights-to?destination=CUZ',
    code: 'CUZ',
    countryCode: 'PE',
    countryName: 'Peru'
  },
  { 
    name: 'city_istanbul',
    formattedName: formatCityName('city_istanbul'),
    url: '/flights-to?destination=IST',
    code: 'IST',
    countryCode: 'TR',
    countryName: 'Turkey'
  },
  { 
    name: 'city_beijing',
    formattedName: formatCityName('city_beijing'),
    url: '/flights-to?destination=PEK',
    code: 'PEK',
    countryCode: 'CN',
    countryName: 'China'
  },
  { 
    name: 'city_agra',
    formattedName: formatCityName('city_agra'),
    url: '/flights-to?destination=AGR',
    code: 'AGR',
    countryCode: 'IN',
    countryName: 'India'
  },
  { 
    name: 'city_siem_reap',
    formattedName: formatCityName('city_siem_reap'),
    url: '/flights-to?destination=REP',
    code: 'REP',
    countryCode: 'KH',
    countryName: 'Cambodia'
  },
  { 
    name: 'city_bangkok',
    formattedName: formatCityName('city_bangkok'),
    url: '/flights-to?destination=BKK',
    code: 'BKK',
    countryCode: 'TH',
    countryName: 'Thailand'
  },
  { 
    name: 'city_petra',
    formattedName: formatCityName('city_petra'),
    url: '/flights-to?destination=AMM',
    code: 'AMM',
    countryCode: 'JO',
    countryName: 'Jordan'
  },
  { 
    name: 'city_male',
    formattedName: formatCityName('city_male'),
    url: '/flights-to?destination=MLE',
    code: 'MLE',
    countryCode: 'MV',
    countryName: 'Maldives'
  },
  { 
    name: 'city_cancun',
    formattedName: formatCityName('city_cancun'),
    url: '/flights-to?destination=CUN',
    code: 'CUN',
    countryCode: 'MX',
    countryName: 'Mexico'
  },
  { 
    name: 'city_phuket',
    formattedName: formatCityName('city_phuket'),
    url: '/flights-to?destination=HKT',
    code: 'HKT',
    countryCode: 'TH',
    countryName: 'Thailand'
  },
  { 
    name: 'city_bali',
    formattedName: formatCityName('city_bali'),
    url: '/flights-to?destination=DPS',
    code: 'DPS',
    countryCode: 'ID',
    countryName: 'Indonesia'
  },
  { 
    name: 'city_mykonos',
    formattedName: formatCityName('city_mykonos'),
    url: '/flights-to?destination=JMK',
    code: 'JMK',
    countryCode: 'GR',
    countryName: 'Greece'
  },
  { 
    name: 'city_gold_coast',
    formattedName: formatCityName('city_gold_coast'),
    url: '/flights-to?destination=OOL',
    code: 'OOL',
    countryCode: 'AU',
    countryName: 'Australia'
  },
  { 
    name: 'city_majorca',
    formattedName: formatCityName('city_majorca'),
    url: '/flights-to?destination=PMI',
    code: 'PMI',
    countryCode: 'ES',
    countryName: 'Spain'
  },
  { 
    name: 'city_florianopolis',
    formattedName: formatCityName('city_florianopolis'),
    url: '/flights-to?destination=FLN',
    code: 'FLN',
    countryCode: 'BR',
    countryName: 'Brazil'
  },
  // DELETED: Maui & Orlando (US domestic cityDestinations)
  { 
    name: 'city_barcelona',
    formattedName: formatCityName('city_barcelona'),
    url: '/flights-to?destination=BCN',
    code: 'BCN',
    countryCode: 'ES',
    countryName: 'Spain'
  },
  { 
    name: 'city_singapore',
    formattedName: formatCityName('city_singapore'),
    url: '/flights-to?destination=SIN',
    code: 'SIN',
    countryCode: 'SG',
    countryName: 'Singapore'
  },
  { 
    name: 'city_tokyo',
    formattedName: formatCityName('city_tokyo'),
    url: '/flights-to?destination=TYO',
    code: 'TYO',
    countryCode: 'JP',
    countryName: 'Japan'
  },
  { 
    name: 'city_copenhagen',
    formattedName: formatCityName('city_copenhagen'),
    url: '/flights-to?destination=CPH',
    code: 'CPH',
    countryCode: 'DK',
    countryName: 'Denmark'
  },
  { 
    name: 'city_vancouver',
    formattedName: formatCityName('city_vancouver'),
    url: '/flights-to?destination=YVR',
    code: 'YVR',
    countryCode: 'CA',
    countryName: 'Canada'
  },
  { 
    name: 'city_amsterdam',
    formattedName: formatCityName('city_amsterdam'),
    url: '/flights-to?destination=AMS',
    code: 'AMS',
    countryCode: 'NL',
    countryName: 'Netherlands'
  },
  { 
    name: 'city_dubai',
    formattedName: formatCityName('city_dubai'),
    url: '/flights-to?destination=DXB',
    code: 'DXB',
    countryCode: 'AE',
    countryName: 'UAE'
  },
  { 
    name: 'city_london',
    formattedName: formatCityName('city_london'),
    url: '/flights-to?destination=LHR',
    code: 'LHR',
    countryCode: 'GB',
    countryName: 'UK'
  },
  { 
    name: 'city_monteverde',
    formattedName: formatCityName('city_monteverde'),
    url: '/flights-to?destination=SJO',
    code: 'SJO',
    countryCode: 'CR',
    countryName: 'Costa Rica'
  },
  { 
    name: 'city_queenstown',
    formattedName: formatCityName('city_queenstown'),
    url: '/flights-to?destination=ZQN',
    code: 'ZQN',
    countryCode: 'NZ',
    countryName: 'New Zealand'
  },
  { 
    name: 'city_banff',
    formattedName: formatCityName('city_banff'),
    url: '/flights-to?destination=YBC',
    code: 'YBC',
    countryCode: 'CA',
    countryName: 'Canada'
  },
  { 
    name: 'city_zanzibar',
    formattedName: formatCityName('city_zanzibar'),
    url: '/flights-to?destination=ZNZ',
    code: 'ZNZ',
    countryCode: 'TZ',
    countryName: 'Tanzania'
  },
  { 
    name: 'city_tromso',
    formattedName: formatCityName('city_tromso'),
    url: '/flights-to?destination=TOS',
    code: 'TOS',
    countryCode: 'NO',
    countryName: 'Norway'
  },
  { 
    name: 'city_masai_mara',
    formattedName: formatCityName('city_masai_mara'),
    url: '/flights-to?destination=MRE',
    code: 'MRE',
    countryCode: 'KE',
    countryName: 'Kenya'
  },
  { 
    name: 'city_reykjavik',
    formattedName: formatCityName('city_reykjavik'),
    url: '/flights-to?destination=KEF',
    code: 'KEF',
    countryCode: 'IS',
    countryName: 'Iceland'
  },
  { 
    name: 'city_canaima',
    formattedName: formatCityName('city_canaima'),
    url: '/flights-to?destination=CAJ',
    code: 'CAJ',
    countryCode: 'VE',
    countryName: 'Venezuela'
  },
  { 
    name: 'city_sossusvlei',
    formattedName: formatCityName('city_sossusvlei'),
    url: '/flights-to?destination=WDH',
    code: 'WDH',
    countryCode: 'NA',
    countryName: 'Namibia'
  },
  { 
    name: 'city_berlin',
    formattedName: formatCityName('city_berlin'),
    url: '/flights-to?destination=BER',
    code: 'BER',
    countryCode: 'DE',
    countryName: 'Germany'
  },
  { 
    name: 'city_sydney',
    formattedName: formatCityName('city_sydney'),
    url: '/flights-to?destination=SYD',
    code: 'SYD',
    countryCode: 'AU',
    countryName: 'Australia'
  },
  { 
    name: 'city_rio',
    formattedName: formatCityName('city_rio'),
    url: '/flights-to?destination=GIG',
    code: 'GIG',
    countryCode: 'BR',
    countryName: 'Brazil'
  },        
  { 
    name: 'city_buenos_aires',
    formattedName: formatCityName('city_buenos_aires'),
    url: '/flights-to?destination=EZE',
    code: 'EZE',
    countryCode: 'AR',
    countryName: 'Argentina'
  },
  { 
    name: 'city_cartagena',
    formattedName: formatCityName('city_cartagena'),
    url: '/flights-to?destination=CTG',
    code: 'CTG',
    countryCode: 'CO',
    countryName: 'Colombia'
  },
  { 
    name: 'city_helsinki',
    formattedName: formatCityName('city_helsinki'),
    url: '/flights-to?destination=HEL',
    code: 'HEL',
    countryCode: 'FI',
    countryName: 'Finland'
  },
  { 
    name: 'city_hong_kong',
    formattedName: formatCityName('city_hong_kong'),
    url: '/flights-to?destination=HKG',
    code: 'HKG',
    countryCode: 'HK',
    countryName: 'Hong Kong'
  },
  { 
    name: 'city_seoul',
    formattedName: formatCityName('city_seoul'),
    url: '/flights-to?destination=ICN',
    code: 'ICN',
    countryCode: 'KR',
    countryName: 'South Korea'
  },
  { 
    name: 'city_porto',
    formattedName: formatCityName('city_porto'),
    url: '/flights-to?destination=OPO',
    code: 'OPO',
    countryCode: 'PT',
    countryName: 'Portugal'
  }
];

// Country destinations array
export const countryDestinations: CountryDestination[] = [
  { 
    name: 'country_france',
    formattedName: formatCountryName('country_france'),
    url: '/flights-to?country=FR',
    countryCode: 'FR',
    countryName: 'France'
  },
  { 
    name: 'country_italy',
    formattedName: formatCountryName('country_italy'),
    url: '/flights-to?country=IT',
    countryCode: 'IT',
    countryName: 'Italy'
  },
  { 
    name: 'country_greece',
    formattedName: formatCountryName('country_greece'),
    url: '/flights-to?country=GR',
    countryCode: 'GR',
    countryName: 'Greece'
  },
  { 
    name: 'country_spain',
    formattedName: formatCountryName('country_spain'),
    url: '/flights-to?country=ES',
    countryCode: 'ES',
    countryName: 'Spain'
  },
  { 
    name: 'country_morocco',
    formattedName: formatCountryName('country_morocco'),
    url: '/flights-to?country=MA',
    countryCode: 'MA',
    countryName: 'Morocco'
  },
  { 
    name: 'country_czech_republic',
    formattedName: formatCountryName('country_czech_republic'),
    url: '/flights-to?country=CZ',
    countryCode: 'CZ',
    countryName: 'Czech Republic'
  },
  { 
    name: 'country_hungary',
    formattedName: formatCountryName('country_hungary'),
    url: '/flights-to?country=HU',
    countryCode: 'HU',
    countryName: 'Hungary'
  },
  { 
    name: 'country_croatia',
    formattedName: formatCountryName('country_croatia'),
    url: '/flights-to?country=HR',
    countryCode: 'HR',
    countryName: 'Croatia'
  },
  { 
    name: 'country_austria',
    formattedName: formatCountryName('country_austria'),
    url: '/flights-to?country=AT',
    countryCode: 'AT',
    countryName: 'Austria'
  },
  { 
    name: 'country_japan',
    formattedName: formatCountryName('country_japan'),
    url: '/flights-to?country=JP',
    countryCode: 'JP',
    countryName: 'Japan'
  },
  { 
    name: 'country_egypt',
    formattedName: formatCountryName('country_egypt'),
    url: '/flights-to?country=EG',
    countryCode: 'EG',
    countryName: 'Egypt'
  },
  { 
    name: 'country_peru',
    formattedName: formatCountryName('country_peru'),
    url: '/flights-to?country=PE',
    countryCode: 'PE',
    countryName: 'Peru'
  },
  { 
    name: 'country_turkey',
    formattedName: formatCountryName('country_turkey'),
    url: '/flights-to?country=TR',
    countryCode: 'TR',
    countryName: 'Turkey'
  },
  { 
    name: 'country_china',
    formattedName: formatCountryName('country_china'),
    url: '/flights-to?country=CN',
    countryCode: 'CN',
    countryName: 'China'
  },
  { 
    name: 'country_india',
    formattedName: formatCountryName('country_india'),
    url: '/flights-to?country=IN',
    countryCode: 'IN',
    countryName: 'India'
  },
  { 
    name: 'country_cambodia',
    formattedName: formatCountryName('country_cambodia'),
    url: '/flights-to?country=KH',
    countryCode: 'KH',
    countryName: 'Cambodia'
  },
  { 
    name: 'country_thailand',
    formattedName: formatCountryName('country_thailand'),
    url: '/flights-to?country=TH',
    countryCode: 'TH',
    countryName: 'Thailand'
  },
  { 
    name: 'country_jordan',
    formattedName: formatCountryName('country_jordan'),
    url: '/flights-to?country=JO',
    countryCode: 'JO',
    countryName: 'Jordan'
  },
  { 
    name: 'country_maldives',
    formattedName: formatCountryName('country_maldives'),
    url: '/flights-to?country=MV',
    countryCode: 'MV',
    countryName: 'Maldives'
  },
  { 
    name: 'country_mexico',
    formattedName: formatCountryName('country_mexico'),
    url: '/flights-to?country=MX',
    countryCode: 'MX',
    countryName: 'Mexico'
  },
  { 
    name: 'country_indonesia',
    formattedName: formatCountryName('country_indonesia'),
    url: '/flights-to?country=ID',
    countryCode: 'ID',
    countryName: 'Indonesia'
  },
  { 
    name: 'country_australia',
    formattedName: formatCountryName('country_australia'),
    url: '/flights-to?country=AU',
    countryCode: 'AU',
    countryName: 'Australia'
  },
  { 
    name: 'country_brazil',
    formattedName: formatCountryName('country_brazil'),
    url: '/flights-to?country=BR',
    countryCode: 'BR',
    countryName: 'Brazil'
  },
  { 
    name: 'country_singapore',
    formattedName: formatCountryName('country_singapore'),
    url: '/flights-to?country=SG',
    countryCode: 'SG',
    countryName: 'Singapore'
  },
  { 
    name: 'country_denmark',
    formattedName: formatCountryName('country_denmark'),
    url: '/flights-to?country=DK',
    countryCode: 'DK',
    countryName: 'Denmark'
  },
  { 
    name: 'country_canada',
    formattedName: formatCountryName('country_canada'),
    url: '/flights-to?country=CA',
    countryCode: 'CA',
    countryName: 'Canada'
  },
  { 
    name: 'country_netherlands',
    formattedName: formatCountryName('country_netherlands'),
    url: '/flights-to?country=NL',
    countryCode: 'NL',
    countryName: 'Netherlands'
  },
  { 
    name: 'country_uae',
    formattedName: formatCountryName('country_uae'),
    url: '/flights-to?country=AE',
    countryCode: 'AE',
    countryName: 'UAE'
  },
  { 
    name: 'country_uk',
    formattedName: formatCountryName('country_uk'),
    url: '/flights-to?country=GB',
    countryCode: 'GB',
    countryName: 'UK'
  },
  { 
    name: 'country_costa_rica',
    formattedName: formatCountryName('country_costa_rica'),
    url: '/flights-to?country=CR',
    countryCode: 'CR',
    countryName: 'Costa Rica'
  },
  { 
    name: 'country_new_zealand',
    formattedName: formatCountryName('country_new_zealand'),
    url: '/flights-to?country=NZ',
    countryCode: 'NZ',
    countryName: 'New Zealand'
  },
  { 
    name: 'country_tanzania',
    formattedName: formatCountryName('country_tanzania'),
    url: '/flights-to?country=TZ',
    countryCode: 'TZ',
    countryName: 'Tanzania'
  },
  { 
    name: 'country_norway',
    formattedName: formatCountryName('country_norway'),
    url: '/flights-to?country=NO',
    countryCode: 'NO',
    countryName: 'Norway'
  },
  { 
    name: 'country_kenya',
    formattedName: formatCountryName('country_kenya'),
    url: '/flights-to?country=KE',
    countryCode: 'KE',
    countryName: 'Kenya'
  },
  { 
    name: 'country_iceland',
    formattedName: formatCountryName('country_iceland'),
    url: '/flights-to?country=IS',
    countryCode: 'IS',
    countryName: 'Iceland'
  },
  { 
    name: 'country_venezuela',
    formattedName: formatCountryName('country_venezuela'),
    url: '/flights-to?country=VE',
    countryCode: 'VE',
    countryName: 'Venezuela'
  },
  { 
    name: 'country_namibia',
    formattedName: formatCountryName('country_namibia'),
    url: '/flights-to?country=NA',
    countryCode: 'NA',
    countryName: 'Namibia'
  },
  { 
    name: 'country_germany',
    formattedName: formatCountryName('country_germany'),
    url: '/flights-to?country=DE',
    countryCode: 'DE',
    countryName: 'Germany'
  },
  { 
    name: 'country_argentina',
    formattedName: formatCountryName('country_argentina'),
    url: '/flights-to?country=AR',
    countryCode: 'AR',
    countryName: 'Argentina'
  },
  { 
    name: 'country_colombia',
    formattedName: formatCountryName('country_colombia'),
    url: '/flights-to?country=CO',
    countryCode: 'CO',
    countryName: 'Colombia'
  },
  { 
    name: 'country_finland',
    formattedName: formatCountryName('country_finland'),
    url: '/flights-to?country=FI',
    countryCode: 'FI',
    countryName: 'Finland'
  },
  { 
    name: 'country_hong_kong',
    formattedName: formatCountryName('country_hong_kong'),
    url: '/flights-to?country=HK',
    countryCode: 'HK',
    countryName: 'Hong Kong'
  },
  { 
    name: 'country_south_korea',
    formattedName: formatCountryName('country_south_korea'),
    url: '/flights-to?country=KR',
    countryCode: 'KR',
    countryName: 'South Korea'
  },
  { 
    name: 'country_portugal',
    formattedName: formatCountryName('country_portugal'),
    url: '/flights-to?country=PT',
    countryCode: 'PT',
    countryName: 'Portugal'
  }
];

// Helper to get destination by country code
export const getDestinationByCode = (code: string): CityDestination => {
  return cityDestinations.find(dest => dest.code === code) as CityDestination;
};

// Helper to get destination by name
export const getDestinationByName = (name: string): CityDestination | undefined => {
  return cityDestinations.find(dest => dest.name === name);
};

// Helper to get URL by country code
export const getUrlByCountryCode = (code: string): string | undefined => {
  const destination = cityDestinations.find(dest => dest.code === code);
  return destination?.url;
};