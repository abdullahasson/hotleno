"use client";

// Next
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
// Next Intl
import { useLocale } from "next-intl";
// React
import { useState } from "react";
// Images
import sa from "../../../public/sa.png"
import es from "../../../public/es.png"
import tr from "../../../public/tr.png"
import gb from "../../../public/gb.png"
import fr from "../../../public/fr.png"
// Icons 
import { ChevronDown } from "lucide-react"

interface SwitchLanguagesProps {
    scrolled: boolean
}

const SwitchLanguages = ({scrolled} : SwitchLanguagesProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lang = useLocale() as "ar" | "en" | "fr" | "es" | "tr"
    const [open, setOpen] = useState<boolean>(false);

    // Get current query string
    const queryString = searchParams.toString();
    // Preserve query parameters in URL
    const querySuffix = queryString ? `?${queryString}` : "";

    // Extract path segments after language
    const pathSegments = pathname ? pathname.split("/").filter(Boolean) : [];
    const basePath = pathSegments.slice(1).join("/");
    const pathSuffix = basePath ? `/${basePath}` : "";

    const handleActiveLanguageButttonText = {
        "ar": "العربية",
        "en": "English",
        "fr": "Français",
        "es": "Español",
        "tr": "Türkçe"
    }

    const handleActiveLanguageImage = {
        "ar": sa,
        "en": gb,
        "fr": fr,
        "es": es,
        "tr": tr
    }

    return (
        <div className="desktop-language-switcher language-switcher">
            <div className="flex items-center gap-2" onClick={() => setOpen(!open)}>
                <Image src={handleActiveLanguageImage[lang]} className="language-flag" alt={handleActiveLanguageButttonText[lang]} />
                <span className={`${scrolled ? 'text-gray-700' : 'text-white'} font-medium`}>{handleActiveLanguageButttonText[lang]}</span>
                <ChevronDown className="text-xs text-gray-500" />
            </div>
  

            {open && (
                <div className="language-dropdown">
                    <Link 
                        href={`/ar${pathSuffix}${querySuffix}`} 
                        className={`language-item ${lang === "ar" ? "active" : ""}`}
                    >
                        <Image src={sa} className="language-flag" alt="العربية" />
                        <span className="language-name">العربية</span>
                        <span className="language-code">AR</span>
                    </Link>
                    <Link 
                        href={`/en${pathSuffix}${querySuffix}`} 
                        className={`language-item ${lang === "en" ? "active" : ""}`}
                    >
                        <Image src={gb} className="language-flag" alt="English" />
                        <span className="language-name">English</span>
                        <span className="language-code">EN</span>
                    </Link>
                    <Link 
                        href={`/fr${pathSuffix}${querySuffix}`} 
                        className={`language-item ${lang === "fr" ? "active" : ""}`}
                    >
                        <Image src={fr} className="language-flag" alt="Français" />
                        <span className="language-name">Français</span>
                        <span className="language-code">FR</span>
                    </Link>
                    <Link 
                        href={`/es${pathSuffix}${querySuffix}`} 
                        className={`language-item ${lang === "es" ? "active" : ""}`}
                    >
                        <Image src={es} className="language-flag" alt="Español" />
                        <span className="language-name">Español</span>
                        <span className="language-code">ES</span>
                    </Link>
                    <Link 
                        href={`/tr${pathSuffix}${querySuffix}`} 
                        className={`language-item ${lang === "tr" ? "active" : ""}`}
                    >
                        <Image src={tr} className="language-flag" alt="Türkçe" />
                        <span className="language-name">Türkçe</span>
                        <span className="language-code">TR</span>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default SwitchLanguages;