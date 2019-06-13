export const TAMANHO_PAGINA = 10;
export const DEBUG = false;
export const TIMEOUT = 30 * 60; /* 30 minutes */

export const PORTA = 4200;

export const REQUISICAO_ERRADA = 400;
export const NAO_AUTORIZADO = 401;
export const NAO_ENCONTRADO = 404;

export const ANONIMO = 'ANONIMO';
export const USUARIO = 'USUARIO';
export const ADMINISTRADOR = 'ADMINISTRADOR';

export const API_ENTRAR = '/api/usuarios/entrar';
export const API_SAIR = '/api/usuarios/sair';
export const API_QUEM = '/api/usuarios/quem';
export const API_TOKEN_ATUALIZAR = '/api/token/atualizar';

export const API_USUARIOS_ID = '/api/usuarios/:id';
export const API_USUARIOS = '/api/usuarios';

export const API_TAREFAS_ID = '/api/tarefas/:id';
export const API_TAREFAS = '/api/tarefas';

export const API_PROJETOS_ID = '/api/projetos/:id';
export const API_PROJETOS = '/api/projetos';

export const RAIZ_URL = '/';
export const INICIO_URL = 'inicio';
export const PROJETO_URL = 'projetos';
export const USUARIO_URL = 'usuarios';
export const TAREFA_URL = 'tarefas';

export const CALENDARIO_PT = {
    firstDayOfWeek: 0,
    dayNames:
        ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out',
        'Nov', 'Dez'
    ],
    today: 'Hoje',
    clear: 'Limpar'
};


