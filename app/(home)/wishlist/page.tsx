"use client";

import Image from "next/image";
import Link from "next/link";
import { Rating } from "@smastrom/react-rating";
import { ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Book, Author } from "@prisma/client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

interface BookWithAuthor extends Book {
    author: Author;
}

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (book: BookWithAuthor) => {
        addToCart({ book, price: book.discountPrice ?? book.price, quantity: 1 });
        toast.success("Added to cart");
        removeFromWishlist(book.id);
    }

    const handleRemoveFromWishlist = (id: string) => {
        removeFromWishlist(id);
        toast.success("Removed from wishlist");
    }

    if (wishlist.length === 0) {
        return <div className="mt-4 px-3 md:px-0 flex flex-col items-center justify-center h-[50vh]">
            <h1 className="text-2xl font-semibold">Your wishlist is empty</h1>
            <Button size="lg" className="mt-4" asChild>
                <Link href="/">Continue shopping</Link>
            </Button>
        </div>
    }

    return (
        <div className="mt-4 px-3 md:px-0">
            <Card>
                <CardHeader>
                    <CardTitle>Wishlist</CardTitle>
                    <CardDescription>
                        {wishlist.length} items in wishlist
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {wishlist.map((item) => (
                        <div key={item.id} className="flex justify-between">
                            <div className="flex gap-x-3">
                                <Image src={item.imageUrl} alt={item.name} width={100} height={100} />
                                <div className="flex flex-col gap-y-1">
                                    <Link href={`/books/${item.id}`} className="text-sm md:text-lg font-semibold hover:underline">{item.name}</Link>
                                    <Link href={`/authors/${item.author.id}`} className="text-sm text-muted-foreground hover:underline">{item.author.name}</Link>
                                    <div className="flex items-center gap-x-2">
                                        <Rating style={{ maxWidth: 70 }} value={4.5} readOnly />
                                        <Separator orientation="vertical" className="h-4" />
                                        <p className="text-sm text-muted-foreground">({item.totalReview} reviews)</p>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <p className="tracking-wider text-md">৳{item.discountPrice || item.price}</p>
                                        {item.discountPrice && (
                                            <p className="tracking-wider text-rose-500 line-through text-sm">৳{item.price}</p>
                                        )}
                                    </div>
                                    <TooltipProvider delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="lg" className="max-w-fit px-4" onClick={() => handleAddToCart(item)}>
                                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                                    <span>Add to Cart</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Add to cart
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveFromWishlist(item.id)}>
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Remove from wishlist
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div >
    )
}

export default Wishlist
