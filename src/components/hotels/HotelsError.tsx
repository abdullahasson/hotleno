// Next Intl
import { useTranslations } from 'next-intl';
// Icons
import { Hotel } from 'lucide-react';

export default function HotelsError() {
  const t = useTranslations("HotelsError");

  return (
    <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
      <Hotel size={48} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {t("Title")}
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        {t("Message")}
      </p>
    </div>
  );
}