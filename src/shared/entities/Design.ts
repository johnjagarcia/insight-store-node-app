import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: "diseños" })
export class Design {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre", length: 64 })
  name: string;

  @Column({ name: "activo" })
  active: boolean;
}
