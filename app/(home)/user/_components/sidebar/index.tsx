import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@prisma/client";
import { SidebarNavs } from "./navs";

interface SidebarProps {
    user: User;
}

export const Sidebar = ({ user }: SidebarProps) => {
    return (
        <Card>
            <CardContent className="space-y-4 p-4">
                <div className="mx-auto flex h-[80px] w-[80px] items-center justify-center rounded-full border-2 border-dotted">
                    <Image
                        src={user.image || "/patient.png"}
                        alt={user.name || ""}
                        width={80}
                        height={80}
                        className="h-full w-full rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col items-center gap-y-1">
                    <h1 className="font-semibold">{user.name}</h1>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <SidebarNavs />
            </CardContent>
        </Card>
    )
}
