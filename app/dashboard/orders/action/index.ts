"use server";

import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

type UpdateOrderStatusProps = {
  id: string;
  status: OrderStatus;
};

export const UPDATE_ORDER_STATUS_ACTION = async ({
  id,
  status,
}: UpdateOrderStatusProps) => {
  try {
    const order = await db.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      return {
        error: "Order not found",
      };
    }

    if (status === OrderStatus.Delivered) {
      for (const item of order.orderItems) {
        await db.book.update({
          where: {
            id: item.bookId,
          },
          data: {
            totalSold: { increment: item.quantity },
          },
        });
      }
    }

    if (status === OrderStatus.Returned || status === OrderStatus.Cancelled) {
      for (const item of order.orderItems) {
        await db.book.update({
          where: {
            id: item.bookId,
          },
          data: {
            stock: { increment: item.quantity },
          },
        });
      }
    }

    await db.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    revalidatePath("/dashboard/orders");

    return {
      success: "Order status updated",
    };
  } catch (error) {
    return {
      error: "Failed to update order status",
    };
  }
};
