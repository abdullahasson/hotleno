import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Search from "@/components/common/Search";

const Hero = () => {
    const images = [
        '/hero1.jpg',  // Replace with your actual image paths
        '/hero2.jpg',
        '/hero3.jpg'
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 10000); // Change image every 5 seconds
        
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
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${images[currentIndex]})` }}
                    />
                </AnimatePresence>
            </div>
            
            {/* Content */}
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <Search />
            </div>
        </section>
    )
}

export default Hero;