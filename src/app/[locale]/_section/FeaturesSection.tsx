import React from 'react';
import { useTranslations } from "next-intl";
import Image from 'next/image';
// Image
import placeholder from "../../../../public/placeholder.svg"

const FeaturesSection = () => {

  const t = useTranslations("FeaturesSection");

  const features = [
    {
      title: t('one'),
      icon: placeholder,
    },
    {
      title: t('two'),
      icon: placeholder,
    },
    {
      title: t('three'),
      icon: placeholder,
    },
    {
      title: t('four'),
      icon: placeholder,
    },
  ];

  return (
    <section className="py-10 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <div className="group flex flex-col items-center text-center p-6">
      <div className="mb-5 flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 duration-300">
        <div className="relative w-16 h-16">
          <Image 
            src={icon}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 64px, 96px"
          />
        </div>
      </div>
      <h3 className="text-lg md:text-lg font-medium text-gray-800 duration-300 leading-snug">
        {title}
      </h3>
    </div>
  );
};

export default FeaturesSection;