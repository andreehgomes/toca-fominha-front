import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { newAccount } from 'src/app/feature/new-account/shared/model/new-account';

@Injectable({
  providedIn: 'root'
})
export class NewPasswordDataService {

  constructor() { }

  private accountSource = new BehaviorSubject({ account: null, key: '' });
  accountAtual = this.accountSource.asObservable();

  obtemAccount(account: newAccount, key: string){
    this.accountSource.next({account: account, key: key})
  }

}
