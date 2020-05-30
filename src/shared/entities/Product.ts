import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./Order";
import { Size } from "./Size";
import { Category } from "./Category";
import { Design } from "./Design";
import { ProductType } from "./ProductType";
import { ShirtColor } from "./ShirtColor";

@Entity({ name: "pedidos_productos" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "id_pedido" })
  order: Order;

  @ManyToOne(() => Size)
  @JoinColumn({ name: "id_talla" })
  size: Size;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "id_categoria" })
  category: Category;

  @ManyToOne(() => Design)
  @JoinColumn({ name: "id_diseño" })
  design: Design;

  @ManyToOne(() => ProductType)
  @JoinColumn({ name: "id_tipo_producto" })
  productType: ProductType;

  @ManyToOne(() => ShirtColor)
  @JoinColumn({ name: "id_color_camisa" })
  shirtColor: ShirtColor;

  @Column({ name: "valor" })
  value: number;

  @Column({ name: "comprado" })
  bought: boolean;

  @Column({ name: "diseño_realizado" })
  desingReady: boolean;

  @Column({ name: "listo_entrega" })
  readyToDelivery: boolean;

  @Column({ name: "observaciones", length: 255 })
  observations?: string;
}
