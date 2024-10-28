"use client"

import { BookCard } from "@/components/book-card"
import { useGetSimilarCategoryBooks } from "../../query";

export const SimilarCategoryBooks = ({ categoryId }: { categoryId: string }) => {
    const { books, isFetching, status } = useGetSimilarCategoryBooks({ categoryId });

    return (
        <div className="pb-10">
            <h1 className="text-xl font-semibold text-gray-700 dark:text-accent-foreground">Similar Category Books</h1>

            <div className="grid md:grid-cols-3 gap-3">
                {
                    books?.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))
                }
            </div>
        </div>
    )
}