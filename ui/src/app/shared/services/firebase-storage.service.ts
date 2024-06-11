import { Injectable } from '@angular/core';
import { getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable, Observer } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  constructor(private fireStorage: AngularFireStorage) {
  }

  uploadFile(file: File) {
    return new Observable((observer: Observer<string>) => {
      const storageRef = ref(this.fireStorage.storage, `posters/${file.name}`);
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
    return this.fireStorage.storage.refFromURL(downloadUrl).delete();
  }
}
