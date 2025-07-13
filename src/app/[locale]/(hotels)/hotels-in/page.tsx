// Components
import Header from "@/components/flights/Header"
import HomeHotelsSearch from "@/components/hotels/HomeHotelsSearch"

export default function HotelsIn() {
    return (
        <div>
            <Header />
            <section className="relative flex flex-col justify-center items-center min-h-screen text-white text-center overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div>
                        <div className="p-0 w-[80%] max-[767px]:w-[100%] mx-auto">
                            <HomeHotelsSearch
                                // position="hotels-in"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}