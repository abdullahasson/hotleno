// Images
import placeholder from "../../public/placeholder.svg"

export interface Trip {
    id: number;
    country: string;
    city: string;
    price: number;
    image: string;
    category: string;
  }
  
  export const trips: Trip[] = [
  // Romantic (12 entries)
  { id: 1, country: "فرنسا", city: "باريس", price: 899, image: placeholder, category: "romantic" },
  { id: 2, country: "إيطاليا", city: "البندقية", price: 749, image: placeholder, category: "romantic" },
  { id: 3, country: "اليونان", city: "سانتوريني", price: 1099, image: placeholder, category: "romantic" },
  { id: 19, country: "إسبانيا", city: "إشبيلية", price: 799, image: placeholder, category: "romantic" },
  { id: 20, country: "المغرب", city: "مراكش", price: 699, image: placeholder, category: "romantic" },
  { id: 21, country: "التشيك", city: "براغ", price: 849, image: placeholder, category: "romantic" },
  { id: 22, country: "المجر", city: "بودابست", price: 779, image: placeholder, category: "romantic" },
  { id: 23, country: "كرواتيا", city: "دوبروفنيك", price: 929, image: placeholder, category: "romantic" },
  { id: 24, country: "النمسا", city: "فيينا", price: 1029, image: placeholder, category: "romantic" },
  // Cultural (12 entries)
  { id: 4, country: "اليابان", city: "كيوتو", price: 1299, image: placeholder, category: "cultural" },
  { id: 5, country: "مصر", city: "القاهرة", price: 799, image: placeholder, category: "cultural" },
  { id: 6, country: "بيرو", city: "كوسكو", price: 899, image: placeholder, category: "cultural" },
  { id: 28, country: "تركيا", city: "إسطنبول", price: 849, image: placeholder, category: "cultural" },
  { id: 29, country: "الصين", city: "بكين", price: 1199, image: placeholder, category: "cultural" },
  { id: 30, country: "الهند", city: "أغرا", price: 729, image: placeholder, category: "cultural" },
  { id: 31, country: "كمبوديا", city: "سييم ريب", price: 999, image: placeholder, category: "cultural" },
  { id: 32, country: "تايلاند", city: "بانكوك", price: 879, image: placeholder, category: "cultural" },
  { id: 33, country: "الأردن", city: "البتراء", price: 949, image: placeholder, category: "cultural" },
  // Beach (12 entries)
  { id: 7, country: "المالديف", city: "ماليه", price: 1499, image: placeholder, category: "beach" },
  { id: 8, country: "المكسيك", city: "كانكون", price: 699, image: placeholder, category: "beach" },
  { id: 9, country: "تايلاند", city: "فوكيت", price: 899, image: placeholder, category: "beach" },
  { id: 37, country: "إندونيسيا", city: "بالي", price: 849, image: placeholder, category: "beach" },
  { id: 38, country: "اليونان", city: "ميكونوس", price: 1129, image: placeholder, category: "beach" },
  { id: 39, country: "أستراليا", city: "السهل الذهبي", price: 1299, image: placeholder, category: "beach" },
  { id: 40, country: "إسبانيا", city: "مايوركا", price: 979, image: placeholder, category: "beach" },
  { id: 41, country: "البرازيل", city: "فلوريانوبوليس", price: 899, image: placeholder, category: "beach" },
  { id: 42, country: "هاواي", city: "ماوي", price: 1599, image: placeholder, category: "beach" },

  // Family (12 entries)
  { id: 10, country: "الولايات المتحدة", city: "أورلاندو", price: 599, image: placeholder, category: "family" },
  { id: 11, country: "إسبانيا", city: "برشلونة", price: 799, image: placeholder, category: "family" },
  { id: 12, country: "سنغافورة", city: "سنغافورة", price: 1199, image: placeholder, category: "family" },
  { id: 46, country: "اليابان", city: "طوكيو", price: 1399, image: placeholder, category: "family" },
  { id: 47, country: "الدنمارك", city: "كوبنهاغن", price: 1099, image: placeholder, category: "family" },
  { id: 48, country: "كندا", city: "فانكوفر", price: 899, image: placeholder, category: "family" },
  { id: 49, country: "هولندا", city: "أمستردام", price: 949, image: placeholder, category: "family" },
  { id: 50, country: "الإمارات", city: "دبي", price: 1299, image: placeholder, category: "family" },
  { id: 51, country: "المملكة المتحدة", city: "لندن", price: 1249, image: placeholder, category: "family" },

  // Nature (12 entries)
  { id: 13, country: "كوستاريكا", city: "مونتيفيردي", price: 899, image: placeholder, category: "nature" },
  { id: 14, country: "نيوزيلندا", city: "كوينزتاون", price: 1299, image: placeholder, category: "nature" },
  { id: 15, country: "كندا", city: "بانف", price: 799, image: placeholder, category: "nature" },
  { id: 55, country: "تنزانيا", city: "زنجبار", price: 1199, image: placeholder, category: "nature" },
  { id: 56, country: "النرويج", city: "ترومسو", price: 1399, image: placeholder, category: "nature" },
  { id: 57, country: "كينيا", city: "ماساي مارا", price: 1499, image: placeholder, category: "nature" },
  { id: 58, country: "آيسلندا", city: "ريكيافيك", price: 1299, image: placeholder, category: "nature" },
  { id: 59, country: "فنزويلا", city: "كانيما", price: 1699, image: placeholder, category: "nature" },
  { id: 60, country: "ناميبيا", city: "صوسوسفلي", price: 1399, image: placeholder, category: "nature" },

  // For Trips (12 entries)
  { id: 16, country: "ألمانيا", city: "برلين", price: 849, image: placeholder, category: "forTrips" },
  { id: 17, country: "أستراليا", city: "سيدني", price: 1399, image: placeholder, category: "forTrips" },
  { id: 18, country: "البرازيل", city: "ريو دي جانيرو", price: 999, image: placeholder, category: "forTrips" },
  { id: 64, country: "الأرجنتين", city: "بوينس آيرس", price: 899, image: placeholder, category: "forTrips" },
  { id: 65, country: "كولومبيا", city: "قرطاجنة", price: 799, image: placeholder, category: "forTrips" },
  { id: 66, country: "فنلندا", city: "هلسنكي", price: 1099, image: placeholder, category: "forTrips" },
  { id: 67, country: "هونغ كونغ", city: "هونغ كونغ", price: 1249, image: placeholder, category: "forTrips" },
  { id: 68, country: "كوريا الجنوبية", city: "سيول", price: 1349, image: placeholder, category: "forTrips" },
  { id: 69, country: "البرتغال", city: "بورتو", price: 949, image: placeholder, category: "forTrips" }
  ];