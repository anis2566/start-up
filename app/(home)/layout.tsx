import { Header } from "./_components/header"
import { Navbar } from "./_components/navbar"

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full max-w-screen-xl mx-auto flex flex-col">
            <Header />
            <Navbar />
            {children}
        </div>
    )
}

export default HomeLayout
