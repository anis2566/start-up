import { DeleteAuthorModal } from "@/app/dashboard/authors/_components/delete-modal";
import { DeleteCategoryModal } from "@/app/dashboard/categories/_components/delete-modal";
import { DeleteSubCategoryModal } from "@/app/dashboard/categories/[id]/sub/_components/delete-modal";

export const ModalProvider = () => {
    return (
        <>
            <DeleteAuthorModal />
            <DeleteCategoryModal />
            <DeleteSubCategoryModal />
        </>
    );
};
