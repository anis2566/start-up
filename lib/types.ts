import { Prisma } from "@prisma/client";

export function getBookDataInclude() {
  return {
    author: true,
  } satisfies Prisma.BookInclude;
}

export type BookData = Prisma.BookGetPayload<{
  include: ReturnType<typeof getBookDataInclude>;
}>;

export interface BookPage {
  books: BookData[];
  nextCursor: string | null;
  total: number;
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

export function getQuestionDataInclude() {
  return {
    user: true,
    answers: {
      include: { user: true },
    },
  } satisfies Prisma.QuestionInclude;
}

export type QuestionData = Prisma.QuestionGetPayload<{
  include: ReturnType<typeof getQuestionDataInclude>;
}>;

export interface QuestionPage {
  questions: QuestionData[];
  previousCursor: string | null;
}
