import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Intdateprice } from '../interfaces/intdateprice';

@Injectable({
  providedIn: 'root'
})
export class Readjson {
  private readonly _baseUrl = 'https://api.mfapi.in/mf/';
  private _filename: string = '100027';

  constructor(private http: HttpClient) {}

  // Set the filename (scheme number)
  setFilename(filename: string) {
    this._filename = filename;
    console.log("set the ")
  }

  // Get the current URL to fetch data from
  private get apiUrl(): string {
    return `${this._baseUrl}${this._filename}`;
  }

  // Optional: check if the endpoint exists - uses HTTP HEAD or GET with error handling
  checkIfExists(): Observable<boolean | null> {
  return this.http.get(this.apiUrl).pipe(
    map(_ => true),               // if GET succeeds, emit true
    catchError(_ => of(null))     // if GET fails, emit null (or false if you prefer)
  );
  }


  // Get the data from the API endpoint, typed as an observable of Intdateprice array or any shape matching the API
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(() => of(null))
    );
  }
}
