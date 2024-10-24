"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderStatus } from "@prisma/client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useOrder } from "@/hooks/use-order";
import { LoadingButton } from "@/components/loading-button";
import { useUpdateOrderStatusMutation } from "../mutation";

const formSchema = z.object({
    status: z.nativeEnum(OrderStatus)
        .refine((val) => Object.values(OrderStatus).includes(val), {
            message: "required",
        }),
});

interface Props {
    open: boolean;
    id: string;
    onClose: () => void;
}

export const OrderStatusModal = ({ open, id, onClose }: Props) => {

    const { mutate, isPending } = useUpdateOrderStatusMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: undefined,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        mutate({
            id,
            status: values.status,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Order Status</DialogTitle>
                    <DialogDescription>Change the status of the order</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        {...field}
                                        onValueChange={(value) => field.onChange(value as OrderStatus)}
                                        defaultValue={field.value}
                                        disabled={isPending}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(OrderStatus).map((status) => (
                                                <SelectItem key={status} value={status} disabled={status === OrderStatus.Pending}>
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <LoadingButton
                            isLoading={isPending}
                            title="Update Status"
                            loadingTitle="Updating..."
                            onClick={form.handleSubmit(onSubmit)}
                            type="submit"
                        />

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
};