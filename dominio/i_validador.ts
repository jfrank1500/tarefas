export interface IValidador {
    getMensagensErro(): string[];
    textoRequerido(texto: string, mensagem: string);
    numeroRequerido(numero: number, mensagem: string);
    dataValida(data: string, mensagem: string);
}