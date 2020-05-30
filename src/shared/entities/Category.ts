import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { CategorySize } from "./CategorySize";

@Entity({ name: "categorias" })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre", length: 64 })
  name: string;

  @Column({ name: "activo" })
  active: boolean;

  @OneToMany(() => CategorySize, (categorySizes) => categorySizes.category)
  categorySizes: CategorySize[];
}
