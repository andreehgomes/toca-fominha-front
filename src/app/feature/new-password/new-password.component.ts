import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { PayloadNewPass } from './shared/model/payload-new-pass';
import { NewPasswordService } from './shared/service/new-password.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  route = RouterEnum;
  hide = true;
  usuario = {
    nome: 'Jogador',
    time: 'Alterar senha de acesso.',
  };
  mensagemNewPass: AlertaModel;

  constructor(
    private newPassService: NewPasswordService,
    private router: RouterService,
    private datePipe: DatePipe
  ) {}

  formControlNewPass = new FormGroup({
    dataNascimento: new FormControl(null, Validators.required),
    novaSenha: new FormControl(null, Validators.required),
    celular: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {}

  onSubmit() {
    const { dataNascimento, novaSenha, celular } =
      this.formControlNewPass.controls;
    const payload: PayloadNewPass = {
      celular: celular.value,
      data_nascimento: this.datePipe.transform(
        dataNascimento.value,
        'dd/MM/yyyy'
      ),
      senha: novaSenha.value,
    };

    this.newPassService.newPassword(payload).then(() => {
      this.newPassService.behaviorMensagemNewPass.subscribe((mensagem) => {
        if (mensagem) {
          this.mensagemNewPass = mensagem;
          localStorage.removeItem("token");
          this.zerarForm();
        }
      });
    });
  }

  zerarForm() {
    this.formControlNewPass.reset();
    this.formDirective.resetForm();
    for (let control in this.formControlNewPass.controls) {
      this.formControlNewPass.controls[control].setErrors(null);
    };
    this.formControlNewPass = new FormGroup({
      dataNascimento: new FormControl(null, Validators.required),
      novaSenha: new FormControl(null, Validators.required),
      celular: new FormControl(null, Validators.required),
    });
  }
}
