import Search from "@/components/common/Search"

const Hero = () => {
    // const t = useTranslations("Hero")

    return (
        <section className="hero relative flex flex-col justify-center items-center min-h-screen text-white text-center overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <Search />
            </div>
        </section>
    )
}

export default Hero;