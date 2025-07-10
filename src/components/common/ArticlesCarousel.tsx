// Next
import Image from "next/image";
// React
import React, { useState, useEffect } from 'react';
// Types
import { Article } from '@/types/article';
// Next Intl
import { useTranslations } from 'next-intl';
// Framer Motion
import { motion, AnimatePresence } from 'framer-motion';
// Icons
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
// Image
import placeholder from "../../../public/placeholder.svg"

const ArticlesCarousel = ({ articles }: { articles: Article[] }) => {
    const t = useTranslations('ArticlesCarousel');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Handle responsiveness
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const visibleCount = isMobile ? 1 : 3;
    const totalSlides = Math.ceil(articles.length / visibleCount);

    const nextSlide = () => {
        setDirection('right');
        setCurrentIndex((prev) =>
            prev === totalSlides - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setDirection('left');
        setCurrentIndex((prev) =>
            prev === 0 ? totalSlides - 1 : prev - 1
        );
    };

    const getVisibleArticles = () => {
        const start = currentIndex * visibleCount;
        return articles.slice(start, start + visibleCount);
    };

    // Animation variants
    const variants = {
        enter: (direction: 'left' | 'right' | null) => ({
            x: direction === 'right' ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: 'left' | 'right' | null) => ({
            x: direction === 'right' ? -1000 : 1000,
            opacity: 0
        })
    };

    return (
        <section className="w-full py-10 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">
                        {t('title')}
                    </h2>
                    <a
                        href="#"
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium group"
                    >
                        {t('seeMore')}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Carousel Container */}
                <div className="relative overflow-hidden">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all focus:outline-none group"
                        aria-label="Previous articles"
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-700 group-hover:text-blue-600" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-all focus:outline-none group"
                        aria-label="Next articles"
                    >
                        <ChevronRight className="h-6 w-6 text-gray-700 group-hover:text-blue-600" />
                    </button>

                    {/* Articles Container */}
                    <div className="relative h-[520px] md:h-[500px]">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-8"
                            >
                                {getVisibleArticles().map((article , index) => (
                                    <ArticleCard key={article.id} article={article} t={t} i={index} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface ArticleCardProps {
    article: Article;
    t: (key: string) => string;
    i: number
}

const ArticleCard = ({ article, t , i }: ArticleCardProps) => (
    <motion.div
        whileHover={{ y: 0 }}
        className="h-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200 hover:shadow-xl transition-all"
    >
        {/* Article Image */}
        <div className="relative h-48 w-full">
            <Image
                src={placeholder}
                alt="placeholder"
                layout="fill"
                objectFit="cover"
                className="h-48 w-full"
            />
        </div>

        {/* Article Content */}
        <div className="p-6 flex flex-col flex-grow">
            <div className="mb-3">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {t(`articles.${i + 1}.department`)}
                </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {t(`articles.${i + 1}.title`)}
            </h3>
            <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                
                {t(`articles.${i + 1}.description`)}
                
            </p>

            {/* Blog Info */}
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full w-8 h-8 flex items-center justify-center">
                        <span className="text-white font-medium text-xs">
                        
                            {t(`articles.${i + 1}.blogName`)}
                        </span>
                    </div>
                    <span className="ml-3 font-medium text-gray-900">{article.blogName}</span>
                </div>
                <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center group"
                >
                    {t('readArticle')}
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>
    </motion.div>
);

export default ArticlesCarousel;