import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/core/router/router.service';

@Component({
  selector: 'app-feed-v2',
  templateUrl: './feed-v2.component.html',
  styleUrls: ['./feed-v2.component.scss']
})
export class FeedV2Component implements OnInit {

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

}
