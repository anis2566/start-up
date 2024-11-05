import React from "react";

import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer id="footer" className="container">
            <div className="rounded-2xl border bg-muted/50 p-10 dark:bg-card">
                <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-5">
                    <div className="col-span-full xl:col-span-2">
                        <Logo callbackUrl="/" />
                    </div>

                    {/* Courses section */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">Books</h3>
                        <Link href="/books" className="opacity-60 hover:opacity-100">
                            All Books
                        </Link>
                        <Link href="/books?category=6713ac1b3d27b3f508d0c44c" className="opacity-60 hover:opacity-100">
                            আইন বিষয়ক বুক
                        </Link>
                        <Link href="/books?discount=true" className="opacity-60 hover:opacity-100">
                            Discount Books
                        </Link>
                    </div>

                    {/* Seller section */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">Seller</h3>
                        <Link href="/seller" className="opacity-60 hover:opacity-100">
                            Dashboard
                        </Link>
                        <Link href="/seller/register" className="opacity-60 hover:opacity-100">
                            Become a Seller
                        </Link>
                    </div>

                    {/* Support section */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">Support</h3>
                        <Link href="/support" className="opacity-60 hover:opacity-100">
                            Chat
                        </Link>
                        <Link href="/contact" className="opacity-60 hover:opacity-100">
                            Contact Us
                        </Link>
                    </div>
                </div>

                <Separator className="my-6" />
                <section className="">
                    <h3 className="">&copy; {new Date().getFullYear()} BoiGhor. All rights reserved.</h3>
                </section>
            </div>
        </footer>
    );
};