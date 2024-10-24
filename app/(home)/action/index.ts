"use server";

import {
  AuthorStatus,
  CategoryStatus,
  PublicationStatus,
} from "@prisma/client";

import { db } from "@/lib/prisma";

export const GET_AUTHORS = async () => {
  const authors = await db.author.findMany({
    where: {
      status: AuthorStatus.Active,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return authors;
};

export const GET_CATEGORIES = async () => {
  const categories = await db.category.findMany({
    where: {
      status: CategoryStatus.Active,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return categories;
};

export const GET_PUBLICATIONS = async () => {
  const publications = await db.publication.findMany({
    where: {
      status: PublicationStatus.Active,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return publications;
};

export const GET_SUB_CATEGORIES = async (categoryId: string) => {
  const subCategories = await db.subCategory.findMany({
    where: {
      status: CategoryStatus.Active,
      categoryId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return subCategories;
};

export const GET_CATEGORIES_HOME = async () => {
  const categories = await db.category.findMany({
    where: {
      status: CategoryStatus.Active,
    },
    include: {
      subCategories: {
        take: 4,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return categories;
};

export const GET_RELATED_BOOKS = async (
  categoryId: string,
  subCategoryId: string | null,
) => {
  const books = await db.book.findMany({
    where: {
      categoryId,
      ...(subCategoryId ? { subCategoryId } : {}),
    },
    include: {
      author: true,
    },
    orderBy: {
      totalReview: "asc",
    },
  });
  return books;
};
