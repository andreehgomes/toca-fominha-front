import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';

@Component({
  selector: 'treinos',
  templateUrl: './treinos.component.html',
  styleUrls: ['./treinos.component.scss']
})
export class TreinosComponent implements OnInit {

  route = RouterEnum;

  constructor(private router: RouterService) { }

  ngOnInit(): void {
  }

  goTo(route: RouterEnum) {
    this.router.navigate(route);
  }

}
