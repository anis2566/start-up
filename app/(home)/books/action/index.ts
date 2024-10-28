"use server";

import { OrderStatus } from "@prisma/client";

import { db } from "@/lib/prisma";
import { ReviewSchema, ReviewSchemaType } from "@/schema/review.schema";
import { GET_USER } from "@/services/user.service";
import { getReviewDataInclude } from "@/lib/types";

type CreateReview = {
  bookId: string;
  values: ReviewSchemaType;
};

export const CREATE_REVIEW_ACTION = async ({
  bookId,
  values,
}: CreateReview) => {
  const { data, success } = ReviewSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const { userId } = await GET_USER();

    const isBougth = await db.order.findFirst({
      where: {
        userId: userId,
        orderItems: {
          some: {
            bookId: bookId,
          },
        },
        status: OrderStatus.Delivered,
      },
    });

    if (!isBougth) {
      return {
        error: "You must buy this service to review",
      };
    }

    const isReviewed = await db.review.findFirst({
      where: {
        userId: userId,
        bookId: bookId,
      },
    });

    if (isReviewed) {
      return {
        error: "You already reviewed this service",
      };
    }

    const review = await db.review.create({
      data: {
        userId: userId,
        bookId: bookId,
        ...data,
      },
      include: getReviewDataInclude(),
    });

    const totalReviews = await db.review.count({
      where: {
        bookId: bookId,
      },
    });

    const averageRating = await db.review.aggregate({
      _avg: {
        rating: true,
      },
    });

    const avgRating = averageRating._avg.rating ?? 0;
    const newRating =
      Math.floor(
        ((avgRating * (totalReviews - 1) + data.rating) / totalReviews) * 2,
      ) / 2;

    await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        rating: newRating,
      },
    });

    return {
      success: "Review submitted",
      review,
    };
  } catch (error) {
    return {
      error: "Failed to create review",
    };
  }
};

export const GET_TOP_REVIEWS = async (id: string) => {
  const reviews = await db.review.findMany({
    where: {
      bookId: id,
    },
    include: {
      user: true,
    },
    orderBy: {
      rating: "asc",
    },
    take: 5,
  });

  return reviews;
};


export const GET_SIMILAR_CATEGORY_BOOKS = async (categoryId: string) => {
  const books = await db.book.findMany({
    where: {
      categoryId: categoryId,
    },
    include: {
      author: true,
    },
    orderBy: {
      totalSold: "asc",
    },
    take: 3,
  });

  return books;
};
