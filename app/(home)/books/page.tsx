import { db } from "@/lib/prisma";
import { BookPage } from "./_components/book-page"
import { BookStatus } from "@prisma/client";
import { savingsPercentage } from "@/lib/utils";

const Books = async () => {
    return (
        <div className="px-3 md:px-0 mt-4 pb-6">
            <BookPage />
        </div>
    )
}

export default Books
