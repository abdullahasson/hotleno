"use client"

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { trips } from '@/lib/data';
import TripCard from './TripCard';

const TripIdeasSection: React.FC = () => {
  const t = useTranslations('TripIdeas');
  const [activeTab, setActiveTab] = useState('romantic');
  
  const tabCategories = [
    'romantic', 'cultural', 'beach', 
    'family', 'nature', 'forTrips'
  ];
  
  const filteredTrips = trips.filter(trip => trip.category === activeTab);
  
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          {tabCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {t(`tabs.${category}`)}
            </button>
          ))}
        </div>
        
        {/* Trip Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6"
          >
            {filteredTrips.map((trip) => (
              <TripCard 
                key={trip.id} 
                trip={trip} 
                roundTripText={t('card.roundTrip')} 
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TripIdeasSection;