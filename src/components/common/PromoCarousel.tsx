import React, { useState, useEffect } from 'react';
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,type CarouselApi 
} from "@/components/ui/carousel";

// Images
import car from "../../../public/Group 695.svg";
import emia from "../../../public/Group 698.svg";
import visa from "../../../public/Group 700.svg";
import thuothand from "../../../public/thuothand.svg";

const PromoCarousel = () => {
  const lang = useLocale();
  const t = useTranslations("PromoCarousel");
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      title: t("Cards.one.title"),
      description: t("Cards.one.des"),
      image: car,
      link: "https://www.wego.com/car-rental?source=mc&ulang=ar",
    },
    {
      title: t("Cards.two.title"),
      description: t("Cards.two.des"),
      image: emia,
      link: "https://airalo.pxf.io/c/5609792/2139174/15608?p.code=WEGO",
    },
    {
      title: t("Cards.three.title"),
      description: t("Cards.three.des"),
      image: visa,
      link: "https://apply.joinsherpa.com/travel-restrictions?affiliateId=wego&language=ar-SA&currency=SAR",
    },
    {
      title: t("Cards.four.title"),
      description: t("Cards.four.des"),
      image: thuothand,
      link: "https://wego.transferz.com/airport-transfers/?wg_source=Onsite&wg_medium=carousel&wg_campaign=visa-desktop",
    },
  ];

 
  const groupedSlides = [];
  for (let i = 0; i < slides.length; i += 2) {
    groupedSlides.push(slides.slice(i, i + 2));
  }

  const totalSlides = groupedSlides.length;

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);


  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            {t('title')}
          </h2>
        </div>

        <div className="relative group" dir={lang === "ar" ? "rtl" : "ltr"}>
          <Carousel 
            setApi={setApi}
            opts={{ 
              align: "start",
              direction: lang === "ar" ? "rtl" : "ltr"
            }}
            className="w-full"
          >
            <CarouselContent>
              {groupedSlides.map((slideGroup, groupIndex) => (
                <CarouselItem key={groupIndex} className="basis-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                    {slideGroup.map((slide, index) => (
                      <div key={index} className="flex rounded-2xl bg-white border border-gray-400 overflow-hidden h-full">
                        <div className="flex flex-col md:flex-row flex-1">
                          {/* Content side */}
                          <div className="md:w-1/2 p-6 flex flex-col justify-center bg-gradient-to-r from-blue-50 to-white">
                            <div className="max-w-xs mx-auto">
                              <h3 className="text-xl font-bold text-gray-900 mb-3">{slide.title}</h3>
                              <p className="text-gray-600 mb-4 text-sm">{slide.description}</p>
                              <a
                                href={slide.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors duration-300 group text-sm"
                              >
                                {t("Cards.btn")}
                                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </a>
                            </div>
                          </div>
                          {/* Image side */}
                          <div className="md:w-1/2 h-48 md:h-auto overflow-hidden relative">
                            <div className='w-full h-full flex justify-center items-center p-5'>
                              <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 16vw"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons - only show if multiple slides */}
            {totalSlides > 1 && (
              <>
                <CarouselPrevious 
                  className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6 text-blue-600" />
                </CarouselPrevious>

                <CarouselNext 
                  className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6 text-blue-600" />
                </CarouselNext>

                {/* Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                  {groupedSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current
                          ? 'bg-blue-600 w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PromoCarousel;