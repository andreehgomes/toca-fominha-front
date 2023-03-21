import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { RedefirSenhaService } from './shared/redefir-senha.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss'],
})
export class RedefinirSenhaComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  route = RouterEnum;
  hide = true;
  usuario = {
    nome: 'Jogador',
    time: 'Alterar senha de acesso.',
  };
  mensagemRedefinirSenha: AlertaModel;

  constructor(
    private router: RouterService,
    private redefirSenhaService: RedefirSenhaService
  ) {}

  formControlNewPass = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.min(6)]),
  });

  ngOnInit(): void {}

  onSubmit() {
    const { email } = this.formControlNewPass.controls;
    this.redefirSenhaService.redefinirSenha(email.value).then(() => {
      this.redefirSenhaService.mensageRedefinirSenha.subscribe((mensagem) => {
        this.mensagemRedefinirSenha = mensagem;
        this.zerarForm();
      });
    });
  }

  zerarForm() {
    this.formControlNewPass.reset();
    this.formDirective.resetForm();
    for (let control in this.formControlNewPass.controls) {
      this.formControlNewPass.controls[control].setErrors(null);
    }
    this.formControlNewPass = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.min(6)]),
    });
  }
}
