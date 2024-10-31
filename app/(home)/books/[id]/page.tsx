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

interface Props {
    params: {
        id: string;
    }
}

export const metadata: Metadata = {
    title: "BookGhor | Book Details",
    description: "Book details.",
};

// const randomBooks = [
//     {
//         name: "The Great Adventure",
//         imageUrl:
//             "https://utfs.io/f/WhglHonDBHFMwETzWQJVT9bOiZvqfLWRztu6K5B2J0YjQnlx",
//         shortDescription: "An exciting journey through the unknown.",
//         description:
//             "This book takes you on a thrilling adventure filled with unexpected twists and turns.",
//         status: BookStatus.Published,
//         price: 29.99,
//         discountPrice: 19.99,
//         length: 350,
//         edition: "First",
//         isbn: 1234567890,
//         rating: 4.5,
//         totalReview: 150,
//         totalSold: 300,
//         stock: 50,
//         authorId: "6710f4bd969a576fa1db7f2c",
//         categoryId: "6713ae9c3d27b3f508d0c450",
//         publicationId: "67111d1ee1be940fa0c7f395",
//     },
//     {
//         name: "Mystery of the Lost City",
//         imageUrl:
//             "https://utfs.io/f/WhglHonDBHFMwETzWQJVT9bOiZvqfLWRztu6K5B2J0YjQnlx",
//         shortDescription: "Unravel the secrets of a forgotten civilization.",
//         description:
//             "A captivating tale that explores the mysteries of an ancient city.",
//         status: BookStatus.Published,
//         price: 24.99,
//         discountPrice: null,
//         length: 400,
//         edition: "Second",
//         isbn: 2345678901,
//         rating: 4.0,
//         totalReview: 200,
//         totalSold: 150,
//         stock: 30,
//         authorId: "6710f4bd969a576fa1db7f2c",
//         categoryId: "6713ae9c3d27b3f508d0c450",
//         publicationId: "67111d1ee1be940fa0c7f395",
//     },
//     {
//         name: "Journey to the Center of the Earth",
//         imageUrl:
//             "https://utfs.io/f/WhglHonDBHFMwETzWQJVT9bOiZvqfLWRztu6K5B2J0YjQnlx",
//         shortDescription: "A thrilling expedition beneath the Earth's surface.",
//         description:
//             "Join the adventure as explorers delve into the depths of the Earth.",
//         status: BookStatus.Published,
//         price: 19.99,
//         discountPrice: 14.99,
//         length: 300,
//         edition: "First",
//         isbn: 3456789012,
//         rating: 4.8,
//         totalReview: 250,
//         totalSold: 500,
//         stock: 100,
//         authorId: "6710f4bd969a576fa1db7f2c",
//         categoryId: "6713ae9c3d27b3f508d0c450",
//         publicationId: "67111d1ee1be940fa0c7f395",
//     },
//     {
//         name: "The Secrets of Time Travel",
//         imageUrl:
//             "https://utfs.io/f/WhglHonDBHFMwETzWQJVT9bOiZvqfLWRztu6K5B2J0YjQnlx",
//         shortDescription: "Exploring the possibilities of time travel.",
//         description:
//             "A fascinating look into the theories and implications of time travel.",
//         status: BookStatus.Published,
//         price: 34.99,
//         discountPrice: null,
//         length: 450,
//         edition: "Second",
//         isbn: 4567890123,
//         rating: 4.2,
//         totalReview: 180,
//         totalSold: 220,
//         stock: 40,
//         authorId: "6710f4bd969a576fa1db7f2c",
//         categoryId: "6713ae9c3d27b3f508d0c450",
//         publicationId: "67111d1ee1be940fa0c7f395",
//     },
//     {
//         name: "The Art of Cooking",
//         imageUrl:
//             "https://utfs.io/f/WhglHonDBHFMwETzWQJVT9bOiZvqfLWRztu6K5B2J0YjQnlx",
//         shortDescription: "Master the culinary arts with this comprehensive guide.",
//         description: "A complete guide to cooking techniques, recipes, and tips.",
//         status: BookStatus.Published,
//         price: 39.99,
//         discountPrice: 29.99,
//         length: 500,
//         edition: "First",
//         isbn: 5678901234,
//         rating: 4.7,
//         totalReview: 300,
//         totalSold: 600,
//         stock: 80,
//         authorId: "6710f4bd969a576fa1db7f2c",
//         categoryId: "6713ae9c3d27b3f508d0c450",
//         publicationId: "67111d1ee1be940fa0c7f395",
//     },
//     {
//         name: "The Science of Happiness",
//         imageUrl:
//             "https://utfs.io/f/WhglHonDBHFMwETzWQJVT9bOiZvqfLWRztu6K5B2J0YjQnlx",
//         shortDescription: "Discover the secrets to a happier life.",
//         description:
//             "An exploration of the science behind happiness and well-being.",
//         status: BookStatus.Published,
//         price: 29.99,
//         discountPrice: null,
//         length: 320,
//         edition: "First",
//         isbn: 6789012345,
//         rating: 4.3,
//         totalReview: 150,
//         totalSold: 180,
//         stock: 60,
//         authorId: "6710f4bd969a576fa1db7f2c",
//         categoryId: "6713ae9c3d27b3f508d0c450",
//         publicationId: "67111d1ee1be940fa0c7f395",
//     },
//     {
//         name: "The History of Art",
//         imageUrl:
//             "https://utfs.io/f/WhglHonDBHFMwETzWQJVT9bOiZvqfLWRztu6K5B2J0YjQnlx",
//         shortDescription: "A comprehensive overview of art history.",
//         description:
//             "Explore the evolution of art from ancient times to the modern era.",
//         status: BookStatus.Published,
//         price: 49.99,
//         discountPrice: 39.99,
//         length: 600,
//         edition: "First",
//         isbn: 7890123456,
//         rating: 4.9,
//         totalReview: 400,
//         totalSold: 700,
//         stock: 20,
//         authorId: "6710f4bd969a576fa1db7f2c",
//         categoryId: "6713ae9c3d27b3f508d0c450",
//         publicationId: "67111d1ee1be940fa0c7f395",
//     },
//     {
//         name: "The Future of Technology",
//         imageUrl:
//             "https://utfs.io/f/WhglHonDBHFMwETzWQJVT9bOiZvqfLWRztu6K5B2J0YjQnlx",
//         shortDescription: "A look into the technological advancements of tomorrow.",
//         description:
//             "An insightful exploration of future technologies and their impact.",
//         status: BookStatus.Published,
//         price: 44.99,
//         discountPrice: null,
//         length: 480,
//         edition: "Second",
//         isbn: 8901234567,
//         rating: 4.6,
//         totalReview: 220,
//         totalSold: 350,
//         stock: 90,
//         authorId: "6710f4bd969a576fa1db7f2c",
//         categoryId: "6713ae9c3d27b3f508d0c450",
//         publicationId: "67111d1ee1be940fa0c7f395",
//     },
//     {
//         name: "The Secrets of the Universe",
//         imageUrl:
//             "https://utfs.io/f/WhglHonDBHFMwETzWQJVT9bOiZvqfLWRztu6K5B2J0YjQnlx",
//         shortDescription: "Unlock the mysteries of the cosmos.",
//         description:
//             "A deep dive into the secrets of the universe and its wonders.",
//         status: BookStatus.Published,
//         price: 59.99,
//         discountPrice: 49.99,
//         length: 720,
//         edition: "First",
//         isbn: 9012345678,
//         rating: 4.8,
//         totalReview: 500,
//         totalSold: 800,
//         stock: 10,
//         authorId: "6710f4bd969a576fa1db7f2c",
//         categoryId: "6713ae9c3d27b3f508d0c450",
//         publicationId: "67111d1ee1be940fa0c7f395",
//     },
//     {
//         name: "The Power of Mindfulness",
//         imageUrl:
//             "https://utfs.io/f/WhglHonDBHFMwETzWQJVT9bOiZvqfLWRztu6K5B2J0YjQnlx",
//         shortDescription: "Learn the art of mindfulness and meditation.",
//         description:
//             "A guide to achieving peace and clarity through mindfulness practices.",
//         status: BookStatus.Published,
//         price: 34.99,
//         discountPrice: null,
//         length: 300,
//         edition: "First",
//         isbn: 1234567891,
//         rating: 4.4,
//         totalReview: 180,
//         totalSold: 220,
//         stock: 40,
//         authorId: "6710f4bd969a576fa1db7f2c",
//         categoryId: "6713ae9c3d27b3f508d0c450",
//         publicationId: "67111d1ee1be940fa0c7f395",
//     },
// ];

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
