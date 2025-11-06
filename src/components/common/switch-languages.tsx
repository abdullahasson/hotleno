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
import sa from "../../../public/sa.svg"
import gb from "../../../public/gb.svg"
// Icons 
import { ChevronDown } from "lucide-react"

const SwitchLanguages = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lang = useLocale() as "ar" | "en"
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
        "ar": "AR",
        "en": "EN",
    }

    const handleActiveLanguageImage = {
        "ar": sa,
        "en": gb
    }

    return (
        <div className="desktop-language-switcher language-switcher">
            <div className="flex items-center gap-2" onClick={() => setOpen(!open)}>
                <Image src={handleActiveLanguageImage[lang]} className="language-flag" alt={handleActiveLanguageButttonText[lang]} />
                <span className={`text-gray-700 font-medium`}>
                    {handleActiveLanguageButttonText[lang]}
                </span>
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
                </div>
            )}
        </div>
    )
}

export default SwitchLanguages;