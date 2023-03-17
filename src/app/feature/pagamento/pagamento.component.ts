import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import moment, { now } from 'moment';
import { Subscription } from 'rxjs';
import { InitAuthService } from 'src/app/core/base-auth/init-auth.service';
import { AccountModel } from 'src/app/shared/model/accout.enum';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { NewAccount } from '../new-account/shared/model/new-account';
import { PaymentModel } from './shared/model/payment.model';
import { PagamentoService } from './shared/service/pagamento.service';

@Component({
  selector: 'pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
})
export class PagamentoComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  subscription: Subscription;
  disabledData: boolean = true;
  mensagemPagamento: AlertaModel;
  private usuario: AccountModel;

  constructor(
    private datePipe: DatePipe,
    private auth: InitAuthService,
    private pagamentoService: PagamentoService
  ) {}

  formControlPagamento = new FormGroup({
    valor: new FormControl(null, Validators.required),
    data: new FormControl(moment()),
    file: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.usuario = this.auth.getToken();
  }

  onSubmit() {
    const { valor, data, file } = this.formControlPagamento.controls;
    const pagamento: PaymentModel = {
      valor: valor.value,
      dataPagamento: this.datePipe.transform(data.value, 'dd/MM/yyyy'),
      comprovante: file.value,
      keyPagador: this.usuario.key,
      nomePagador: this.usuario.nome,
    };
    this.subscription = this.pagamentoService.insertNewPayment(pagamento).subscribe((payment) => {
      this.pagamentoService.responseInsertNewPayment.subscribe((mensagem) => {
        this.mensagemPagamento = mensagem;
        this.zerarForm();
      });
    });
    this.subscription.unsubscribe();
  }

  zerarForm() {
    this.formControlPagamento.reset();
    this.formDirective.resetForm();
    for (let control in this.formControlPagamento.controls) {
      this.formControlPagamento.controls[control].setErrors(null);
    }
    this.formControlPagamento = new FormGroup({
      valor: new FormControl(null, Validators.required),
      data: new FormControl(moment()),
      file: new FormControl(null, Validators.required),
    });
  }
}
