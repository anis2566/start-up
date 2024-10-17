"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { BookOpenIcon } from "lucide-react"
import { Authors } from "./authors"
import { Categories } from "./categories"
import { Publications } from "./publications"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

const publishers = [
    { name: "পাঞ্জেরী পাবলিকেশন্স লিঃ", imageUrl: "https://github.com/shadcn.png" },
    { name: "নেক্সাস পাবলিকেশন্স লিঃ", imageUrl: "https://github.com/shadcn.png" },
    { name: "জয়কলি পাবলিকেশন্স লিঃ", imageUrl: "https://github.com/shadcn.png" },
    { name: "সাইফুর'স", imageUrl: "https://github.com/shadcn.png" },
    { name: "এমপি থ্রি পাবলিকেশন্স", imageUrl: "https://github.com/shadcn.png" },
    { name: "অক্ষরপত্র প্রকাশনী", imageUrl: "https://github.com/shadcn.png" },
    { name: "দি রয়েল সায়েন্টিফিক পাবলিকেশন্স", imageUrl: "https://github.com/shadcn.png" },
    { name: "সেবা প্রকাশনী", imageUrl: "https://github.com/shadcn.png" },
    { name: "প্রথমা প্রকাশন", imageUrl: "https://github.com/shadcn.png" },
    { name: "বাংলা একাডেমি", imageUrl: "https://github.com/shadcn.png" },
    { name: "ঐতিহ্য", imageUrl: "https://github.com/shadcn.png" },
    { name: "ইসলামিক ফাউন্ডেশন", imageUrl: "https://github.com/shadcn.png" },
    { name: "বাতিঘর প্রকাশনী", imageUrl: "https://github.com/shadcn.png" },
    { name: "বিশ্বসাহিত্য কেন্দ্র", imageUrl: "https://github.com/shadcn.png" },
    { name: "অন্যপ্রকাশ", imageUrl: "https://github.com/shadcn.png" },
    { name: "আনন্দ পাবলিশার্স (ভারত)", imageUrl: "https://github.com/shadcn.png" },
    { name: "আদর্শ", imageUrl: "https://github.com/shadcn.png" },
    { name: "দি ইউনিভার্সিটি প্রেস লিমিটেড(ইউ পি এল)", imageUrl: "https://github.com/shadcn.png" },
    { name: "দে'জ পাবলিশিং (ভারত)", imageUrl: "https://github.com/shadcn.png" },
    { name: "সময় প্রকাশন", imageUrl: "https://github.com/shadcn.png" },
    { name: "তাম্রলিপি", imageUrl: "https://github.com/shadcn.png" },
    { name: "জ্ঞানকোষ প্রকাশনী", imageUrl: "https://github.com/shadcn.png" },
    { name: "আগামী প্রকাশনী", imageUrl: "https://github.com/shadcn.png" },
    { name: "পাঠক সমাবেশ", imageUrl: "https://github.com/shadcn.png" },
    { name: "বিসিএস প্রকাশন", imageUrl: "https://github.com/shadcn.png" },
    { name: "তাওহীদ পাবলিকেশন্স", imageUrl: "https://github.com/shadcn.png" },
    { name: "মিত্র ও ঘোষ পাবলিশার্স প্রাঃ লিঃ (ভারত)", imageUrl: "https://github.com/shadcn.png" },
    { name: "মাকতাবাতুল আযহার", imageUrl: "https://github.com/shadcn.png" },
    { name: "অনন্যা", imageUrl: "https://github.com/shadcn.png" },
    { name: "সিসটেক পাবলিকেশন্স", imageUrl: "https://github.com/shadcn.png" },
    { name: "সন্দেশ", imageUrl: "https://github.com/shadcn.png" },
    { name: "ঢাকা কমিক্স", imageUrl: "https://github.com/shadcn.png" },
    { name: "হারপারকলিন্স পাবলিশার্স", imageUrl: "https://github.com/shadcn.png" },
    { name: "এমদাদিয়া লাইব্রেরী", imageUrl: "https://github.com/shadcn.png" },
    { name: "পিয়ারসন", imageUrl: "https://github.com/shadcn.png" },
    { name: "লেকচার", imageUrl: "https://github.com/shadcn.png" }
];

export function Navbar() {
    return (
        <div className="border-b py-2">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>লেখক</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <Authors />
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>বিষয়</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <Categories />
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>প্রকাশনী</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <Publications />
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>ভর্তি প্রস্তুতি</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>আইন বিষয়ক বই</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                ইসলামি ভাষার বই
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                ই-বুক
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                IELTS বই
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                ডিসকাউন্ট বই
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
