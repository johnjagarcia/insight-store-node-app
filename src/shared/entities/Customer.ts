import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Neighborhood } from "./Neighborhood";

@Entity({ name: "clientes" })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "celular", length: 16 })
  cellphone: string;

  @Column({ name: "nombres", length: 32 })
  names: string;

  @Column({ name: "apellidos", length: 32 })
  lastNames: string;

  @ManyToOne(() => Neighborhood)
  @JoinColumn({ name: "id_barrio" })
  neighborhood: Neighborhood;

  @Column({ name: "direccion", length: 128 })
  address: string;

  @Column({ name: "genero" })
  gender: string;

  @Column({ name: "fecha_registro" })
  registerDate: Date;
}
