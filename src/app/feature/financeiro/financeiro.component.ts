import { Component, OnInit } from '@angular/core';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';

@Component({
  selector: 'financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent implements OnInit {

  route = RouterEnum;

  constructor(private router: RouterService) { }

  ngOnInit(): void {
  }

  goTo(route: RouterEnum){
    this.router.navigate(route);
  }

}
