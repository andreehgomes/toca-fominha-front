import { ErrorHandler, Injectable } from '@angular/core';
import { PageErrorService } from 'src/app/feature/page-error/shared/page-error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private pageErrorService: PageErrorService) {}

  handleError(error: any): void {
    const mensagem1 = 'Essa bateu na trave!';
    const mensagem2 = 'Na próxima a gente faz o gol!!!';
    let mensagemTecnica = error;
    setTimeout(() => {
      if(error.message){
        console.log('Handler Error Object: ', (error))
        mensagemTecnica = error.message;
      }
      console.log('Handler Error: ', error);
      this.pageErrorService.goToError(mensagem1, mensagem2, mensagemTecnica);
    }, 300);
  }
}
