import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/core/router/router.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  constructor(
    private router: RouterService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.setItem('logout', 's')
    this.router.navigate(this.router.route.LOGIN)
  }

}
