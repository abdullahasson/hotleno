"use client"
import { Star, MapPin , Utensils, Bed, CalendarCheck, ShieldCheck, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

type Hotel = {
    code: number;
    name: string;
    categoryCode: string;
    categoryName: string;
    destinationCode: string;
    destinationName: string;
    zoneCode: number;
    zoneName: string;
    latitude: string;
    longitude: string;
    rooms: {
        code: string;
        name: string;
        rates: {
            rateKey: string;
            rateClass: string;
            rateType: string;
            net: string;
            allotment: number;
            rateCommentsId: string;
            paymentType: string;
            packaging: boolean;
            boardCode: string;
            boardName: string;
            cancellationPolicies: {
                amount: string;
                from: string;
            }[];
            rooms: number;
            adults: number;
            children: number;
            promotions?: {
                code: string;
                name: string;
            }[];
        }[];
    }[];
    minRate: string;
    maxRate: string;
    currency: string;
};

type HotelCardProps = {
    hotel: Hotel;
};

const HotelCard = ({ hotel }: HotelCardProps) => {
    const [expandedRoom, setExpandedRoom] = useState<string | null>(null);
    const [selectedRate, setSelectedRate] = useState<string | null>(null);

    const toggleRoomExpand = (roomCode: string) => {
        setExpandedRoom(expandedRoom === roomCode ? null : roomCode);
    };

    const formatPrice = (price: string) => {
        return parseFloat(price).toFixed(2);
    };

    const getStars = (categoryName: string) => {
        const match = categoryName.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
    };

    const stars = getStars(hotel.categoryName);

    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{hotel.name}</h2>
                        <div className="flex items-center mt-1">
                            <div className="flex">
                                {[...Array(stars)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">{hotel.categoryName}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-500">From</span>
                        <p className="text-2xl font-bold text-blue-600">
                            {formatPrice(hotel.minRate)} {hotel.currency}
                        </p>
                    </div>
                </div>

                <div className="flex items-center mt-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{hotel.zoneName}, {hotel.destinationName}</span>
                </div>

                {hotel.rooms.map((room) => (
                    <div key={room.code} className="mt-4 border-t pt-4">
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleRoomExpand(room.code)}
                        >
                            <div>
                                <h3 className="font-medium text-gray-800">{room.name}</h3>
                                <div className="flex items-center mt-1 text-sm text-gray-600">
                                    {room.rates[0].boardName === 'BED AND BREAKFAST' && (
                                        <span className="flex items-center mr-3">
                                            <Utensils className="w-3 h-3 mr-1" />
                                            Breakfast
                                        </span>
                                    )}
                                    <span className="flex items-center">
                                        <Bed className="w-3 h-3 mr-1" />
                                        {room.rates[0].adults} Adults
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-blue-600">
                                    {formatPrice(room.rates[0].net)} {hotel.currency}
                                </p>
                                <span className="text-xs text-gray-500">per night</span>
                            </div>
                        </div>

                        {expandedRoom === room.code && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 space-y-3"
                            >
                                {room.rates.map((rate) => (
                                    <div
                                        key={rate.rateKey}
                                        className={`p-3 rounded-lg border ${selectedRate === rate.rateKey ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                                        onClick={() => setSelectedRate(rate.rateKey)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-medium text-gray-800">{rate.boardName}</h4>
                                                {rate.packaging && (
                                                    <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                        <BadgeCheck className="w-3 h-3 mr-1" />
                                                        Special Package
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-blue-600">
                                                    {formatPrice(rate.net)} {hotel.currency}
                                                </p>
                                                <span className="text-xs text-gray-500">{rate.paymentType === 'AT_WEB' ? 'Pay at hotel' : 'Pay now'}</span>
                                            </div>
                                        </div>
                                        {rate.promotions && rate.promotions.length > 0 && (
                                            <div className="mt-2">
                                                {rate.promotions.map((promo) => (
                                                    <div key={promo.code} className="flex items-center text-sm text-green-700">
                                                        <ShieldCheck className="w-3 h-3 mr-1" />
                                                        {promo.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-2 text-sm">
                                            <div className="flex items-center text-gray-600">
                                                <CalendarCheck className="w-3 h-3 mr-1" />
                                                Free cancellation until {new Date(rate.cancellationPolicies[0].from).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                    Select Room
                                </button>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default HotelCard;