import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: "estados_pedidos" })
export class OrderStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre", length: 64 })
  name: string;

  @Column({ name: "activo" })
  active: boolean;
}
