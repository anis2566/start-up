import { Slider } from "./_components/slider"
import { Category } from "./_components/category"
import { TrendingBooks } from "./_components/trending"
import { ForYou } from "./_components/for-you"
import { Discount } from "./_components/discount"
import { DeliveryBanner2 } from "@/components/delivery-banner-2"
import { RecentlyAdded } from "./_components/recently-added"
import { FeatureCategory } from "./_components/feature-category"
import { Newsletter } from "./_components/newsletter"
import { Footer } from "./_components/footer"
import { ShamsPublicationBook } from "./_components/shams-publication-book"
import { BestSellers } from "./_components/best-sellers"

const Home = () => {
  return (
    <div className="mt-4 space-y-12">
      <Slider />
      <Category />
      <TrendingBooks />
      <DeliveryBanner2 />
      <ForYou />
      <ShamsPublicationBook />
      <Discount />
      <FeatureCategory />
      <RecentlyAdded />
      <BestSellers />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home
