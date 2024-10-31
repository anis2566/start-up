import { BookStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";
import { BookPage, getBookDataInclude } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor") || undefined;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    const pageSize = 8;

    const [books, total] = await db.$transaction([
      db.book.findMany({
        where: {
          status: BookStatus.Published,
          ...(search && {
            name: { contains: search, mode: "insensitive" },
          }),
          ...(category && {
            category: {
              name: category,
            },
          }),
        },
        include: getBookDataInclude(),
        orderBy: {
          createdAt: sort === "asc" ? "asc" : "desc",
        },
        take: pageSize + 1,
        cursor: cursor ? { id: cursor } : undefined,
      }),
      db.book.count({
        where: {
          status: BookStatus.Published,
        },
      }),
    ]);

    const nextCursor = books.length > pageSize ? books[pageSize].id : null;

    const data: BookPage = {
      books,
      nextCursor,
      total,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
