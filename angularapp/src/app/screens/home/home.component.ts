import { Component, OnInit } from '@angular/core';
import { ApiConfigServiceService } from 'src/app/api-config-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cars: any[] | undefined;
  laptops: any[] | undefined;
  isDarkMode: boolean = false; // Define isDarkMode property

  constructor(private apiService: ApiConfigServiceService,private router: Router) {}


  ngOnInit(): void {
    this.getAllCars();
    this.getAllLaptops();
  }

  
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  viewItem(categoryName: string, carId: string) {
    // Navigate to the specified path with category name and car ID as parameters
    this.router.navigate(['/category/view', categoryName, carId]);
  }

  getAllCars(): void {
    this.apiService.getAllCars()
      .subscribe(data => {
        this.cars = data;
        console.log(data)
      });
  }

  getAllLaptops(): void {
    this.apiService.getAllLaptops()
      .subscribe(data => {
        this.laptops = data;
        console.log(data)

      });
  }

  getImageUrl(car: any): string {
    if (car.images && car.images.length > 0) {
      // Assuming the images are stored in the '/images' directory on the backend
      return `http://localhost:3000/images/${car.images[0]}`;
    } else {
      // Return a placeholder image URL if no images are available
      return 'path/to/placeholder-image.jpg';
    }
  }

  
  truncateDescription(description: string): string {
    const maxLength = 50;
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + '...';
  }
  truncateCarTitle(company: string, variant: string): string {
    const combinedTitle = `${company} ${variant}`;
    const maxLength = 30;
    if (combinedTitle.length <= maxLength) {
      return combinedTitle;
    }
    return combinedTitle.slice(0, maxLength) + '...';
  }
  

}
