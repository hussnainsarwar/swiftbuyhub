import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigServiceService {

  API_BASE_URL='http://localhost:3000';


  constructor(private httpClient:HttpClient) { }


  registerUser(userData: any){
    return this.httpClient.post(`${this.API_BASE_URL}/register`, userData);
  }

  LoginUser(userData: any){
    return this.httpClient.post(`${this.API_BASE_URL}/login`, userData);
  }

  saveLaptop(laptopData: any): Observable<any> {
    const url = `${this.API_BASE_URL}/laptops`; // Adjust the endpoint URL
    return this.httpClient.post(url, laptopData);
  }

  saveCar(carData: any): Observable<any> {
    const url = `${this.API_BASE_URL}/cars`; // Adjust the endpoint URL
    return this.httpClient.post(url, carData);
  }

}
