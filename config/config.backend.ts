export const APLICACAO = 'tarefas';
export const USAR_HTTPS = false;
export const CHAVE_PRIVADA = 'senha123';
export const SEMENTE_JWT = 'SUA-SEMENTE-PARA-ASSINAR-JSON-WEB-TOKEN';
export const BANCO_TIPO = 'sqlite3'; /* sqlite3 / mysql */
export const CABECALHO_AUTENTICACAO = 'AUTH-TOKEN';

export const FORMATO_LOG_ERRO = '[:date[iso]] :res[Login] :method :status :remote-addr :url [:res[content-length]] :response-time[0] ms :res[Erro]';
export const FORMATO_LOG_ACESSO = '[:date[iso]] :res[Login] :method :status :remote-addr :url [:res[content-length]] :response-time[0] ms';