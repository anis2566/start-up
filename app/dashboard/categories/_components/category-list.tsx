"use client"

import { Category, CategoryStatus } from "@prisma/client";
import { BringToFront, EllipsisVertical, Eye, Pen, Trash2 } from "lucide-react";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useCategory } from "@/hooks/use-category";

interface Props {
    categories: Category[];
}

export const CategoryList = ({ categories }: Props) => {
    const { onOpen } = useCategory();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Books</TableHead>
                    <TableHead>Sub Categories</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={category.imageUrl} />
                                <AvatarFallback>
                                    {category.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{5}</TableCell>
                        <TableCell>{5}</TableCell>
                        <TableCell>
                            <Badge className="rounded-full" variant={category.status === CategoryStatus.Active ? "default" : "destructive"}>{category.status}</Badge>
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
                                            href={`/dashboard/categories/${category.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <Eye className="h-4 w-4" />
                                            View
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/dashboard/categories/${category.id}/sub`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <BringToFront className="h-4 w-4" />
                                            Sub Categories
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/dashboard/categories/edit/${category.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <Pen className="h-4 w-4" />
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="w-flex items-center gap-x-3"
                                        onClick={() => onOpen(category.id)}
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
