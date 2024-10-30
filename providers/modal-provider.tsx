import { DeleteAuthorModal } from "@/app/dashboard/authors/_components/delete-modal";
import { DeleteCategoryModal } from "@/app/dashboard/categories/_components/delete-modal";
import { DeleteSubCategoryModal } from "@/app/dashboard/categories/[id]/sub/_components/delete-modal";
import { DeleteBookModal } from "@/app/dashboard/books/_components/delete-modal";
import { DeletePublicationModal } from "@/app/dashboard/publications/_components/delete-modal";
import { OrderStatusModal } from "@/app/dashboard/orders/_components/status-modal";
import { ReviewModal } from "@/app/(home)/books/[id]/_components/review.modal";
import { DeleteReviewModal } from "@/app/dashboard/reviews/_components/delete-modal";
import { QuestionModal } from "@/app/(home)/books/[id]/_components/question-modal";

export const ModalProvider = () => {
    return (
        <>
            <DeleteAuthorModal />
            <DeleteCategoryModal />
            <DeleteSubCategoryModal />
            <DeleteBookModal />
            <DeletePublicationModal />
            <OrderStatusModal />
            <ReviewModal />
            <DeleteReviewModal />
            {/* <QuestionModal /> */}
        </>
    );
};
