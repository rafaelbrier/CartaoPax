import { Component, OnInit, Input } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styles: [ ` p {
    margin-bottom: 5px;  } `   ]
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
  maxLength: boolean;
  minLength: boolean;

  maxLengthNum: number;
  minLengthNum: number;

  constructor() { }

  ngOnInit() {
    if(this.validators) {
    this.required = this.validators.includes('required');
    this.email = this.validators.includes('email');
    this.whiteSpace = this.validators.includes('whiteSpace');
    this.maxLength = this.validators.includes('maxlength');
    if(this.maxLength){
      let maxLengthArrayPos = this.validators.indexOf('maxlength');
      this.maxLengthNum = this.validators[maxLengthArrayPos + 1];
    }
    this.minLength = this.validators.includes('minlength');
    if(this.minLength){
      let minLengthArrayPos = this.validators.indexOf('minlength');
      this.minLengthNum = this.validators[minLengthArrayPos + 1];
    }
    }
  }

}
