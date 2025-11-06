import { Hotel } from "@/types/hotel";
import HotelList from "./hotel-list";
import { mockHotels } from "@/data/mockHotels";
import { XCircle } from 'lucide-react';

type SearchResultsProps = {
    hotels: Hotel[];
    loading: boolean;
    error: string | null;
};

export const SearchResults = ({ hotels, loading = true , error }: SearchResultsProps) => {
    return (
        <>
            <div className="p-6">
                {loading ? (
                    <div className="container mx-auto px-4 py-8">
                        <div className="animate-pulse space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="flex gap-6 mt-6">
                                <div className="w-1/4 space-y-4">
                                    <div className="h-8 bg-gray-200 rounded"></div>
                                    <div className="h-32 bg-gray-200 rounded"></div>
                                    <div className="h-32 bg-gray-200 rounded"></div>
                                </div>
                                <div className="w-3/4 space-y-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-48 bg-gray-200 rounded"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : hotels.length > 0 ? (
                    <HotelList hotels={hotels} />
                ) : (
                    <HotelList hotels={mockHotels} />
                )}
            </div>

            {error && (
                <div className={`
                    flex items-center gap-3
                    fixed bottom-10 right-1/2 translate-x-1/2 z-50
                    mt-5 
                    p-4 
                    bg-red-50 text-red-700 
                    rounded-xl 
                    animate-bounce
                    border border-red-100
                    shadow-2xl
                `}>
                    <XCircle className="text-red-500" size={20} />
                    <span>{error}</span>
                </div>
            )}
        </>
    );
};