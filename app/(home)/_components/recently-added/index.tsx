"use client"

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { useGetRecentlyAdded } from "../../query";
import { BookCard, BookCardSkeleton } from "@/components/book-card";

export const RecentlyAdded = () => {
    const { data: recentlyAddedBooks, isLoading } = useGetRecentlyAdded();

    return <div className="px-3 md:px-0 space-y-5">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-600">Recently Added</h2>
            <Button variant="outline" size="sm">View All</Button>
        </div>

        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full relative"
        >
            <CarouselContent>
                {
                    isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <CarouselItem key={index} className="basis-1/2 md:basis-1/6">
                                <BookCardSkeleton />
                            </CarouselItem>
                        ))
                    ) : (
                        recentlyAddedBooks?.map((book) => (
                            <CarouselItem key={book.id} className="basis-1/2 md:basis-1/6">
                                <BookCard book={book} />
                            </CarouselItem>
                        ))
                    )
                }
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-50" />
            <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-50" />
        </Carousel>
    </div>;
};
