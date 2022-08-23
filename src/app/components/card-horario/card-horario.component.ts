import { Component, Input, OnInit } from '@angular/core';
import { Horario } from 'src/app/shared/model/horario-model';

@Component({
  selector: 'card-horario',
  templateUrl: './card-horario.component.html',
  styleUrls: ['./card-horario.component.scss']
})
export class CardHorarioComponent implements OnInit {

  @Input() horario: Horario;

  constructor() { }

  ngOnInit(): void {
    console.log(this.horario)
  }

}
