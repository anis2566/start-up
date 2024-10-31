import { BookPage } from "./_components/book-page"
import { transliterate as tr, slugify } from 'transliteration';

const Books = () => {
    console.log(tr("আসমান"));
    return (
        <div className="px-3 md:px-0 mt-4 pb-6">
            <BookPage />
        </div>
    )
}

export default Books
