"use client";

// Next 
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
// React
import { useState, useEffect, ReactNode } from "react";
// Next Intl
import { useTranslations } from "next-intl";
// Types
import { Hotel } from "@/types/hotel";
// Components
import Reviews from "../common/Reviews";
const MapComponent = dynamic(() => import('@/components/hotels/Map'), {
    ssr: false,
    loading: () => (
        <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="relative h-full flex flex-col items-center justify-center gap-4 p-4">
                <div className="relative w-14 h-14">
                    <div className="absolute inset-0 border-3 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 border-3 border-transparent border-t-gray-200 rounded-full"></div>
                </div>
                <div className="text-center space-y-1">
                    <p className="text-gray-600 font-medium tracking-wide text-sm">
                        <span className="animate-fadeIn opacity-0 inline-block delay-100">L</span>
                        <span className="animate-fadeIn opacity-0 inline-block delay-200">o</span>
                        <span className="animate-fadeIn opacity-0 inline-block delay-300">a</span>
                        <span className="animate-fadeIn opacity-0 inline-block delay-[400ms]">d</span>
                        <span className="animate-fadeIn opacity-0 inline-block delay-[500ms]">i</span>
                        <span className="animate-fadeIn opacity-0 inline-block delay-[600ms]">n</span>
                        <span className="animate-fadeIn opacity-0 inline-block delay-[700ms]">g</span>
                        <span className="mx-1.5"></span>
                        <span className="animate-fadeIn opacity-0 inline-block delay-[800ms]">m</span>
                        <span className="animate-fadeIn opacity-0 inline-block delay-[900ms]">a</span>
                        <span className="animate-fadeIn opacity-0 inline-block delay-[1000ms]">p</span>
                    </p>
                    <p className="text-xs text-gray-400 animate-pulse-slow mt-2">
                        Interactive experience loading...
                    </p>
                </div>
                <div className="absolute bottom-0 w-full h-1 bg-gray-200 overflow-hidden">
                    <div className="animate-progressBar h-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                </div>
            </div>
        </div>
    )
});
// UI
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader
} from "../ui/card";
import { ChartConfig, ChartContainer } from "../ui/chart";
// Mock Data
import { mockHotels } from "@/data/mockHotels";
// Icons
import {
    Star,
    MapPin,
    Building,
    Heart,
    Wifi,
    ParkingCircle,
    Dumbbell,
    Utensils,
    Waves,
    ShoppingBag,
    Users,
    Snowflake,
    X,
    Smile
} from "lucide-react";

interface RoomType {
    roomName: string;
    rateKey: string;
    price: number;
}

interface ProviderType {
    provider: string;
    maxPrice: number;
    currency: string;
    rooms: RoomType[];
}

const chartData = [
    { browser: "safari", visitors: 100, fill: "var(--color-safari)" },
];
const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

// Amenity icons mapping
const amenityIcons: Record<string, ReactNode> = {
    "Free WiFi": <Wifi size={18} />,
    "Swimming Pool": <Waves size={18} />,
    "Spa": <Users size={18} />,
    "Fitness Center": <Dumbbell size={18} />,
    "Restaurant": <Utensils size={18} />,
    "Parking": <ParkingCircle size={18} />,
    "Terrace": <Waves size={18} />,
    "Designer Toiletries": <ShoppingBag size={18} />,
    "Nespresso Machine": <Utensils size={18} />,
    "24hr Snack Bar": <Utensils size={18} />,
    "Air Conditioning": <Snowflake size={18} />,
    "Butler Service": <Users size={18} />,
    "Kitchenette": <Utensils size={18} />,
    "Work Desk": <Wifi size={18} />,
    "Coffee Maker": <Utensils size={18} />,
};

