"use client";

// Next 
import Link from "next/link"
// React
import { useState , useEffect } from "react"
// Next Intl
import { useTranslations , useLocale } from "next-intl";
// Components
import SwitchLanguages from "./switch-languages"
// Icons
import { Plane } from "lucide-react"

interface HeaderProps {
    initialScrolled?: boolean;
};

const Header = ({ initialScrolled = false }: HeaderProps) => {
    // Translate
    const t = useTranslations("Header");
    const lang = useLocale();

    // State
    const [scrolled, setScrolled] = useState(initialScrolled);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <header className={`
            fixed top-0 left-0 right-0 z-50 transition-all duration-400
            ${scrolled ? "bg-white shadow-md" : "bg-transparent text-white"}
        `}>
            <div className="container mx-auto px-4 xl:px-0 max-w-7xl">
                <div className="navbar flex justify-between items-center py-4 transition-all duration-400">
                    <Link href={`/${lang}/`} className="logo flex items-center gap-2 text-2xl font-extrabold text-darker transition-all duration-400">
                        <Plane className="text-[var(--color-primary)] transition-all duration-400" />
                        <span>Hotleno</span>
                    </Link>
                    
                    <div className="nav-links hidden lg:flex gap-8">
                    </div>

                    <div className="flex items-center gap-6">
                        {/* تبديل اللغة - نسخة سطح المكتب */}
                        <SwitchLanguages scrolled={scrolled} />
                    
                        <Link className="text-sm border border-white rounded-full py-2 px-3 transition-all hover:scale-105" href="/sign-in">
                            {t('Login')}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;