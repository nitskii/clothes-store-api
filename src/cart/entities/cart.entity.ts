import { Cart } from "@prisma/client";
import { CartItemEntity } from "./cart-item.entity";

export class CartEntity implements Cart {
  id: string;
  userId: string;
  items: CartItemEntity[]
}