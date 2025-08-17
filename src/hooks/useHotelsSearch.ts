import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Hotel } from "@/types/hotel";
import { mockHotels } from "@/data/mockHotels";
import { SearchParamsState } from '@/types/hotel';

export const useHotelsSearch = () => {
    const searchParams = useSearchParams();
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [searchParamsState, setSearchParamsState] = useState<SearchParamsState>({
        location: searchParams.get('location') || 'Madrid',
        checkIn: searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')!) : today,
        checkOut: searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')!) : tomorrow,
        passengers: {
            adults: parseInt(searchParams.get('passengers.adults') || '1') || 1,
            children: parseInt(searchParams.get('passengers.children') || '0') || 0,
        },
        showPassengerSelect: false
    });

    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchHotels = useCallback(async () => {
        const { location, checkIn, checkOut } = searchParamsState;

        if (!location) {
            setError('Please enter a destination');
            return;
        }
        if (!checkIn) {
            setError('Please select check-in date');
            return;
        }
        if (!checkOut) {
            setError('Please select check-out date');
            return;
        }

        setError(null);
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const filteredResults = mockHotels.filter(hotel => {
                const locationLower = location.toLowerCase();
                return (
                    hotel.name.toLowerCase().includes(locationLower) ||
                    hotel.address.toLowerCase().includes(locationLower) ||
                    hotel.zoneName.toLowerCase().includes(locationLower)
                );
            });
            setHotels(filteredResults);
        } catch (error) {
            console.log(error)
            setError('Failed to fetch hotels');
            setHotels([]);
        } finally {
            setLoading(false);
        }
    }, [searchParamsState]);

    useEffect(() => {
        searchHotels();
    }, [searchHotels]);

    const handleParamChange = useCallback(<K extends keyof SearchParamsState>(
        key: K,
        value: SearchParamsState[K]
    ) => {
        setSearchParamsState(prev => ({ ...prev, [key]: value }));
    }, []);

    return {
        searchParamsState,
        handleParamChange,
        hotels,
        loading,
        error,
        searchHotels
    };
};