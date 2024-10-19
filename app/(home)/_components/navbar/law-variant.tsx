"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { useGetSubCategories } from "../../query";

export const LawVariant = () => {
    const { data, isLoading } = useGetSubCategories("6713ac1b3d27b3f508d0c44c");

    if (isLoading) return <LawVariantSkeleton />;

    return (
        <div className="md:w-[1300px] h-[500px] flex flex-col justify-between">
            <div className="grid gap-3 p-4 grid-cols-4">
                {
                    data?.map((subCategory) => (
                        <Link href={`/categories/${subCategory.id}`} className="flex items-center gap-x-2 hover:text-muted-foreground transition-colors" key={subCategory.name}>
                            <p className="truncate">{subCategory.name}</p>
                        </Link>
                    ))
                }
            </div>
            <Link href="/categories" className={cn(buttonVariants({ variant: "link" }), "flex justify-center")}>আরো দেখুন</Link>
        </div>
    )
}


export const LawVariantSkeleton = () => {
    return (
        <div className="md:w-[1300px] h-[500px]">
            <div className="grid gap-3 p-4 grid-cols-4">
                {
                    Array.from({ length: 16 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-x-2 hover:text-muted-foreground transition-colors">
                            <Skeleton className="w-20 h-4" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
