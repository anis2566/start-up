"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";
import { OrderStatus } from "@prisma/client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const Header = () => {
    const [perPage, setPerPage] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [status, setStatus] = useState<string | OrderStatus>("");

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePerPageChange = (perPage: string) => {
        setPerPage(perPage);
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    ...params,
                    perPage,
                },
            },
            { skipNull: true, skipEmptyString: true },
        );

        router.push(url);
    };

    const handleSortChange = (sort: string) => {
        setSort(sort);
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    ...params,
                    sort,
                },
            },
            { skipNull: true, skipEmptyString: true },
        );

        router.push(url);
    };


    const handleStatusChange = (status: OrderStatus) => {
        setStatus(status);
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    ...params,
                    status,
                },
            },
            { skipNull: true, skipEmptyString: true },
        );

        router.push(url);
    };

    const handleReset = () => {
        router.push(pathname);
        setPerPage("");
        setSort("");
        setStatus("");
    };

    return (
        <div className="hidden md:block space-y-2 p-2 shadow-sm shadow-primary">
            <div className="flex items-center gap-x-3 justify-between">
                <div className="flex flex-1 items-center gap-x-3">
                    <Select
                        value={status || ""}
                        onValueChange={(value) =>
                            handleStatusChange(value as OrderStatus)
                        }
                    >
                        <SelectTrigger className="w-full max-w-[130px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(OrderStatus).map((v, i) => (
                                <SelectItem value={v} key={i}>
                                    {v}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={sort}
                        onValueChange={(value) => handleSortChange(value)}
                    >
                        <SelectTrigger className="w-full max-w-[130px]">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">Newest</SelectItem>
                            <SelectItem value="asc">Oldest</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={perPage || ""}
                        onValueChange={(value) => handlePerPageChange(value)}
                    >
                        <SelectTrigger className="w-full max-w-[130px]">
                            <SelectValue placeholder="Limit" />
                        </SelectTrigger>
                        <SelectContent>
                            {["5", "10", "20", "50", "100", "200"].map((v, i) => (
                                <SelectItem value={v} key={i}>
                                    {v}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button variant="destructive" onClick={handleReset} size="sm">
                    Reset
                </Button>
            </div>
        </div>
    );
};