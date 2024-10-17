import { ShoppingCart } from "lucide-react"
import Link from "next/link"

import { TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Tooltip } from "@/components/ui/tooltip"

export const CartButton = () => {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href="/cart" className="relative mr-6 md:mr-0">
                        <ShoppingCart />
                        <div className="absolute -top-2 -right-4 rounded-full w-6 h-6 flex items-center justify-center text-xs text-white bg-red-500">5</div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>View your cart</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

