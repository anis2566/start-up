import { Review, Book, User } from "@prisma/client";
import { EllipsisVertical, Trash2 } from "lucide-react";
import Link from "next/link";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface ReviewWithBookAndUser extends Review {
    book: Book;
    user: User;
}

interface ReviewListProps {
    reviews: ReviewWithBookAndUser[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reviews.map((review) => (
                    <TableRow key={review.id}>
                        <TableCell>{review.book.name.length > 40 ? `${review.book.name.slice(0, 40)}...` : review.book.name}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-x-3">
                                <Avatar>
                                    <AvatarImage src={review.user.image || ""} alt={review.user.name || ""} />
                                    <AvatarFallback>
                                        {review.user.name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p>{review.user.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {review.user.email}
                                    </p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{review.rating}</TableCell>
                        <TableCell>{review.content.length > 40 ? `${review.content.slice(0, 40)}...` : review.content}</TableCell>
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
                                        <Link href={`/dashboard/reviews?open=deleteReview&id=${review.id}`} className="flex items-center gap-x-3">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                            <p className="text-red-500">Delete</p>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
