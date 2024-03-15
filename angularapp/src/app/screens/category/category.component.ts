import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categoryName: string='';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('name') || '';
  }
  

}
