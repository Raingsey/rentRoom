import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUpload} from './file-upload';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
    files = [] as any[];
    urls = [] as FileUpload[];
    @Input() btnUploadClass = 'hide';
    @Input() setTitle = '';
    @Output() onUpload = new EventEmitter();
    constructor() { }
    getFile(event) {
        if (event.target.files.length > 0) {
            for (let i = 0; i < event.target.files.length; i++) {
                const reader = new FileReader();
                this.files.push(event.target.files[i]);
                reader.onload = (events: any) => {
                    const file = {
                        name: event.target.files[i].name,
                        size: event.target.files[i].size,
                        content: events.target.result
                    }
                    this.urls.push(file);
                    // events.target.result
                }
                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }
    removeImage(index: number) {
        this.files.splice(index, 1);
        this.urls.splice(index, 1);
    }
    uploadFile() {
        this.onUpload.emit(this.files);
    }

}
