"use server";

import { revalidatePath } from "next/cache";
import { transliterate as tr } from "transliteration";

import { BookSchema, BookSchemaType } from "@/schema/book.schema";
import { db } from "@/lib/prisma";
import { GET_USER } from "@/services/user.service";
import { AuthorSchema, AuthorSchemaType } from "@/schema/author.schema";
import { CategorySchema, CategorySchemaType } from "@/schema/category.schema";
import {
  SubCategorySchema,
  SubCategorySchemaType,
} from "@/schema/sub-category.schema";

export const CREATE_BOOK_ACTION = async (values: BookSchemaType) => {
  const { data, success } = BookSchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const { userId } = await GET_USER();

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

    let nameBangla = "";

    const isBangla = (text: string) => /[\u0980-\u09FF]/.test(text);

    if (isBangla(data.name)) {
      nameBangla = tr(data.name);
    }

    await db.book.create({
      data: {
        ...data,
        nameBangla,
        sellerId: userId,
      },
    });

    return {
      success: "Book created.",
    };
  } catch (error) {
    return {
      error: "Failed to create book",
    };
  }
};

export const CREATE_AUTHOR_ACTION = async (values: AuthorSchemaType) => {
  const { data, success } = AuthorSchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const author = await db.author.findFirst({
      where: {
        email: data.email,
      },
    });

    if (author) {
      return {
        error: "Author already exists",
      };
    }

    await db.author.create({
      data: {
        ...data,
      },
    });

    return {
      success: "Author created.",
    };
  } catch (error) {
    return {
      error: "Failed to create author",
    };
  }
};

export const CREATE_CATEGORY_ACTION = async (values: CategorySchemaType) => {
  const { data, success } = CategorySchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const category = await db.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (category) {
      return {
        error: "Category already exists",
      };
    }

    await db.category.create({
      data: {
        ...data,
      },
    });

    return {
      success: "Category created.",
    };
  } catch (error) {
    return {
      error: "Failed to create category",
    };
  }
};

interface CreateSubCategoryAction {
  categoryId: string;
  values: SubCategorySchemaType;
}

export const CREATE_SUB_CATEGORY_ACTION = async ({
  categoryId,
  values,
}: CreateSubCategoryAction) => {
  const { data, success } = SubCategorySchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const subCategory = await db.subCategory.findFirst({
      where: {
        name: data.name,
      },
    });

    if (subCategory) {
      return {
        error: "Sub-Category already exists",
      };
    }

    await db.subCategory.create({
      data: {
        ...data,
        categoryId,
      },
    });

    return {
      success: "Sub-Category created.",
    };
  } catch (error) {
    return {
      error: "Failed to create sub-category",
    };
  }
};
