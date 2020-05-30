import { getRepository } from "typeorm";
import { OrderStatus } from "../../../shared/entities/OrderStatus";

export class StatusService {
  async getStatusByName(name: string): Promise<OrderStatus> {
    return await getRepository(OrderStatus)
      .createQueryBuilder("s")
      .select("s.id")
      .where("s.name = :name", { name })
      .getOne();
  }
}
