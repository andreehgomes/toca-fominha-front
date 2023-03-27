import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';
import { LocalTreino } from 'src/app/shared/model/local-treino';
import { NewLocalTreinoService } from '../new-local-treino/shared/new-local-treino.service';

@Component({
  selector: 'treinos',
  templateUrl: './treinos.component.html',
  styleUrls: ['./treinos.component.scss']
})
export class TreinosComponent implements OnInit {

  route = RouterEnum;
  listaLocalTreino: Array<LocalTreino> = []

  constructor(private router: RouterService, private localTreinoService: NewLocalTreinoService) { }

  ngOnInit(): void {
    this.getListaLocalTreino();
  }

  goTo(route: RouterEnum) {
    this.router.navigate(route);
  }

  getListaLocalTreino() {
    this.localTreinoService.behaviorLocalTreino.subscribe((localTreino) => {
      this.listaLocalTreino = localTreino;
    });
  }

}
