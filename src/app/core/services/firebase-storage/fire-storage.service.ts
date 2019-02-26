import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import { fireBaseConfig, loginEmail } from './config';
import { UsersService } from '../users-service';

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

    constructor(private usersService: UsersService) {
        this.storageRef = firebase.storage().ref();
        this.token = fireBaseConfig.apiKey.split('-').pop();
    }

    uploadImage(file: File, folder: string, name?: string) {

        this.checkLoginBeforeContinue();
        let fileName: string;

        if (name) {
            fileName = name;
        } else {
            fileName = file.name.split('.')[0] + Math.random().toString().split('.').pop() + '.jpg';
        }

        this.uploadTask = this.storageRef
            .child(folder + '/' + fileName)
            .put(file, this.fileMetadata);
        let uploadObs = this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);

        return { uploadTask: this.uploadTask, uploadObs: uploadObs, fileName: fileName };
    }

    deleteImg(fileName: string, folder: string) {

        this.checkLoginBeforeContinue();

        let deleteRef = this.storageRef.child(folder + '/' + fileName);
        return deleteRef.delete();
    }

    checkLoginBeforeContinue() {
        if (this.usersService.getRole() === "ADMIN") {
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
}
