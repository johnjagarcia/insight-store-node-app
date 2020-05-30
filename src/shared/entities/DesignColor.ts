import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: "colores_diseños" })
export class DesignColor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre", length: 64 })
  name: string;

  @Column({ name: "activo" })
  active: boolean;
}
