// Next Intl
import { useTranslations } from "next-intl";
// Icons
import { Zap, Percent, Bell, Wallet, Plane, Apple, Play } from "lucide-react";

// Types
interface FeatureCardProps {
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  title: string;
  description: string;
}

interface AppStoreButtonProps {
  icon: React.ReactNode;
  label: string;
  subLabel: string;
  iconColor?: string;
}

interface FlightCardProps {
  title: string;
  rating: string;
  date: string;
  price: string;
}

// Constants
const FEATURES: Omit<FeatureCardProps, 'title' | 'description'>[] = [
  {
    icon: <Zap className="text-2xl text-white" />,
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-500"
  },
  {
    icon: <Percent className="text-2xl text-white" />,
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-500"
  },
  {
    icon: <Bell className="text-2xl text-white" />,
    gradientFrom: "from-purple-500",
    gradientTo: "to-indigo-600"
  },
  {
    icon: <Wallet className="text-2xl text-white" />,
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-500"
  }
];

const PLATFORM_ICONS = [
  { icon: <i className="fab fa-android text-3xl text-green-400" />, key: "android" },
  { icon: <i className="fab fa-apple text-3xl" />, key: "apple" },
  { icon: <i className="fab fa-windows text-3xl text-blue-400" />, key: "windows" },
  { icon: <i className="fab fa-huawei text-3xl text-red-400" />, key: "huawei" }
];

// Components
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  gradientFrom,
  gradientTo,
  title,
  description
}) => (
  <div className="bg-gray-800/5 backdrop-blur-sm p-6 rounded-[22px_0_22px_0] transition-all border border-white/20 hover:border-white/40">
    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-700 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const AppStoreButton: React.FC<AppStoreButtonProps> = ({
  icon,
  label,
  subLabel,
  iconColor
}) => (
  <a
    href="#"
    className="bg-black hover:bg-gray-900 transition-all duration-300 py-3 px-6 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl"
  >
    <span className={iconColor}>{icon}</span>
    <div>
      <span className="text-gray-300 text-xs block">{subLabel}</span>
      <span className="text-white font-bold text-lg">{label}</span>
    </div>
  </a>
);

const FlightCard: React.FC<FlightCardProps> = ({ title, rating, date, price }) => (
  <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-4 last:mb-0">
    <div className="flex justify-between items-center mb-2">
      <span className="text-white font-medium">{title}</span>
      <span className="text-yellow-300">{rating}</span>
    </div>
    <div className="flex justify-between text-sm text-blue-100">
      <span>{date}</span>
      <span className="font-bold">{price}</span>
    </div>
  </div>
);

const MobileApp = () => {
  const t = useTranslations("MobileApp");

  const featureCards = FEATURES.map((feature, index) => ({
    ...feature,
    title: t(`Features.${["One", "Two", "Three", "Four"][index]}.Title`),
    description: t(`Features.${["One", "Two", "Three", "Four"][index]}.Text`)
  }));

  const flightCards = [
    {
      title: t("mobile.Card.Title"),
      rating: "★ 4.8",
      date: t("mobile.Card.Date"),
      price: t("mobile.Card.Price")
    },
    {
      title: t("mobile.Card2.Title"),
      rating: "★ 4.9",
      date: t("mobile.Card2.Date"),
      price: t("mobile.Card2.Price")
    }
  ];

  return (
    <section className="app-section py-10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-accent/20 blur-2xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-secondary/20 blur-xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center w-full gap-12">
          {/* Text content and features */}
          <div className="lg:w-1/2 text-white text-center">
            <div className="mb-2">
              <span className="bg-white/20 text-gray-600 py-2 px-6 rounded-full text-sm font-bold">
                {t("Badge")}
              </span>
            </div>

            <h2 className="text-4xl text-gray-900 md:text-5xl font-extrabold mb-6 leading-tight">
              {t("Heading")}
            </h2>

            <p className="text-xl text-gray-800 mb-10 max-w-2xl">
              {t("SubHeading")}
            </p>
          </div>

          {/* App features grid */}
          <div className="flex justify-center items-center gap-6 mb-10 ">

            <div className="flex flex-col gap-6">
              {featureCards.slice(2, 4).map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
            {/* Phone mockup and QR code */}
            <div className="lg:w-1/2 flex flex-col items-center">
              <div className="relative animate-float">
                <div className="app-phone w-72 mx-auto bg-gray-800 rounded-[40px] p-4 border-8 border-gray-900 shadow-2xl">
                  <div className="h-6 bg-gray-900 rounded-t-2xl mx-auto -mt-4 w-32" />
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-700 rounded-2xl h-96 flex flex-col justify-center items-center p-4">
                    <div className="text-center mb-6">
                      <Plane className="text-5xl text-white mb-3" />
                      <h3 className="text-white text-2xl font-bold">{t("mobile.Heading")}</h3>
                      <p className="text-blue-100">{t("mobile.Text")}</p>
                    </div>
                    <div className="w-full max-w-xs">
                      {flightCards.map((card, index) => (
                        <FlightCard key={index} {...card} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* QR code */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48">
                  <div className="qr-container bg-white p-5 rounded-2xl shadow-app flex flex-col items-center">
                    <div className="relative z-10 text-center flex flex-col items-center">
                      <div className="qr-code w-36 h-36 bg-white p-2 rounded-lg mx-auto mb-3" />
                      <p className="text-sm text-gray-700 font-semibold">
                        {t("mobile.ReadQrCode")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform availability */}
              <div className="mt-20 text-center text-white/80">
                <p className="text-lg text-gray-600">{t("AvailableNow")}</p>
                <div className="flex justify-center gap-6 mt-4">
                  {PLATFORM_ICONS.map(({ icon, key }) => (
                    <span key={key}>{icon}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {featureCards.slice(0, 2).map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* Download buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <AppStoreButton
              icon={<Apple className="text-3xl" />}
              label="App Store"
              subLabel={t("DownloadButton")}
            />
            <AppStoreButton
              icon={<Play className="text-2xl" />}
              label="Google Play"
              subLabel={t("DownloadButton")}
              iconColor="text-green-400"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default MobileApp;