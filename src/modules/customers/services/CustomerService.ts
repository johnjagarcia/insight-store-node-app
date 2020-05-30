import { getRepository, Repository } from "typeorm";
import { CreateCustomerDto } from "../dto/CreateCustomerDto";
import { Customer } from "../../../shared/entities/Customer";

export class CustomerService {
  async getCustomers(): Promise<Customer[]> {
    return await getRepository(Customer)
      .createQueryBuilder("c")
      .select([
        "c.id",
        "c.names",
        "c.lastNames",
        "c.cellphone",
        "c.address",
        "c.gender",
        "c.registerDate",
        "n.name",
      ])
      .innerJoin("c.neighborhood", "n")
      .getMany();
  }

  async saveCustomer(createCustomerDto: CreateCustomerDto) {
    return await getRepository(Customer)
      .createQueryBuilder()
      .insert()
      .into(Customer)
      .values([
        {
          names: createCustomerDto.names,
          lastNames: createCustomerDto.lastNames,
          cellphone: createCustomerDto.cellphone,
          neighborhood: {
            id: createCustomerDto.neighborhoodId,
          },
          address: createCustomerDto.address,
          gender: createCustomerDto.gender,
        },
      ])
      .execute();
  }
}
