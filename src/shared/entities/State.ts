import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: "departamentos" })
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre", length: 64 })
  name: string;
}
