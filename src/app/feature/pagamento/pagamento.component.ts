import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import moment, { now } from 'moment';
import { Subscription } from 'rxjs';
import { InitAuthService } from 'src/app/core/base-auth/init-auth.service';
import { AccountModel } from 'src/app/shared/model/accout.enum';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { FileUploadModel } from 'src/app/shared/model/file-upload-model';
import { LocalTreino } from 'src/app/shared/model/local-treino';
import { ResponseLogin } from '../login/shared/model/response-login';
import { NewAccount } from '../new-account/shared/model/new-account';
import { NewLocalTreinoService } from '../new-local-treino/shared/new-local-treino.service';
import { PaymentModel } from './shared/model/payment.model';
import { PagamentoService } from './shared/service/pagamento.service';

@Component({
  selector: 'pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
})
export class PagamentoComponent implements OnInit, OnDestroy {
  @ViewChild('formDirective') private formDirective: NgForm;

  subscription: Subscription;
  subscriptionLocalTreino: Subscription;
  disabledData: boolean = true;
  mensagemPagamento: AlertaModel;
  private usuario: ResponseLogin;
  listaLocalTreino: Array<LocalTreino> = [];

  //arquivos
  selectedFiles: FileList;
  currentFileUpload: FileUploadModel;
  percentage: number;

  constructor(
    private datePipe: DatePipe,
    private auth: InitAuthService,
    private pagamentoService: PagamentoService,
    private localTreinoService: NewLocalTreinoService
  ) {}

  formControlPagamento = new FormGroup({
    valor: new FormControl(null, Validators.required),
    data: new FormControl(moment()),
    file: new FormControl(null, Validators.required),
    local: new FormControl(null, Validators.required),
    tipo: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.usuario = this.auth.getUsuario();
    this.getListaLocalTreino();
  }

  ngOnDestroy(): void {
    this.subscriptionLocalTreino.unsubscribe();
  }

  onSubmit() {
    const fileUpload = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUploadModel(fileUpload);
    const { valor, data, file, local, tipo } = this.formControlPagamento.controls;
    const pagamento: PaymentModel = {
      valor: valor.value,
      dataPagamento: this.datePipe.transform(data.value, 'dd/MM/yyyy'),
      nomeComprovante: file.value,
      uidPagador: this.usuario.uid,
      nomePagador: this.usuario.nome,
      local: local.value['nome'],
      tipo: tipo.value
    };
    this.subscription = this.pagamentoService
      .insertNewPayment(pagamento, this.currentFileUpload)
      .subscribe((payment) => {
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
      local: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
    });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  getListaLocalTreino() {
    this.subscriptionLocalTreino = this.localTreinoService
      .getListaLocalTreino()
      .subscribe((lista) => {
        for (let list in lista) {
          this.listaLocalTreino.push(lista[list].payload.val());
          console.log(this.listaLocalTreino);
        }
      });
  }
}
