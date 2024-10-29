import { savingsPercentage } from "@/lib/utils";
import { Book, Author } from "@prisma/client";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import Link from "next/link";

interface BookWithRelations extends Book {
    author: Author;
}

interface Props {
    book: BookWithRelations;
}

export const BookCard = ({ book }: Props) => {
    return (
        <div className="border rounded-md p-2 max-w-[200px] space-y-2">
            <div className="relative aspect-square max-h-[150px] w-full">
                <Image src={book.imageUrl} alt={book.name} fill className="mx-auto object-contain" />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-semibold">{book.name}</p>
                <Link href={`/authors/${book.author.id}`} className="text-xs text-muted-foreground hover:underline">{book.author.name}</Link>
                <div className="flex items-center gap-x-2">
                    <Rating style={{ maxWidth: 70 }} value={4.5} readOnly />
                    <p className="text-sm text-muted-foreground">({book.totalReview})</p>
                </div>
                <div className="flex items-center gap-x-2">
                    <p className="tracking-wider text-rose-500 line-through text-sm">৳{book?.price}</p>
                    <p className="tracking-wider text-sm">৳{book.discountPrice}</p>
                </div>
            </div>
        </div>
    )
} 