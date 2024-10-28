import { Publication, PublicationStatus } from "@prisma/client";
import { EllipsisVertical, Eye, Pen, Trash2 } from "lucide-react";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { EmptyData } from "@/components/empty-data";

interface PublicationWithBooks extends Publication {
    books: { id: string }[];
}


interface Props {
    publications: PublicationWithBooks[];
}

export const PublicationList = ({ publications }: Props) => {

    if (publications.length === 0) {
        return <EmptyData title="No publications found" />
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
                {publications.map((publication) => (
                    <TableRow key={publication.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={publication.imageUrl} />
                                <AvatarFallback>
                                    {publication.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{publication.name}</TableCell>
                        <TableCell>{publication.books.length}</TableCell>
                        <TableCell>
                            <Badge className="rounded-full" variant={publication.status === PublicationStatus.Active ? "default" : "destructive"}>{publication.status}</Badge>
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
                                            href={`/dashboard/publications/${publication.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <Eye className="h-4 w-4" />
                                            View
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/dashboard/publications/edit/${publication.id}`}
                                            className="flex items-center gap-x-3"
                                        >
                                            <Pen className="h-4 w-4" />
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/dashboard/publications?open=deletePublication&id=${publication.id}`} className="flex items-center gap-x-3">
                                            <Trash2 className="h-4 w-4 text-rose-500" />
                                            Delete
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
};
