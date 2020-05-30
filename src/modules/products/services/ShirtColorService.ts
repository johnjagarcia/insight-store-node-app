import { getRepository } from "typeorm";
import { ShirtColor } from "../../../shared/entities/ShirtColor";
import { CreateShirtColorDto } from "../dto/CreateShirtColorDto";

export class ShirtColorService {
  async getShirtColors(): Promise<ShirtColor[]> {
    return await getRepository(ShirtColor)
      .createQueryBuilder("sc")
      .select(["sc.id", "sc.name"])
      .where("sc.active")
      .getMany();
  }

  async saveColor(createShirtColorDto: CreateShirtColorDto) {
    return await getRepository(ShirtColor)
      .createQueryBuilder()
      .insert()
      .into(ShirtColor)
      .values([
        {
          name: createShirtColorDto.name,
        },
      ])
      .execute();
  }
}
