import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor(private http: HttpClient) {}

  key: string = '6d3ef3b536a69a0d409d';

  getRates(fromCurrency: string, toCurrency: string) {
    return this.http.get(`https://free.currconv.com/api/v7/convert?q=${toCurrency}_${fromCurrency},${fromCurrency}_${toCurrency}&compact=ultra&apiKey=${this.key}`)
    .pipe(catchError(this.handleError))
  }

  getListOfCurrencies() {
    return this.http.get(`https://free.currconv.com/api/v7/currencies?apiKey=${this.key}`)
    .pipe(catchError(this.handleError))
  }

  onConfigureAPIKey(key:string) {
    this.key = key
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!'
      if(!errorRes.error || !errorRes.error.error) {
        return throwError (errorMessage);
      }
      else {
        errorMessage = errorRes.error.error
      }
      return throwError(errorMessage)
  }

}

