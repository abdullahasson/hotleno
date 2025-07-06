// src/app/[locale]/app-download/page.tsx
'use client';

// React
import { useState, useEffect } from 'react';
// Next Intl
import { useLocale, useTranslations } from 'next-intl';
// Animations
import { motion, AnimatePresence } from 'framer-motion';
// Icons
import {
  Apple,
  Play,
  Plane,
  Hotel,
  Globe,
  Bell,
  Star,
  ChevronDown,
  Smartphone,
  ShieldCheck,
  WalletCards,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function AppDownloadPage() {
  const locale = useLocale();
  const t = useTranslations('AppDownloadPage');
  const isRTL = locale === 'ar';

  // State for FAQ accordion
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // State for testimonial carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Features data
  const features = [
    {
      icon: Plane,
      title: t('features.flight.title'),
      description: t('features.flight.description'),
      color: 'bg-teal-50 text-teal-600'
    },
    {
      icon: Hotel,
      title: t('features.hotel.title'),
      description: t('features.hotel.description'),
      color: 'bg-amber-50 text-amber-600'
    },
    {
      icon: Globe,
      title: t('features.discovery.title'),
      description: t('features.discovery.description'),
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: Bell,
      title: t('features.alerts.title'),
      description: t('features.alerts.description'),
      color: 'bg-rose-50 text-rose-600'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: t('testimonials.1.name'),
      role: t('testimonials.1.role'),
      content: t('testimonials.1.content'),
      rating: 5
    },
    {
      name: t('testimonials.2.name'),
      role: t('testimonials.2.role'),
      content: t('testimonials.2.content'),
      rating: 4
    },
    {
      name: t('testimonials.3.name'),
      role: t('testimonials.3.role'),
      content: t('testimonials.3.content'),
      rating: 5
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: t('faq.1.question'),
      answer: t('faq.1.answer')
    },
    {
      question: t('faq.2.question'),
      answer: t('faq.2.answer')
    },
    {
      question: t('faq.3.question'),
      answer: t('faq.3.answer')
    },
    {
      question: t('faq.4.question'),
      answer: t('faq.4.answer')
    }
  ];

  // Handle FAQ toggle
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Navigation functions
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              className="lg:w-1/2 text-center lg:text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {t('hero.title')}
              </motion.h1>

              <motion.p
                className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition shadow-md hover:shadow-lg">
                  <Apple size={20} />
                  <span>App Store</span>
                </button>
                <button className="bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-md hover:shadow-lg">
                  <Play size={20} />
                  <span>Google Play</span>
                </button>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 text-gray-600">
                  <ShieldCheck className="text-teal-500" size={20} />
                  <span>{t('hero.benefits.secure')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <WalletCards className="text-emerald-500" size={20} />
                  <span>{t('hero.benefits.payment')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDays className="text-amber-500" size={20} />
                  <span>{t('hero.benefits.availability')}</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className={`absolute -top-8 ${isRTL ? '-right-16' : '-left-16'} w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob`}></div>

                <div className="relative flex justify-center">
                  <motion.div
                    className="relative z-10"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="relative">
                      <div className="w-64 h-auto rounded-3xl overflow-hidden shadow-lg border-8 border-white">
                        <div className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-dashed border-teal-200 rounded-xl w-full h-[500px]" />
                      </div>
                      <div className="absolute top-1/4 -right-20 w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center shadow-md">
                        <Star className="text-white" size={24} />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className={`absolute top-16 ${isRTL ? 'left-0' : 'right-0'} z-0`}
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <div className="w-56 h-auto rounded-3xl overflow-hidden shadow-lg border-8 border-white">
                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-dashed border-amber-200 rounded-xl w-full h-[450px]" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t('features.title')}
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('features.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 rounded-lg mb-6 flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="opacity-90" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t('testimonials.title')}
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('testimonials.subtitle')}
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -100 : 100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-dashed border-teal-200 flex-shrink-0" />
                  <div className="mx-4">
                    <h4 className="text-xl font-bold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`${i < testimonials[currentTestimonial].rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                        size={20}
                      />
                    ))}
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 border-l-3 border-teal-500 pl-4 py-2">
                  &quot;{testimonials[currentTestimonial].content}&quot;
                </blockquote>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition border border-gray-100"
              >
                <ChevronLeft className="text-gray-700" size={24} />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${currentTestimonial === index ? 'bg-teal-600' : 'bg-gray-300'}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition border border-gray-100"
              >
                <ChevronRight className="text-gray-700" size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t('faq.title')}
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('faq.subtitle')}
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="mb-4 border border-gray-200 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left bg-gray-50 hover:bg-gray-100 transition"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-lg text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`transition-transform text-gray-500 ${openIndex === index ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 bg-white text-gray-600 border-t border-gray-200">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg"
            >
              <div className="inline-flex items-center justify-center bg-teal-500/20 p-4 rounded-full mb-6">
                <Smartphone className="text-white" size={48} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('cta.title')}</h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">{t('cta.subtitle')}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gray-900 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition shadow-md hover:shadow-lg">
                  <Apple size={24} />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-lg font-bold">App Store</div>
                  </div>
                </button>
                <button className="bg-white cursor-pointer text-gray-900 px-8 py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-md hover:shadow-lg">
                  <Play size={24} />
                  <div className="text-left">
                    <div className="text-xs text-gray-600">GET IT ON</div>
                    <div className="text-lg font-bold">Google Play</div>
                  </div>
                </button>
              </div>

              <div className="mt-8 text-gray-500 text-sm">
                {t('cta.note')}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}