import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";
import { Metadata } from "next";
import { BookThumbnail } from "./_components/book-thmubnail";
import { Layers3, UserRoundPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Props {
    params: {
        id: string;
    }
}

export const metadata: Metadata = {
    title: "BookGhor | Book Details",
    description: "Book details.",
};

const BookDetails = async ({ params }: Props) => {
    const book = await db.book.findUnique({
        where: {
            id: params.id,
        },
        include: {
            author: true,
            category: true,
            subCategory: true,
        }
    })

    if (!book) return redirect("/books");

    return (
        <div className="px-3 md:px-0 grid md:grid-cols-3 gap-6 mt-4">
            <div className="md:col-span-2 grid md:grid-cols-3 gap-3 p-2">
                <BookThumbnail imageUrl={book.imageUrl} />
                <div className="md:col-span-2 space-y-3">
                    <h1 className="text-xl font-semibold text-gray-700 dark:text-accent-foreground">{book.name}</h1>
                    <p className="text-sm text-muted-foreground truncate">{book?.shortDescription}</p>

                    <div className="flex items-center gap-2">
                        <UserRoundPen className="w-4 h-4 text-muted-foreground" />
                        <Link href={`/authors/${book.author.id}`} className="text-sm text-primary hover:underline">{book.author.name}</Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Layers3 className="w-4 h-4 text-muted-foreground" />
                        <div className="flex items-center gap-x-2">
                            {
                                book.subCategoryId && (
                                    <Badge className="rounded-full">{book.subCategory?.name}</Badge>
                                )
                            }
                            <p>in</p>
                            <Link href={`/categories/${book.category.id}`} className="text-sm text-primary hover:underline">{book.category.name}</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>ljalf</div>
        </div>
    )
}

export default BookDetails
