import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ɵangular_packages_platform_browser_dynamic_testing_testing_a } from '@angular/platform-browser-dynamic/testing';
import { Subscription } from 'rxjs';
import { InitAuthService } from 'src/app/core/base-auth/init-auth.service';
import { RouterService } from 'src/app/core/router/router.service';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { OnloadService } from 'src/app/shared/util/onload.service';
import { PayloadLogin } from './shared/model/payload-login';
import { ResponseLogin } from './shared/model/response-login';
import { LoginService } from './shared/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  token64: string | null;
  token: ResponseLogin | undefined;
  feedv1 = true;

  mensagemRespostaLogin: AlertaModel = new AlertaModel();
  subscribeLogin: Subscription;
  subscribeMensagem: Subscription;

  constructor(
    private service: LoginService,
    private auth: InitAuthService,
    private router: RouterService,
    private onLoadService: OnloadService
  ) {}

  formControlUsuario = new FormGroup({
    emailFormGroup: new FormControl(),
    senhaFormGroup: new FormControl(),
  });

  ngOnInit(): void {
    this.hideSplash();
    const logout = sessionStorage.getItem('logout');
    if (logout != 's') {
      this.initiByStorage();
    }
  }

  onSubmitLogin() {
    this.formControlUsuario.disable();
    const { emailFormGroup, senhaFormGroup } = this.formControlUsuario.controls;
    const payload: PayloadLogin = {
      email: emailFormGroup.value,
      senha: (senhaFormGroup.value),
    };
    this.autenticarWithEmail(payload);
  }

  initiByStorage() {
    const usuario = this.auth.getToken();
    if (usuario) {
      this.formControlUsuario.controls['emailFormGroup'].setValue(
        usuario.email
      );
      this.formControlUsuario.controls['senhaFormGroup'].setValue(
        usuario.senha
      );
      console.log(usuario)
      this.autenticarWithEmail({
        email: usuario.email,
        senha: usuario.senha,
      });
    }
  }

  autenticarWithEmail(payload: PayloadLogin) {
    this.service.signWithEmail(payload.email, payload.senha).then(() => {
      this.service.behaviorUsuarioLogado.subscribe((logado) => {
        if (logado) {
          localStorage.setItem('usuario', btoa(JSON.stringify(logado)));
          localStorage.setItem('token', btoa(JSON.stringify(payload)));
          this.router.navigate(this.router.route.FEEDV2);
          this.mensagemRespostaLogin = null;
        } else {
          this.service.behaviorLoginMensagem.subscribe((mensagem) => {
            if (mensagem) {
              this.mensagemRespostaLogin = mensagem;
            }
          });
          this.subscribeMensagem?.unsubscribe();
        }
      });
      this.subscribeLogin?.unsubscribe();
    });
    this.formControlUsuario.reset();
    this.formControlUsuario.enable();
  }

  newPassword() {
    this.router.navigate(this.router.route.RESET_PASSWORD);
  }
  newAccoumt() {
    this.router.navigate(this.router.route.NEW_ACCOUNT);
  }

  goTo(rota: string) {
    this.router.navigate(rota);
  }

  ngOnDestroy(): void {
    this.service.behaviorUsuarioLogado.next(null);
  }

  hideSplash() {
    setTimeout(() => {
      this.onLoadService.onLoadBehavior.next(true);
    }, 500);
  }
}
