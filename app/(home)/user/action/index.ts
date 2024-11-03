"use server";

import { Gender } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import { db } from "@/lib/prisma";
import { saltAndHashPassword } from "@/lib/utils";

type UpdateUserInfoActionProps = {
  id: string;
  name: string;
  gender?: Gender;
  dob?: Date;
};

export const UPDATE_USER_INFO_ACTION = async ({
  id,
  name,
  gender,
  dob,
}: UpdateUserInfoActionProps) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    await db.user.update({
      where: { id },
      data: { name, gender, dob },
    });

    revalidatePath("/user/profile");

    return {
      success: "User info updated.",
    };
  } catch (error) {
    return {
      error: "Failed to update user info",
    };
  }
};

type UpdateUserAccountActionProps = {
  id: string;
  email: string;
  phone?: string;
};

export const UPDATE_USER_ACCOUNT_ACTION = async ({
  id,
  email,
  phone,
}: UpdateUserAccountActionProps) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    await db.user.update({
      where: { id },
      data: { email, phone },
    });

    revalidatePath("/user/profile");

    return {
      success: "User account updated.",
    };
  } catch (error) {
    return {
      error: "Failed to update user account",
    };
  }
};

type UpdateUserAvatarActionProps = {
  id: string;
  image: string;
};

export const UPDATE_USER_AVATAR_ACTION = async ({
  id,
  image,
}: UpdateUserAvatarActionProps) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    await db.user.update({
      where: { id },
      data: { image },
    });

    revalidatePath("/user/profile");

    return {
      success: "User avatar updated.",
    };
  } catch (error) {
    return {
      error: "Failed to update user avatar",
    };
  }
};

type UpdateUserPasswordActionProps = {
  id: string;
  oldPassword: string;
  password: string;
};

export const UPDATE_USER_PASSWORD_ACTION = async ({
  id,
  oldPassword,
  password,
}: UpdateUserPasswordActionProps) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    const isPasswordMatch = user.password
      ? await bcrypt.compare(oldPassword, user.password)
      : false;

    if (!isPasswordMatch) {
      return {
        error: "Invalid old password",
      };
    }

    const hashedPassword = saltAndHashPassword(password);

    await db.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    revalidatePath("/user/profile");

    return {
      success: "User password updated.",
    };
  } catch (error) {
    return {
      error: "Failed to update user password",
    };
  }
};
