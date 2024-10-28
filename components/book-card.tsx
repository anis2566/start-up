import { Book, Author } from "@prisma/client";
import Image from "next/image";

interface BookWithRelations extends Book {
    author: Author;
}

interface Props {
    book: BookWithRelations;
}

export const BookCard = ({ book }: Props) => {
    return (
        <div>
            <Image src={book.imageUrl} alt={book.name} width={80} height={80} />
        </div>
    )
} 