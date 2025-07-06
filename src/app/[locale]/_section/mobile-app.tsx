
// Next Intl
import { useTranslations } from "next-intl"
// Icons
import {
    Zap,
    Percent,
    Bell,
    Wallet,
    Plane,
    Apple,
    Play
} from "lucide-react"

const MobileApp = () => {

    const t = useTranslations("MobileApp")

    return (
        <section className="app-section py-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full z-0" />
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* محتوى نصي ومميزات */}
                    <div className="lg:w-1/2 text-white">
                        <div className="mb-2">
                            <span className="bg-white/20 text-gray-600 py-2 px-6 rounded-full text-sm font-bold">{t("Badge")}</span>
                        </div>
                        <h2 className="text-4xl text-gray-900 md:text-5xl font-extrabold mb-6 leading-tight">
                            {t("Heading")}
                        </h2>
                        <p className="text-xl text-gray-800 mb-10 max-w-2xl">
                            {t("SubHeading")}
                        </p>
                        {/* مميزات التطبيق */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="bg-gray-800/5 backdrop-blur-sm p-6 rounded-[22px_0_22px_0] transition-all border border-white/20">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                                    <Zap className="text-2xl text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">{t("Features.One.Title")}</h3>
                                <p className="text-gray-600">{t("Features.One.Text")}</p>
                            </div>
                            <div className="bg-gray-800/5 backdrop-blur-sm p-6 rounded-[22px_0_22px_0] transition-all border border-white/20">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                                    <Percent className="text-2xl text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">{t("Features.Two.Title")}</h3>
                                <p className="text-gray-600">{t("Features.Two.Text")}</p>
                            </div>
                            <div className="bg-gray-800/5 backdrop-blur-sm p-6 rounded-[22px_0_22px_0] transition-all border border-white/20">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-4">
                                    <Bell className="text-2xl text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">{t("Features.Three.Title")}</h3>
                                <p className="text-gray-600">{t("Features.Three.Text")}</p>
                            </div>
                            <div className="bg-gray-800/5 backdrop-blur-sm p-6 rounded-[22px_0_22px_0] transition-all border border-white/20">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                                    <Wallet className="text-2xl text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">{t("Features.Four.Title")}</h3>
                                <p className="text-gray-600">{t("Features.Four.Text")}</p>
                            </div>
                        </div>
                        {/* روابط التحميل */}
                        <div className="flex flex-wrap items-center gap-4 mb-10">
                            <a href="#" className="bg-black hover:bg-gray-900 transition-all duration-300 py-3 px-6 rounded-xl flex items-center gap-3 shadow-lg">
                                <Apple className="text-3xl text-white" />
                                <div>
                                    <span className="text-gray-300 text-xs block">{t("DownloadButton")}</span>
                                    <span className="text-white font-bold text-lg">App Store</span>
                                </div>
                            </a>
                            <a href="#" className="bg-black hover:bg-gray-900 transition-all duration-300 py-3 px-6 rounded-xl flex items-center gap-3 shadow-lg">
                                <Play className="text-2xl text-green-400" />
                                <div>
                                    <span className="text-gray-300 text-xs block">{t("DownloadButton")}</span>
                                    <span className="text-white font-bold text-lg">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* قسم الصور ورمز الاستجابة السريع */}
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
                                        <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-white font-medium">{t("mobile.Card.Title")}</span>
                                                <span className="text-yellow-300">★ 4.8</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-blue-100">
                                                <span>{t("mobile.Card.Date")}</span>
                                                <span className="font-bold">{t("mobile.Card.Price")}</span>
                                            </div>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-white font-medium">{t("mobile.Card2.Title")}</span>
                                                <span className="text-yellow-300">★ 4.9</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-blue-100">
                                                <span>{t("mobile.Card2.Date")}</span>
                                                <span className="font-bold">{t("mobile.Card2.Price")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48">
                                {/* رمز الاستجابة السريع */}
                                <div className="qr-container bg-white p-5 rounded-2xl shadow-app flex flex-col items-center">
                                    <div className="relative z-10 text-center flex flex-col items-center">
                                        <div className="qr-code w-36 h-36 bg-white p-2 rounded-lg mx-auto mb-3">

                                        </div>

                                        <p className="text-sm text-gray-700 font-semibold">{t("mobile.ReadQrCode")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-20 text-center text-white/80">
                            <p className="text-lg text-gray-600">{t("AvailableNow")}</p>
                            <div className="flex justify-center gap-6 mt-4">
                                <i className="fab fa-android text-3xl text-green-400" />
                                <i className="fab fa-apple text-3xl" />
                                <i className="fab fa-windows text-3xl text-blue-400" />
                                <i className="fab fa-huawei text-3xl text-red-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* عناصر زخرفية */}
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-2xl animate-pulse" />
            <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-accent/20 blur-2xl animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-secondary/20 blur-xl animate-pulse" />
        </section>
    )
}

export default MobileApp;