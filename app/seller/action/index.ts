"use server";

import { db } from "@/lib/prisma";
import { SellerSchema, SellerSchemaType } from "@/schema/seller.schema";
import { GET_USER } from "@/services/user.service";

export const SELLER_REGISTER_ACTION = async (values: SellerSchemaType) => {
  const { data, success } = SellerSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const { userId } = await GET_USER();

    const seller = await db.seller.findUnique({
      where: {
        userId,
      },
    });

    if (seller) {
      return {
        error: "Seller already registered",
      };
    }

    await db.seller.create({
      data: { ...data, userId },
    });

    return {
      success: "Seller registered.",
    };
  } catch (error) {
    return {
      error: "Failed to register seller",
    };
  }
};
