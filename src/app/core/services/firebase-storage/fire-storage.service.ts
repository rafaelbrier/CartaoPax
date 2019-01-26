import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import { fireBaseConfig, loginEmail } from './config';

@Injectable({
    providedIn: 'root'
})
export class FireStorageService {

    storageRef: firebase.storage.Reference;
    uploadTask: firebase.storage.UploadTask;
    fileMetadata = {
        contentType: 'image/jpeg' || 'image/png'
    };

    token: string;

    constructor() {
        this.storageRef = firebase.storage().ref();
        this.token = fireBaseConfig.apiKey.split('-').pop();
    }

    uploadImage(file: File, folder: string) {
        
        this.checkLoginBeforeContinue();

         this.uploadTask = this.storageRef
         .child(folder + '/' + file.name.split('.')[0] + Math.random().toString().split('.').pop() + '.jpg')
            .put(file, this.fileMetadata);
         let uploadObs = this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);

         return { uploadTask: this.uploadTask, uploadObs: uploadObs };       
    }

    checkLoginBeforeContinue() {
        firebase.auth().onAuthStateChanged((user: firebase.User) => {
            if (user) {
                return;
            } else {
                firebase.auth().signInWithEmailAndPassword(loginEmail, this.token)
                    .catch((err) => {
                        console.log(err);
                    });
                return;
            }
        });
    }
}
