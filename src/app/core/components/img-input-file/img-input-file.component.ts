import { Component, OnInit, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { SharedService } from '../../services/shared-services';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img-input-file',
  templateUrl: './img-input-file.component.html',
  styleUrls: ['./img-input-file.component.scss']
})
export class ImgInputFileComponent implements OnInit {

  @ViewChild('inputFile') inputFile: ElementRef;

  @Input() imgPath: String | ArrayBuffer;

  @Output() imgFile = new EventEmitter();

  file: File;
  fileOverSize: boolean = false;
  fileNotImg: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  onChange(event: EventTarget): boolean {
    this.fileOverSize = false;
    this.fileNotImg = false;

    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;

    if (!this.sharedService.checkIfIsImage(files[0])) {
      this.fileNotImg = true;
      this.removeSelectedImg();
      return false;
    }
    if (this.sharedService.isFileOverSized(files[0], 20)) {
      this.fileOverSize = true;
      this.removeSelectedImg();
      return false;
    }

    const reader = new FileReader();
    reader.onload = () => this.imgPath = reader.result;
    reader.readAsDataURL(files[0]);

    this.file = files[0];
    this.imgFile.emit(this.file);
  }

  removeSelectedImg() {
    this.file = null;
    this.imgFile.emit(this.file);
    this.inputFile.nativeElement.value = '';
  }

  removeMainImg() {
    this.imgPath = null;
    this.removeSelectedImg();
  }
}
