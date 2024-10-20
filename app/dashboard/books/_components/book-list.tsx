"use client";

import { Author, Book, BookStatus, Category, Publication } from "@prisma/client";
import { EllipsisVertical, Pen, Trash2 } from "lucide-react";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useBook } from "@/hooks/use-book";

interface BookWithRelations extends Book {
    category: Category;
    author: Author;
    publication: Publication;
}

interface Props {
    books: BookWithRelations[];
}

export const BookList = ({ books }: Props) => {
    const { onOpen } = useBook();

    return (
        <Table>
            <TableHeader>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Publisher</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Total Sold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
            </TableHeader>
            <TableBody>
                {books.map((book) => (
                    <TableRow key={book.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={book.imageUrl} alt={book.name} />
                                <AvatarFallback>{book.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{book.name}</TableCell>
                        <TableCell>{book.category.name}</TableCell>
                        <TableCell>{book.author.name}</TableCell>
                        <TableCell>{book.publication.name}</TableCell>
                        <TableCell>{book.price}</TableCell>
                        <TableCell>{book?.discountPrice}</TableCell>
                        <TableCell>{book.stock}</TableCell>
                        <TableCell>{book.totalSold}</TableCell>
                        <TableCell>
                            <Badge variant={book.status === BookStatus.Unpublished ? "destructive" : "default"} className="rounded-full">{book.status}</Badge>
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <EllipsisVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/dashboard/books/edit/${book.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <Pen className="h-4 w-4" />
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="w-flex items-center gap-x-3"
                                        onClick={() => onOpen(book.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-rose-500" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
};
