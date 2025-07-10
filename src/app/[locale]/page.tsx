'use client';


// Next Intl
import { useTranslations } from "next-intl"
// Sections
import Hero from "./_section/hero";
import FeaturesSection from "./_section/FeaturesSection";
import MobileApp from "./_section/mobile-app"
// Components (Common)
import Header from "@/components/common/header"
import PromoCarousel from '@/components/common/PromoCarousel';
import ArticlesCarousel from '@/components/common/ArticlesCarousel';
import PopularAirlines from '@/components/common/popular-airlines';
import TripIdeasSection from '@/components/common/TripIdeasSection';
import FlightDestinations from '@/components/common/FlightDestinations';
// Mock Data
import { articles , destinations } from '@/constants/mock-data';


export default function Home() {

  const t = useTranslations('FlightDestinations')

  return (
    <div className="min-h-screen ">
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* With Us */}
      <PromoCarousel />
      <FeaturesSection />

      {/* Articals */}
      <ArticlesCarousel articles={articles} />
      {/* Popular Airlines */}
      <PopularAirlines />

      {/* Trip Ideas Section */}
      <TripIdeasSection />
      
      {/* Mobile App */}
      <MobileApp />

      <FlightDestinations 
        title={t('1.title')}
        destinations={destinations.slice(0 , 11)}
      />
      <FlightDestinations 
        title={t('2.title')}
        destinations={destinations.slice(11 , 21)}
      />
      <FlightDestinations 
        title={t('3.title')}
        destinations={destinations.slice(21 , 30)}
      />
      <FlightDestinations 
        title={t('4.title')}
        destinations={destinations.slice(30 , 53)}
      />
    </div>
  );
}