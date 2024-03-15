import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  
})
export class ToolbarComponent implements OnInit{
  constructor(private router: Router) {}

  // Function to navigate to the 'sell' route
  navigateToSell() {
    this.router.navigate(['/sell']); // Replace 'sell' with your actual route
  }

  ngOnInit(): void {
    
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

}
