// Next
import Link from "next/link"
// React
import React from 'react';
// Next Intl
import { useTranslations, useLocale } from "next-intl"
// Framer Motion
import { motion, Variants } from 'framer-motion';

interface Tag {
  name: string;
  highlight: boolean;
}

const TagsMarquee = () => {

  // Translations
  const t = useTranslations('TripIdeas')
  const lang = useLocale()

  const tagLines: { tags: Tag[]; direction: 'left' | 'right' }[] = [
    {
      tags: [
        { name: t('countries.country_france'), highlight: false },
        { name: t('countries.country_italy'), highlight: false },
        { name: t('countries.country_greece'), highlight: false },
        { name: t('countries.country_spain'), highlight: false },
        { name: t('countries.country_morocco'), highlight: false },
        { name: t('countries.country_czech'), highlight: false },
        { name: t('countries.country_hungary'), highlight: false },
        { name: t('countries.country_croatia'), highlight: false },
        { name: t('countries.country_austria'), highlight: false },
        { name: t('countries.country_japan'), highlight: true },
        { name: t('countries.country_egypt'), highlight: false },
        { name: t('countries.country_peru'), highlight: false },
        { name: t('countries.country_turkey'), highlight: true },
        { name: t('countries.country_china'), highlight: false },
      ],
      direction: 'right',
    },
    {
      tags: [
        { name: t('countries.country_india'), highlight: true },
        { name: t('countries.country_cambodia'), highlight: true },
        { name: t('countries.country_thailand'), highlight: false },
        { name: t('countries.country_jordan'), highlight: false },
        { name: t('countries.country_maldives'), highlight: false },
        { name: t('countries.country_mexico'), highlight: false },
        { name: t('countries.country_indonesia'), highlight: false },
        { name: t('countries.country_australia'), highlight: false },
        { name: t('countries.country_brazil'), highlight: false },
        { name: t('countries.country_hawaii'), highlight: false },
        { name: t('countries.country_usa'), highlight: false },
        { name: t('countries.country_singapore'), highlight: false },
        { name: t('countries.country_denmark'), highlight: false },
        { name: t('countries.country_canada'), highlight: false },
        { name: t('countries.country_netherlands'), highlight: false },
      ],
      direction: 'right',
    },
    {
      tags: [
        { name: t('countries.country_uae'), highlight: false },
        { name: t('countries.country_uk'), highlight: false },
        { name: t('countries.country_costa_rica'), highlight: false },
        { name: t('countries.country_new_zealand'), highlight: false },
        { name: t('countries.country_tanzania'), highlight: true },
        { name: t('countries.country_norway'), highlight: false },
        { name: t('countries.country_kenya'), highlight: false },
        { name: t('countries.country_iceland'), highlight: true },
        { name: t('countries.country_venezuela'), highlight: false },
        { name: t('countries.country_namibia'), highlight: false },
        { name: t('countries.country_germany'), highlight: false },
        { name: t('countries.country_argentina'), highlight: false },
        { name: t('countries.country_colombia'), highlight: false },
        { name: t('countries.country_finland'), highlight: false },
      ],
      direction: 'right',
    },
  ];


  const marqueeVariants = React.useMemo(() => {
    return (direction: 'left' | 'right'): Variants => {
      const offset = direction === 'left' ? '-200%' : '100%';
      return {
        animate: {
          x: [direction === 'left' ? '0%' : '0%', offset],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 100, // Faster duration for better user experience
              ease: 'linear',
            },
          },
        },
      };
    };
  }, []);

 
const MarqueeLine = React.memo(
  function MarqueeLine({ tags, direction, index }: { tags: Tag[]; direction: 'left' | 'right'; index: number }) {
      
      const viewportFillFactor = 4;
      const duplicatedTags = React.useMemo(() => {
        return Array(viewportFillFactor).fill(tags).flat();
      }, [tags]);

      return (
        <motion.div
          className="group flex gap-4 overflow-hidden flex-row py-2 relative"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)',
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          <motion.div
            className="flex shrink-0 flex-row gap-3 items-center"
            variants={marqueeVariants(direction)}
            animate="animate"
            custom={direction}
          >
            {duplicatedTags.map((tag, tagIndex) => (
              <Link
                key={`tag-${index}-${tagIndex}`}
                className={`rounded-md px-3 py-2 m-0 overflow-visible whitespace-nowrap text-sm md:text-base ${tag.highlight
                    ? 'text-blue-600 bg-blue-100 font-medium hover:bg-blue-200'
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                  } transition-all hover:scale-105 hover:shadow-sm`}
                data-discover="true"
                href={`/${lang}/${encodeURIComponent(tag.name)}`}
                aria-label={`Browse ${tag.name} tag`}
              >
                {tag.name}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      );
    }
  );

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-gray-800 text-center">
          رحلات طيران الى
        </h2>

        <div className="flex flex-col gap-2">
          {tagLines.map((line, index) => (
            <MarqueeLine
              key={`marquee-line-${index}`}
              tags={line.tags}
              direction={line.direction}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};



export default TagsMarquee;