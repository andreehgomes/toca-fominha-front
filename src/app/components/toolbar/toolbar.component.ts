import { Component, Input, OnInit } from '@angular/core';
import { InitAuthService } from 'src/app/core/base-auth/init-auth.service';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';
import { AuthStateService } from 'src/app/shared/service/authState/auth-state.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() usuario?: any;
  openSideNav = false;
  routes = RouterEnum;
  state: any = null;

  constructor(
    private router: RouterService,
    private auth: InitAuthService,
    private authState: AuthStateService
  ) { }

  ngOnInit(): void {
    this.authState.getAuthState().subscribe((auth) => {
      if(auth){
        this.state = auth;
      }
    })
    if(!this.usuario){
      this.usuario = this.auth.getUsuario();
    }
  }

  openCloseSideNav(){
    this.openSideNav = !this.openSideNav;
  }

  logout(){
    sessionStorage.setItem('logout', 's');
    localStorage.removeItem('token');
    this.auth.logout();
    this.router.navigate(this.router.route.LOGIN);
  }

  home(){
    this.router.navigate(this.router.route.FEEDV2);
  }

  goTo(route: string){
    this.router.navigate(route);
  }

}
