import { Component, OnInit, Input } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html'
})
export class ValidatorsComponent implements OnInit {

  @Input()
  form: FormGroup;

  @Input()
  input: FormControlName;

  @Input()
  inputName: string;

  @Input()
  validators: any[];  

  required: boolean;
  email: boolean;
  whiteSpace: boolean;
  maxlength: boolean;

  maxlengthNum: number;

  constructor() { }

  ngOnInit() {
    if(this.validators) {
    this.required = this.validators.includes('required');
    this.email = this.validators.includes('email');
    this.whiteSpace = this.validators.includes('whiteSpace');
    this.maxlength = this.validators.includes('maxlength');
    if(this.maxlength){
      let maxLengthArrayPos = this.validators.indexOf('maxlength');
      this.maxlengthNum = this.validators[maxLengthArrayPos + 1];
    }
    }
  }

}
