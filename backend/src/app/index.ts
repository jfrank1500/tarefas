import { AplicacaoBase } from './base';
import { UsuarioServico, TarefaServico, ProjetoServico } from './servicos';
import { USAR_HTTPS, CHAVE_PRIVADA } from '../../../config/config.backend';
import { PORTA } from '../../../config/config.comum';

export class Aplicacao extends AplicacaoBase {

  protected registrarServicos() {
    UsuarioServico.registrar(this);
    ProjetoServico.registrar(this);
    TarefaServico.registrar(this);
  }
}

if (USAR_HTTPS) {
  new Aplicacao().iniciar(__dirname, PORTA, CHAVE_PRIVADA);
} else {
  new Aplicacao().iniciar(__dirname, PORTA);
}
