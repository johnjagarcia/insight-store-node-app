import { getRepository, Repository } from "typeorm";
import { Town } from "../../../shared/entities/Town";
import { CreateTownDto } from "../dto/CreateTownDto";

export class TownService {
  async getTowns(stateId: number): Promise<Town[]> {
    return await getRepository(Town)
      .createQueryBuilder("t")
      .select(["t.id", "t.name"])
      .where("t.state = :stateId", { stateId })
      .getMany();
  }

  async saveTown(createTownDto: CreateTownDto) {
    return await getRepository(Town)
      .createQueryBuilder()
      .insert()
      .into(Town)
      .values([
        { name: createTownDto.name, state: { id: createTownDto.stateId } },
      ])
      .execute();
  }
}
