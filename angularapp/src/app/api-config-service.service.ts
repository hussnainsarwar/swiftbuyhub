import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigServiceService {

  API_BASE_URL='http://localhost:3000';


  constructor(private httpClient:HttpClient) { }
  private readonly USER_DATA_KEY = 'userData';


  registerUser(userData: any){
    return this.httpClient.post(`${this.API_BASE_URL}/register`, userData);
  }

  // LoginUser(userData: any){
  //   return this.httpClient.post(`${this.API_BASE_URL}/login`, userData);
  // }
 
  LoginUser(userData: any): Observable<any> {
    return this.httpClient.post(`${this.API_BASE_URL}/login`, userData)
      .pipe(
        tap((response: any) => {
          const userData = {
            userId: response.user._id,
            username: response.user.e_mail
          };
          localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
        })
      );
  }

  getUserData(): { userId: string, username: string } | null {
    const userDataString = localStorage.getItem(this.USER_DATA_KEY);
    return userDataString ? JSON.parse(userDataString) : null;
  }

  getUserId(): string | null {
    const userData = this.getUserData();
    return userData ? userData.userId : null;
  }

  getUsername(): string | null {
    const userData = this.getUserData();
    return userData ? userData.username : null;
  }

 



  saveLaptop(laptopData: any): Observable<any> {
    const url = `${this.API_BASE_URL}/laptops`; // Adjust the endpoint URL
    const userId=this.getUserData()
    return this.httpClient.post(url, laptopData);
  }

  saveCar(carData: any): Observable<any> {
    const url = `${this.API_BASE_URL}/cars`; // Adjust the endpoint URL
    return this.httpClient.post(url, carData);
  }



  getCarsByUserId(userId: string): Observable<any> {
    const url = `${this.API_BASE_URL}/cars/user/${userId}`;
    return this.httpClient.get(url);
  }

  getLaptopsByUserId(userId: string): Observable<any> {
    const url = `${this.API_BASE_URL}/laptops/user/${userId}`;
    return this.httpClient.get(url);
  }


  getAllCars(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_BASE_URL}/carsAll`);
  }

  // Function to fetch all laptops
  getAllLaptops(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_BASE_URL}/laptopsAll`);
  }


  getCategoryData(selectedCategory: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_BASE_URL}/search/${selectedCategory}/${id}`);
  }


  getAllDataByCategory(categoryName: string): Observable<any[]> {
    if (categoryName === 'Cars') {
      return this.getAllCars();
    } else if (categoryName === 'Laptops') {
      return this.getAllLaptops();
    } else {
      // Return an empty observable if the category is unknown
      console.error('Unknown category:', categoryName);
      return of([]);
    }
  }

}
