import { getRepository } from "typeorm";
import { Category } from "../../../shared/entities/Category";

export class CategoryService {
  async getCategories(): Promise<Category[]> {
    return await getRepository(Category)
      .createQueryBuilder("c")
      .select(["c.id", "c.name"])
      .where("c.active")
      .getMany();
  }
}
