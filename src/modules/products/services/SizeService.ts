import { getRepository } from "typeorm";
import { Size } from "../../../shared/entities/Size";

export class SizeService {
  async getSizes(categoryId: number): Promise<Size[]> {
    return await getRepository(Size)
      .createQueryBuilder("s")
      .select(["s.id", "s.name"])
      .innerJoin("s.categorySizes", "cs")
      .where("s.active")
      .andWhere("cs.category = :categoryId", { categoryId })
      .getMany();
  }
}
