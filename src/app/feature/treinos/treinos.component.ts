import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';
import { LocalTreino } from 'src/app/shared/model/local-treino';
import { NewLocalTreinoService } from '../new-local-treino/shared/new-local-treino.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'treinos',
  templateUrl: './treinos.component.html',
  styleUrls: ['./treinos.component.scss']
})
export class TreinosComponent implements OnInit, OnDestroy{

  subscriptionLocalTreino: Subscription;

  route = RouterEnum;
  listaLocalTreino: Array<LocalTreino> = []

  constructor(private router: RouterService, private localTreinoService: NewLocalTreinoService) { }
  ngOnDestroy(): void {
  this.subscriptionLocalTreino.unsubscribe();
  }

  ngOnInit(): void {
    this.getListaLocalTreino();
  }

  goTo(route: RouterEnum) {
    this.router.navigate(route);
  }

  getListaLocalTreino() {
    this.subscriptionLocalTreino = this.localTreinoService.behaviorLocalTreino.subscribe((localTreino) => {
      this.listaLocalTreino = localTreino;
    });
  }

}
