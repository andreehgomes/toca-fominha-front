import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';
import { LocalTreino } from 'src/app/shared/model/local-treino';
import { NewLocalTreinoService } from '../new-local-treino/shared/new-local-treino.service';
import { PaymentModel } from '../pagamento/shared/model/payment.model';
import { PagamentoService } from '../pagamento/shared/service/pagamento.service';

@Component({
  selector: 'financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss'],
})
export class FinanceiroComponent implements OnInit {
  pagamentos: Array<PaymentModel> = [];
  mesAnoLista: Array<string> = [];
  mesAno: string;
  localTreinoLista: Array<LocalTreino> = [];
  route = RouterEnum;
  panelOpenState = false;
  constructor(
    private router: RouterService,
    private pagamentoService: PagamentoService,
    private datePipe: DatePipe,
    private localTreinoService: NewLocalTreinoService
  ) {
    this.getListPayment();
    this.getListaLocalTreino();
  }

  ngOnInit(): void {}

  goTo(route: RouterEnum) {
    this.router.navigate(route);
  }

  getListPayment() {
    this.pagamentoService.getListPayment().subscribe((pay) => {
      this.pagamentos = [];
      for (let pagamento in pay) {
        this.pagamentos.push(pay[pagamento].payload.val());
        console.log('lista pagamentos: ', this.pagamentos);
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
    this.localTreinoService.getListaLocalTreino().subscribe((localTreino) => {
      for (let local in localTreino) {
        this.localTreinoLista.push(localTreino[local].payload.val());
        this.localTreinoService.behaviorLocalTreino.next(this.localTreinoLista);
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
      if (pagamentos[pagamento].local == localTreino.nome && this.retornarMesAno(pagamentos[pagamento].dataPagamento) == mesAno) {
        listaPagamentos.push(pagamentos[pagamento]);
      }
    }

    return listaPagamentos;
  }
}
