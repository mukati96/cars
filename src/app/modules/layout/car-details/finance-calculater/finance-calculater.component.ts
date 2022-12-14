import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'post-finance-calculater',
  templateUrl: './finance-calculater.component.html',
  styleUrls: ['./finance-calculater.component.scss']
})
export class FinanceCalculaterComponent implements OnInit {

  financeCalculater!:FormGroup
  show=false;
  hide=false;
  submitted = false;
  constructor(private fb:FormBuilder) { }

  get f():any { return this.financeCalculater.controls; }

  ngOnInit(): void {
    this.financeCalculater = this.fb.group({
      salestax:[''],
      annualpercentagerate:[''],
      tradeinvalue:[''],
      downpayment:[''],
      vehicleprice:['',Validators.required,Validators.pattern(/^[0-9]\d*$/)],
      loanmonths:['12'],
    });
  }
  showbreakdown() {
    this.show=true
    this.hide=true
  }

  Hidebreakdown() {
    this.show=false
    this.hide=false
  }
  onItemChange(value:any){
    this.financeCalc()
  }

  get salesTex () {
    return ((this.f['vehicleprice'].value * this.f['salestax'].value) / 100 || 0);
  }

  get totalLoanAmount() {
    return this.f['vehicleprice'].value  - this.f['downpayment'].value  - this.f['tradeinvalue'].value + this.salesTex || 0;
  }

  get interestAmount() {
    const monInt = parseFloat(this.f['annualpercentagerate'].value) / 1200;
    const loanMonth = this.f['loanmonths'].value || 0;
    const calculatedEMI: any = ((monInt + monInt / (Math.pow(1 + monInt, loanMonth) - 1)) * this.totalLoanAmount).toFixed(2);
    return Math.round(calculatedEMI * loanMonth - this.totalLoanAmount) || 0;
  }
  
  get totalLoanAndInterestPaid(){
    return this.totalLoanAmount + this.interestAmount || 0;
  } 

   get calculatedEMIs() {
      const loanMonth = parseFloat(this.f['loanmonths'].value || 0);
      const monInt = parseFloat(this.f['annualpercentagerate'].value || 0) / 1200;
      return Math.round(((monInt + monInt / (Math.pow(1 + monInt, loanMonth) - 1)) * this.totalLoanAmount),) || Math.round(this.totalLoanAmount / loanMonth);
  }

  financeCalc(){
    this.submitted = true;
    if (this.financeCalculater.invalid) {
      return;
    };
  }
  keydown(event:any) {
    // tslint:disable-next-line: deprecation
    const e = window.event || event;
    const key = e.keyCode;
    // space pressed
    if (key === 32) { // space
      e.preventDefault();
     }
  }
 
  checkNumber(event:any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false; 
    }
    return true;
  }
}
