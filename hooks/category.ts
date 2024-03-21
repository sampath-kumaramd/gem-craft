import { Category } from "@prisma/client";
import axios from "axios";
import { ItemType } from "./items";

export interface createCategoryType {
  id: string;
  name: string;
  type:ItemType
}

export interface EditCategory {
  id?: string;
  name?: string;
  type?:ItemType
}

export function getCategory() {
  return axios.get<Category[]>("/api/category").then((res) => res.data);
}

export function getCategoryById(id: string) {
  return axios.get<Category>(`/api/category/${id}`).then((res) => res.data);
}

export function createCategory(data: createCategoryType) {
  return axios.post<Category>("/api/category", data).then((res) => res.data);
}

export async function updateCategory(data: EditCategory) {
  const response = await fetch(`/api/category/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteCategory(id: string) {
  const response = await fetch(`/api/category/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
