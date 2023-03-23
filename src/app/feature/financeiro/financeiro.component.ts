import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';
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
  route = RouterEnum;

  constructor(
    private router: RouterService,
    private pagamentoService: PagamentoService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getListPayment();
  }

  goTo(route: RouterEnum) {
    this.router.navigate(route);
  }

  getListPayment() {
    this.pagamentoService.getListPayment().subscribe((pay) => {
      for (let pagamento in pay) {
        this.pagamentos.push(pay[pagamento].payload.val());
        if (this.mesAnoLista.length == 0 || !this.mesAnoLista.find((mesAno) => mesAno === this.retornarMesAno(pay[pagamento].payload.child('dataPagamento').val()))) {
          this.mesAnoLista.push(this.retornarMesAno(pay[pagamento].payload.child('dataPagamento').val()));
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
}
