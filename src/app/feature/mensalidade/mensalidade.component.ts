import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import moment, { now } from 'moment';

@Component({
  selector: 'mensalidade',
  templateUrl: './mensalidade.component.html',
  styleUrls: ['./mensalidade.component.scss'],
})
export class MensalidadeComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  @ViewChild('inputChild', { static: true })
  inputChild: ElementRef<HTMLInputElement>;

  qtdDigitosAposVirgula = 2;
  reactiveFormsRegisterOnChange = (val: any) => val;
  digitsInfo = `1.${this.qtdDigitosAposVirgula}-${this.qtdDigitosAposVirgula}`;

  constructor(private datePipe: DatePipe) {}

  formControlPagamento = new FormGroup({
    valor: new FormControl(null, Validators.required),
    data: new FormControl(this.datePipe.transform(now(), 'dd/MM/yyyy')),
    file: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {}

  onSubmit() {
    const { valor, data, file } = this.formControlPagamento.controls;
    const pagamento = {
      valor: valor,
      data: data,
      file: file,
    };
    console.log('PAGAMENTO: ', pagamento);
  }

  atualizarValor(valorInput: string) {
    const valorInputLength = valorInput.length;
    let inputElement = this.inputChild.nativeElement;
    // Retiramos o último caractere se não for um digito
    if (valorInputLength > 0 && !/\d/.test(valorInput[valorInputLength - 1])) {
      inputElement.value = this.inputChild.nativeElement.value.slice(0, -1);
      return;
    }

    console.log('VALOR INPUT: ', valorInput)
    const valorInputDigitos = valorInput.toString().replace(/\D/g, '');
    const valorInputDigitosLength = valorInputDigitos.length;

    // Verifica o maxlength
    // if (this.maxlength && valorInputDigitosLength > this.maxlength) {
    //     inputElement.value = inputElement.value.slice(0, -1);
    //     return;
    // }

    // Se temos qtdDigitosAposVirgula=2, então o input nunca poderá ser "0,000", deverá sempre
    // ser "0,00" independente de quantos zeros o usuário digitar
    if (
      +valorInputDigitos === 0 &&
      valorInputDigitosLength > this.qtdDigitosAposVirgula + 1
    ) {
      inputElement.value = inputElement.value.slice(0, -1);
      this.formControlPagamento.controls['valor'].setValue(0);
      // this.valorAtual = 0;
      this.reactiveFormsRegisterOnChange(
        this.formControlPagamento.controls['valor'].value
      );
      return;
    }

    // Se o usuário está vendo "0,00" e apertar um backspace para 0,0, o valor deixa de ser zero
    // e passa a ser null
    if (
      this.formControlPagamento.controls['valor'].value === 0 &&
      +valorInputDigitos === 0 &&
      valorInputDigitosLength < this.qtdDigitosAposVirgula + 1
    ) {
      inputElement.value = '';
      this.formControlPagamento.controls['valor'].setValue(null);
      this.reactiveFormsRegisterOnChange(
        this.formControlPagamento.controls['valor'].value
      );
      return;
    }

    const fatorDeDivisao = +('1' + '0'.repeat(this.qtdDigitosAposVirgula));
    this.formControlPagamento.controls['valor'].setValue(
      +valorInput.toString().replace(/\D/g, '') / fatorDeDivisao
    );
    this.reactiveFormsRegisterOnChange(
      this.formControlPagamento.controls['valor'].value
    );
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes.qtdDigitosAposVirgula) {
      const aux = changes.qtdDigitosAposVirgula.currentValue;
      this.digitsInfo = `1.${aux}-${aux}`;

      this.formControlPagamento.controls['valor'].setValue(null);
      this.reactiveFormsRegisterOnChange(
        this.formControlPagamento.controls['valor'].value
      );
    }
  }

  // handleDecimalChanges(e) {
  //   if (this.onlyInt) {
  //     const selectionPositionStart = e.target.selectionStart;
  //     const selectionPositionEnd = e.target.selectionEnd;

  //     const inputTotalLength = this.inputChild.nativeElement.value.length;
  //     const blockedBackspaceLength = 3;

  //     const differenceCalcStart = inputTotalLength - selectionPositionStart;
  //     const differenceCalcEnd = inputTotalLength - selectionPositionEnd;

  //     this.PreventDeleteDecimal(
  //       differenceCalcStart,
  //       differenceCalcEnd,
  //       blockedBackspaceLength,
  //       e
  //     );
  //     this.changeCursorOnDecimal(
  //       differenceCalcStart,
  //       differenceCalcEnd,
  //       blockedBackspaceLength
  //     );
  //   }
  // }

  // changeCursorOnDecimal(
  //   differenceCalcStart,
  //   differenceCalcEnd,
  //   blockedBackspaceLength
  // ) {
  //   console.log(differenceCalcEnd);
  //   console.log(blockedBackspaceLength);
  //   if (
  //     differenceCalcStart < blockedBackspaceLength ||
  //     differenceCalcEnd < blockedBackspaceLength
  //   ) {
  //     this.inputChild.nativeElement.focus();
  //     this.inputChild.nativeElement.setSelectionRange(
  //       this.inputChild.nativeElement.value.length - 3,
  //       this.inputChild.nativeElement.value.length - 3
  //     );
  //   }
  // }

  // PreventDeleteDecimal(
  //   differenceCalcStart,
  //   differenceCalcEnd,
  //   blockedBackspaceLength,
  //   e: any
  // ) {
  //   const diff = e.key === 'Backspace' ? 0 : 1;

  //   if (e.key == 'Backspace' || e.key == 'Delete') {
  //     if (
  //       differenceCalcStart < blockedBackspaceLength + diff ||
  //       differenceCalcEnd < blockedBackspaceLength + diff
  //     ) {
  //       this.deleteAndConcatIntInput(e, blockedBackspaceLength);
  //     }
  //   }
  // }
}
