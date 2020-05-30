export class CreateProductDto {
  sizeId: number;
  categoryId: number;
  designId: number;
  productTypeId: number;
  shirtColorId: number;
  desingColors: [];
  value: number = 0;
  observations: string;
}
