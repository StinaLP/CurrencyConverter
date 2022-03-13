import { Component, OnInit } from '@angular/core';
import { ConverterService } from '../converter.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ConverterService]
})

export class MainComponent implements OnInit {

  currencyData: any = [];
  currencyNames: any = [];
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  answer: number;
  rates: any;
  amount: number;
  APIKeyValid: boolean = true;
  errorMessage: string;
  currencySubscription: Subscription;
  ratesSubscription: Subscription;

  currencyConverterForm = new FormGroup ({
    amount: new FormControl(null, [Validators.minLength(1), Validators.maxLength(9), Validators.pattern("^[0-9]*$"), Validators.required]),
    key: new FormControl(null, Validators.required)
  });

  constructor(private converter: ConverterService) {  }

  ngOnInit(): void {
    this.currencyConverterForm.valueChanges
    .subscribe (
      val => {
        this.amount = val.amount
        this.getRatesAndCalculate()
      }
    )

    this.currencySubscription = this.converter.getListOfCurrencies()
    .subscribe (
      resData => {
        this.currencyData.push(resData);
        this.currencyNames = this.currencyData[0].results;
      },
      errorMessage => {
        this.APIKeyValid = false;
        this.errorMessage = errorMessage;
      }
    )
  }

  getRatesAndCalculate() {
    if (this.currencyConverterForm.get('amount')?.valid) {
      this.ratesSubscription = this.converter.getRates(this.fromCurrency, this.toCurrency)
      .subscribe (
        resData => {
          this.rates = resData;
          this.APIKeyValid = true;
          this.calculateResult()
        },
        errorMessage => {
          this.APIKeyValid = false;
          this.errorMessage = errorMessage;
        }
      )
    }
  }

  swapCurrencies(fromCurrency: string, toCurrency: string) {
    this.fromCurrency = toCurrency;
    this.toCurrency = fromCurrency;
    if (this.currencyConverterForm.get('amount')?.valid) {
      this.calculateResult();
    }
  }

  calculateResult() {
    this.answer = this.amount * this.rates[`${this.fromCurrency}_${this.toCurrency}`]
  }

  configureAPIKey(key: string) {
    this.converter.onConfigureAPIKey(key)
    alert(`The new API key is ${key}`);
    this.currencyConverterForm.patchValue({
      key: null
    });
    this.APIKeyValid = true;
  }

  ngOnDestroy() {
    this.currencySubscription.unsubscribe();
    this.ratesSubscription.unsubscribe();
  }
}

