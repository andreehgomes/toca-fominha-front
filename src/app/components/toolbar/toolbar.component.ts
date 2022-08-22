import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() nomeUsuario: string;

  openSideNav = false;

  constructor() { }

  ngOnInit(): void {
  }

  openCloseSideNav(){
    console.log('Antes: ', this.openSideNav);
    this.openSideNav = !this.openSideNav;
    console.log('Depois: ', this.openSideNav);
  }

  // logout(){
  //   sessionStorage.setItem('logout', 's')
  //   this.router.navigate(this.router.route.LOGIN)
  // }

}
