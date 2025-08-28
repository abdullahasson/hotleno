import Link from 'next/link'
// Next Intl
import { useTranslations } from "next-intl"


export default function FooterSection() {

    const t = useTranslations('components.footer')

    const links = [
        { title: t('nav.nav1'), href: '#home' },
        { title: t('nav.nav2'), href: '#services' },
        { title: t('nav.nav3'), href: '#about' },
        { title: t('nav.nav4'), href: '#testimonials' },
        { title: t('nav.nav5'), href: '#faqs' },
        { title: t('nav.nav6'), href: '#contact' },
    ]

    return (
        <footer className="border-b bg-white py-12 dark:bg-transparent">
            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-wrap justify-between gap-6">
                    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
                        © {new Date().getFullYear()} {' '}
                        {t('copyright')}
                    </span>
                    <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-muted-foreground hover:text-primary block duration-150">
                                <span>{link.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
