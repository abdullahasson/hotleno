import React, { useState, useEffect, useRef } from 'react';
import { useLocale , useTranslations } from "next-intl"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const PromoCarousel = () => {
  const lang = useLocale();
  const t = useTranslations("PromoCarousel")
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  
  const slides = [
    {
      title: t("Cards.one.title"),
      description: t("Cards.one.des"),
      image: "/placeholder.svg",
      link: "https://www.wego.com/car-rental?source=mc&ulang=ar",
    },
    {
      title:  t("Cards.two.title"),
      description:  t("Cards.two.des"),
      image: "/placeholder.svg",
      link: "https://airalo.pxf.io/c/5609792/2139174/15608?p.code=WEGO",
    },
    {
      title:  t("Cards.three.title"),
      description: t("Cards.three.des") ,
      image: "/placeholder.svg",
      link: "https://apply.joinsherpa.com/travel-restrictions?affiliateId=wego&language=ar-SA&currency=SAR",
    },
    {
      title: t("Cards.four.title") ,
      description: t("Cards.four.des"),
      image: "/placeholder.svg",
      link: "https://wego.transferz.com/airport-transfers/?wg_source=Onsite&wg_medium=carousel&wg_campaign=visa-desktop",
    }
  ];

  // Handle auto slide
  useEffect(() => {
    if (autoSlide) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 5000);
    }
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [autoSlide, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  const goPrev = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            {t('title')}
          </h2>
        </div>

        <div className="relative group">
          {/* Carousel container */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${lang !== "ar" && "-"}${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 flex flex-col md:flex-row"
                >
                  <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-r from-blue-50 to-white">
                    <div className="max-w-md mx-auto">
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{slide.title}</h3>
                      <p className="text-lg text-gray-600 mb-6">{slide.description}</p>
                      <a 
                        href={slide.link} 
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors duration-300 group"
                      >
                        {t("Cards.btn")}
                        <ChevronLeft className="ml-1 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                  <div className="md:w-1/2 h-80 md:h-auto overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image 
                        src={slide.image} 
                        alt={slide.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={goPrev}
            disabled={currentSlide === 0}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-blue-600" />
          </button>
          
          <button 
            onClick={goNext}
            disabled={currentSlide === slides.length - 1}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-blue-600" />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoCarousel;