import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PaymentModel } from 'src/app/feature/pagamento/shared/model/payment.model';
import { FileUploadModel } from '../../model/file-upload-model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private basePath = '/uploads';

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  pushFileToStorage(fileUpload: FileUploadModel, pathSaveData: string, payment: PaymentModel): Observable<number> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          payment.url = downloadURL;
          payment.nomeComprovante = fileUpload.file.name;
          this.saveFileDataPayment(pathSaveData, payment);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileDataPayment(pathSaveData: string, payment: PaymentModel): void {
    this.db.list(pathSaveData).push(payment);
  }

  getFiles(numberItems): AngularFireList<FileUploadModel> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUploadModel): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
