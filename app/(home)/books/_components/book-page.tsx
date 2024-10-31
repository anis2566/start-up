"use client";

import { useSearchParams } from "next/navigation";
import { useGetBooks } from "../query";
import { BookCard } from "@/components/book-card";

export const BookPage = () => {
    const searchParams = useSearchParams();
    const author = searchParams.get("author") || null;

    const { books, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, total } = useGetBooks({ author });

    return (
        <div className="px-3 md:px-0 mt-4">
            <div className="flex gap-x-3 relative">
                <div className="hidden md:flex flex-col w-72 flex-shrink-0 border-r border-gray-200 absolute top-0 left-0 h-full">Filter</div>
                <div className="md:ml-72 pl-2 space-y-4">
                    <div className="text-md text-gray-500">{total} books found</div>
                    <div className="grid md:grid-cols-4 gap-4">
                        {
                            books.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
