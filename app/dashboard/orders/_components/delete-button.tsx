"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useOrder } from "@/hooks/use-order";

interface Props {
    id: string;
}

export const DeleteButton = ({ id }: Props) => {
    const { onOpen } = useOrder();
    return (
        <Button variant="ghost" className="h-8 w-full" onClick={() => onOpen(id)}>
            <RefreshCcw className="h-4 w-4" />
            <p>Change Status</p>
        </Button>
    )
}
