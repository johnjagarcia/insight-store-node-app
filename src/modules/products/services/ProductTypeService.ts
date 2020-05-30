import { ProductType } from "../../../shared/entities/ProductType";
import { getRepository } from "typeorm";

export class ProductTypeService {
  async getProductTypes(): Promise<ProductType[]> {
    return await getRepository(ProductType)
      .createQueryBuilder("pt")
      .select(["pt.id", "pt.name", "pt.handleColors"])
      .where("pt.active")
      .getMany();
  }
}
