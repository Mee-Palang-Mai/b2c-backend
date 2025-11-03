import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    // Clear orders after each test
    service['orders'] = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new order', () => {
      const createOrderDto: CreateOrderDto = {
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        items: [
          {
            productId: 'prod-1',
            productName: 'Product 1',
            quantity: 2,
            price: 100,
          },
        ],
      };

      const order = service.create(createOrderDto);

      expect(order).toBeDefined();
      expect(order.id).toBeDefined();
      expect(order.customerName).toBe(createOrderDto.customerName);
      expect(order.customerEmail).toBe(createOrderDto.customerEmail);
      expect(order.items).toEqual(createOrderDto.items);
      expect(order.totalAmount).toBe(200); // 2 * 100
      expect(order.status).toBe(OrderStatus.PENDING);
      expect(order.createdAt).toBeInstanceOf(Date);
      expect(order.updatedAt).toBeInstanceOf(Date);
    });

    it('should create an order with custom status', () => {
      const createOrderDto: CreateOrderDto = {
        customerName: 'Jane Doe',
        customerEmail: 'jane@example.com',
        items: [
          {
            productId: 'prod-2',
            productName: 'Product 2',
            quantity: 1,
            price: 50,
          },
        ],
        status: OrderStatus.CONFIRMED,
      };

      const order = service.create(createOrderDto);

      expect(order.status).toBe(OrderStatus.CONFIRMED);
    });

    it('should calculate total amount correctly with multiple items', () => {
      const createOrderDto: CreateOrderDto = {
        customerName: 'Test User',
        customerEmail: 'test@example.com',
        items: [
          {
            productId: 'prod-1',
            productName: 'Product 1',
            quantity: 2,
            price: 100,
          },
          {
            productId: 'prod-2',
            productName: 'Product 2',
            quantity: 3,
            price: 50,
          },
        ],
      };

      const order = service.create(createOrderDto);

      expect(order.totalAmount).toBe(350); // (2 * 100) + (3 * 50)
    });
  });

  describe('findAll', () => {
    it('should return an empty array when no orders exist', () => {
      const orders = service.findAll();
      expect(orders).toEqual([]);
    });

    it('should return all orders', () => {
      const createOrderDto1: CreateOrderDto = {
        customerName: 'User 1',
        customerEmail: 'user1@example.com',
        items: [
          {
            productId: 'prod-1',
            productName: 'Product 1',
            quantity: 1,
            price: 100,
          },
        ],
      };

      const createOrderDto2: CreateOrderDto = {
        customerName: 'User 2',
        customerEmail: 'user2@example.com',
        items: [
          {
            productId: 'prod-2',
            productName: 'Product 2',
            quantity: 2,
            price: 50,
          },
        ],
      };

      service.create(createOrderDto1);
      service.create(createOrderDto2);

      const orders = service.findAll();
      expect(orders).toHaveLength(2);
    });
  });

  describe('findByStatus', () => {
    it('should return orders filtered by status', () => {
      const createOrderDto1: CreateOrderDto = {
        customerName: 'User 1',
        customerEmail: 'user1@example.com',
        items: [
          {
            productId: 'prod-1',
            productName: 'Product 1',
            quantity: 1,
            price: 100,
          },
        ],
        status: OrderStatus.PENDING,
      };

      const createOrderDto2: CreateOrderDto = {
        customerName: 'User 2',
        customerEmail: 'user2@example.com',
        items: [
          {
            productId: 'prod-2',
            productName: 'Product 2',
            quantity: 1,
            price: 50,
          },
        ],
        status: OrderStatus.CONFIRMED,
      };

      service.create(createOrderDto1);
      service.create(createOrderDto2);

      const pendingOrders = service.findByStatus(OrderStatus.PENDING);
      const confirmedOrders = service.findByStatus(OrderStatus.CONFIRMED);

      expect(pendingOrders).toHaveLength(1);
      expect(confirmedOrders).toHaveLength(1);
      expect(pendingOrders[0].status).toBe(OrderStatus.PENDING);
      expect(confirmedOrders[0].status).toBe(OrderStatus.CONFIRMED);
    });

    it('should return empty array when no orders match status', () => {
      const orders = service.findByStatus(OrderStatus.SHIPPED);
      expect(orders).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an order by id', () => {
      const createOrderDto: CreateOrderDto = {
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        items: [
          {
            productId: 'prod-1',
            productName: 'Product 1',
            quantity: 1,
            price: 100,
          },
        ],
      };

      const createdOrder = service.create(createOrderDto);
      const foundOrder = service.findOne(createdOrder.id);

      expect(foundOrder).toBeDefined();
      expect(foundOrder.id).toBe(createdOrder.id);
      expect(foundOrder.customerName).toBe(createOrderDto.customerName);
    });

    it('should throw NotFoundException when order not found', () => {
      expect(() => service.findOne('non-existent-id')).toThrow(
        NotFoundException,
      );
      expect(() => service.findOne('non-existent-id')).toThrow(
        'Order with ID non-existent-id not found',
      );
    });
  });

  describe('update', () => {
    it('should update an order', () => {
      const createOrderDto: CreateOrderDto = {
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        items: [
          {
            productId: 'prod-1',
            productName: 'Product 1',
            quantity: 1,
            price: 100,
          },
        ],
      };

      const createdOrder = service.create(createOrderDto);
      const updateOrderDto: UpdateOrderDto = {
        status: OrderStatus.CONFIRMED,
        customerName: 'John Smith',
      };

      const updatedOrder = service.update(createdOrder.id, updateOrderDto);

      expect(updatedOrder.id).toBe(createdOrder.id);
      expect(updatedOrder.status).toBe(OrderStatus.CONFIRMED);
      expect(updatedOrder.customerName).toBe('John Smith');
      expect(updatedOrder.customerEmail).toBe(createOrderDto.customerEmail);
      expect(updatedOrder.updatedAt.getTime()).toBeGreaterThanOrEqual(
        createdOrder.updatedAt.getTime(),
      );
    });

    it('should recalculate total amount when items are updated', () => {
      const createOrderDto: CreateOrderDto = {
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        items: [
          {
            productId: 'prod-1',
            productName: 'Product 1',
            quantity: 1,
            price: 100,
          },
        ],
      };

      const createdOrder = service.create(createOrderDto);
      expect(createdOrder.totalAmount).toBe(100);

      const updateOrderDto: UpdateOrderDto = {
        items: [
          {
            productId: 'prod-1',
            productName: 'Product 1',
            quantity: 2,
            price: 100,
          },
          {
            productId: 'prod-2',
            productName: 'Product 2',
            quantity: 1,
            price: 50,
          },
        ],
      };

      const updatedOrder = service.update(createdOrder.id, updateOrderDto);

      expect(updatedOrder.totalAmount).toBe(250); // (2 * 100) + (1 * 50)
    });

    it('should throw NotFoundException when updating non-existent order', () => {
      const updateOrderDto: UpdateOrderDto = {
        status: OrderStatus.CONFIRMED,
      };

      expect(() => service.update('non-existent-id', updateOrderDto)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove an order', () => {
      const createOrderDto: CreateOrderDto = {
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        items: [
          {
            productId: 'prod-1',
            productName: 'Product 1',
            quantity: 1,
            price: 100,
          },
        ],
      };

      const createdOrder = service.create(createOrderDto);
      expect(service.findAll()).toHaveLength(1);

      service.remove(createdOrder.id);
      expect(service.findAll()).toHaveLength(0);
    });

    it('should throw NotFoundException when removing non-existent order', () => {
      expect(() => service.remove('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('getStatistics', () => {
    it('should return correct statistics', () => {
      const createOrderDto1: CreateOrderDto = {
        customerName: 'User 1',
        customerEmail: 'user1@example.com',
        items: [
          {
            productId: 'prod-1',
            productName: 'Product 1',
            quantity: 1,
            price: 100,
          },
        ],
        status: OrderStatus.PENDING,
      };

      const createOrderDto2: CreateOrderDto = {
        customerName: 'User 2',
        customerEmail: 'user2@example.com',
        items: [
          {
            productId: 'prod-2',
            productName: 'Product 2',
            quantity: 2,
            price: 50,
          },
        ],
        status: OrderStatus.CONFIRMED,
      };

      const createOrderDto3: CreateOrderDto = {
        customerName: 'User 3',
        customerEmail: 'user3@example.com',
        items: [
          {
            productId: 'prod-3',
            productName: 'Product 3',
            quantity: 1,
            price: 150,
          },
        ],
        status: OrderStatus.PENDING,
      };

      service.create(createOrderDto1);
      service.create(createOrderDto2);
      service.create(createOrderDto3);

      const stats = service.getStatistics();

      expect(stats.totalOrders).toBe(3);
      expect(stats.totalRevenue).toBe(350); // 100 + 100 + 150
      expect(stats.ordersByStatus[OrderStatus.PENDING]).toBe(2);
      expect(stats.ordersByStatus[OrderStatus.CONFIRMED]).toBe(1);
      expect(stats.ordersByStatus[OrderStatus.SHIPPED]).toBe(0);
    });

    it('should return zero statistics when no orders exist', () => {
      const stats = service.getStatistics();

      expect(stats.totalOrders).toBe(0);
      expect(stats.totalRevenue).toBe(0);
      expect(stats.ordersByStatus[OrderStatus.PENDING]).toBe(0);
    });
  });
});
