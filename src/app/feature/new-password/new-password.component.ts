import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';
import { PayloadNewPass } from './shared/model/payload-new-pass';
import { NewPasswordService } from './shared/service/new-password.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  route = RouterEnum;
  hide = true;
  usuario = {
    nome: 'Jogador',
    time: 'Alterar senha de acesso.'
  }

  constructor(
    private newPassService: NewPasswordService,
    private router: RouterService
    ) { }

  formControlNewPass = new FormGroup({
    dataNascimento: new FormControl(),
    novaSenha: new FormControl(),
    celular: new FormControl()
  })

  ngOnInit(): void {
  }

  onSubmit(){
    const { dataNascimento, novaSenha, celular } = this.formControlNewPass.controls;
    const payload: PayloadNewPass = {
      celular: celular.value,
      data_nascimento: dataNascimento.value,
      senha: novaSenha.value
    }

    this.newPassService.password(payload).subscribe((res) => {
      console.log('NEW PASS: ', res);
      window.localStorage.removeItem('token')
      this.router.navigate(this.router.route.LOGIN);
    })
  }

}
