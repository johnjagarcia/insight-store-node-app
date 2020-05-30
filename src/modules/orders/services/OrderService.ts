import {
  getRepository,
  InsertResult,
  getConnection,
  QueryRunner,
  DeepPartial,
} from "typeorm";
import { CreateOrderDto } from "../dto/CreateOrderDto";
import { Order } from "../../../shared/entities/Order";
import { StatusService } from "../../products/services/StatusService";
import { ProductService } from "../../products/services/ProductService";
import { OrderStatus } from "../../../shared/entities/OrderStatus";

export class OrderService {
  async getOrders(
    registerDate: string,
    status: number,
    customerName: string
  ): Promise<Order[]> {
    const queryBuilder = getRepository(Order).createQueryBuilder("o");

    queryBuilder
      .select(["o", "c.names", "c.lastNames", "n.name", "os.name"])
      .innerJoin("o.orderStatus", "os")
      .innerJoin("o.customer", "c")
      .innerJoin("o.neighborhood", "n");

    if (status) {
      queryBuilder.where("os.id = :status", { status });
    } else {
      queryBuilder.where("os.name NOT IN (:cancelled, :delivered)", {
        cancelled: process.env.CANCELLED_ORDER_STATUS_NAME,
        delivered: process.env.DELIVERED_ORDER_STATUS_NAME,
      });
    }

    if (registerDate) {
      queryBuilder.andWhere("date(o.registerDate) = :registerDate", {
        registerDate,
      });
    }

    if (customerName) {
      queryBuilder.andWhere("c.names ILIKE :names", {
        names: `%${customerName}%`,
      });
    }

    return queryBuilder.orderBy("o.registerDate", "DESC").getMany();
  }

  async registerOrder(
    createOrderDto: CreateOrderDto,
    statusService: StatusService,
    productService: ProductService
  ) {
    const queryRunner = getConnection().createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const initialOrderStatus = await statusService.getStatusByName(
        process.env.INITIAL_ORDER_STATUS_NAME
      );

      const insertResult: InsertResult = await this.persistOrderInDataBase(
        queryRunner,
        createOrderDto,
        initialOrderStatus
      );

      await productService.saveProducts(
        queryRunner,
        insertResult.identifiers[0].id,
        createOrderDto.products
      );

      await queryRunner.commitTransaction();

      return insertResult;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async persistOrderInDataBase(
    queryRunner: QueryRunner,
    createOrderDto: CreateOrderDto,
    initialOrderStatus: OrderStatus
  ) {
    const totalValue: number = createOrderDto.products
      .map((p) => p.value)
      .reduce((a, b) => {
        return a + b;
      }, 0);

    const order: DeepPartial<Order> = {
      customer: {
        id: createOrderDto.customerId,
      },
      neighborhood: {
        id: createOrderDto.neighborhoodId,
      },
      address: createOrderDto.address,
      orderStatus: {
        id: initialOrderStatus.id,
      },
      programmedDeliveryDate: createOrderDto.programmedDeliveryDate,
      totalValue,
      deliveryValue: createOrderDto.deliveryValue,
      paidValue: createOrderDto.paidValue,
      courier: {
        id: createOrderDto.courierId,
      },
      observation: createOrderDto.observation,
    };

    return await queryRunner.manager
      .getRepository(Order)
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values([order])
      .execute();
  }
}
