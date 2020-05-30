import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: "tipos_productos" })
export class ProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre", length: 64 })
  name: string;

  @Column({ name: "maneja_colores" })
  handleColors: boolean;

  @Column({ name: "activo" })
  active: boolean;
}
