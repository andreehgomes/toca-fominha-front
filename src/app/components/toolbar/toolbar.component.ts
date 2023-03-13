import { Component, Input, OnInit } from '@angular/core';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() usuario: any;
  openSideNav = false;
  routes = RouterEnum;

  constructor(
    private router: RouterService
  ) { }

  ngOnInit(): void {
  }

  openCloseSideNav(){
    // console.log('Antes: ', this.openSideNav);
    this.openSideNav = !this.openSideNav;
    // console.log('Depois: ', this.openSideNav);
  }

  logout(){
    sessionStorage.setItem('logout', 's');
    localStorage.removeItem('token');
    this.router.navigate(this.router.route.LOGIN);
  }

  home(){
    this.router.navigate(this.router.route.FEEDV2);
  }

  goTo(route: string){
    this.router.navigate(route);
  }

}
