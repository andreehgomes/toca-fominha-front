import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from 'src/app/core/router/router.service';

@Injectable({
  providedIn: 'root',
})
export class PageErrorService {
  mensagem1: string = 'Essa bateu na trave!';
  mensagem2: string = 'Na próxima a gente faz o gol!!!';
  mensagemTecnica: any = 'Algo de errado não está certo';

  constructor(
    private router: RouterService
    ) {}

  goToError(mensagem1?: string, mensagem2?: string, mensagemTecnica?: string) {
    !!mensagem1 ? (this.mensagem1 = mensagem1) : this.mensagem1;
    !!mensagem2 ? (this.mensagem2 = mensagem2) : this.mensagem2;
    !!mensagemTecnica ? (this.mensagemTecnica = mensagemTecnica) : this.mensagemTecnica;

    
      this.router.navigate(this.router.route.ERROR);
    
  }
}
