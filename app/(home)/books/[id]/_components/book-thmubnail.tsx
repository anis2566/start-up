import Image from "next/image"

interface Props {
    imageUrl: string;
}

export const BookThumbnail = ({ imageUrl }: Props) => {
    return (
        <div className="border rounded-md px-2 py-4 flex items-center justify-center">
            <Image
                src={imageUrl}
                alt="book-thumbnail"
                width={200}
                height={200}
            />
        </div>
    )
}