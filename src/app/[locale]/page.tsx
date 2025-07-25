'use client';

import Image from "next/image"
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
// Mock Data
import { articles } from '@/constants/mock-data';
// Images
import line9 from "../../../public/line-shape-9.svg"

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* With Us */}
      <PromoCarousel />
      <FeaturesSection />
      <div className="w-full py-10 flex items-center justify-center">
        <Image src={line9} alt="line shape" />
      </div>

      {/* Articals */}
      <ArticlesCarousel articles={articles} />
      {/* Popular Airlines */}
      <PopularAirlines />

      <div className="w-full py-10 flex items-center justify-center">
        <Image src={line9} alt="line shape" />
      </div>

      {/* Trip Ideas Section */}
      <TripIdeasSection />

      <div className="w-full py-10 flex items-center justify-center">
        <Image src={line9} alt="line shape" />
      </div>

      {/* Mobile App */}
      <MobileApp />
    </div>
  );
}