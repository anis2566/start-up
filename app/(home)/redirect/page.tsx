"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const ReidrectPage = () => {
    const searchParams = useSearchParams()
    const redirectUrl = searchParams.get("redirectUrl")


    useEffect(() => {
        if (redirectUrl !== null) {
            window.location.href = redirectUrl
        } else {
            window.location.href = "/"
        }
    }, [redirectUrl])

    return (
        <div className="w-full h-screen flex items-center justify-center text-muted-foreground">
            Redirecting.......
        </div>
    )
}

export default ReidrectPage