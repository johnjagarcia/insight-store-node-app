import { getRepository } from "typeorm";
import { DesignColor } from "../../../shared/entities/DesignColor";
import { CreateDesignColorDto } from "../dto/CreateDesignColorDto";

export class DesignColorService {
  async getDesignColors(): Promise<DesignColor[]> {
    return await getRepository(DesignColor)
      .createQueryBuilder("dc")
      .select(["dc.id", "dc.name"])
      .where("dc.active")
      .getMany();
  }

  async saveDesignColor(createDesignColorDto: CreateDesignColorDto) {
    return await getRepository(DesignColor)
      .createQueryBuilder()
      .insert()
      .into(DesignColor)
      .values([
        {
          name: createDesignColorDto.name,
        },
      ])
      .execute();
  }
}
