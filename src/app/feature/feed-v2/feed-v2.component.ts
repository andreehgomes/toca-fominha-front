import { Component, OnInit } from '@angular/core';
import { InitAuthService } from 'src/app/core/base-auth/init-auth.service';
import { RouterService } from 'src/app/core/router/router.service';
import { Horario } from 'src/app/shared/model/horario-model';
import { HorariosService } from 'src/app/shared/service/horarios.service';

@Component({
  selector: 'app-feed-v2',
  templateUrl: './feed-v2.component.html',
  styleUrls: ['./feed-v2.component.scss']
})
export class FeedV2Component implements OnInit {

  openSideNav = false;
  usuario: any;
  horarios: Array<Horario> = [];

  constructor(
    private router: RouterService,
    private auth: InitAuthService,
    private horarioService: HorariosService
  ) { }

  ngOnInit(): void {
    this.usuario = this.auth.getToken();
    if(!!this.usuario){
      console.log('entrou')
      this.horarioService.getHorarios(this.usuario.equipe).subscribe((res) => {
        this.horarios = res;
      })
    }
  }
}
