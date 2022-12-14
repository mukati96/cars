import { AfterViewInit, Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ToastrServices } from 'src/app/services/toastr.service';
import { AppraisalService } from './appraisal.service';
declare const $: any;
@Component({
  selector: 'post-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.scss']
})
export class AppraisalComponent implements OnInit, AfterViewInit, OnChanges {

  vinForm !:  FormGroup;
  licenceForm !: FormGroup;
  selectedTab:any = localStorage.getItem('appraisalTab') || 'licence_plate';
  vinSubmitted = false;
  licenceSubmitted = false;
  @Input() appraisalData: any;
  formSubmitting = false;
  plateSubmitted = false;
  selectedModel: any;
  selectedTrim: any;
  states:any = [
    { name: 'ALABAMA', code: 'AL' },
    { name: 'ALASKA', code: 'AK' },
    { name: 'AMERICAN SAMOA', code: 'AS' },
    { name: 'ARIZONA', code: 'AZ' },
    { name: 'ARKANSAS', code: 'AR' },
    { name: 'CALIFORNIA', code: 'CA' },
    { name: 'COLORADO', code: 'CO' },
    { name: 'CONNECTICUT', code: 'CT' },
    { name: 'DELAWARE', code: 'DE' },
    { name: 'DISTRICT OF COLUMBIA', code: 'DC' },
    { name: 'FLORIDA', code: 'FL' },
    { name: 'GEORGIA', code: 'GA' },
    { name: 'GUAM', code: 'GU' },
    { name: 'HAWAII', code: 'HI' },
    { name: 'IDAHO', code: 'ID' },
    { name: 'ILLINOIS', code: 'IL' },
    { name: 'INDIANA', code: 'IN' },
    { name: 'IOWA', code: 'IA' },
    { name: 'KANSAS', code: 'KS' },
    { name: 'KENTUCKY', code: 'KY' },
    { name: 'LOUISIANA', code: 'LA' },
    { name: 'MAINE', code: 'ME' },
    { name: 'MARYLAND', code: 'MD' },
    { name: 'MASSACHUSETTS', code: 'MA' },
    { name: 'MICHIGAN', code: 'MI' },
    { name: 'MINNESOTA', code: 'MN' },
    { name: 'MISSISSIPPI', code: 'MS' },
    { name: 'MISSOURI', code: 'MO' },
    { name: 'MONTANA', code: 'MT' },
    { name: 'NEBRASKA', code: 'NE' },
    { name: 'NEVADA', code: 'NV' },
    { name: 'New Hampshire', code: 'NH' },
    { name: 'New Jersey', code: 'NJ' },
    { name: 'New Mexico', code: 'NM' },
    { name: 'New York', code: 'NY' },
    { name: 'North Carolina', code: 'NC' },
    { name: 'North Dakota', code: 'ND' },
    { name: 'Ohio', code: 'OH' },
    { name: 'Oklahoma', code: 'OK' },
    { name: 'Oregon', code: 'OR' },
    { name: 'Pennsylvania', code: 'PA' },
    { name: 'Rhode Island', code: 'RI' },
    { name: 'South Carolina', code: 'SC' },
    { name: 'South Dakota', code: 'SD' },
    { name: 'Tennessee', code: 'TN' },
    { name: 'Texas', code: 'TX' },
    { name: 'Utah', code: 'UT' },
    { name: 'Vermont', code: 'VT' },
    { name: 'Virginia', code: 'VA' },
    { name: 'Washington', code: 'WA' },
    { name: 'West Virginia', code: 'WV' },
    { name: 'Wisconsin', code: 'WI' },
    { name: 'Wyoming', code: 'WY' },
  ];
  routeState: any;

  constructor(private fb: FormBuilder,
    private httpService: HttpService,
    private toastr: ToastrServices,
    private router: Router,
    private route: ActivatedRoute,
    public appraisalService: AppraisalService,
    private shareDataService: ShareDataService) {

  }

  ngOnInit(): void {
    this.appraisalService.isVinSubmitted = false;
    this.initForm();
  }

  ngOnChanges(): void {
    this.appraisalData;
  }

  initForm(): void {
    this.vinForm = this.fb.group({
      vin: ['', [
        Validators.required,
        Validators.minLength(17),
        Validators.maxLength(17),
      ]],
    });
    this.licenceForm = this.fb.group({
      plate: ['', [Validators.required, Validators.minLength(7)]],
      state: ['', [Validators.required]]
    });
    if (this.appraisalData && this.appraisalData.vin) {
      this.vinForm.get("vin")?.setValue(this.appraisalData.vin);
    }
    if (this.appraisalData && this.appraisalData.licence_plate) {
      this.licenceForm.get("plate")?.setValue(this.appraisalData.licence_plate);
    }

  }

  get v():any { return this.vinForm.controls; }
  get l():any { return this.licenceForm.controls; }

  public changeTab(label: string): void {
    // tslint:disable-next-line: curly
    this.selectedTab = label;
    localStorage.setItem('appraisalTab', label);
    // if (this.selectedTab !== label) this.vinSubmitted = false;
  }

  public submitVin(): any {
    this.vinSubmitted = true;
    // tslint:disable-next-line: curly
    if ((this.v.vin.hasError('minlength') ||
      this.v.vin.hasError('maxlength') ||
      this.v.vin.hasError('required'))) {
      return;
    }
    // Handling all data from service
    this.appraisalService.prepareVinForm(this.vinForm.controls['vin'].value);
  }

  public preventSpace(event: any) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.preventDefault();
    }
  }

  plateSubmit():any {
    this.plateSubmitted = true;
    if (this.licenceForm.invalid) {
      return false;
    }
    this.formSubmitting = true;
    this.httpService.post(this.licenceForm.value, 'seller/create/licence/').subscribe(
      res => {
        this.formSubmitting = false;
        if (res.error) {
          this.appraisalService.formSubmitting = false;
          this.appraisalService.isVinSubmitted = false;
          return this.toastr.showError(
            res.error,
            'Licence Plate'
          );
        }
        this.v['vin'].patchValue(res.specifications.vin);
        this.submitVin();
      }, err => {
        this.appraisalService.formSubmitting = false;
        this.appraisalService.isVinSubmitted = false;
        this.formSubmitting = false;
        this.toastr.showError(
          this.shareDataService.getErrorMessage(err),
          'Licence Plate'
        );
      }
    );
  }

  selectState(code: string) {
    this.licenceForm.get('state')?.setValue(code);
  }

  getextracedTrim(trim:any) {
    return trim.split(/[(),]+/)[0];
  }

  ngAfterViewInit(){
    let me :any = this
    $(document).on('paste', '#pasteIt', function(e:any) {
      var withoutSpaces = e.originalEvent.clipboardData.getData('Text');
      withoutSpaces = withoutSpaces.replace(/\s+/g, '');
      $(me).val(withoutSpaces);
    });
  }

}
