'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronUp, FileText, ArrowUp, BookOpen } from 'lucide-react';
import Header from '@/components/common/header';
import Footer from "@/components/common/footer";
import { useTranslations, useLocale } from "next-intl";

export default function TermsAndConditionsPage() {
    const t = useTranslations('terms');
    const locale = useLocale();
    const [openSection, setOpenSection] = useState<string | null>(null);

    const sections = [
        'introduction',
        'definitions',
        'accountRegistration',
        'bookings',
        'cancellations',
        'intellectualProperty',
        'liability',
        'privacy',
        'changes',
        'governingLaw'
    ];

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const isRTL = locale === 'ar';

    return (
        <>
            <Header />
            <div className={`min-h-screen bg-gradient-to-b from-white to-blue-50 ${isRTL ? 'rtl' : 'ltr'}`}>
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center py-24 px-4 overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    {/* Background SVG Shapes */}
                    <div className="absolute inset-0 z-0 opacity-20">
                        <svg viewBox="0 0 1200 600" className="absolute top-0 left-0 w-full h-full">
                            <path
                                d="M0,0 C200,100 400,50 600,150 C800,250 1000,100 1200,200 L1200,600 L0,600 Z"
                                fill="currentColor"
                                className="text-blue-500"
                            />
                            <circle cx="100" cy="100" r="60" fill="currentColor" className="text-blue-400" />
                            <circle cx="1100" cy="150" r="80" fill="currentColor" className="text-indigo-400" />
                            <circle cx="800" cy="400" r="100" fill="currentColor" className="text-blue-300 opacity-50" />
                            <path
                                d="M300,500 C400,450 500,550 700,500 C900,450 1000,550 1200,500 L1200,600 L0,600 Z"
                                fill="currentColor"
                                className="text-indigo-500 opacity-70"
                            />
                        </svg>
                    </div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                <motion.h1
                                    className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {t('heroTitle')}
                                </motion.h1>

                                <motion.p
                                    className="text-xl max-w-2xl opacity-90 mb-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {t('heroDescription')}
                                </motion.p>

                                <motion.div
                                    className="flex items-center gap-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                        <BookOpen className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-80">{t('lastUpdated')}</p>
                                        <p className="font-semibold text-lg">{t('updateDate')}</p>
                                    </div>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7 }}
                                className="flex justify-center"
                            >
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-white/10 backdrop-blur-sm rounded-2xl rotate-6"></div>
                                    <div className="relative bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="bg-blue-600 rounded-full p-4 mb-6">
                                                <FileText className="w-10 h-10 text-white" />
                                            </div>
                                            <h3 className="font-bold text-2xl mb-4">{t('importantNotice')}</h3>
                                            <p className="text-blue-200">
                                                {t('noticeDescription')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Terms Content */}
                <div className="max-w-7xl mx-auto py-16 px-4 -mt-12">
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="prose prose-lg max-w-none"
                        >
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <FileText className="text-blue-600" />
                                    {t('overviewTitle')}
                                </h2>
                                <p className="text-gray-700 mb-4">
                                    {t('overviewText1')}
                                </p>
                                <p className="text-gray-700">
                                    {t('overviewText2')}
                                </p>
                            </div>

                            <div className="space-y-8">
                                {sections.map((sectionKey) => (
                                    <div key={sectionKey} className="border-b border-gray-200 pb-8">
                                        <button
                                            onClick={() => toggleSection(sectionKey)}
                                            className="w-full flex justify-between items-center text-left py-4"
                                        >
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                {t(`sections.${sectionKey}.title`)}
                                            </h3>
                                            <motion.div
                                                animate={{ rotate: openSection === sectionKey ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronUp className="text-blue-600" />
                                            </motion.div>
                                        </button>

                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: openSection === sectionKey ? 'auto' : 0,
                                                opacity: openSection === sectionKey ? 1 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 pb-2 text-gray-700">
                                                {t.rich(`sections.${sectionKey}.content`, {
                                                    p: (chunks) => <p className="mb-4">{chunks}</p>,
                                                    strong: (chunks) => <strong className="text-gray-900">{chunks}</strong>,
                                                    ul: (chunks) => <ul className="list-disc pl-6 mb-4">{chunks}</ul>,
                                                    li: (chunks) => <li className="mb-2">{chunks}</li>,
                                                    a: (chunks) => (
                                                        <a
                                                            href={t(`sections.${sectionKey}.link`)}
                                                            className="text-blue-600 hover:underline"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {chunks}
                                                        </a>
                                                    )
                                                })}
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 pt-8 border-t border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    {t('acceptanceTitle')}
                                </h3>
                                <p className="text-gray-700 mb-8">
                                    {t('acceptanceText')}
                                </p>

                                <div className="bg-blue-50 rounded-xl p-6">
                                    <p className="text-blue-800 font-medium">
                                        {t('contactText')}{' '}
                                        <a
                                            href={`/${locale}/contact-us`}
                                            className="text-blue-600 font-bold hover:underline"
                                        >
                                            {t('contactLink')}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Back to Top Button */}
                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`fixed ${isRTL ? 'left-8' : 'right-8'} bottom-8 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={t('backToTop')}
                >
                    <ArrowUp className="w-6 h-6" />
                </motion.button>
            </div>
            <Footer />
        </>
    );
}