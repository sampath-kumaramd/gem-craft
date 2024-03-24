import { Item } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import axios from "axios";

export enum ItemType {
  GEM,
  PENDANT,
}

export interface CreateItemType {
  type: ItemType;
  name: string;
  description?: string;
  image?: string;
  price?: number;
  stock?: number;
  material: string[];
  natural: boolean;
  shape: string;
  texture: string;
  colors: string[];
  weight?: number;
  quantity?: number;
  active?: boolean;
  dimensions?: string;
  categoryId?: string;
}

interface DeleteResponse {
  type: ItemType;
  name: string;
  description?: string;
  image?: string;
  price?: number;
  stock?: number;
  material: string[];
  natural: boolean;
  shape: string;
  texture: string;
  colors: string[];
  weight?: number;
  quantity?: number;
  active?: boolean;
  dimensions?: string;
  categoryId?: string;
}

export interface InitialItemType extends CreateItemType {
}

export interface EditItem extends CreateItemType {
  id?: string;
}

export function getItems(categoryId:string) {
  return axios.get<Item[]>(`/api/category/${categoryId}/items`).then((res) => res.data);
}

export function getItemById(id: string, categoryId: string) {
  return axios.get<Item>(`/api/category/${categoryId}/items/${id}`).then((res) => res.data);
}

export function createItem(data: CreateItemType) {
  return axios.post<Item>(`/api/category/${data.categoryId}/items`, data).then((res) => res.data);
}

export async function updateItem(data: EditItem) {
  const response = await fetch(`/api/category/${data.categoryId}/items/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteItem ([id, categoryId]: [string, string]): Promise<DeleteResponse> {
  const response = await fetch(`/api/category/${categoryId}/items/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function deleteItems(categoryId: string) {
  const response = await fetch(`/api/category/${categoryId}/items`, {
    method: "DELETE",
  });
  return response.json();
}