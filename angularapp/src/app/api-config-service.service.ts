import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

}
