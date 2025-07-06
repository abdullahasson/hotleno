// src/components/hotels/HotelsError.tsx
import { Hotel, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HotelsError() {
  const t = useTranslations("HotelsError");
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <XCircle className="h-16 w-16 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('Title')}</h3>
      <p className="text-gray-600 max-w-md mb-6">
        {t('Message')}
      </p>
      <div className="bg-gray-100 p-6 rounded-xl inline-block">
        <Hotel className="h-12 w-12 text-blue-500 mx-auto" />
      </div>
    </div>
  );
}