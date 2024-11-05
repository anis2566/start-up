import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Seller, User } from "@prisma/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface SellerWithUser extends Seller {
    user: User
}

interface RequestListProps {
    sellers: SellerWithUser[]
}

export const RequestList = ({ sellers }: RequestListProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sellers.map((seller) => (
                    <TableRow key={seller.id}>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage src={seller.user.image || ""} />
                                </Avatar>
                                <span>{seller.user.name}</span>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}