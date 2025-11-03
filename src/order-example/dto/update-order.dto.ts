import { OrderStatus } from '../order.entity';
import { CreateOrderItemDto } from './create-order.dto';

export class UpdateOrderDto {
  customerName?: string;
  customerEmail?: string;
  items?: CreateOrderItemDto[];
  status?: OrderStatus;
}
