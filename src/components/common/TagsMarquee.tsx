// Next
import Link from "next/link"
// React
import React from 'react';
// Next Intl
import { useTranslations, useLocale } from "next-intl"

import { InfiniteSlider } from '@/components/ui/infinite-slider';

interface Tag {
  name: string;
  highlight: boolean;
}

const TagsMarquee = () => {

  // Translations
  const t = useTranslations('Homepage.TagsMarquee')
  const tcountries = useTranslations('Homepage.TripIdeas')
  const lang = useLocale()

  const tagLines: { tags: Tag[]; direction: 'left' | 'right' }[] = [
    {
      tags: [
        { name: tcountries('countries.country_france'), highlight: false },
        { name: tcountries('countries.country_italy'), highlight: false },
        { name: tcountries('countries.country_greece'), highlight: false },
        { name: tcountries('countries.country_spain'), highlight: false },
        { name: tcountries('countries.country_morocco'), highlight: false },
        { name: tcountries('countries.country_czech'), highlight: false },
        { name: tcountries('countries.country_hungary'), highlight: false },
        { name: tcountries('countries.country_croatia'), highlight: false },
        { name: tcountries('countries.country_austria'), highlight: false },
        { name: tcountries('countries.country_japan'), highlight: true },
        { name: tcountries('countries.country_egypt'), highlight: false },
        { name: tcountries('countries.country_peru'), highlight: false },
        { name: tcountries('countries.country_turkey'), highlight: true },
        { name: tcountries('countries.country_china'), highlight: false },
      ],
      direction: 'right',
    },
    {
      tags: [
        { name: tcountries('countries.country_india'), highlight: true },
        { name: tcountries('countries.country_cambodia'), highlight: true },
        { name: tcountries('countries.country_thailand'), highlight: false },
        { name: tcountries('countries.country_jordan'), highlight: false },
        { name: tcountries('countries.country_maldives'), highlight: false },
        { name: tcountries('countries.country_mexico'), highlight: false },
        { name: tcountries('countries.country_indonesia'), highlight: false },
        { name: tcountries('countries.country_australia'), highlight: false },
        { name: tcountries('countries.country_brazil'), highlight: false },
        { name: tcountries('countries.country_hawaii'), highlight: false },
        { name: tcountries('countries.country_usa'), highlight: false },
        { name: tcountries('countries.country_singapore'), highlight: false },
        { name: tcountries('countries.country_denmark'), highlight: false },
        { name: tcountries('countries.country_canada'), highlight: false },
        { name: tcountries('countries.country_netherlands'), highlight: false },
      ],
      direction: 'right',
    },
    {
      tags: [
        { name: tcountries('countries.country_uae'), highlight: false },
        { name: tcountries('countries.country_uk'), highlight: false },
        { name: tcountries('countries.country_costa_rica'), highlight: false },
        { name: tcountries('countries.country_new_zealand'), highlight: false },
        { name: tcountries('countries.country_tanzania'), highlight: true },
        { name: tcountries('countries.country_norway'), highlight: false },
        { name: tcountries('countries.country_kenya'), highlight: false },
        { name: tcountries('countries.country_iceland'), highlight: true },
        { name: tcountries('countries.country_venezuela'), highlight: false },
        { name: tcountries('countries.country_namibia'), highlight: false },
        { name: tcountries('countries.country_germany'), highlight: false },
        { name: tcountries('countries.country_argentina'), highlight: false },
        { name: tcountries('countries.country_colombia'), highlight: false },
        { name: tcountries('countries.country_finland'), highlight: false },
      ],
      direction: 'right',
    },
  ];

  const tags = [
    { name: tcountries('countries.country_france'), highlight: false },
    { name: tcountries('countries.country_italy'), highlight: false },
    { name: tcountries('countries.country_greece'), highlight: false },
    { name: tcountries('countries.country_spain'), highlight: false },
    { name: tcountries('countries.country_morocco'), highlight: false },
    { name: tcountries('countries.country_czech'), highlight: false },
    { name: tcountries('countries.country_hungary'), highlight: false },
    { name: tcountries('countries.country_croatia'), highlight: false },
    { name: tcountries('countries.country_austria'), highlight: false },
    { name: tcountries('countries.country_japan'), highlight: true },
    { name: tcountries('countries.country_egypt'), highlight: false },
    { name: tcountries('countries.country_peru'), highlight: false },
    { name: tcountries('countries.country_turkey'), highlight: true },
    { name: tcountries('countries.country_china'), highlight: false },
  ]

  return (
    <div dir="ltr">
      <InfiniteSlider speedOnHover={0} gap={24} className="py-2">
        {tags.map((tag, index) => (
          <Link
            key={`tag-${index + 1}`}
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
      </InfiniteSlider>
      <InfiniteSlider speedOnHover={0} gap={24} reverse className="py-2">
        {tags.map((tag, index) => (
          <Link
            key={`tag-${index + 1}`}
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
      </InfiniteSlider>
      <InfiniteSlider speedOnHover={0} gap={24} className="py-2">
        {tags.map((tag, index) => (
          <Link
            key={`tag-${index + 1}`}
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
      </InfiniteSlider>
    </div>
  )
};



export default TagsMarquee;