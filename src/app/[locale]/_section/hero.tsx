import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Search from "@/components/common/Search";
// Images
import hero1 from "../../../../public/hero1.jpg"
import hero2 from "../../../../public/hero2.jpg"
import hero3 from "../../../../public/hero3.jpg"

const Hero = () => {
    const images = [
        hero1,
        hero2,
        hero3
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        // Set initial mobile state
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        
        // Add resize listener
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 10000);
        
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative flex flex-col justify-center items-center min-h-screen text-white text-center overflow-hidden">
            {/* Background Image Carousel */}
            <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        {/* Responsive background image */}
                        <div 
                            className={`absolute inset-0 bg-cover ${
                                isMobile ? 'bg-top' : 'bg-center'
                            }`}
                            style={{ backgroundImage: `url(${images[currentIndex]})` }}
                        />
                        
                        {/* Responsive gradient overlay */}
                        <div className={`
                            absolute inset-0 
                            bg-gradient-to-t from-black/70 to-transparent
                            ${isMobile ? 'pt-20' : ''}
                        `} />
                    </motion.div>
                </AnimatePresence>
            </div>
            
            {/* Content */}
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <Search />
                </motion.div>
                
                {/* Navigation dots for mobile */}
                {isMobile && (
                    <div className="flex justify-center mt-8 space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    currentIndex === index 
                                        ? 'bg-white w-6' 
                                        : 'bg-white/50'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Hero;