import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalComponent } from 'src/app/core/components/utils/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { whiteSpace } from 'src/app/core/components/utils/validators/custom-validators';
import { SharedService } from 'src/app/core/services/shared-services';
import { UsersService } from 'src/app/core/services/users-service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {

  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild(ModalComponent) modal: ModalComponent;

  file: File;
  progressImg: number;
  inProgress: boolean = false;
  uploadError: boolean = false;
  downloadURL: String = undefined;

  sex: string;
  sexOptions: any[] = [{ value: "M", info: "Masculino" }, { value: "F", info: "Feminino" }]; //ISO/IEC 5218

  role: string = "CLIENT";
  roleOptions: any[] = [{ value: "ADMIN", info: "ADMINISTRADOR" },
                        { value: "CLIENT", info: "CLIENTE" },
                        { value: "EMPLOYEE", info: "EMPREGADO" }];

  // Form
  usersAddForm: FormGroup;
  submitting: boolean = false;

  //Edit
  isEditing: boolean = false;
  usersToEdit: any;

  constructor(private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private usersService: UsersService) {
    this.usersAddFormBuilder();
  }

  ngOnInit() {
  }

  usersAddFormBuilder(): void {
    this.usersAddForm = this.formBuilder.group({
      name: ['', [Validators.required, whiteSpace, Validators.maxLength(100)]],
      cpf: ['', [Validators.required, whiteSpace]],
      sex: ['', [Validators.required, whiteSpace]],
      birthDate: ['', [Validators.required, whiteSpace]],
      role: ['', [Validators.required, whiteSpace]],
      image: [''],
    });
    this.usersAddForm.controls['role'].setValue(this.role, {onlySelf: true});
  }

  get f() { return this.usersAddForm.controls; }

  submitUserForm(): void {
    this.sharedService.triggerValidation(this.usersAddForm);
    if (this.usersAddForm.invalid) {
      return;
    }

    const values = this.usersAddForm.value;
    const signUpData = {
      name: values.name,
      cpf: values.cpf,
      sex: values.sex,
      birthDate: values.birthDate,
      role: values.role
    }

    this.usersService.signUp(signUpData);

  }
}
