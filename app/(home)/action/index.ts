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
