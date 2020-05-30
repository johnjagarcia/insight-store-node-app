import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { State } from "./State";
import { SwaggerModel, OptionalProperty } from "fortjs-swagger";

@Entity({ name: "municipios" })
export class Town implements SwaggerModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre", length: 64 })
  name: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: "id_departamento" })
  state: State;

  getExample?() {
    this.id = 1;
    this.name = "Barranquilla";
    this.state = {
      id: 1,
      name: "Atlántico",
    };
  }
}
