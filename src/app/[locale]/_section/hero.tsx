"use client"

// Next
import Image from 'next/image';

import { motion } from 'framer-motion';
import Search from "@/components/common/Search";
// Images
import BgHero from "../../../../public/hero3.jpeg"


const Hero = () => {


    return (
        <section className="relative flex flex-col justify-center items-center min-h-screen text-white text-center overflow-hidden">            
            {/* Content */}
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <Search />
                </motion.div>
            </div>

            {/* Background */}
            <Image 
                src={BgHero}
                alt='background'
                fill
                className='absolute top-0 left-0 z-0'
            />
        </section>
    )
}

export default Hero;