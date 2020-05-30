import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "mensajeros" })
export class Courier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "celular", length: 16 })
  cellphone: string;

  @Column({ name: "nombre", length: 64 })
  name: string;

  @Column({ name: "activo" })
  active: boolean;
}
