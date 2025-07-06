// components/popular-airlines.tsx
'use client';
// Next
import Image from "next/image"
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
// Image
import placeholder from "../../../public/placeholder.svg"


const PopularAirlines = () => {
    const t = useTranslations('PopularAirlines');

    // List of airlines with placeholder icons
    const airlines = [
        { id: 1, name: 'Delta Airlines' },
        { id: 2, name: 'American Airlines' },
        { id: 3, name: 'United Airlines' },
        { id: 4, name: 'Southwest Airlines' },
        { id: 5, name: 'Alaska Airlines' },
        { id: 6, name: 'JetBlue' },
        { id: 7, name: 'Spirit Airlines' },
        { id: 8, name: 'Frontier Airlines' },
        { id: 9, name: 'Hawaiian Airlines' },
        { id: 10, name: 'Allegiant Air' },
    ];

    // Duplicate airlines for seamless looping
    const doubleAirlines = [...airlines, ...airlines];

    return (
        <section className="py-10 px-4 bg-transparent">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

                    {/* Heading section */}
                    <div className="text-center lg:text-right lg:w-[40%]">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            {t('title')}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-lg lg:max-w-none lg:ml-auto">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Marquee section */}
                    <div className="flex-1 w-full overflow-hidden relative">
                        <div className="absolute inset-0 z-10 pointer-events-none" />

                        <motion.div
                            className="flex"
                            animate={{
                                x: ['0%', '-100%']
                            }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                        >
                            {doubleAirlines.map((airline) => (
                                <div
                                    key={`${airline.id}-${Math.random()}`}
                                    className="flex flex-col items-center justify-center mx-8 w-32 shrink-0"
                                >
                                    <div className="bg-white p-4 rounded-full shadow-sm border border-gray-100">
                                        <Image src={placeholder} alt="place" />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default PopularAirlines;