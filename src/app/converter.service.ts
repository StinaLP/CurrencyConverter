import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor(private http: HttpClient) {}

  key: string = '3620cdff7c79b952a236';

  getRates(fromCurrency: string, toCurrency: string) {
    return this.http.get(`https://free.currconv.com/api/v7/convert?q=${toCurrency}_${fromCurrency},${fromCurrency}_${toCurrency}&compact=ultra&apiKey=${this.key}`)
  }

  getListOfCurrencies() {
    return this.http.get(`https://free.currconv.com/api/v7/currencies?apiKey=${this.key}`)
  }

  onConfigureAPIKey(key:string) {
    this.key = key
  }

}
