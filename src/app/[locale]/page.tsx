'use client';

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
        title="رحلات جوية إلى أفضل المدن من الولايات المتحدة الأمريكية"
        destinations={destinations}
      />
      <FlightDestinations 
        title="رحلات جوية إلى أفضل البلدان من الولايات المتحدة الأمريكية"
        destinations={destinations}
      />
      <FlightDestinations 
        title="فنادق في أفضل المدن"
        destinations={destinations}
      />
      <FlightDestinations 
        title="فنادق في أفضل البلاد"
        destinations={destinations}
      />
    </div>
  );
}