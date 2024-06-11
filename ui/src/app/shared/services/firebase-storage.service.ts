import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  constructor(private storage: Storage) {
  }

  uploadFile(file: File) {
    return new Observable((observer: Observer<string>) => {
      const storageRef = ref(this.storage, `posters/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        {
          error: observer.error,
          complete: () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(downloadURL => {
                observer.next(downloadURL);
                observer.complete();
              })
              .catch(error =>
                observer.error(error)
              );
          }
        }
      );
    });
  }

  delete(downloadUrl: string) {
    const storageRef = ref(this.storage, downloadUrl);
    return new Observable((observer: Observer<void>) => {
      deleteObject(storageRef)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(observer.error);
    });
  }
}
