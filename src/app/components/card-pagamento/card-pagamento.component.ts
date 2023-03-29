import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InitAuthService } from 'src/app/core/base-auth/init-auth.service';
import { PaymentModel } from 'src/app/feature/pagamento/shared/model/payment.model';
import { AccountModel } from 'src/app/shared/model/accout.enum';

@Component({
  selector: 'card-pagamento',
  templateUrl: './card-pagamento.component.html',
  styleUrls: ['./card-pagamento.component.scss']
})
export class CardPagamentoComponent implements OnInit {

  @Input() pagamento: PaymentModel;
  @Output() delete: EventEmitter<PaymentModel> = new EventEmitter<PaymentModel>(null);


  usuario: AccountModel;

  constructor(private initService: InitAuthService) { }

  ngOnInit(): void {
    this.getAccount();
  }

  print(texto: string){
  }

  getAccount(){
    this.usuario = this.initService.getUsuario();
  }

  getDelete(event){ 
    this.delete.emit(event);
  }

}
