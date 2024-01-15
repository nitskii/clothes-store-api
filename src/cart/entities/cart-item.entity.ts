import { CartItem } from "@prisma/client";
import { ClothingEntity } from "src/clothes/entities/clothing.entity";

export class CartItemEntity implements CartItem {
  id: string;
  cartId: string;
  clothingId: string;
  clothing: ClothingEntity
  quantity: number;
}