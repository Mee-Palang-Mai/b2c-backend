import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Create a new order
   * POST /orders
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  /**
   * Get all orders or filter by status
   * GET /orders
   * GET /orders?status=PENDING
   */
  @Get()
  findAll(@Query('status') status?: OrderStatus) {
    if (status) {
      return this.orderService.findByStatus(status);
    }
    return this.orderService.findAll();
  }

  /**
   * Get order statistics
   * GET /orders/statistics
   */
  @Get('statistics')
  getStatistics() {
    return this.orderService.getStatistics();
  }

  /**
   * Get a single order by ID
   * GET /orders/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  /**
   * Update an order
   * PATCH /orders/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  /**
   * Delete an order
   * DELETE /orders/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
