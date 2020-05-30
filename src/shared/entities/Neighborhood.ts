import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Town } from "./Town";

@Entity({ name: "barrios" })
export class Neighborhood {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre", length: 64 })
  name: string;

  @ManyToOne(() => Town)
  @JoinColumn({ name: "id_municipio" })
  town: Town;
}
