"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeleteAuthorMutation } from "../mutation";

export const DeleteAuthorModal = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const open = searchParams.get("open") === "deleteAuthor";

    const onClose = () => {
        router.push("/dashboard/authors");
    }

    const { mutate, isPending } = useDeleteAuthorMutation({ onClose });


    const handleDelete = () => {
        if (id) {
            mutate(id);
        }
    };

    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete author
                        and remove the data from your servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isPending}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
