"use client"

// Next
import { useSearchParams } from "next/navigation"
// Components
import Header from "@/components/flights/Header"
import HomeFlightsSearch from "@/components/flights/HomeFlightsSearch"

export default function FlightsTo() {

    const searchParams = useSearchParams();
    const destinationCode = searchParams.get("destination") || '';

    return (
        <div>
            <Header />
            <section className="relative flex flex-col justify-center items-center min-h-screen text-white text-center overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div>
                        <div className="p-0 w-[80%] max-[767px]:w-[100%] mx-auto">
                            <HomeFlightsSearch
                                position="flights-to"
                                destinationCode={destinationCode}
                                originCode={'USA'}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}