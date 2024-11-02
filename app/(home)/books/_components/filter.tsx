import { Author, Language, Publication } from "@prisma/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { PriceFilter } from "./price-filter";
import { Sort } from "./sort";
import { AuthorList } from "./author-list";
import { PublicationList } from "./publication-list";
import { LanguageList } from "./lanugage-list";
import { StockFilter } from "./stock-filter";
import { DiscountFilter } from "./discount-filter";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";


interface FilterProps {
    authors: Author[]
    publications: Publication[]
    languages: Language[]
}

export const Filter = ({ authors, publications, languages }: FilterProps) => {
    const searchParams = useSearchParams();

    return (
        <div className="space-y-4 pr-4">
            <Sort />
            <StockFilter />
            <PriceFilter />
            <DiscountFilter />

            {/* <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-x-2 justify-between">
                        Filter
                        <Button variant="destructive">
                            Reset
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="authors">
                            <AccordionTrigger className="hover:no-underline">Authors</AccordionTrigger>
                            <AccordionContent>
                                <AuthorList authors={authors} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="publications">
                            <AccordionTrigger className="hover:no-underline">Publications</AccordionTrigger>
                            <AccordionContent>
                                <PublicationList publications={publications} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="language">
                            <AccordionTrigger className="hover:no-underline">Language</AccordionTrigger>
                            <AccordionContent>
                                <LanguageList languages={languages} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card> */}
        </div>
    )
}
