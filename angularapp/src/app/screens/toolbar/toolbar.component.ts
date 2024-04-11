import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  
})
export class ToolbarComponent implements OnInit{
  isAdmin: boolean = false; // Variable to store whether the user is an admin
  isDarkMode: boolean = false;


  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      this.isDarkMode = JSON.parse(savedMode);
      this.applyTheme();
    }
    // Check if the user is an admin
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.isAdmin = userData.role === 'admin'; // Assuming the role is 'admin'
    }
  }


  isLoggedIn(): boolean {
    return !localStorage.getItem('userData');
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    // Save user preference to local storage
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
  }
  applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      document.querySelector('.section1')?.classList.add('dark-theme'); // Add dark theme to section1
    } else {
      document.body.classList.remove('dark-theme');
      document.querySelector('.section1')?.classList.remove('dark-theme'); // Remove dark theme from section1
    }
  }
  

  navigateToNextPage() {
    
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const senderId = userData.userId;
      this.router.navigate(['/chats', senderId]);
    }
    
  }
 
  // Function to navigate to the 'sell' route
  navigateToSell() {
    this.router.navigate(['/sell']); // Replace 'sell' with your actual route
  }

  settingnavigate() {
    this.router.navigate(['/setting/user']); // Replace 'sell' with your actual route
  }


  navigateToLogin() {
    this.router.navigate(['/login']); // Replace 'sell' with your actual route
  }

  navigateToSearchPage() {
    this.router.navigate(['/search']); // Replace 'search' with your actual route
  }
  navigateToSignUp() {
    this.router.navigate(['/sign-up']); // Replace 'search' with your actual route
  }


  navigateToAdminPanel() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const senderId = userData.userId;
      this.router.navigate(['/users/admin', senderId, 'overview']); // Adjust the route as needed
    }
  }


  logout(): void {
    // Clear local storage
    localStorage.clear();
    // Navigate to home page
    this.router.navigate(['/home']);
  }
  

  
}
