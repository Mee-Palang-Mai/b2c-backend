import { OrderStatus } from '../order.entity';

export class CreateOrderItemDto {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export class CreateOrderDto {
  customerName: string;
  customerEmail: string;
  items: CreateOrderItemDto[];
  status?: OrderStatus;
}
