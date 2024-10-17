"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import {
  PublicationSchema,
  PublicationSchemaType,
} from "@/schema/publication.schema";

export const CREATE_PUBLICATION_ACTION = async (
  values: PublicationSchemaType,
) => {
  const { data, success } = PublicationSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const publication = await db.publication.findFirst({
      where: {
        name: data.name,
      },
    });

    if (publication) {
      return {
        error: "Publication already exists",
      };
    }

    await db.publication.create({
      data,
    });

    revalidatePath("/dashboard/publications");

    return {
      success: "Publication created",
    };
  } catch (error) {
    return {
      error: "Failed to create publication",
    };
  }
};
