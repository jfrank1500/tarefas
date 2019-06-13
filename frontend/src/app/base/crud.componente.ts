import { Formulario } from './formulario.componente';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/primeng';
import { CRUDServico } from './crud.servico';
import { IEntidade } from '../../../../dominio';

export abstract class Crud<T extends IEntidade> extends Formulario<T>{

  constructor(
    protected servico: CRUDServico<T>,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService) {
    super(servico, confirmationService, messageService);
    this.modelo = this.getModeloVazio();
  }

  public novo() {
    this.titulo = 'Novo';
    this.modelo = this.getModeloVazio();
    this.apagavel = false;
    this.visivel = true;
  }

  protected abstract getModeloVazio(): T;
  protected abstract getResumoModelo(): string;

  public gravar() {
    /* O PrimeNg inclui o campo _$visited no modelo. Deve ser retirado para que
     * o backend nao tente usa-lo */
    this.modelo['_$visited'] = undefined;
    let registro = this.getRegistro();
    this.mensagensErro = this.validarModelo();
    if (this.mensagensErro.length == 0) {      
      if (this.modelo.id) {
        this.servico.atualizar(this.modelo.id, registro).subscribe(valor => {
          this.atualizar();
          this.visivel = false;
          this.exibirAlerta('Informação', 'Registro atualizado');
        }, erro => {
          console.log(erro);
          this.exibirErro('Erro', 'Erro ao gravar registro ' + erro.toString());
        });
      } else {
        this.modelo.id = undefined;
        this.servico.criar(registro).subscribe(valor => {
          this.atualizar();
          this.visivel = false;
          this.exibirAlerta('Informação', 'Registro criado');
        }, erro => {
          console.log(erro);
          this.exibirErro('Erro', 'Erro ao criar registro ' + erro.toString());
        });
      }
    } else {
      this.exibirErro('Erro', this.mensagensErro.join('. '));
    }
  }

  public apagar() {
    this.visivel = false;
    this.confirmationService.confirm({
      message: 'Quer apagar "' + this.getResumoModelo() + '"?',
      header: 'Confirmação de apagamento',
      icon: 'fa fa-trash',
      accept: () => {
        this.exibirAlerta('Informação', 'Registro apagado');
        if (this.modelo.id) {
          this.servico.apagar(this.modelo.id).subscribe(valor => {
            this.modelo = this.getModeloVazio();
            this.atualizar();
          }, erro => {
            console.log(erro);
            this.exibirErro('Erro', 'Erro ao apagar registro ' + erro.toString());
          });
        }
      },
      reject: () => {
        this.exibirAlerta('Informação', 'Apagamento cancelado');
      }
    });
  }
}