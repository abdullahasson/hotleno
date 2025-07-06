// components/TextFlightDestinations.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

interface Destination {
  name: string;
  url: string;
}

interface FlightDestinationsProps {
  title: string;
  destinations: Destination[];
}

const TextFlightDestinations: React.FC<FlightDestinationsProps> = ({ 
  title, 
  destinations 
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { x: -10, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <div className="mx-auto px-8 py-6">
      <div className="flex gap-2 mb-4 items-center">
        <Plane className="text-blue-600 w-6 h-6" />
        <h2 className="text-xl md:text-xl font-bold text-gray-800">
          {title}
        </h2>
      </div>

      <motion.nav 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-1 md:gap-2 px-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {destinations.map((destination, index) => (
          <motion.a
            key={index}
            href={destination.url}
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300 px-1 border-b border-transparent"
            variants={item}
            whileHover={{ scale: 1.05 }}
          >
            {destination.name}
          </motion.a>
        ))}
      </motion.nav>
    </div>
  );
};

export default TextFlightDestinations;