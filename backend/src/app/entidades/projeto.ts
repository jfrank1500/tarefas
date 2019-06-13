import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany
} from "typeorm";
import { Tarefa } from "./tarefa";
import { IProjeto } from "../../../../dominio";

@Entity()
export class Projeto implements IProjeto {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nome: string;
    @OneToMany(() => Tarefa, tarefa => tarefa.projeto)
    tarefas: Tarefa[];
}
