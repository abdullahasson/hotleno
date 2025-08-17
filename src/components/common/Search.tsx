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
        <div className="bg-white w-[80%] max-[767px]:w-[100%] mx-auto">
            <Tabs defaultValue="flights" className="!gap-0">
                <TabsList className="!rounded-none bg-white !pb-0">
                    <TabsTrigger value="flights">{t("Tabs.flights")}</TabsTrigger>
                    <TabsTrigger value="hotels">{t("Tabs.hotels")}</TabsTrigger>
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