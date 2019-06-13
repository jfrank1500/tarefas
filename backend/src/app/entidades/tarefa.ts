import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn
} from "typeorm";

import { Usuario } from "./usuario";
import { ITarefa } from "../../../../dominio";
import { Projeto } from "./projeto";

@Entity({ name: 'tarefa' })
export class Tarefa implements ITarefa {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    descricao: string;
    @Column({ nullable: true })
    previsao: string;
    @Column({ nullable: false })
    usuario_id: number;
    @ManyToOne(() => Usuario, usuario => usuario.tarefas, { nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
    @Column({ nullable: false })
    projeto_id: number;
    @ManyToOne(() => Projeto, projeto => projeto.tarefas, { nullable: false })
    @JoinColumn({ name: 'projeto_id' })
    projeto: Projeto;
}
