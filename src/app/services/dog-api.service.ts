import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DogApi } from '../interfaces/dog-api';

@Injectable({
  providedIn: 'root'
})
export class DogApiService {

  private _url:string = "https://dog.ceo/api/breeds/image/random";

  constructor(private _http: HttpClient) { }

  getDogImage():Observable<DogApi> {
    return this._http.get<DogApi>(this._url);
  }

}
