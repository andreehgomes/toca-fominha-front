import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from './core/router/router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  constructor(
    private router: RouterService
  ) { }

  ngOnInit(): void {
    this.router.navigate(this.router.route.LOGIN);
  }

}