import { Component, OnInit } from '@angular/core';
import { ConverterService } from '../converter.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
  amount: any;
  APIKey: string;
  APIKeyValid: boolean = true;

  currencyConverterForm = new FormGroup({
    amount: new FormControl(null, [Validators.minLength(1), Validators.maxLength(9), Validators.pattern("^[0-9]*$")]),
    key: new FormControl(null, Validators.required)
  });

  constructor(private converter: ConverterService, private http: HttpClient) {  }

  ngOnInit(): void {
    this.converter.getListOfCurrencies().toPromise().then(data =>{
      this.currencyData.push(data);
      this.currencyNames = this.currencyData[0].results;
    })

    this.currencyConverterForm.valueChanges.subscribe(val=>{
      this.amount = val.amount
      this.getRatesAndCalculate()
    })
  }

  getRatesAndCalculate() {
    if (this.currencyConverterForm.get('amount')?.valid) {
      this.converter.getRates(this.fromCurrency, this.toCurrency).toPromise().then(rates =>{
      this.rates= rates;
      this.APIKeyValid = true;
      this.calculateResult()
      })
      .catch(() => {
        this.APIKeyValid = false;
      })
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
    this.APIKey = key;
    alert(`The new API key is ${this.APIKey}`)
    this.currencyConverterForm.patchValue({
      key: null
    });
    this.APIKeyValid = true;
  }
}

