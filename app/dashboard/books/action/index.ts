"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { BookSchema, BookSchemaType } from "@/schema/book.schema";

export const CREATE_BOOK_ACTION = async (values: BookSchemaType) => {
  const { data, success } = BookSchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const book = await db.book.findFirst({
      where: {
        name: data.name,
        authorId: data.authorId,
      },
    });

    if (book)
      return {
        error: "Book already exists",
      };

    await db.book.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/books");

    return {
      success: "Book created successfully",
    };
  } catch (error) {
    return {
      error: "Failed to create book",
    };
  }
};

type EditBook = {
  id: string;
  values: BookSchemaType;
};

export const EDIT_BOOK_ACTION = async ({ id, values }: EditBook) => {
  const { data, success } = BookSchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const book = await db.book.findUnique({
      where: {
        id,
      },
    });

    if (!book)
      return {
        error: "Book not found",
      };

    await db.book.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/books");

    return {
      success: "Book updated successfully",
    };
  } catch (error) {
    return {
      error: "Failed to edit book",
    };
  }
};

export const DELETE_BOOK_ACTION = async (id: string) => {
  try {
    const book = await db.book.findUnique({
      where: {
        id,
      },
    });

    if (!book)
      return {
        error: "Book not found",
      };

    await db.book.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/books");

    return {
      success: "Book deleted successfully",
    };
  } catch (error) {
    return {
      error: "Failed to delete book",
    };
  }
};

export const GET_AUTHORS_FOR_BOOKS_ACTION = async (search?: string) => {
  const authors = await db.author.findMany({
    where: {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      imageUrl: true,
      name: true,
    },
    take: 4,
  });

  return authors;
};

export const GET_CATEGORIES_FOR_BOOKS_ACTION = async (search?: string) => {
  const categories = await db.category.findMany({
    where: {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
    },
    take: 4,
  });

  return categories;
};

type SubCategory = {
  categoryId: string | undefined;
  search?: string;
};

export const GET_SUB_CATEGORIES_FOR_BOOKS_ACTION = async ({
  categoryId,
  search,
}: SubCategory) => {
  const subCategories = await db.subCategory.findMany({
    where: {
      ...(categoryId && {
        categoryId,
      }),
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
    },
    take: 4,
  });

  return subCategories;
};

export const GET_PUBLISHERS_FOR_BOOKS_ACTION = async (search?: string) => {
  const publishers = await db.publication.findMany({
    where: {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
    },
    take: 4,
  });

  return publishers;
};
