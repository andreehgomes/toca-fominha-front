export interface PaymentModel {
    keyPagador: string;
    nomePagador: string;
    tipo?: string;
    valor: string;
    dataPagamento: string;
    comprovante?: string;
}