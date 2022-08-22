import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { InitAuthService } from 'src/app/core/base-auth/init-auth.service';
import { RouterService } from 'src/app/core/router/router.service';
import { PayloadLogin } from './shared/model/payload-login';
import { ResponseLogin } from './shared/model/response-login';
import { LoginService } from './shared/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  token64: string | null;
  token: ResponseLogin | undefined;
  feedv1 = true;

  constructor(
    private service: LoginService,
    private auth: InitAuthService,
    private router: RouterService
  ) {}

  formControlUsuario = new FormGroup({
    celularFormGroup: new FormControl(),
    senhaFormGroup: new FormControl(),
  });

  ngOnInit(): void {
    const logout = sessionStorage.getItem('logout');
    if (logout != 's') {
      this.initiByStorage();
    }
  }

  onSubmitLogin() {
    this.formControlUsuario.disable();
    const { celularFormGroup, senhaFormGroup } =
      this.formControlUsuario.controls;
    const payload: PayloadLogin = {
      celular: celularFormGroup.value,
      senha: senhaFormGroup.value,
    };
      this.autenticar(payload);
    
  }

  initiByStorage() {
    const usuario = this.auth.getAuth();
    console.log(usuario)
    if (usuario) {
      console.log(usuario);
      this.formControlUsuario.controls['celularFormGroup'].setValue(
        usuario.celular
      );
      this.formControlUsuario.controls['senhaFormGroup'].setValue(
        usuario.senha
      );
      this.autenticar(usuario);
    }
  }

  autenticar(payload: PayloadLogin) {
    this.service.autenticar(payload).subscribe((res) => {
      localStorage.setItem('token', res['token']);
      this.router.navigate(this.router.route.FEEDV2);
      this.formControlUsuario.reset();
      this.formControlUsuario.enable();
    });
  }
}
