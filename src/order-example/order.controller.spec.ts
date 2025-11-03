import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderStatus } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrder = {
    id: 'test-uuid',
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
    totalAmount: 200,
    status: OrderStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockOrderService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByStatus: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getStatistics: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      mockOrderService.create.mockReturnValue(mockOrder);

      const result = controller.create(createOrderDto);

      expect(result).toEqual(mockOrder);
      expect(service.create(createOrderDto)).toHaveBeenCalled();
      expect(service.create(createOrderDto)).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return all orders when no status filter is provided', () => {
      const orders = [mockOrder];
      mockOrderService.findAll.mockReturnValue(orders);

      const result = controller.findAll();

      expect(result).toEqual(orders);
      expect(service.findAll()).toHaveBeenCalledTimes(1);
      expect(service.findByStatus(OrderStatus.PENDING)).not.toHaveBeenCalled();
    });

    it('should return filtered orders when status is provided', () => {
      const orders = [mockOrder];
      mockOrderService.findByStatus.mockReturnValue(orders);

      const result = controller.findAll(OrderStatus.PENDING);

      expect(result).toEqual(orders);
      expect(service.findByStatus(OrderStatus.PENDING)).toHaveBeenCalled();
      expect(service.findByStatus(OrderStatus.PENDING)).toHaveBeenCalledTimes(
        1,
      );
      expect(service.findAll()).not.toHaveBeenCalled();
    });
  });

  describe('getStatistics', () => {
    it('should return order statistics', () => {
      const mockStats = {
        totalOrders: 10,
        totalRevenue: 5000,
        ordersByStatus: {
          [OrderStatus.PENDING]: 3,
          [OrderStatus.CONFIRMED]: 2,
          [OrderStatus.PROCESSING]: 1,
          [OrderStatus.SHIPPED]: 2,
          [OrderStatus.DELIVERED]: 1,
          [OrderStatus.CANCELLED]: 1,
        },
      };

      mockOrderService.getStatistics.mockReturnValue(mockStats);

      const result = controller.getStatistics();

      expect(result).toEqual(mockStats);
      expect(service.getStatistics()).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single order', () => {
      mockOrderService.findOne.mockReturnValue(mockOrder);

      const result = controller.findOne('test-uuid');

      expect(result).toEqual(mockOrder);
      expect(service.findOne('test-uuid')).toHaveBeenCalled();
      expect(service.findOne('test-uuid')).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when order does not exist', () => {
      mockOrderService.findOne.mockImplementation(() => {
        throw new NotFoundException('Order with ID test-uuid not found');
      });

      expect(() => controller.findOne('test-uuid')).toThrow(NotFoundException);
      expect(service.findOne('test-uuid')).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an order', () => {
      const updateOrderDto: UpdateOrderDto = {
        status: OrderStatus.CONFIRMED,
        customerName: 'John Smith',
      };

      const updatedOrder = {
        ...mockOrder,
        ...updateOrderDto,
        updatedAt: new Date(),
      };

      mockOrderService.update.mockReturnValue(updatedOrder);

      const result = controller.update('test-uuid', updateOrderDto);

      expect(result).toEqual(updatedOrder);
      expect(service.update('test-uuid', updateOrderDto)).toHaveBeenCalled();
      expect(service.update('test-uuid', updateOrderDto)).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should throw NotFoundException when updating non-existent order', () => {
      const updateOrderDto: UpdateOrderDto = {
        status: OrderStatus.CONFIRMED,
      };

      mockOrderService.update.mockImplementation(() => {
        throw new NotFoundException('Order with ID test-uuid not found');
      });

      expect(() => controller.update('test-uuid', updateOrderDto)).toThrow(
        NotFoundException,
      );
      expect(service.update('test-uuid', updateOrderDto)).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove an order', () => {
      mockOrderService.remove.mockReturnValue(undefined);

      const result = controller.remove('test-uuid');

      expect(result).toBeUndefined();
      expect(service.remove('test-uuid')).toHaveBeenCalled();
      expect(service.remove('test-uuid')).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when removing non-existent order', () => {
      mockOrderService.remove.mockImplementation(() => {
        throw new NotFoundException('Order with ID test-uuid not found');
      });

      expect(() => controller.remove('test-uuid')).toThrow(NotFoundException);
      expect(service.remove('test-uuid')).toHaveBeenCalled();
    });
  });
});
