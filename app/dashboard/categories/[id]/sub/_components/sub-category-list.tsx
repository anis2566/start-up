"use client"

import { CategoryStatus, SubCategory } from "@prisma/client";
import { BookOpen, EllipsisVertical, Pen, Trash2 } from "lucide-react";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useSubCategory } from "@/hooks/use-sub-category";
import { EmptyData } from "@/components/empty-data";

interface Props {
    subCategories: SubCategory[];
    categoryId: string;
}

export const SubCategoryList = ({ subCategories, categoryId }: Props) => {
    const { onOpen } = useSubCategory();

    if (subCategories.length === 0) {
        return (
            <EmptyData title="No sub categories found" />
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Books</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {subCategories.map((subCategory) => (
                    <TableRow key={subCategory.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={subCategory.imageUrl ?? ""} />
                                <AvatarFallback>
                                    {subCategory.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{subCategory.name}</TableCell>
                        <TableCell>{5}</TableCell>
                        <TableCell>
                            <Badge className="rounded-full" variant={subCategory.status === CategoryStatus.Active ? "default" : "destructive"}>{subCategory.status}</Badge>
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
                                            href={`/dashboard/categories/${categoryId}/sub/${subCategory.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <BookOpen className="h-4 w-4" />
                                            View Books
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/dashboard/categories/${categoryId}/sub/edit/${subCategory.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <Pen className="h-4 w-4" />
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="w-flex items-center gap-x-3"
                                        onClick={() => onOpen(subCategory.id)}
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
