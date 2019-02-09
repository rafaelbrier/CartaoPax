import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanosService } from 'src/app/core/services/planos-service';
import { ModalComponent } from 'src/app/core/components/utils/modal/modal.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { whiteSpace } from 'src/app/core/components/utils/validators/custom-validators';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class PlanosComponent implements OnInit {
  
  isBoxLoading: boolean = false;
  boxLoadingError: boolean = false;

  plano: string;
  planosOptions: any[] = [];

  planosPriceForm: FormGroup;

  price: number = 0.0;

  constructor(private planosService: PlanosService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.planosPriceFormBuilder();
    this.populatePlanos();

    this.planosPriceForm.controls['birthDate'].valueChanges.subscribe((birthDate) => {
      this.consultaPrecoPlano(birthDate, this.v.plano);
    });
    this.planosPriceForm.controls['plano'].valueChanges.subscribe((plano) => {
      this.consultaPrecoPlano(this.v.birthDate, plano);
    });
  }

  consultaPrecoPlano(birthDate: string, planoId: number) {
    this.isBoxLoading = true;
    this.boxLoadingError = false;

    this.planosService.getPlanPrice(birthDate, planoId)
      .subscribe((res: number) => {
        if (res)
          this.price = res;

        this.isBoxLoading = false;
      }, () => { this.errorOnRetrieve(); });
  }

  planosPriceFormBuilder(): void {
    this.planosPriceForm = this.formBuilder.group({
      birthDate: ['', [Validators.required, whiteSpace, Validators.maxLength(10)]],
      plano: ['', [Validators.required, whiteSpace, Validators.maxLength(50)]],
    });
  }

  get f() { return this.planosPriceForm.controls; }

  get v() { return this.planosPriceForm.value; }

  populatePlanos() {
    this.isBoxLoading = true;
    this.boxLoadingError = false;

    this.planosService.findAll()
      .subscribe(res => {
        Object.keys(res).map((keys) => {
          let value = res[keys]["id"];
          let info = res[keys]["name"];
          this.planosOptions.push({ value: value, info: info });
        })
        this.isBoxLoading = false;
      }, () => { this.errorOnRetrieve(); })
  }

  errorOnRetrieve() {
    this.boxLoadingError = true;
    this.isBoxLoading = false;
     }
}
