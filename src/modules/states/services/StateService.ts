import { getRepository } from "typeorm";
import { State } from "../../../shared/entities/State";

export class StateService {
  async getStates(): Promise<State[]> {
    return await getRepository(State)
      .createQueryBuilder("s")
      .select(["s.id", "s.name"])
      .getMany();
  }
}
