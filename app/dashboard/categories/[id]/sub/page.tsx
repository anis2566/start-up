import { Metadata } from "next";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { db } from "@/lib/prisma";
import { SubCategoryList } from "./_components/sub-category-list";

interface Props {
    params: {
        id: string;
    }
}

export const metadata: Metadata = {
    title: "BookGhor | Categories | Sub Categories",
    description: "Sub Categories list.",
};

const SubCategory = async ({ params: { id } }: Props) => {
    const subCategories = await db.subCategory.findMany({
        where: {
            categoryId: id
        }
    })

    return (
        <ContentLayout title="Category">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/categories">Categories</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Sub Categories</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Button asChild>
                <Link href={`/dashboard/categories/${id}/sub/new`} className="flex items-center gap-x-3">
                    <PlusCircle />
                    <span>New</span>
                </Link>
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>Sub Categories</CardTitle>
                    <CardDescription>Manage and organize your sub categories.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SubCategoryList categoryId={id} subCategories={subCategories} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default SubCategory
