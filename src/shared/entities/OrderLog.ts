import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Order } from "./Order";
import { OrderStatus } from "./OrderStatus";

@Entity({ name: "historicos_pedidos" })
export class OrderLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "id_pedido" })
  order: Order;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: "id_estado" })
  orderStatus: OrderStatus;

  @Column({ name: "fecha" })
  date: Date;
}
