import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigServiceService } from 'src/app/api-config-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {

  constructor(private http: HttpClient,private apiConfigService: ApiConfigServiceService
    ,private snackBar: MatSnackBar) {}

  sendSubscriptionEmail(subscriptionType: string) {
    const userDataString = localStorage.getItem('userData');
  
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userEmail = userData.username;
      const emailData = { subscriptionType, userEmail }; // Use the provided subscriptionType
      this.apiConfigService.sendEmail(emailData).subscribe(
        (response) => {
          console.log('Response:', response);
          if (response && response.message === 'Email sent successfully') {
            console.log('Email sent successfully');
            this.showSuccessMessage();

            // Optionally display a confirmation message to the user
          } else {
            console.error('Unexpected response:', response);
            // Handle unexpected responses
          }
        },
        (error) => {
          console.error('Error sending email', error);
          // Handle error scenarios (e.g., display an error message)
        }
      );
    }
  }

  showSuccessMessage() {
    this.snackBar.open('Plan Subscribed successfully. Check your email', 'Close', {
      duration: 2000, // Duration in milliseconds
      panelClass: ['success-snackbar'] // Optional custom CSS class for styling
    });
  }
  
  
  
}
