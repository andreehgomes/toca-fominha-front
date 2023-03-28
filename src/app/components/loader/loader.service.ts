import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from './loader.component'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoaderComponent, {
      disableClose: true,
      width: 'max-content',
      height: 'max-content',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  closeDialog(): void {
    const dialogRef = this.dialog.closeAll();
  }
}
