"use client";

import { DeleteAuthorModal } from "@/app/dashboard/authors/_components/delete-modal";
import { DeleteCategoryModal } from "@/app/dashboard/categories/_components/delete-modal";
import { DeleteSubCategoryModal } from "@/app/dashboard/categories/[id]/sub/_components/delete-modal";
import { DeleteBookModal } from "@/app/dashboard/books/_components/delete-modal";
import { OrderStatusModal } from "@/app/dashboard/orders/_components/status-modal";

export const ModalProvider = () => {
    return (
        <>
            <DeleteAuthorModal />
            <DeleteCategoryModal />
            <DeleteSubCategoryModal />
            <DeleteBookModal />
            <OrderStatusModal />
        </>
    );
};
