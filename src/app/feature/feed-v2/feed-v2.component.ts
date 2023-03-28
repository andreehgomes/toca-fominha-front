import { Component, OnInit } from '@angular/core';
import { InitAuthService } from 'src/app/core/base-auth/init-auth.service';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';
import { Horario } from 'src/app/shared/model/horario-model';
import { AuthStateService } from 'src/app/shared/service/authState/auth-state.service';
import { HorariosService } from 'src/app/shared/service/horarios.service';


@Component({
  selector: 'app-feed-v2',
  templateUrl: './feed-v2.component.html',
  styleUrls: ['./feed-v2.component.scss']
})
export class FeedV2Component implements OnInit {

  route = RouterEnum;
  openSideNav = false;
  usuario: any;
  horarios: Array<Horario> = [];

  constructor(
    private auth: InitAuthService,
    private authState: AuthStateService
  ) { }

  ngOnInit(): void {
    console.log(this.authState.getAuthState().subscribe((res)=> {
      console.log('Auth State: ',res);
    }))
    this.usuario = this.auth.getUsuario();
    // if(!!this.usuario){
    //   this.horarioService.getHorarios(this.usuario.equipe).subscribe((res) => {
    //     this.horarios = res;
    //   })
    // }
  }
}
