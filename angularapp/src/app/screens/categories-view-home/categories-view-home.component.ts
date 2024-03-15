import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-view-home',
  templateUrl: './categories-view-home.component.html',
  styleUrls: ['./categories-view-home.component.css']
})
export class CategoriesViewHomeComponent {
  constructor(private router: Router) {}


  handleClick(category: string) {
    // Add logic for click event based on the category
    console.log('Category clicked:', category);
    this.router.navigate([`/category/view/${category}`]);
  }


}
