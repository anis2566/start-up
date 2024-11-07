import { redirect } from "next/navigation";
import { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { db } from "@/lib/prisma";
import { BookThumbnail } from "./_components/book-thmubnail";
import BookDetails from "./_components/book-details";
import RelatedBooks from "./_components/related-books";
import { Preview } from "@/components/preview";
import Specification from "./_components/specification";
import { Author } from "./_components/author";
import { Reviews } from "./_components/reveiws";
import { DeliveryBanner } from "@/components/delivery-banner";
import { SimilarCategoryBooks } from "./_components/similar-category-books";
import { QuestionAnswer } from "./_components/question-answer";
import { BookStatus, Language } from "@prisma/client";

// const dummyBooks = Array.from({ length: 10 }, () => ({
//     name: ['নির্বাসন (হার্ডকভার)', 'আত্মজীবনী', 'মহাকাব্য', 'অচেনা পথ', 'শেষের কবিতা', 'অপরিচিত', 'জীবনানন্দ', 'বিসর্জন', 'নির্জন দ্বীপ', 'আশ্রয়'][Math.floor(Math.random() * 10)],
//     // nameBangla: ['nirbaasn (haarddkbhaar)', 'aattmjibanii', 'mohakaabya', 'achenaa poth', 'shesher kobita', 'oporicito', 'jibonaanondo', 'bishorjon', 'nirjon deep', 'aashroy'][Math.floor(Math.random() * 10)],
//     imageUrl: 'https://utfs.io/f/WhglHonDBHFMef2EB5z08rkwNaemCVGzbWfpFnlHZOMUt5hT',
//     shortDescription: ['A gripping tale of mystery', 'An insightful autobiography', 'A journey of discovery', 'A classic romance novel', 'An intense thriller', 'An inspiring story', 'A remarkable adventure', 'An iconic drama', 'A haunting narrative', 'A poetic journey'][Math.floor(Math.random() * 10)],
//     description: '<p><span style="color: rgb(31, 31, 31);">This is a dynamic and intriguing book description full of life and emotions, exploring deep and personal narratives.</span></p>',
//     status: BookStatus.Published,
//     price: Math.floor(Math.random() * 100) + 50,
//     discountPrice: Math.floor(Math.random() * 50) + 20,
//     discountPercent: Math.floor(Math.random() * 30),
//     length: Math.floor(Math.random() * 200) + 100,
//     edition: ['1st', '2nd', '3rd', '4th'][Math.floor(Math.random() * 4)],
//     rating: Math.floor(Math.random() * 5) + 1,
//     totalReview: Math.floor(Math.random() * 100),
//     totalSold: Math.floor(Math.random() * 500),
//     stock: Math.floor(Math.random() * 200),
//     demoPdfUrl: 'https://utfs.io/f/WhglHonDBHFMwvtQbpVT9bOiZvqfLWRztu6K5B2J0YjQnlxs',
//     language: Language.Bangla,
//     authorId: '672c83cf0866d8f0d800eb4a',
//     categoryId: '672c83e40866d8f0d800eb4b',
//     subCategoryId: '672c89c50866d8f0d800eb4e',
//     publicationId: '672c83f20866d8f0d800eb4c',
//     sellerId: '672c836e0866d8f0d800eb49',

// }));

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
            reviews: {
                select: {
                    id: true,
                }
            },
        }
    })

    if (!book) return redirect("/books");

    return (
        <div className="px-4 md:px-0 mt-4 space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
                <div className="md:col-span-3 grid md:grid-cols-3 gap-3 p-2 justify-items-center">
                    <BookThumbnail imageUrl={book.imageUrl} />
                    <BookDetails book={book} />
                </div>
                <div className="p-2 border-l border-gray-200 dark:border-gray-800">
                    <RelatedBooks categoryId={book.categoryId} subCategoryId={book.subCategoryId} />
                </div>
            </div>

            <DeliveryBanner />

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
                <TabsContent value="reviews">
                    <Reviews bookId={book.id} rating={book.rating} reviewsCount={book.reviews.length} />
                </TabsContent>
            </Tabs>

            <SimilarCategoryBooks categoryId={book.categoryId} />

            <QuestionAnswer bookId={book.id} />
        </div>
    )
}

export default Book
