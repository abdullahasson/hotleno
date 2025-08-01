"use client";

import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import SwitchLanguages from "../common/switch-languages";
import { Menu, X } from "lucide-react"; 
import { useState, useEffect } from "react"; 
// Logo
import LogoEn from '../../../public/logo-en.png'
import LogoAr from '../../../public/logo-ar.png'

const Header = () => {
  const t = useTranslations("Header");
  const lang = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  // Close menu when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: t("Home") },
    { href: "/flights", label: t("Flight") },
    { href: "/hotels", label: t("Hotel") },
    { href: "/mobile-app", label: t("App") },
  ];

  const isActive = (href: string) => {
    const fullPath = `/${lang}${href}`;
    if (href === "/") {
      return pathname === fullPath || pathname === `/${lang}`;
    }
    return pathname.startsWith(fullPath);
  };

  return (
    <header className="transition-all duration-400 bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 xl:px-0 max-w-7xl">
        <div className="navbar flex justify-between items-center py-4 transition-all duration-400">
          <Link href={`/${lang}/`} className="logo flex items-center gap-2 text-2xl font-extrabold text-darker">
            <Image src={lang == 'ar' ? LogoAr : LogoEn} alt="EnLogo" className="w-32"/>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="nav-links hidden lg:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className={`
                  nav-link relative py-2 font-medium text-lg
                  ${isActive(link.href) 
                    ? "text-[var(--color-primary)] font-bold" 
                    : "text-gray-600 hover:text-gray-900"}
                `}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-primary)]"></span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <SwitchLanguages scrolled={true} />
          
            <Link className="hidden sm:inline text-sm border border-white rounded-full py-2 px-3 transition-all hover:scale-105" href={`/${lang}/login`}>
              تسجيل الدخول
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-2xl text-gray-700 z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      <div className={`
        fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex flex-col h-full pt-20 px-6">
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className={`
                  text-xl py-3 px-4 rounded-lg transition-all
                  ${isActive(link.href) 
                    ? "text-[var(--color-primary)] font-bold bg-blue-50" 
                    : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pb-10 pt-8 border-t border-gray-200">
            <Link 
              className="block text-center w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              href={`/${lang}/login`}
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;