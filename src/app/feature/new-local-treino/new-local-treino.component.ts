import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { LocalTreino } from 'src/app/shared/model/local-treino';
import { NewLocalTreinoService } from './shared/new-local-treino.service';

@Component({
  selector: 'app-new-local-treino',
  templateUrl: './new-local-treino.component.html',
  styleUrls: ['./new-local-treino.component.scss'],
})
export class NewLocalTreinoComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  route = RouterEnum;
  mensagemNewLocal: AlertaModel;

  constructor(private service: NewLocalTreinoService) {}

  formControlNewLocal = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    mensalidade: new FormControl(null, [Validators.required]),
    diaria: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {}

  onSubmit() {
    const { nome, mensalidade, diaria } = this.formControlNewLocal.controls;
    let localTreino: LocalTreino = {
      nome: nome.value,
      mensalidade: mensalidade.value,
      diaria: diaria.value
    }
    this.service.insertNewLocal(localTreino).then(() => {
      this.service.behaviorMensagemNewLocal.subscribe((mensagem) => {
        this.mensagemNewLocal = mensagem ? mensagem : null;
        this.zerarForm();
      });
    });
  }

  zerarForm() {
    this.formControlNewLocal.reset();
    this.formDirective.resetForm();
    for (let control in this.formControlNewLocal.controls) {
      this.formControlNewLocal.controls[control].setErrors(null);
    }
    this.formControlNewLocal = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      mensalidade: new FormControl(null, [Validators.required]),
      diaria: new FormControl(null, [Validators.required]),
    });
  }
}
