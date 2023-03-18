export interface PaymentModel {
    keyPagador: string;
    nomePagador: string;
    tipo?: string;
    valor: string;
    dataPagamento: string;
    keyComprovante?: string;
    nomeComprovante?: string;
    url?: string;
}