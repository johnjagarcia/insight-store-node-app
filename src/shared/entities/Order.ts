import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Neighborhood } from "./Neighborhood";
import { Customer } from "./Customer";
import { OrderStatus } from "./OrderStatus";
import { Courier } from "./Courier";

@Entity({ name: "pedidos" })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "fecha_registro" })
  registerDate: Date;

  @ManyToOne(() => Neighborhood)
  @JoinColumn({ name: "id_barrio" })
  neighborhood: Neighborhood;

  @Column({ name: "direccion", length: 128 })
  address: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "id_cliente" })
  customer: Customer;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: "id_estado" })
  orderStatus: OrderStatus;

  @Column({ name: "fecha_programada_entrega" })
  programmedDeliveryDate: string;

  @Column({ name: "fecha_real_entrega" })
  realDeliveryDate?: string;

  @Column({ name: "valor_total" })
  totalValue: number;

  @Column({ name: "valor_domicilio" })
  deliveryValue: number;

  @Column({ name: "observacion", length: 255 })
  observation?: string;

  @Column({ name: "valor_pagado" })
  paidValue: number;

  @ManyToOne(() => Courier)
  @JoinColumn({ name: "id_mensajero" })
  courier: Courier;
}
