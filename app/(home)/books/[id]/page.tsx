import { redirect } from "next/navigation";
import { Metadata } from "next";

import { db } from "@/lib/prisma";
import { BookThumbnail } from "./_components/book-thmubnail";
import BookDetails from "./_components/book-details";
import RelatedBooks from "./_components/related-books";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Preview } from "@/components/preview";
import Specification from "./_components/specification";
import { Author } from "./_components/author";


interface Props {
    params: {
        id: string;
    }
}

export const metadata: Metadata = {
    title: "BookGhor | Book Details",
    description: "Book details.",
};

const Book = async ({ params }: Props) => {
    const book = await db.book.findUnique({
        where: {
            id: params.id,
        },
        include: {
            author: true,
            category: true,
            subCategory: true,
            publication: true,
        }
    })

    if (!book) return redirect("/books");

    return (
        <div className="px-3 md:px-0 mt-4 space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
                <div className="md:col-span-3 grid md:grid-cols-3 gap-3 p-2">
                    <BookThumbnail imageUrl={book.imageUrl} />
                    <BookDetails book={book} />
                </div>
                <div className="p-2 border-l border-gray-200 dark:border-gray-800">
                    <RelatedBooks categoryId={book.categoryId} subCategoryId={book.subCategoryId} />
                </div>
            </div>
            <Tabs defaultValue="summary" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="summary" className="px-1.5 md:px-3">Summary</TabsTrigger>
                    <TabsTrigger value="specification" className="px-1.5 md:px-3">Specification</TabsTrigger>
                    <TabsTrigger value="author" className="px-1.5 md:px-3">Author</TabsTrigger>
                    <TabsTrigger value="reviews" className="px-1.5 md:px-3">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="summary">
                    <Preview value={book.description} />
                </TabsContent>
                <TabsContent value="specification">
                    <Specification book={book} />
                </TabsContent>
                <TabsContent value="author">
                    <Author author={book.author} />
                </TabsContent>
                <TabsContent value="reviews">Change your aut here.</TabsContent>
            </Tabs>

        </div>
    )
}

export default Book
