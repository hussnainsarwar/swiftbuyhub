import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConfigServiceService } from 'src/app/api-config-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string='';
  password: string='';
  userId:string=''

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private ApiConfigServiceService:ApiConfigServiceService
    ){}

    onSubmit() {
      // console.log('Username:', this.username);
      // console.log('Password:', this.password);
  
      const userData = {
        e_mail: this.username,
        password: this.password
      };
  
      // Call the API service to perform login
      this.ApiConfigServiceService.LoginUser(userData).subscribe(
        (response) => {
          // console.log('Login successful:', response);
          // Optionally, you can navigate to another page on successful login
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed:', error);
          // Handle error, show a message, etc.
        }
      );
    }

}
