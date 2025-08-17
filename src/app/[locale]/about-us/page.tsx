// src/app/about-us/page.tsx
'use client';

import { motion } from 'framer-motion';
import Header from '@/components/common/header';
import Footer from "@/components/common/footer"
import {
    useTranslations
} from "next-intl"
import { Globe, ShieldCheck, Rocket, BadgePercent, LayoutTemplate, HeartHandshake } from 'lucide-react';

export default function AboutUsPage() {
    const t = useTranslations('about')

    // Company registration statement with styled company name
    const statement = t('registration.statement');
    const companyName = "HOTLENO LTD";
    const statementParts = statement.split(companyName);

    // Values configuration
    const valueConfig = [
        { key: 'transparency', icon: ShieldCheck },
        { key: 'trust', icon: HeartHandshake },
        { key: 'innovation', icon: Rocket }
    ];

    return (
        <>
            <Header />
            <div className="min-h-screen">
                {/* Hero Section */}
                <div className="relative py-20 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-5"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white rounded-full p-4 shadow-xl mb-8"
                            >
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-24 h-24 rounded-full flex items-center justify-center">
                                    <span className="text-white text-3xl font-bold">H</span>
                                </div>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-4xl md:text-6xl font-bold text-center text-gray-900 mb-4"
                            >
                                {t('heroTitle')}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-xl text-gray-600 max-w-3xl text-center mb-12"
                            >
                                {t('heroSubtitle')}
                            </motion.p>
                        </motion.div>
                    </div>
                </div>

                {/* Company Info Section */}
                <div className="py-16 px-4 bg-transparent">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                            >
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <ShieldCheck className="text-blue-600 w-8 h-8" />
                                        <h2 className="text-2xl font-bold text-gray-900">{t('registration.title')}</h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="border-l-4 border-blue-500 pl-4 py-2">
                                            <h3 className="text-lg font-semibold text-gray-800">{t('registration.certificate')}</h3>
                                            <p className="text-gray-600">{t('registration.subtitle')}</p>
                                        </div>

                                        <div className="bg-blue-50 rounded-xl p-5">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">{t('registration.companyNumber')}</p>
                                                    <p className="font-bold text-blue-700">16587327</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">{t('registration.incorporationDate')}</p>
                                                    <p className="font-bold text-blue-700">{t('registration.date')}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 leading-relaxed">
                                            {statementParts[0]}
                                            <span className="font-bold text-blue-700">{companyName}</span>
                                            {statementParts[1]}
                                        </p>

                                        <div className="flex items-center gap-2 text-gray-500">
                                            <LayoutTemplate className="w-5 h-5" />
                                            <p className="text-sm">{t('registration.location')}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('story.title')}</h2>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    {t('story.paragraph1')}
                                </p>
                                <p className="text-gray-700 mb-8 leading-relaxed">
                                    {t('story.paragraph2')}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <div className="bg-blue-100 rounded-full px-4 py-2 flex items-center gap-2">
                                        <Globe className="text-blue-600 w-5 h-5" />
                                        <span className="font-medium">200+ {t('stats.countries')}</span>
                                    </div>
                                    <div className="bg-blue-100 rounded-full px-4 py-2 flex items-center gap-2">
                                        <BadgePercent className="text-blue-600 w-5 h-5" />
                                        <span className="font-medium">Best Price Guarantee</span>
                                    </div>
                                    <div className="bg-blue-100 rounded-full px-4 py-2 flex items-center gap-2">
                                        <HeartHandshake className="text-blue-600 w-5 h-5" />
                                        <span className="font-medium">24/7 {t('stats.support')}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="py-16  px-4">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('values.title')}</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {t('values.subtitle')}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {valueConfig.map(({key, icon: Icon}) => (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: valueConfig.indexOf({key, icon: Icon}) * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all"
                                >
                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                                        <Icon className="text-blue-600 w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {t(`values.${key}.title`)}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t(`values.${key}.description`)}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('mission.title')}</h2>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    {t('mission.paragraph1')}
                                </p>
                                <p className="text-gray-700 mb-8 leading-relaxed">
                                    {t('mission.paragraph2')}
                                </p>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <Rocket className="w-10 h-10" />
                                        <h3 className="text-2xl font-bold">{t('mission.ctaTitle')}</h3>
                                    </div>
                                    <p>
                                        {t('mission.ctaDescription')}
                                    </p>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                <div className="relative rounded-xl overflow-hidden h-64">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-70"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                                            <ShieldCheck className="w-12 h-12 mx-auto text-white mb-4" />
                                            <h3 className="text-xl font-bold text-white">Trusted Platform</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="relative rounded-xl overflow-hidden h-32">
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white font-bold">Global Reach</span>
                                        </div>
                                    </div>
                                    <div className="relative rounded-xl overflow-hidden h-32">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white font-bold">Competitive Prices</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                        >
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <div className="text-4xl font-bold text-blue-600 mb-2">1M+</div>
                                <div className="text-gray-600">{t('stats.properties')}</div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
                                <div className="text-gray-600">{t('stats.countries')}</div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                                <div className="text-gray-600">{t('stats.support')}</div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md">
                                <div className="text-4xl font-bold text-blue-600 mb-2">99.8%</div>
                                <div className="text-gray-600">{t('stats.satisfaction')}</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-20 px-4 bg-gradient-to-r from-blue-300 to-blue-400">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                {t('cta.title')}
                            </h2>
                            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                                {t('cta.subtitle')}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                {t('cta.button')}
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}