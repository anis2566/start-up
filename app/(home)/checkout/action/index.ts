"use server";

import { db } from "@/lib/prisma";
import { OrderSchema, OrderSchemaType } from "@/schema/order.schema";
import { GET_USER } from "@/services/user.service";
import { Month } from "@prisma/client";

export const CREATE_ORDER_ACTION = async (values: OrderSchemaType) => {
  const { data, success } = OrderSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  const totalPrice = data.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingCharge = data.city === "Dhaka" ? 60 : 100;
  const totalPaidAmount = totalPrice + shippingCharge;

  const { userId } = await GET_USER();

  try {
    const order = await db.order.create({
      data: {
        name: data.name,
        phone: data.phone,
        altPhone: data.altPhone,
        country: data.country,
        city: data.city,
        thana: data.thana,
        zone: data.zone,
        address: data.address,
        totalPrice,
        shippingCharge,
        totalPaidAmount,
        paymentMethod: data.paymentMethod,
        orderItems: {
          createMany: {
            data: data.orderItems,
          },
        },
        userId,
        month: Object.values(Month)[new Date().getMonth()],
      },
      include: {
        orderItems: true,
      },
    });

    for (const item of order.orderItems) {
      await db.book.update({
        where: {
          id: item.bookId,
        },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

    return {
      success: "Order placed.",
      id: order.id,
    };
  } catch (error) {
    return {
      error: "Failed to create order",
    };
  }
};
