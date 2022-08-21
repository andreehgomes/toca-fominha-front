import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/core/router/router.service';
import { PageErrorService } from './shared/page-error.service';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss']
})
export class PageErrorComponent implements OnInit {

  mensagem1: string;
  mensagem2: string;
  mensagemTecnica: string;

  showMensagemTecnica: boolean = false;

  constructor(
    private pageErrorService: PageErrorService,
    private router: RouterService
    ) { }

  ngOnInit(): void {
    this.mensagem1 = this.pageErrorService.mensagem1;
    this.mensagem2 = this.pageErrorService.mensagem2;
    this.mensagemTecnica = this.pageErrorService.mensagemTecnica;
  }

  voltar(){
    this.router.navigate('login')
  }

}
