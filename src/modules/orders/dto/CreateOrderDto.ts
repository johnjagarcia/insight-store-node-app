import { CreateProductDto } from "../../products/dto/CreateProductDto";

export class CreateOrderDto {
  products: CreateProductDto[] = [
    {
      categoryId: 0,
      designId: 0,
      observations: "",
      shirtColorId: 0,
      productTypeId: 0,
      sizeId: 0,
      value: 0,
      desingColors: [],
    },
  ];
  neighborhoodId = 0;
  address = "";
  customerId = 0;
  programmedDeliveryDate = "";
  deliveryValue = 0;
  observation = "";
  paidValue = 0;
  courierId = 0;
}
