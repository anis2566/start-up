"use client";

import { Author, AuthorStatus } from "@prisma/client";
import { EllipsisVertical, Pen, Trash2, Eye } from "lucide-react";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { EmptyData } from "@/components/empty-data";
import { useAuthor } from "@/hooks/use-authro";

interface Props {
    authors: Author[];
}

export const AuthorList = ({ authors }: Props) => {
    const { onOpen } = useAuthor();

    if (authors.length === 0) {
        return <EmptyData title="No authors found" />;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total Books</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {authors.map((author) => (
                    <TableRow key={author.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={author.imageUrl} alt={author.name} />
                                <AvatarFallback>
                                    {author.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{author.name}</TableCell>
                        <TableCell>{author.email}</TableCell>
                        <TableCell>{5}</TableCell>
                        <TableCell>{5}</TableCell>
                        <TableCell>
                            <Badge className="rounded-full" variant={author.status === AuthorStatus.Pending ? "outline" : author.status === AuthorStatus.Active ? "default" : "destructive"}>{author.status}</Badge>
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
                                            href={`/dashboard/authors/${author.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <Eye className="h-4 w-4" />
                                            View
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/dashboard/authors/edit/${author.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <Pen className="h-4 w-4" />
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="w-flex items-center gap-x-3"
                                        onClick={() => onOpen(author.id)}
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
}
