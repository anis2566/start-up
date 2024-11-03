import { Separator } from "@/components/ui/separator"

import { Logo } from "@/components/logo"
import { Search } from "./search"
import { SignInButton } from "./sign-in-button"
import { SellerButton } from "./seller-button"
import { CartButton } from "./cart-button"
import { WishlistButton } from "./wishlist-button"
import { auth } from "@/auth"
import { UserButton } from "./user-button"

export const Header = async () => {
    const session = await auth();

    return (
        <div className="w-full py-2 sticky top-0 z-50 bg-background">
            <div className="w-full flex items-center justify-between gap-x-3 px-2">
                <Logo callbackUrl="/" />
                <Search className="hidden md:flex" />
                {
                    session?.userId ? (
                        <UserButton />
                    ) : (
                        <>
                            <SignInButton className="hidden md:flex" />
                        </>
                    )
                }
                <SellerButton className="hidden md:flex" />
                <Separator className="hidden md:block h-6" orientation="vertical" />
                <div className="flex items-center gap-x-2">
                    <SignInButton className="flex md:hidden" />
                    <WishlistButton />
                    <CartButton />
                </div>
            </div>
        </div>
    )
}
