import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany
} from "typeorm";
import { Tarefa } from "./tarefa";
import { IUsuario } from "../../../../dominio";

@Entity()
export class Usuario implements IUsuario {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    login: string;
    @Column()
    nome: string;
    @Column({ select: false })
    senha: string;
    @Column()
    perfil: string;
    @OneToMany(() => Tarefa, tarefa => tarefa.usuario)
    tarefas: Tarefa[];
}
