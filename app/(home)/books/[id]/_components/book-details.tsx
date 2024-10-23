"use client"

import { Author, Book, Category, SubCategory, Publication } from "@prisma/client";
import Link from "next/link";
import { Layers3, UserRoundPen, Eye, ShoppingCart, Files, BookOpen, FilePenLine } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { savingsPercentage } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

interface BookWithRelations extends Book {
    category: Category;
    subCategory: SubCategory | null;
    author: Author;
    publication: Publication;
}

export default function BookDetails({ book }: { book: BookWithRelations }) {
    const { addToCart } = useCart();

    const handleAddToCart = (book: BookWithRelations) => {
        addToCart({ book, price: book.discountPrice ?? book.price, quantity: 1 });
        toast.success("Added to cart");
    }

    return (
        <div className="md:col-span-2 space-y-4">
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
                            <Badge variant="outline" className="rounded-full">{book.subCategory?.name}</Badge>
                        )
                    }
                    <p>in</p>
                    <Link href={`/categories/${book.category.id}`} className="text-sm text-muted-foreground hover:underline">{book.category.name}</Link>
                </div>
            </div>
            <div className="flex items-center gap-x-2">
                <Rating style={{ maxWidth: 70 }} value={4.5} readOnly />
                <Separator orientation="vertical" className="h-4" />
                <p className="text-sm text-muted-foreground">({book.totalReview} reviews)</p>
            </div>
            <div className="flex items-center gap-x-2">
                <p className="tracking-wider text-rose-500 line-through text-xl">৳{book?.price}</p>
                <p className="tracking-wider text-2xl">৳{book.discountPrice}</p>
                <p className="tracking-wider text-sm text-green-500">
                    {
                        book.discountPrice && (
                            <>
                                ({savingsPercentage(book.price, book.discountPrice)}% off)
                            </>
                        )
                    }
                </p>
            </div>
            {
                book.stock > 0 ? (
                    <div className="flex items-center gap-x-2">
                        <Badge variant="default" className="rounded-full">In Stock</Badge>
                        <p className="text-sm text-muted-foreground">({book.stock} copy left)</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-x-2">
                        <Badge variant="destructive" className="rounded-full">Out of Stock</Badge>
                    </div>
                )
            }

            <div className="p-2 w-full flex gap-x-6">
                <div className="flex flex-col gap-y-1 justify-center items-center">
                    <p className="text-xs text-muted-foreground">Total Pages</p>
                    <Files className="w-6 h-6 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{book.length} Pages</p>
                </div>
                <div className="flex flex-col gap-y-1 justify-center items-center">
                    <p className="text-xs text-muted-foreground">Edition</p>
                    <FilePenLine className="w-6 h-6 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{book.edition} Edition</p>
                </div>
                <div className="flex flex-col gap-y-1 justify-center items-center">
                    <p className="text-xs text-muted-foreground">Publication</p>
                    <BookOpen className="w-6 h-6 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground truncate">{book.publication.name.split(" ").slice(0, 2).join(" ")}</p>
                </div>
            </div>

            {/* <div className="flex items-center gap-x-2">

            </div> */}
            <div className="flex items-center gap-x-2">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="lg" className="px-5">
                                <Eye className="w-4 h-4 mr-2" />
                                <span>একটু পড়ুন</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View book</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="default" size="lg" className="px-5" onClick={() => handleAddToCart(book)}>
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                <span>Add to Cart</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add to cart</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}
