import { getRepository, QueryRunner, DeepPartial } from "typeorm";
import { Product } from "../../../shared/entities/Product";
import { CreateProductDto } from "../dto/CreateProductDto";
import { DesignColor } from "../../../shared/entities/DesignColor";
import { ProductDesignColor } from "../../../shared/entities/ProductDesignColor";

export class ProductService {
  async getOrderProducts(orderId: number): Promise<Product[]> {
    return await getRepository(Product)
      .createQueryBuilder("p")
      .select(["p"])
      .where("p.order = :orderId", { orderId })
      .getMany();
  }

  async saveProducts(
    queryRunner: QueryRunner,
    orderId: number,
    productsDto: CreateProductDto[]
  ) {
    productsDto.forEach(async (productDto) => {
      console.log("productDto :>> ", productDto);
      const product = {
        order: {
          id: orderId,
        },
        size: {
          id: productDto.sizeId,
        },
        category: {
          id: productDto.categoryId,
        },
        design: {
          id: productDto.designId,
        },
        productType: {
          id: productDto.productTypeId,
        },
        shirtColor: {
          id: productDto.shirtColorId,
        },
        value: productDto.value,
        observations: productDto.observations,
      };

      const insertResult = await queryRunner.manager
        .getRepository(Product)
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .execute();

      if (productDto.desingColors && productDto.desingColors.length > 0) {
        this.saveDesignColorsOfProduct(
          queryRunner,
          insertResult.identifiers[0].id,
          productDto.desingColors
        );
      }
    });
  }

  async saveDesignColorsOfProduct(
    queryRunner: QueryRunner,
    productId: number,
    designColors: number[]
  ) {
    const productDesignColors: DeepPartial<
      ProductDesignColor[]
    > = designColors.map((dc) => {
      return {
        product: {
          id: productId,
        },
        designColor: {
          id: dc,
        },
      };
    });

    await queryRunner.manager
      .getRepository(ProductDesignColor)
      .createQueryBuilder()
      .insert()
      .into(ProductDesignColor)
      .values([...productDesignColors])
      .execute();
  }
}
