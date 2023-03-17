import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import moment, { now } from 'moment';
import { AlertaModel } from 'src/app/shared/model/alertas-model';

@Component({
  selector: 'mensalidade',
  templateUrl: './mensalidade.component.html',
  styleUrls: ['./mensalidade.component.scss'],
})
export class MensalidadeComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  disabledData: boolean = true;
  mensagemMensalidade: AlertaModel;
  

  constructor(private datePipe: DatePipe) {}

  formControlPagamento = new FormGroup({
    valor: new FormControl(null, Validators.required),
    data: new FormControl(moment()),
    file: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {}

  onSubmit() {
    const { valor, data, file } = this.formControlPagamento.controls;
    const pagamento = {
      valor: valor,
      data: data,
      file: file,
    };
    console.log('PAGAMENTO: ', this.datePipe.transform(pagamento.data.value, 'dd/MM/yyyy'));
  }

  zerarForm(){

  }
}

