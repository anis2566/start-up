"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rating } from "@smastrom/react-rating";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { ReviewSchema } from "@/schema/review.schema";
import { LoadingButton } from "@/components/loading-button";
import { useCreateReviewMutation } from "../../mutation";
import { useReview } from "@/hooks/use-review";


export const ReviewModal = () => {
    const { open, id, onClose } = useReview();

    const form = useForm<z.infer<typeof ReviewSchema>>({
        resolver: zodResolver(ReviewSchema),
        defaultValues: {
            rating: 0,
            content: "",
        },
    });

    const { mutate, isPending } = useCreateReviewMutation({ onClose, form, bookId: id });

    const onSubmit = async (values: z.infer<typeof ReviewSchema>) => {
        if (!id) return;
        mutate({
            values,
            bookId: id,
        });
    };

    return (
        <Dialog open={open && !!id} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Leave a Review</DialogTitle>
                    <DialogDescription>
                        Please leave a review for the book.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating</FormLabel>
                                    <FormControl>
                                        <Rating
                                            style={{ maxWidth: 180 }}
                                            value={field.value}
                                            onChange={field.onChange}
                                            transition="zoom"
                                            isDisabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Review</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={5} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <LoadingButton
                            type="submit"
                            isLoading={isPending}
                            loadingTitle="Submitting..."
                            title="Submit"
                            onClick={form.handleSubmit(onSubmit)}
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
