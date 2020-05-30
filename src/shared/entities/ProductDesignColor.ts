import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { DesignColor } from "./DesignColor";

@Entity({ name: "colores_diseños_productos" })
export class ProductDesignColor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "id_pedido_producto" })
  product: Product;

  @ManyToOne(() => DesignColor)
  @JoinColumn({ name: "id_color_diseño" })
  designColor: DesignColor;
}
