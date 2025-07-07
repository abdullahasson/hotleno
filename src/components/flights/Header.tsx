"use client";

// Next 
import Link from "next/link"
import { usePathname } from "next/navigation"; // Added usePathname
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
    const pathname = usePathname(); // Get current pathname

    // Navigation links configuration
    const navLinks = [
        { href: "/", label: t("Home") },
        { href: "/flights", label: t("Flight") },
        { href: "/hotels", label: t("Hotel") },
        { href: "/mobile-app", label: t("App") },
    ];

    // Function to determine if a link is active
    const isActive = (href: string) => {
        // Construct full path with language prefix
        const fullPath = `/${lang}${href}`;
        
        // Handle home route separately
        if (href === "/") {
            return pathname === fullPath || pathname === `/${lang}`;
        }
        
        // For other routes, check if pathname starts with the full path
        return pathname.startsWith(fullPath);
    };

    return (
        <header className="transition-all duration-400 bg-white shadow-md border-b border-gray-200">
            <div className="container mx-auto px-4 xl:px-0 max-w-7xl">
                <div className="navbar flex justify-between items-center py-4 transition-all duration-400">
                    <Link href={`/${lang}/`} className="logo flex items-center gap-2 text-2xl font-extrabold text-darker transition-all duration-400">
                        <Plane className="text-[var(--color-primary)] transition-all duration-400" />
                        <span>Hotleno</span>
                    </Link>
                    
                    <div className="nav-links hidden lg:flex gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={`/${lang}${link.href}`}
                                className={`
                                    nav-link relative py-2 font-medium text-lg transition-all duration-400
                                    ${isActive(link.href) 
                                        ? "text-[var(--color-primary)] font-bold" 
                                        : "text-gray-600 hover:text-gray-900"}
                                `}
                            >
                                {link.label}
                                {/* Active indicator bar */}
                                {isActive(link.href) && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-primary)]"></span>
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">
                        <SwitchLanguages scrolled={true} />
                    
                        <Link className="text-sm border border-white rounded-full py-2 px-3 transition-all hover:scale-105" href="/sign-in">
                            تسجيل الدخول
                        </Link>

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