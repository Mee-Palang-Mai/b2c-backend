import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  // In-memory storage for demonstration purposes
  // In a real application, you would use a database
  private orders: Order[] = [];

  /**
   * Create a new order
   */
  create(createOrderDto: CreateOrderDto): Order {
    const totalAmount = createOrderDto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const newOrder: Order = {
      id: crypto.randomUUID(),
      customerName: createOrderDto.customerName,
      customerEmail: createOrderDto.customerEmail,
      items: createOrderDto.items,
      totalAmount,
      status: createOrderDto.status || OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.push(newOrder);
    return newOrder;
  }

  /**
   * Get all orders
   */
  findAll(): Order[] {
    return this.orders;
  }

  /**
   * Get orders by status
   */
  findByStatus(status: OrderStatus): Order[] {
    return this.orders.filter((order) => order.status === status);
  }

  /**
   * Get a single order by ID
   */
  findOne(id: string): Order {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  /**
   * Update an order
   */
  update(id: string, updateOrderDto: UpdateOrderDto): Order {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const existingOrder = this.orders[orderIndex];
    const updatedOrder: Order = {
      ...existingOrder,
      ...updateOrderDto,
      updatedAt: new Date(),
    };

    // Recalculate total if items were updated
    if (updateOrderDto.items) {
      updatedOrder.totalAmount = updateOrderDto.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    }

    this.orders[orderIndex] = updatedOrder;
    return updatedOrder;
  }

  /**
   * Delete an order
   */
  remove(id: string): void {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    this.orders.splice(orderIndex, 1);
  }

  /**
   * Get order statistics
   */
  getStatistics() {
    const totalOrders = this.orders.length;
    const totalRevenue = this.orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const ordersByStatus = Object.values(OrderStatus).reduce(
      (acc, status) => {
        acc[status] = this.orders.filter(
          (order) => order.status === status,
        ).length;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      totalOrders,
      totalRevenue,
      ordersByStatus,
    };
  }
}
