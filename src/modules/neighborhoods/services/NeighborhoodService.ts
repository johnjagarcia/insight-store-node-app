import { getRepository, Repository } from "typeorm";
import { Neighborhood } from "../../../shared/entities/Neighborhood";
import { CreateNeighborhoodDto } from "../dto/CreateNeighborhoodDto";

export class NeighborhoodService {
  async getNeighborhoods(townId: number): Promise<Neighborhood[]> {
    return await getRepository(Neighborhood)
      .createQueryBuilder("n")
      .select(["n.id", "n.name", "n.town"])
      .where("n.town = :townId", { townId })
      .getMany();
  }

  async saveNeighborhood(createNeighborhoodDto: CreateNeighborhoodDto) {
    return await getRepository(Neighborhood)
      .createQueryBuilder()
      .insert()
      .into(Neighborhood)
      .values([
        {
          name: createNeighborhoodDto.name,
          town: { id: createNeighborhoodDto.townId },
        },
      ])
      .execute();
  }
}
