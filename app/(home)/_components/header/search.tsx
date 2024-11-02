"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";

import { PlaceholdersAndVanishInput } from "@/components/aceternity/placeholders-and-vanish-input";

import { cn } from "@/lib/utils";

const placeholders = [
    "Search for Books...",
    "Find an Book by title, author, or genre",
    "Discover new authors and bestsellers",
    "What do you want to read today?",
];

interface Props {
    className?: string
}

export function Search({ className }: Props) {
    const [search, setSearch] = useState<string>("");

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = queryString.stringifyUrl(
            {
                url: "/books",
                query: {
                    query: search,
                },
            },
            { skipEmptyString: true, skipNull: true },
        );

        router.push(url);
    };

    return (
        <div className={cn("flex-1", className)}    >
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
        </div>
    );
}
