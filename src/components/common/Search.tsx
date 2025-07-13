"use client";

// React
import { useState } from "react"
// Next Intl
import { useTranslations } from "next-intl";
// Components
import HomeFlightsSearch from "../flights/HomeFlightsSearch"
import HomeHotelssSearch from "../hotels/HomeHotelsSearch";

const Search = () => {
    const t = useTranslations("SearchHome");

    const [tab , setTab] = useState("flights")

    return (
        <div className="flex flex-col gap-0 p-0 w-[80%] max-[767px]:w-[100%] mx-auto">
            <div className="flex-1 flex items-center justify-start bg-white border-b border-gray-200 py-0 px-8 rounded-t-3xl">
                <button 
                    onClick={() => setTab('flights')} 
                    className={`text-gray-800 border-b-2 font-semibold py-4 px-8 rounded-none cursor-pointer hover:bg-gray-100 transition-all duration-300
                        ${tab === 'flights' ? "border-blue-500" : "border-b-transparent"}
                    `}
                >
                    {t("Tabs.flights")}
                </button>

                <button 
                    onClick={() => setTab('hotels')} 
                    className={`text-gray-800 border-b-2 font-semibold py-4 px-8 rounded-none cursor-pointer hover:bg-gray-100 transition-all duration-300
                        ${tab === 'hotels' ? "border-blue-500" : "border-b-transparent"}
                    `}
                >
                    {t("Tabs.hotels")}
                </button>
            </div>
            {tab === 'flights' ? <HomeFlightsSearch position="tab" /> : <HomeHotelssSearch />}
        </div>
    )
}

export default Search;