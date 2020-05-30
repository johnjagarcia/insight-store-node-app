import { getRepository } from "typeorm";
import { CreateCourierDto } from "../dto/CreateCourierDto";
import { Courier } from "../../../shared/entities/Courier";

export class CourierService {
  async getCouriers(): Promise<Courier[]> {
    return await getRepository(Courier)
      .createQueryBuilder("c")
      .select(["c.id", "c.name", "c.cellphone"])
      .where("c.active")
      .getMany();
  }

  async saveCourier(createCourierDto: CreateCourierDto) {
    return await getRepository(Courier)
      .createQueryBuilder()
      .insert()
      .into(Courier)
      .values([
        {
          name: createCourierDto.name,
          cellphone: createCourierDto.cellphone,
        },
      ])
      .execute();
  }
}
