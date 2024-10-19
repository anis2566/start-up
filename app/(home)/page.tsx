import { ModeToggle } from "@/components/mode-toggle"
import { Slider } from "./_components/slider"
import { Category } from "./_components/category"

const Home = () => {
  return (
    <div className="mt-4 space-y-10">
      <Slider />
      <Category />
      <ModeToggle />
    </div>
  )
}

export default Home
