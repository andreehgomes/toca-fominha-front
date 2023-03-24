export interface PaymentModel {
    uidPagador: string;
    nomePagador: string;
    tipo?: string;
    valor: string;
    dataPagamento: string;
    keyComprovante?: string;
    nomeComprovante?: string;
    url?: string;
    local?: string;
}