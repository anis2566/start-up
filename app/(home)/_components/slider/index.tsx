"use client"

import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export const Slider = () => {
    return (
        <div className="w-full px-2 md:px-0">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                className="w-full max-h-[300px] relative"
            >
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <Image src={`/slider-1.jpg`} alt={`Slider ${index + 1}`} width={1000} height={194} className="w-full h-full object-cover" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-50" />
                <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-50" />
            </Carousel>
        </div>
    )
}