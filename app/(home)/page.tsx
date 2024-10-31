import { ModeToggle } from "@/components/mode-toggle"
import { Slider } from "./_components/slider"
import { Category } from "./_components/category"
import { TrendingBooks } from "./_components/trending"
import { ForYou } from "./_components/for-you"
import { Discount } from "./_components/discount"
import { DeliveryBanner2 } from "@/components/delivery-banner-2"
import { RecentlyAdded } from "./_components/recently-added"
import { FeatureCategory } from "./_components/feature-category"

const Home = () => {
  return (
    <div className="mt-4 space-y-12">
      <Slider />
      <Category />
      <TrendingBooks />
      <DeliveryBanner2 />
      <ForYou />
      <Discount />
      <RecentlyAdded />
      <FeatureCategory />
      <ModeToggle />
    </div>
  )
}

export default Home
