"use client"

import { Book, Author } from "@prisma/client";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";

import { savingsPercentage } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";


interface BookWithRelations extends Book {
    author: Author;
}

interface Props {
    book: BookWithRelations;
}

export const BookCard = ({ book }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        router.push(`${pathname}?open=checkout`);
        addToCart({ book, price: book.discountPrice ?? book.price, quantity: 1 });
        toast.success("Added to cart");
    }

    return (
        <Card className="w-full space-y-2">
            <CardContent className="px-2 py-3 group relative">
                <Link href={`/books/${book.id}`} className="w-full space-y-2">
                    <div className="relative aspect-square w-full max-h-[150px]">
                        <Image src={book.imageUrl} alt={book.name} fill className="mx-auto object-contain group-hover:scale-105 transition-all duration-300 group-hover:rotate-3" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-semibold">{book.name}</p>
                        <Link href={`/authors/${book.author.id}`} className="text-xs text-muted-foreground hover:underline">{book.author.name}</Link>
                        <div className="flex items-center gap-x-2">
                            <Rating style={{ maxWidth: 70 }} value={4.5} readOnly />
                            <p className="text-sm text-muted-foreground">({book.totalReview})</p>
                        </div>
                        {
                            book.stock > 0 ? (
                                <p className="text-sm text-green-500">In Stock</p>
                            ) : (
                                <p className="text-sm text-red-500">Out of Stock</p>
                            )
                        }
                    </div>
                </Link>
                {
                    book.discountPrice && (
                        <Badge className="absolute top-2 -left-2 -rotate-45 text-secondary-foreground" variant="default">
                            {savingsPercentage(book.price, book.discountPrice)}% off
                        </Badge>
                    )
                }
            </CardContent>
            <CardFooter className="flex justify-between items-center p-2">
                <div className="flex items-center gap-x-2">
                    <p className="tracking-wider text-rose-500 line-through text-sm">৳{book?.price}</p>
                    <p className="tracking-wider text-sm">৳{book.discountPrice}</p>

                </div>
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="default" size="icon" onClick={handleAddToCart}>
                                <ShoppingCart className="w-4 h-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add to cart</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
        </Card>
    )
}


export const BookCardSkeleton = () => {
    return (
        <Card className="w-full space-y-2">
            <CardContent className="px-2 py-3 group">
                <div className="relative aspect-square w-full max-h-[150px]">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="space-y-1">
                    <Skeleton className="h-4" />
                    <Skeleton className="h-3 w-1/2" />
                    <div className="flex items-center gap-x-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-10" />
                    </div>
                    <Skeleton className="h-4 w-1/4" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-2">
                <div className="flex items-center gap-x-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="h-8 w-8" />
            </CardFooter>
        </Card>
    )
}

