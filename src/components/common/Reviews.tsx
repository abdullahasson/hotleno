"use client"


// React 
import { useState , useEffect } from "react"
// Next Intl
import { useLocale } from "next-intl"
// Framer Motion
import { motion, AnimatePresence } from "framer-motion"
// Icons
import {
    Star,
    ChevronLeft,
    ChevronRight
} from "lucide-react"


interface Testimonials {
    author: string;
    date: string;
    content: string;
    rating: number;
    title: string;
}

interface ReviewsProps { 
    title?: string; 
    subtitle?: string 
    testimonials: Testimonials[]
}

const Reviews = ({
    title,
    subtitle,
    testimonials
}: ReviewsProps) => {


    // State for testimonial carousel
    const [currentTestimonial, setCurrentTestimonial] = useState(0);


    const lang = useLocale();
    const isRTL = lang == "ar"


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
                        {title}
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-lg text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {subtitle}
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
                                    <h4 className="text-xl font-bold text-gray-900">{testimonials[currentTestimonial].author}</h4>
                                    <p className="text-gray-600">{testimonials[currentTestimonial].date}</p>
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
    )
}

export default Reviews;