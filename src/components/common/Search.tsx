// Next Intl
import { useTranslations } from "next-intl";
// Components
import HomeFlightsSearch from "../flights/HomeFlightsSearch"
import HomeHotelssSearch from "../hotels/HomeHotelsSearch";
// UI
import {
    Tabs,
    TabsTrigger,
    TabsContent,
    TabsList
} from "../ui/tabs"

const Search = () => {
    const t = useTranslations("Homepage.Search");

    return (
        <div className="w-[80%] max-[767px]:w-[100%] mx-auto">
            <Tabs defaultValue="flights" className="!gap-0">
                <TabsList className="w-full bg-white !justify-end !pb-0 !rounded-t-2xl !rounded-b-none">
                    <TabsTrigger value="hotels" className="flex-[0]">{t("Tabs.hotels")}</TabsTrigger>
                    <TabsTrigger value="flights" className="flex-[0]">{t("Tabs.flights")}</TabsTrigger>
                </TabsList>
                <TabsContent value="flights" className="border-t border-gray-300">
                    <HomeFlightsSearch position="tab" />
                </TabsContent>
                <TabsContent value="hotels" className="border-t border-gray-300">
                    <HomeHotelssSearch />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Search;