import { Component, Input, OnInit } from '@angular/core';
import { Horario } from 'src/app/shared/model/horario-model';
import { LocalTreino } from 'src/app/shared/model/local-treino';

@Component({
  selector: 'card-horario',
  templateUrl: './card-horario.component.html',
  styleUrls: ['./card-horario.component.scss'],
})
export class CardHorarioComponent implements OnInit {
  @Input() local: LocalTreino;

  constructor() {}

  ngOnInit(): void {}
}
