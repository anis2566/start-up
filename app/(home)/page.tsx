import { ModeToggle } from "@/components/mode-toggle"
import { Slider } from "./_components/slider"
import { Category } from "./_components/category"
import { TrendingBooks } from "./_components/trending"

const Home = () => {
  return (
    <div className="mt-4 space-y-12">
      <Slider />
      <Category />
      <TrendingBooks />
      <ModeToggle />
    </div>
  )
}

export default Home
