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
  validators: string[];  

  required: boolean;
  email: boolean;
  whiteSpace: boolean;

  constructor() { }

  ngOnInit() {
    this.required = this.validators.includes('required');
    this.email = this.validators.includes('email');
    this.whiteSpace = this.validators.includes('whiteSpace');
  }

}
