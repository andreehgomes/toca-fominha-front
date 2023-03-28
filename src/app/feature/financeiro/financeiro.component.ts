import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';
import { LocalTreino } from 'src/app/shared/model/local-treino';
import { TipoPagamento } from 'src/app/shared/model/tipo-pagamento.enum';
import { NewLocalTreinoService } from '../new-local-treino/shared/new-local-treino.service';
import { PaymentModel } from '../pagamento/shared/model/payment.model';
import { PagamentoService } from '../pagamento/shared/service/pagamento.service';

@Component({
  selector: 'financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss'],
})
export class FinanceiroComponent implements OnInit, OnDestroy {
  route = RouterEnum;
  subscriptionPagamento: Subscription;
  subscriptionLocalTreino: Subscription;
  localTreinoLista: Array<LocalTreino> = [];
  pagamentos: Array<PaymentModel> = [];
  mesAnoLista: Array<string> = [];
  valorPagoMesAno: number;
  mesAno: string;
  panelOpenState = false;
  tipoPagamento = TipoPagamento;

  constructor(
    private router: RouterService,
    private pagamentoService: PagamentoService,
    private datePipe: DatePipe,
    private localTreinoService: NewLocalTreinoService
  ) {
    this.getListPayment();
    this.getListaLocalTreino();
  }
  ngOnDestroy(): void {
    this.subscriptionPagamento.unsubscribe();
    this.subscriptionLocalTreino.unsubscribe();
  }

  ngOnInit(): void {}

  goTo(route: RouterEnum) {
    this.router.navigate(route);
  }

  getListPayment() {
    this.subscriptionPagamento = this.pagamentoService
      .getListPayment()
      .subscribe((pay) => {
        this.pagamentos = [];
        for (let pagamento in pay) {
          this.pagamentos.push(pay[pagamento].payload.val());
          if (
            this.mesAnoLista.length == 0 ||
            !this.mesAnoLista.find(
              (mesAno) =>
                mesAno ===
                this.retornarMesAno(
                  pay[pagamento].payload.child('dataPagamento').val()
                )
            )
          ) {
            this.mesAnoLista.push(
              this.retornarMesAno(
                pay[pagamento].payload.child('dataPagamento').val()
              )
            );
          }
        }
      });
  }

  retornarMesAno(data: string) {
    let newData =
      data.substring(6, 10) +
      '-' +
      data.substring(3, 5) +
      '-' +
      data.substring(0, 2) +
      ' 00:00:00';
    return this.datePipe.transform(new Date(newData), 'MMMM/y');
  }

  getListaLocalTreino() {
    this.subscriptionLocalTreino = this.localTreinoService
      .getListaLocalTreino()
      .subscribe((localTreino) => {
        for (let local in localTreino) {
          this.localTreinoLista.push(localTreino[local].payload.val());
          this.localTreinoService.behaviorLocalTreino.next(
            this.localTreinoLista
          );
        }
      });
  }

  filterPagamentosPorLocalTreino(
    mesAno: string,
    localTreino: LocalTreino,
    pagamentos: Array<PaymentModel>
  ): Array<PaymentModel> {
    let listaPagamentos: Array<PaymentModel> = [];
    for (let pagamento in pagamentos) {
      if (
        pagamentos[pagamento].local == localTreino.nome &&
        this.retornarMesAno(pagamentos[pagamento].dataPagamento) == mesAno
      ) {
        listaPagamentos.push(pagamentos[pagamento]);
      }
    }

    return listaPagamentos;
  }

  getValorPagoMesAno(
    mesAno: string,
    localTreino: LocalTreino,
    pagamentos: Array<PaymentModel>
  ): number {
    let valor: number = 0;

    for (let pagamento in pagamentos) {
      if (
        pagamentos[pagamento].local == localTreino.nome &&
        this.retornarMesAno(pagamentos[pagamento].dataPagamento) == mesAno
      ) {
        valor = valor + Number(pagamentos[pagamento].valor);
      }
    }
    return valor;
  }

  getNumeroDePagantes(
    tipo: string,
    mesAno: string,
    localTreino: LocalTreino,
    pagamentos: Array<PaymentModel>
  ): number {
    let pagantes: number = 0;

    for (let pagamento in pagamentos) {
      if (
        pagamentos[pagamento].local == localTreino.nome &&
        this.retornarMesAno(pagamentos[pagamento].dataPagamento) == mesAno &&
        pagamentos[pagamento].tipo == tipo
      ) {
        pagantes++;
      }
    }
    return pagantes;
  }
}
