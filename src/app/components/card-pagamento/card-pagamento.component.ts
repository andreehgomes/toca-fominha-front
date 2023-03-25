import { Component, OnInit, Input } from '@angular/core';
import { PaymentModel } from 'src/app/feature/pagamento/shared/model/payment.model';

@Component({
  selector: 'card-pagamento',
  templateUrl: './card-pagamento.component.html',
  styleUrls: ['./card-pagamento.component.scss']
})
export class CardPagamentoComponent implements OnInit {

  @Input() pagamento: PaymentModel;

  constructor() { }

  ngOnInit(): void {
  }

}
