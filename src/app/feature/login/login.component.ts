import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PayloadLogin } from './shared/model/payload-login';
import { LoginService } from './shared/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private service: LoginService) { }

  formControlUsuario = new FormGroup({
    celularFormGroup: new FormControl(),
    senhaFormGroup: new FormControl()
  });

  ngOnInit(): void {
  }

  onSubmitLogin(){
    this.formControlUsuario.disable()
    const {celularFormGroup, senhaFormGroup} = this.formControlUsuario.controls;
    const payload: PayloadLogin = {
      celular: celularFormGroup.value,
      senha: senhaFormGroup.value
    }
    this.service.autenticar(payload).subscribe((res) => {
      console.log(res);
      this.formControlUsuario.enable()
    })    
  }

}
