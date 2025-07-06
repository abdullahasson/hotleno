"use client";

// Next 
import Link from "next/link"
// Next Intl
import { useTranslations , useLocale } from "next-intl";
// Components
import SwitchLanguages from "../common/switch-languages"
// Icons
import { Plane , Hamburger } from "lucide-react"


const Header = () => {
    // Translate
    const t = useTranslations("Header");
    const lang = useLocale();

    // Navigation links configuration
    const navLinks = [
        { href: "/", path: '/', label: t("Home") },
        { href: "/flights", path: '/flights', label: t("Flight") },
        { href: "/hotels", path: '/hotels', label: t("Hotel") },
        { href: "/mobile-app", path: '/mobile-app', label: t("App") },
    ];

    return (
        <header className={`
            transition-all duration-400 bg-white shadow-md border-b border-gray-200
        `}>
            <div className="container mx-auto px-4 xl:px-0 max-w-7xl">
                <div className="navbar flex justify-between items-center py-4 transition-all duration-400">
                    <Link href={`/${lang}/`} className="logo flex items-center gap-2 text-2xl font-extrabold text-darker transition-all duration-400">
                        <Plane className="text-[var(--color-primary)] transition-all duration-400" />
                        <span>{t("Logo")}</span>
                    </Link>
                    
                    <div className="nav-links hidden lg:flex gap-8">
                        {navLinks.map((link) => {
                            return (
                                <Link
                                    key={link.path}
                                    href={`/${lang}${link.href}`}
                                    className={`
                                        nav-link 
                                        ${false ? "active" : ""}
                                        relative py-2 font-medium text-lg transition-all duration-400 active
                                    `}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-6">
                        {/* تبديل اللغة - نسخة سطح المكتب */}
                        <SwitchLanguages scrolled={true} />
                    
                        <Link className="text-sm border border-white rounded-full py-2 px-3 transition-all hover:scale-105" href="/sign-in">
                            تسجيل الدخول
                        </Link>

                        {/* قائمة الهامبرجر للجوال */}
                        <button className="md:hidden text-2xl text-gray-700">
                            <Hamburger />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;