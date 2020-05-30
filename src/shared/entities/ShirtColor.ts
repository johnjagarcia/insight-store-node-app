import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: "colores_camisetas" })
export class ShirtColor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre", length: 64 })
  name: string;

  @Column({ name: "activo" })
  active: boolean;
}
