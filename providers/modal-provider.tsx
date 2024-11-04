"use client";

import { DeleteAuthorModal } from "@/app/dashboard/authors/_components/delete-modal";
import { DeleteCategoryModal } from "@/app/dashboard/categories/_components/delete-modal";
import { DeleteSubCategoryModal } from "@/app/dashboard/categories/[id]/sub/_components/delete-modal";
import { DeleteBookModal } from "@/app/dashboard/books/_components/delete-modal";
import { DeletePublicationModal } from "@/app/dashboard/publications/_components/delete-modal";
import { OrderStatusModal } from "@/app/dashboard/orders/_components/status-modal";
import { ReviewModal } from "@/app/(home)/books/[id]/_components/review.modal";
import { DeleteReviewModal } from "@/app/dashboard/reviews/_components/delete-modal";
import { QuestionModal } from "@/app/(home)/books/[id]/_components/question-modal";
import { CartModal } from "@/app/(home)/cart/_components/cart-modal";
import { ReviewModalUser } from "@/app/(home)/user/reviews/_components/review-modal";
import { QuestionViewModal } from "@/app/(home)/user/questions/_components/question-view-modal";
import { ReplyModal } from "@/app/dashboard/questions/_components/reply-modal";
import { DeleteQuestionModal } from "@/app/dashboard/questions/_components/delete-modal";

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
            <ReviewModalUser />
            <DeleteReviewModal />
            <QuestionModal />
            <CartModal />
            <QuestionViewModal />
            <ReplyModal />
            <DeleteQuestionModal />
        </>
    );
};
