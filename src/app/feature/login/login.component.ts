import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ɵangular_packages_platform_browser_dynamic_testing_testing_a } from '@angular/platform-browser-dynamic/testing';
import { Subscription } from 'rxjs';
import { InitAuthService } from 'src/app/core/base-auth/init-auth.service';
import { RouterService } from 'src/app/core/router/router.service';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
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

  mensagemRespostaLogin: AlertaModel = new AlertaModel();
  subscribeLogin: Subscription;
  subscribeMensagem: Subscription;

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
    // const logout = sessionStorage.getItem('logout');
    // if (logout != 's') {
    //   this.initiByStorage();
    // }
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
   this.service.autenticar(payload).then(() => {
    this.service.behaviorUsuarioLogado.subscribe((logado) => {
      if(logado){
        this.mensagemRespostaLogin = null;
      }else{
        this.service.behaviorLoginMensagem.subscribe((mensagem) => {
          if(mensagem){
            this.mensagemRespostaLogin = mensagem;
          }
        })
        this.subscribeMensagem?.unsubscribe();
      }
    });
    this.subscribeLogin?.unsubscribe();
   });
   
      // this.router.navigate(this.router.route.FEEDV2);
      this.formControlUsuario.reset();
      this.formControlUsuario.enable();
    
  }

  newPassword(){
    this.router.navigate(this.router.route.NEW_PASSWORD);
  }
  newAccoumt(){
    this.router.navigate(this.router.route.NEW_ACCOUNT);
  }

  goTo(rota: string){
    this.router.navigate(rota);
  }

}
