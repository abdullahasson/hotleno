// src/app/[locale]/contact-us/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Phone, Clock, Send, MessageCircle, Globe, Users } from 'lucide-react';
import Header from '@/components/flights/Header';
import Footer from "@/components/common/footer";
import { useTranslations } from "next-intl";

import { toast } from 'sonner';

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactUsPage() {
    const t = useTranslations('contact');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<FormData>();

    const onSubmit = async () => {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        // In real app: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
        toast(t('form.success'), {
            description: "",
            position: 'top-center',
            style: {
                textAlign: 'start'
            }
        })
        reset();
    };

    const contactInfo = [
        { icon: MapPin, key: 'address' },
        { icon: Phone, key: 'phone' },
        { icon: Mail, key: 'email' },
        { icon: Clock, key: 'hours' }
    ];

    return (
        <>
            <Header />
            <div className="min-h-screen">
                {/* Modern Hero Section */}
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

                    <div className="max-w-7xl relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                        <MessageCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-sm font-semibold tracking-wider uppercase opacity-80">
                                        {t('heroSubtitle')}
                                    </h2>
                                </div>

                                <motion.h1
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
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
                                    className="flex flex-wrap gap-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                                        <Users className="w-5 h-5" />
                                        <div>
                                            <p className="text-sm opacity-80">{t('heroStats.support')}</p>
                                            <p className="font-semibold">24/7</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                                        <Globe className="w-5 h-5" />
                                        <div>
                                            <p className="text-sm opacity-80">{t('heroStats.languages')}</p>
                                            <p className="font-semibold">15+</p>
                                        </div>
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
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-blue-600 rounded-full p-2">
                                                    <Phone className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg">{t('heroContact.title')}</h3>
                                                    <p className="text-blue-200 font-medium">+44 20 1234 5678</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="bg-blue-600 rounded-full p-2">
                                                    <Mail className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg">{t('heroContact.email')}</h3>
                                                    <p className="text-blue-200 font-medium">support@hotleno.com</p>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-white/10">
                                                <p className="text-sm opacity-80">{t('heroContact.description')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>


                </section>

                {/* Contact Content */}
                <div className="max-w-7xl mx-auto py-16 px-4">
                    {/* Contact Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                    >
                        {contactInfo.map(({ icon: Icon, key }) => (
                            <motion.div
                                key={key}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border border-blue-100"
                            >
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                                    <Icon className="text-blue-600 w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {t(`info.${key}.title`)}
                                </h3>
                                <p className="text-gray-600">
                                    {t(`info.${key}.value`)}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Form + Map Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl shadow-xl p-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-100 rounded-full p-2">
                                    <Send className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {t('form.title')}
                                </h2>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('form.name')}
                                    </label>
                                    <input
                                        id="name"
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                        {...register('name', {
                                            required: t('form.errors.name.required'),
                                            minLength: {
                                                value: 2,
                                                message: t('form.errors.name.minLength')
                                            }
                                        })}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('form.email')}
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                        {...register('email', {
                                            required: t('form.errors.email.required'),
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message: t('form.errors.email.invalid')
                                            }
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('form.subject')}
                                    </label>
                                    <input
                                        id="subject"
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                        {...register('subject', {
                                            required: t('form.errors.subject.required'),
                                            minLength: {
                                                value: 5,
                                                message: t('form.errors.subject.minLength')
                                            }
                                        })}
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('form.message')}
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                        {...register('message', {
                                            required: t('form.errors.message.required'),
                                            minLength: {
                                                value: 10,
                                                message: t('form.errors.message.minLength')
                                            }
                                        })}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                                    )}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    <Send className="w-5 h-5" />
                                    {isSubmitting ? t('form.submitting') : t('form.button')}
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Map Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-xl h-96 border-2 border-white">
                                <iframe
                                    title={t('mapTitle')}
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.680380885718!2d-0.12720042302592708!3d51.50073251199842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3941eb1f%3A0x1a0342d9c089bf94!2sTrafalgar%20Square!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                                    width="100%"
                                    height="100%"
                                    className="border-0"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white shadow-lg"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{t('supportTitle')}</h3>
                                        <p className="text-blue-100">{t('supportText')}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-100">{t('supportHotline')}</p>
                                        <p className="font-bold text-lg">+44 20 1234 5678</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}