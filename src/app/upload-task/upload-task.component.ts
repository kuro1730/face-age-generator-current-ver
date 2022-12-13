import { Component, OnInit, Input,Output,EventEmitter, AfterContentChecked } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
    selector: 'upload-task',
    templateUrl: './upload-task.component.html',
    styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {

    @Input() file: File;
    @Output() isUploadFinish =new EventEmitter<boolean>() ;

    task: AngularFireUploadTask;                                        // this does the uploading for us

    percentage: Observable<number>;
    snapshot: Observable<any>;
    downloadURL: string;

    constructor(private storage: AngularFireStorage, private db: AngularFirestore) {  }

    ngOnInit(): void {
        
        this.startUpload();
    }
    
    
    

    startUpload() {
        console.log('uploading file', this.file);

        let safeName = this.file.name.replace(/([^a-z0-9.]+)/gi, '');   // file name stripped of spaces and special chars
        let timestamp = Date.now();                                     // ex: '1598066351161'
        const uniqueSafeName = timestamp + '_' + safeName;
        const path = 'uploads/' + uniqueSafeName;                       // Firebase storage path
        const ref = this.storage.ref(path);                             // reference to storage bucket

        this.task = this.storage.upload(path, this.file);
        this.percentage = this.task.percentageChanges();                // progress monitoring
        this.snapshot = this.task.snapshotChanges().pipe(               // emits a snapshot of the transfer progress every few hundred milliseconds
            
            finalize(async () => {                                      // after the observable completes, get the file's download URL
                this.downloadURL = await ref.getDownloadURL().toPromise();

                this.db.collection('files').doc(uniqueSafeName).set({
                    storagePath: path,
                    downloadURL: this.downloadURL,
                    originalName: this.file.name,
                    timestamp: timestamp
                    
                })
                    .then(function () {
                        console.log('document written!');
                        
                    })
                    .catch(function (error) {
                        console.error('Error writing document:', error);
                    });
                    this.isUploadFinish.emit(true); }),
            
        );
        
        
    }
    
    // checkUploadFinish(snapshot){
    //     if(snapshot.state=='SUCCESS'){
    //     this.isUploadFinish.emit(true);}
    //     else {
    //     return this.isUploadFinish.emit(false); }
    // }

    isActive(snapshot) {
        return (snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes);
    }

}
