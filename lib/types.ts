import { Prisma } from "@prisma/client";

export function getBookDataInclude() {
  return {
    category: true,
    reviews: {
      select: {
        userId: true,
      },
    },
  } satisfies Prisma.BookInclude;
}

export type BookData = Prisma.BookGetPayload<{
  include: ReturnType<typeof getBookDataInclude>;
}>;

export interface BookPage {
  books: BookData[];
  nextCursor: string | null;
}

export function getReviewDataInclude() {
  return {
    user: true,
  } satisfies Prisma.ReviewInclude;
}

export type ReviewData = Prisma.ReviewGetPayload<{
  include: ReturnType<typeof getReviewDataInclude>;
}>;

export interface ReviewPage {
  reviews: ReviewData[];
  previousCursor: string | null;
}
