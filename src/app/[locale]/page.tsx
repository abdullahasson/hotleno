// components
import { HeroHeader } from "@/components/common/header"
import Hero from "./_section/hero"
import FooterSection from "@/components/common/footer"

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <Hero />
      <FooterSection />
    </div>
  )
}