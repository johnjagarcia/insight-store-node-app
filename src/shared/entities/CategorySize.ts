import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "./Category";
import { Size } from "./Size";

@Entity({ name: "categorias_tallas" })
export class CategorySize {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "id_categoria" })
  category: Category;

  @ManyToOne(() => Size)
  @JoinColumn({ name: "id_talla" })
  size: Size;
}
