import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiConfigServiceService } from 'src/app/api-config-service.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  categoryId: string | undefined;
  categoryName: string | undefined;

  laptop: any; // Variable to store laptop data
  car: any; 

  constructor(private apiService: ApiConfigServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve the ID and category name from the route snapshot
    this.categoryId = this.route.snapshot.params['id'];
    this.categoryName = this.route.snapshot.params['name'];

    if (this.categoryName && this.categoryId) {
      this.apiService.getCategoryData(this.categoryName, this.categoryId).subscribe(
        (response) => {
          // Handle the response from the API
          if (this.categoryName === 'laptops') {
            this.laptop = response;
            this.car=''
          } else if (this.categoryName === 'cars') {
            this.car = response;
            this.laptop=''
          }
          console.log('Search result:', response);
        },
        (error) => {
          // Handle errors
          console.error('Error:', error);
        }
      );
    }

  }


  getImageUrl(image: string): string {
    if (image) {
      return `http://localhost:3000/images/${image}`;
    } else {
      return 'path/to/placeholder-image.jpg';
    }
  }
  selectedImageIndex: number = 0;
  changeMainImage(index: number): void {
    this.selectedImageIndex = index; // assuming you have a variable to store the selected image index
  }
  

}
