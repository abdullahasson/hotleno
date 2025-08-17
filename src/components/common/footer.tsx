// Next
import Link from "next/link";
// Next Intl
import { useTranslations , useLocale } from "next-intl"
// Icons 
import {
    Facebook ,
    Twitter ,
    Instagram ,
    Youtube ,
    ChevronLeft ,
    ChevronRight,
    Map ,
    Phone ,
    MessageCircleReply
} from "lucide-react"

const Footer = () => {

    const t = useTranslations("Footer")
    const lang = useLocale()

    return (
        <footer className="relative pt-22 pb-10 bg-[var(--color-darker)] text-white overflow-hidden">
            <div className="footer-wave" />
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                    <div className="footer-col">
                        <h3 className="text-xl mb-6 pb-3 relative">{t("AboutUs.Title")}</h3>
                        <p className="mb-5">{t("AboutUs.Text")}</p>

                        <div className="social-links flex gap-4">
                            <Link href={`/${lang}/`} className="social-link w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white text-lg transition-all duration-400">
                                <Facebook />
                            </Link>
                            <Link href={`/${lang}/`} className="social-link w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white text-lg transition-all duration-400">
                                <Twitter />
                            </Link>
                            <Link href={`/${lang}/`} className="social-link w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white text-lg transition-all duration-400">
                                <Instagram />
                            </Link>
                            <Link href={`/${lang}/`} className="social-link w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white text-lg transition-all duration-400">
                                <Youtube />
                            </Link>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h3 className="text-xl mb-6 pb-3 relative">{t("QuickLinks.Title")}</h3>
                        <ul className="footer-links">
                            <li className={`mb-4 ${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    {lang === 'ar' ? 
                                        <ChevronLeft className="text-[var(--color-accent))]" /> : 
                                        <ChevronRight className="text-[var(--color-accent))]" />}
                                    {t("QuickLinks.Home")}
                                </Link>
                            </li>
                            <li className={`mb-4 ${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/about-us`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    
                                    {lang === 'ar' ? 
                                        <ChevronLeft className="text-[var(--color-accent))]" /> : 
                                        <ChevronRight className="text-[var(--color-accent))]" />}
                                    {t("QuickLinks.Flight")}
                                </Link>
                            </li>
                            <li className={`mb-4 ${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/hotels`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    
                                    {lang === 'ar' ? 
                                        <ChevronLeft className="text-[var(--color-accent))]" /> : 
                                        <ChevronRight className="text-[var(--color-accent))]" />}
                                    {t("QuickLinks.Hotel")}
                                </Link>
                            </li>
                            <li className={`mb-4 ${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    
                                    {lang === 'ar' ? 
                                        <ChevronLeft className="text-[var(--color-accent))]" /> : 
                                        <ChevronRight className="text-[var(--color-accent))]" />}
                                    {t("QuickLinks.FeaturedDeals")}
                                </Link>
                            </li>
                            <li className={`${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/mobile-app`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    
                                    {lang === 'ar' ? 
                                        <ChevronLeft className="text-[var(--color-accent))]" /> : 
                                        <ChevronRight className="text-[var(--color-accent))]" />}
                                    {t("QuickLinks.Contact")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3 className="text-xl mb-6 pb-3 relative">{t("PopularDestinations.Title")}</h3>
                        <ul className="footer-links">
                            <li className={`mb-4 ${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <Map className="text-[var(--color-accent)]" />
                                    {t("PopularDestinations.c1")}
                                </Link>
                            </li>
                            <li className={`mb-4 ${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <Map className="text-[var(--color-accent)]" />
                                    {t("PopularDestinations.c2")}
                                </Link>
                            </li>
                            <li className={`mb-4 ${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <Map className="text-[var(--color-accent)]" />
                                    {t("PopularDestinations.c3")}
                                </Link>
                            </li>
                            <li className={`mb-4 ${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <Map className="text-[var(--color-accent)]" />
                                    {t("PopularDestinations.c4")}
                                </Link>
                            </li>
                            <li className={`${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <Map className="text-[var(--color-accent)]" />
                                    {t("PopularDestinations.c5")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3 className="text-xl mb-6 pb-3 relative">{t("ContactUs.Title")}</h3>
                        <ul className="footer-links">
                            <li className={`mb-4 ${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <MessageCircleReply className="text-[var(--color-accent)]" />
                                    info@hotleno.com
                                </Link>
                            </li>
                            <li className={`mb-4 ${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <Phone className="text-[var(--color-accent)]" />
                                    +44 123 456 789
                                </Link>
                            </li>
                            <li className={`${lang == "ar" ? "hover:-translate-x-2" : "hover:translate-x-2"}`}>
                                <Link href={`/${lang}/`} className="text-slate-300 flex items-center gap-2 transition-all duration-400">
                                    <Map className="text-[var(--color-accent)]" />
                                    {t("ContactUs.Location")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="copyright text-center pt-8 border-t border-white/10 text-slate-400">
                    <p>{t("BootomFooter")}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;