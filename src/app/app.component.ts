import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { environment } from 'src/environments/environment';
import { InitAuthService } from './core/base-auth/init-auth.service';
import { RouterService } from './core/router/router.service';
import { PayloadLogin } from './feature/login/shared/model/payload-login';
import { LoginService } from './feature/login/shared/service/login.service';
import { OnloadService } from './shared/util/onload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  subscribeLogin: Subscription;
  subscribeMensagem: Subscription;
  payLoadLogin: PayloadLogin;
  onLoadStatus: boolean = false;

  constructor(
    private router: RouterService,
    private onLoadService: OnloadService
  ) {}

  ngOnInit(): void {
    this.onLoad();
    sessionStorage.setItem('logout', 'n');
    this.router.navigate(this.router.route.LOGIN);
  }

  onLoad(){
    this.onLoadService.onLoadBehavior.subscribe((load) => {
      this.onLoadStatus = load ? load : false;
      console.log('load: ', load)
      console.log('onLoad: ', this.onLoadStatus);
    })
  }
}