const HotelDetails = ({ id }: { id: string }) => {
    const t = useTranslations('Hotel.HotelPage')
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [loadingHotel, setLoadingHotel] = useState(true);
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const [showImageSlider, setShowImageSlider] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const foundHotel = mockHotels.find(h => h.id === id);
        if (foundHotel) {
            setHotel(foundHotel);
        }
        setLoadingHotel(false);
    }, [id]);

    // Render stars for ratings
    const renderStars = (rating: number) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(rating) ?
                            "text-yellow-400 fill-yellow-400" :
                            "text-gray-300"}
                    />
                ))}
                <span className="ml-1 text-gray-600">{rating.toFixed(1)}</span>
            </div>
        );
    };

    // Get lowest price from all rooms
    const getLowestPrice = () => {
        if (!hotel) return 0;
        return Math.min(...hotel.providers.flatMap(p =>
            p.rooms.map(r => r.price)
        ));
    };

    if (loadingHotel) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Skeleton className="h-8 w-64 mb-4" />
                            <div className="flex items-center gap-4 mb-6">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-96 rounded-xl" />
                        </div>
                        <div className="space-y-6">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-40 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-20 rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!hotel) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel Not Found</h2>
                <p className="text-gray-600 mb-6">The hotel you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                <Button asChild>
                    <Link href="/hotels">Browse All Hotels</Link>
                </Button>
            </div>
        );
    }

    // Combine amenities and facilities
    const allAmenities = [...hotel.amenities, ...(hotel.facilities || [])];

    // Get similar hotels (excluding current hotel)
    const similarHotels = mockHotels
        .filter(h => h.id !== hotel.id && h.stars === hotel.stars)
        .slice(0, 3);

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
                <div className="flex-1">
                    <Breadcrumb className="mb-3">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="text-blue-600 hover:text-blue-800">
                                    {t('Breadcrumb.Home')}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/hotels" className="text-blue-600 hover:text-blue-800">
                                    {t('Breadcrumb.Hotels')}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-semibold text-gray-700 truncate max-w-xs">
                                    {hotel.name}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap justify-between items-start gap-3">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                                {hotel.name}
                            </h1>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsFavorite(!isFavorite)}
                                className="rounded-full"
                            >
                                <Heart
                                    size={24}
                                    className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}
                                />
                            </Button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
                            <div className="flex items-center">
                                {renderStars(hotel.rating)}
                            </div>
                            <span className="text-gray-300 hidden sm:inline">•</span>
                            <span className="text-gray-600 flex items-center gap-1">
                                <MapPin size={14} />
                                {hotel.address}
                            </span>
                            <span className="text-gray-300 hidden sm:inline">•</span>
                            <span className="text-gray-600 flex items-center gap-1">
                                <Building size={14} />
                                {hotel.zoneName}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <span className="font-semibold">{hotel.stars}</span>
                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            </Badge>
                            {hotel.facilities?.includes("Business Center") && (
                                <Badge variant="secondary">Business Friendly</Badge>
                            )}
                            {hotel.amenities.includes("Free WiFi") && (
                                <Badge variant="secondary">Free WiFi</Badge>
                            )}
                            {hotel.amenities.includes("Swimming Pool") && (
                                <Badge variant="secondary">Pool</Badge>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-auto flex flex-col gap-3">
                    <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold text-gray-800">
                            ${getLowestPrice()}
                            <span className="text-sm font-normal text-gray-500 ml-1">/night</span>
                        </div>
                        <p className="text-sm text-gray-500">Includes taxes & fees</p>
                    </div>
                    <Button
                        className="w-full cursor-pointer lg:w-auto border border-blue-600 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        onClick={() => {
                            window.scrollTo(0, 1000);
                        }}
                    >
                        {t('BookNow')}
                    </Button>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="relative mb-8">
                <div
                    className="grid grid-cols-1 md:grid-cols-4 gap-2 md:h-[400px] rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setShowImageSlider(true)}
                >
                    {hotel.images.slice(0, 5).map((image: string, index: number) => (
                        <div
                            key={index}
                            className={`
                  ${index === 0 ? 'md:col-span-2 md:row-span-2 h-[250px] md:h-full' : 'h-[120px] md:h-full'}
                  bg-gray-200 rounded-xl relative overflow-hidden
                `}
                        >
                            <Image
                                src={image}
                                alt={`${hotel.name} image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                            {index === 0 && hotel.images.length > 1 && (
                                <div className="absolute bottom-3 right-3 bg-white/80 px-2 py-1 rounded text-xs font-medium">
                                    {hotel.images.length} photos
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    variant="outline"
                    className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={() => setShowImageSlider(true)}
                >
                    View All Photos
                </Button>
            </div>

            {/* About Hotel */}
            <div className="flex w-full items-start gap-2 mb-10">
                {/* Hotel Description */}
                <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">About {hotel.name}</h2>
                    <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
                </div>

                {/* Amenities Section */}
                <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Hotel Amenities</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {allAmenities.slice(0, showAllAmenities ? allAmenities.length : 6).map((amenity: string, index: number) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <div className="text-blue-500">
                                    {amenityIcons[amenity] || <Wifi size={18} />}
                                </div>
                                <span className="text-sm font-medium text-gray-700">{amenity}</span>
                            </div>
                        ))}
                    </div>
                    {allAmenities.length > 6 && (
                        <Button
                            variant="ghost"
                            className="mt-4 text-blue-600 hover:text-blue-800"
                            onClick={() => setShowAllAmenities(!showAllAmenities)}
                        >
                            {showAllAmenities ? "Show Less" : "Show All Amenities"}
                        </Button>
                    )}
                </div>
            </div>


            {/* Tabs Section */}
            <div className="bg-white pb-5 rounded-xl overflow-hidden">
                <div className="container mx-auto px-4">
                    <Tabs defaultValue="rooms">
                        <div className="overflow-x-auto pb-2">
                            <TabsList className="w-full bg-white border-b border-gray-200 rounded-none">
                                {[
                                    "rooms",
                                    "guest",
                                    "reviews",
                                    "map",
                                    "similar",
                                    "details",
                                ].map((tab, i) => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab}
                                        className="py-4 px-6 text-gray-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                                    >
                                        {t(`Tabs.${i + 1}`)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <div>
                            <TabsContent value="rooms">
                                <div className="flex flex-col items-start gap-y-2">
                                    <h2 className="bg-bold text-2xl">
                                        Rooms Deals
                                    </h2>

                                    {/* Providers Table */}
                                    <div className="w-full">
                                        <Table>
                                            <TableHeader className="rounded-3xl overflow-hidden">
                                                <TableRow>
                                                    <TableHead>
                                                        <div className="py-2 flex flex-col !text-start items-start gap-y-1">
                                                            <span className="w-full">
                                                                Booking Sites
                                                            </span>
                                                            <h3 className="text-xl font-semibold">
                                                                Booking Options
                                                            </h3>
                                                        </div>
                                                    </TableHead>
                                                    <TableHead>
                                                        <div className="py-2 flex flex-col !text-start items-center gap-y-1">
                                                            <span className="w-full">
                                                                Room Types
                                                            </span>
                                                            <Input placeholder="All Rooms Types" />
                                                        </div>
                                                    </TableHead>
                                                    <TableHead>
                                                        <div className="py-2 flex flex-col !text-start items-end gap-y-1">
                                                            <span className="w-full">
                                                                Price
                                                            </span>
                                                            <Select>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Including taxes" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="true">Including Taxes</SelectItem>
                                                                        <SelectItem value="false">Excluding Taxes</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    hotel.providers.map((item: ProviderType, index) => {
                                                        return (
                                                            <TableRow key={`${item.provider}-${index + 1}`}>
                                                                <TableCell>
                                                                    {item.provider}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div>
                                                                        <h4 className="font-semibold text-xl">
                                                                            {item.rooms[0].roomName}
                                                                        </h4>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item.maxPrice} ({item.currency})
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="reviews">
                                <Reviews
                                    title="Reviews"
                                    testimonials={hotel.reviews}
                                />
                            </TabsContent>

                            <TabsContent value="guest">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-gray-100 p-10 rounded-xl">
                                        <div>
                                            <h2 className="font-bold text-xl mb-2">Guest Rating</h2>
                                            <ul>
                                                {
                                                    Object.keys(hotel.guestRating).map((key: string, index: number) => (
                                                        <li key={index} className="flex items-center gap-2 mb-1">
                                                            <Smile className={`${hotel.guestRating[key as keyof typeof hotel.guestRating] > 4 ? 'text-blue-500' : 'text-red-500'} text-2xl`} />
                                                            <span className="text-xl text-gray-500">{key}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>


                                    <div className="rounded-xl flex items-center bg-blue-100 overflow-hidden">
                                        <Card className="rounded-none border-none shadow-none bg-transparent h-full w-1/2 p-0 gap-0">
                                            <CardHeader className="m-0 p-0">

                                            </CardHeader>
                                            <CardContent className="flex-1 pb-0">
                                                <ChartContainer
                                                    config={chartConfig}
                                                    className="mx-auto aspect-square max-h-[250px]"
                                                >
                                                    <RadialBarChart
                                                        data={chartData}
                                                        startAngle={0}
                                                        endAngle={90}
                                                        innerRadius={90}
                                                        outerRadius={110}
                                                    >
                                                        <PolarGrid
                                                            gridType="circle"
                                                            radialLines={false}
                                                            stroke="none"

                                                            polarRadius={[74, 74]}
                                                        />
                                                        <RadialBar dataKey="visitors" background cornerRadius={10} />
                                                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                                            <Label
                                                                content={({ viewBox }) => {
                                                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                                        return (
                                                                            <text
                                                                                x={viewBox.cx}
                                                                                y={viewBox.cy}
                                                                                textAnchor="middle"
                                                                                dominantBaseline="middle"
                                                                            >
                                                                                <tspan
                                                                                    x={viewBox.cx}
                                                                                    y={viewBox.cy}
                                                                                    className="fill-foreground text-4xl font-bold"
                                                                                >
                                                                                    {chartData[0].visitors.toLocaleString()}
                                                                                </tspan>
                                                                            </text>
                                                                        )
                                                                    }
                                                                    return null;
                                                                }}
                                                            />
                                                        </PolarRadiusAxis>
                                                    </RadialBarChart>
                                                </ChartContainer>
                                            </CardContent>
                                        </Card>
                                        <div className="flex flex-col gap-2 p-10">
                                            <h2 className="text-2xl font-bold">
                                                Very Good
                                            </h2>
                                            <p>
                                                based on reviews from All travellers
                                            </p>
                                            <span>
                                                6182 reviews
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="map">
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <div className="h-[500px] rounded-lg overflow-hidden">
                                        <MapComponent
                                            hotels={[hotel]}
                                            onHotelSelect={() => null}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Location Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                                                <p className="text-gray-600">{hotel.address}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">Zone</h4>
                                                <p className="text-gray-600">{hotel.zoneName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="similar">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {similarHotels.map((similarHotel) => (
                                        <div key={similarHotel.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
                                            <div className="h-48 relative">
                                                {similarHotel.images.length > 0 ? (
                                                    <Image
                                                        src={similarHotel.images[0]}
                                                        alt={similarHotel.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                                                        <Building size={32} className="text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-lg text-gray-800">{similarHotel.name}</h3>
                                                    <div className="flex items-center">
                                                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                                        <span className="ml-1 font-medium">{similarHotel.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 flex items-center text-gray-600 text-sm">
                                                    <MapPin size={14} className="mr-1" />
                                                    <span className="truncate">{similarHotel.zoneName}</span>
                                                </div>
                                                <div className="mt-3 flex flex-wrap gap-1">
                                                    {similarHotel.amenities.slice(0, 3).map((amenity, i) => (
                                                        <Badge key={i} variant="secondary" className="text-xs">
                                                            {amenity}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="mt-4 flex justify-between items-center">
                                                    <div>
                                                        <span className="text-xl font-bold"></span>
                                                        <span className="text-gray-500 text-sm ml-1">/night</span>
                                                    </div>
                                                    <Button variant="outline" size="sm">
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="details">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Policies</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-800 mb-2">Check-in & Check-out</h4>
                                                <div className="text-gray-600">
                                                    <p>Check-in: 3:00 PM</p>
                                                    <p>Check-out: 12:00 PM</p>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-800 mb-2">Cancellation Policy</h4>
                                                <p className="text-gray-600">Free cancellation up to 48 hours before check-in</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-800 mb-2">Children & Pets</h4>
                                                <p className="text-gray-600">Children of all ages are welcome</p>
                                                <p className="text-gray-600 mt-2">Pets are not allowed</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-gray-800 mb-2">Payment</h4>
                                                <p className="text-gray-600">We accept all major credit cards</p>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Facilities</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {hotel.facilities?.map((facility: string, index: number) => (
                                                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                                    <div className="text-blue-500">
                                                        {amenityIcons[facility] || <Wifi size={18} />}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">{facility}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Location</h3>
                                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                                            <MapComponent
                                                hotels={[hotel]}
                                                onHotelSelect={() => null}
                                            />
                                        </div>
                                        <div className="mt-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-gray-500" />
                                                <span className="text-gray-700">{hotel.address}</span>
                                            </div>
                                            <div className="mt-3">
                                                <h4 className="font-medium text-gray-800 mb-2">Zone: {hotel.zoneName}</h4>
                                                <p className="text-gray-600">{hotel.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>

            {/* Image Slider Modal */}
            {showImageSlider && hotel.images.length > 0 && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center">
                    <button
                        onClick={() => setShowImageSlider(false)}
                        className="absolute top-6 right-6 z-50 rounded-full bg-white p-2 transition-all hover:scale-105"
                    >
                        <X size={24} className="text-gray-700" />
                    </button>

                    <div className="w-full max-w-4xl px-4">

                    </div>
                </div>
            )}
        </div>
    )
}

export default HotelDetails;