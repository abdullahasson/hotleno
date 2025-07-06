// data/airports.ts
export type SupportedLocale = 'en' | 'ar'; // Add more as needed

export interface AirportName {
  [key: string]: string; // Fallback for any locale
  en: string;
  ar: string;
}

export interface CityName {
    [key: string]: string; // Fallback for any locale
    en: string;
    ar: string;
}

export interface CountryName {
    [key: string]: string; // Fallback for any locale
    en: string;
    ar: string;
}

export interface AirportInfo {
  code: string;
  name: AirportName;
  city: CityName;
  country: CountryName;
}
export const AIRPORTS: Record<string, AirportInfo> = {
    LED: {
        code: "LED",
        name: {
            en: "Pulkovo Airport",
            ar: "مطار بولكوفو"
        },
        city: {
            en: "Saint Petersburg",
            ar: "سانت بطرسبرغ"
        },
        country: {
            en: "Russia",
            ar: "روسيا"
        }
    },
    HKT: {
        code: "HKT",
        name: {
            en: "Phuket International Airport",
            ar: "مطار بوكيت الدولي"
        },
        city: {
            en: "Phuket",
            ar: "بوكيت"
        },
        country: {
            en: "Thailand",
            ar: "تايلاند"
        }
    },
    DME: {
        code: "DME",
        name: {
            en: "Domodedovo International Airport",
            ar: "مطار دوموديدوفو الدولي"
        },
        city: {
            en: "Moscow",
            ar: "موسكو"
        },
        country: {
            en: "Russia",
            ar: "روسيا"
        }
    },
    SVO: {
        code: "SVO",
        name: {
            en: "Sheremetyevo International Airport",
            ar: "مطار شيريميتييفو الدولي"
        },
        city: {
            en: "Moscow",
            ar: "موسكو"
        },
        country: {
            en: "Russia",
            ar: "روسيا"
        }
    },
    VKO: {
        code: "VKO",
        name: {
            en: "Vnukovo International Airport",
            ar: "مطار فنوكوفو الدولي"
        },
        city: {
            en: "Moscow",
            ar: "موسكو"
        },
        country: {
            en: "Russia",
            ar: "روسيا"
        }
    },
    AER: {
        code: "AER",
        name: {
            en: "Sochi International Airport",
            ar: "مطار سوتشي الدولي"
        },
        city: {
            en: "Sochi",
            ar: "سوتشي"
        },
        country: {
            en: "Russia",
            ar: "روسيا"
        }
    },
    KZN: {
        code: "KZN",
        name: {
            en: "Kazan International Airport",
            ar: "مطار قازان الدولي"
        },
        city: {
            en: "Kazan",
            ar: "قازان"
        },
        country: {
            en: "Russia",
            ar: "روسيا"
        }
    },
    BKK: {
        code: "BKK",
        name: {
            en: "Suvarnabhumi Airport",
            ar: "مطار سوفارنابومي"
        },
        city: {
            en: "Bangkok",
            ar: "بانكوك"
        },
        country: {
            en: "Thailand",
            ar: "تايلاند"
        }
    },
    DMK: {
        code: "DMK",
        name: {
            en: "Don Mueang International Airport",
            ar: "مطار دون مويآنج الدولي"
        },
        city: {
            en: "Bangkok",
            ar: "بانكوك"
        },
        country: {
            en: "Thailand",
            ar: "تايلاند"
        }
    },
    CNX: {
        code: "CNX",
        name: {
            en: "Chiang Mai International Airport",
            ar: "مطار شيانغ ماي الدولي"
        },
        city: {
            en: "Chiang Mai",
            ar: "تشيانغ ماي"
        },
        country: {
            en: "Thailand",
            ar: "تايلاند"
        }
    },
    USM: {
        code: "USM",
        name: {
            en: "Koh Samui Airport",
            ar: "مطار كوه ساموي"
        },
        city: {
            en: "Koh Samui",
            ar: "كوه ساموي"
        },
        country: {
            en: "Thailand",
            ar: "تايلاند"
        }
    },
    JFK: {
        code: "JFK",
        name: {
            en: "John F. Kennedy International Airport",
            ar: "مطار جون إف كينيدي الدولي"
        },
        city: {
            en: "New York",
            ar: "نيويورك"
        },
        country: {
            en: "USA",
            ar: "الولايات المتحدة"
        }
    },
    LAX: {
        code: "LAX",
        name: {
            en: "Los Angeles International Airport",
            ar: "مطار لوس أنجلوس الدولي"
        },
        city: {
            en: "Los Angeles",
            ar: "لوس أنجلوس"
        },
        country: {
            en: "USA",
            ar: "الولايات المتحدة"
        }
    },
    LHR: {
        code: "LHR",
        name: {
            en: "Heathrow Airport",
            ar: "مطار هيثرو"
        },
        city: {
            en: "London",
            ar: "لندن"
        },
        country: {
            en: "UK",
            ar: "المملكة المتحدة"
        }
    },
    CDG: {
        code: "CDG",
        name: {
            en: "Charles de Gaulle Airport",
            ar: "مطار شارل ديغول"
        },
        city: {
            en: "Paris",
            ar: "باريس"
        },
        country: {
            en: "France",
            ar: "فرنسا"
        }
    },
    DXB: {
        code: "DXB",
        name: {
            en: "Dubai International Airport",
            ar: "مطار دبي الدولي"
        },
        city: {
            en: "Dubai",
            ar: "دبي"
        },
        country: {
            en: "UAE",
            ar: "الإمارات العربية المتحدة"
        }
    },
    SIN: {
        code: "SIN",
        name: {
            en: "Changi Airport",
            ar: "مطار شانغي"
        },
        city: {
            en: "Singapore",
            ar: "سنغافورة"
        },
        country: {
            en: "Singapore",
            ar: "سنغافورة"
        }
    },
    ICN: {
        code: "ICN",
        name: {
            en: "Incheon International Airport",
            ar: "مطار إنتشون الدولي"
        },
        city: {
            en: "Seoul",
            ar: "سيول"
        },
        country: {
            en: "South Korea",
            ar: "كوريا الجنوبية"
        }
    },
    HND: {
        code: "HND",
        name: {
            en: "Haneda Airport",
            ar: "مطار هانيدا"
        },
        city: {
            en: "Tokyo",
            ar: "طوكيو"
        },
        country: {
            en: "Japan",
            ar: "اليابان"
        }
    },
    FRA: {
        code: "FRA",
        name: {
            en: "Frankfurt Airport",
            ar: "مطار فرانكفورت"
        },
        city: {
            en: "Frankfurt",
            ar: "فرانكفورت"
        },
        country: {
            en: "Germany",
            ar: "ألمانيا"
        }
    },
    IST: {
        code: "IST",
        name: {
            en: "Istanbul Airport",
            ar: "مطار إسطنبول"
        },
        city: {
            en: "Istanbul",
            ar: "إسطنبول"
        },
        country: {
            en: "Turkey",
            ar: "تركيا"
        }
    },
    AMS: {
        code: "AMS",
        name: {
            en: "Amsterdam Schiphol Airport",
            ar: "مطار أمستردام سخيبول"
        },
        city: {
            en: "Amsterdam",
            ar: "أمستردام"
        },
        country: {
            en: "Netherlands",
            ar: "هولندا"
        }
    },
    FCO: {
        code: "FCO",
        name: {
            en: "Leonardo da Vinci-Fiumicino Airport",
            ar: "مطار ليوناردو دا فينشي-فيوميتشينو"
        },
        city: {
            en: "Rome",
            ar: "روما"
        },
        country: {
            en: "Italy",
            ar: "إيطاليا"
        }
    },
    MAD: {
        code: "MAD",
        name: {
            en: "Adolfo Suárez Madrid–Barajas Airport",
            ar: "مطار مدريد-باراخاس"
        },
        city: {
            en: "Madrid",
            ar: "مدريد"
        },
        country: {
            en: "Spain",
            ar: "إسبانيا"
        }
    },
    BCN: {
        code: "BCN",
        name: {
            en: "Barcelona-El Prat Airport",
            ar: "مطار برشلونة-إل برات"
        },
        city: {
            en: "Barcelona",
            ar: "برشلونة"
        },
        country: {
            en: "Spain",
            ar: "إسبانيا"
        }
    },
    MUC: {
        code: "MUC",
        name: {
            en: "Munich Airport",
            ar: "مطار ميونخ"
        },
        city: {
            en: "Munich",
            ar: "ميونخ"
        },
        country: {
            en: "Germany",
            ar: "ألمانيا"
        }
    },
    ZRH: {
        code: "ZRH",
        name: {
            en: "Zurich Airport",
            ar: "مطار زيورخ"
        },
        city: {
            en: "Zurich",
            ar: "زيورخ"
        },
        country: {
            en: "Switzerland",
            ar: "سويسرا"
        }
    },
    VIE: {
        code: "VIE",
        name: {
            en: "Vienna International Airport",
            ar: "مطار فيينا الدولي"
        },
        city: {
            en: "Vienna",
            ar: "فيينا"
        },
        country: {
            en: "Austria",
            ar: "النمسا"
        }
    },
    CPH: {
        code: "CPH",
        name: {
            en: "Copenhagen Airport",
            ar: "مطار كوبنهاغن"
        },
        city: {
            en: "Copenhagen",
            ar: "كوبنهاغن"
        },
        country: {
            en: "Denmark",
            ar: "الدانمارك"
        }
    },
    OSL: {
        code: "OSL",
        name: {
            en: "Oslo Gardermoen Airport",
            ar: "مطار أوسلو-غاردرموين"
        },
        city: {
            en: "Oslo",
            ar: "أوسلو"
        },
        country: {
            en: "Norway",
            ar: "النرويج"
        }
    },
    HEL: {
        code: "HEL",
        name: {
            en: "Helsinki Airport",
            ar: "مطار هلسنكي"
        },
        city: {
            en: "Helsinki",
            ar: "هلسنكي"
        },
        country: {
            en: "Finland",
            ar: "فنلندا"
        }
    },
    // Additional airports can be added here
};

export const AIRPORTSARRAY = Object.values(AIRPORTS);

export const getAirportInfo = (code: string): AirportInfo => {
    return AIRPORTS[code] || {
      code,
      name: {
        en: `${code} Airport`,
        ar: `مطار ${code}`
      },
      city: {
        en: code,
        ar: `مدينة ${code}`
      },
      country: "Unknown"
    };
  };