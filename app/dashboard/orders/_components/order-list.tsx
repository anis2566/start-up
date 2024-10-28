import { Order, OrderItem, Book, User, PaymentStatus, OrderStatus } from "@prisma/client";
import { EllipsisVertical, Eye, RefreshCcw } from "lucide-react";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface OrderItemWithBook extends OrderItem {
    book: Book;
}

interface OrderWithRelations extends Order {
    orderItems: OrderItemWithBook[];
    user: User;
}

interface Props {
    orders: OrderWithRelations[];
}

export const OrderList = ({ orders }: Props) => {

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Recepient</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>No of Item</TableHead>
                        <TableHead>Subtotal</TableHead>
                        <TableHead>Shipping</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <div className="flex items-center gap-x-3">
                                    <Avatar>
                                        <AvatarImage src={order.user.image || ""} alt={order.user.name || ""} />
                                        <AvatarFallback>
                                            {order.user.name?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p>{order.user.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.user.email}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{order.name}</TableCell>
                            <TableCell>{order.phone}</TableCell>
                            <TableCell>{order.orderItems.length}</TableCell>
                            <TableCell>৳{order.totalPrice}</TableCell>
                            <TableCell>৳{order.shippingCharge}</TableCell>
                            <TableCell>৳{order.totalPaidAmount}</TableCell>
                            <TableCell>
                                <Badge className="rounded-full" variant={order.paymentStatus === PaymentStatus.Paid ? "default" : order.paymentStatus === PaymentStatus.Failed ? "destructive" : "outline"}>
                                    {order.paymentStatus}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className="rounded-full" variant={order.status === OrderStatus.Pending ? "outline" : order.status === OrderStatus.Processing ? "outline" : order.status === OrderStatus.Shipped ? "secondary" : order.status === OrderStatus.Delivered ? "default" : "destructive"}>
                                    {order.status}
                                </Badge>
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
                                                href={`/dashboard/orders/${order.id}`}
                                                className="flex items-center gap-x-3"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/orders?open=changeStatus&id=${order.id}`} className="flex items-center gap-x-3">
                                                <RefreshCcw className="h-4 w-4" />
                                                <p>Change Status</p>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
