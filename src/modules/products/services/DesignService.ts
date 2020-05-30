import { getRepository } from "typeorm";
import { Design } from "../../../shared/entities/Design";
import { CreateDesignDto } from "../dto/CreateDesignDto";

export class DesignService {
  async getDesigns(): Promise<Design[]> {
    return await getRepository(Design)
      .createQueryBuilder("d")
      .select(["d.id", "d.name"])
      .where("d.active")
      .getMany();
  }

  async saveDesign(createDesignDto: CreateDesignDto) {
    return await getRepository(Design)
      .createQueryBuilder()
      .insert()
      .into(Design)
      .values([
        {
          name: createDesignDto.name,
        },
      ])
      .execute();
  }
}
