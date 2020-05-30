import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { CategorySize } from "./CategorySize";

@Entity({ name: "tallas" })
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre", length: 64 })
  name: string;

  @Column({ name: "activo" })
  active: boolean;

  @OneToMany(() => CategorySize, (categorySizes) => categorySizes.size)
  categorySizes: CategorySize[];
}
