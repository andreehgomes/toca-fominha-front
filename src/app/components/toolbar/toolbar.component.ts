import { Component, Input, OnInit } from '@angular/core';
import { RouterService } from 'src/app/core/router/router.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() usuario: any;

  openSideNav = false;

  constructor(
    private router: RouterService
  ) { }

  ngOnInit(): void {
  }

  openCloseSideNav(){
    console.log('Antes: ', this.openSideNav);
    this.openSideNav = !this.openSideNav;
    console.log('Depois: ', this.openSideNav);
  }

  logout(){
    sessionStorage.setItem('logout', 's')
    this.router.navigate(this.router.route.LOGIN)
  }

  home(){
    this.router.navigate(this.router.route.FEEDV2);
  }

}
