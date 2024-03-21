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
  userIdPosterAd: string | any;
  messages: any[] = []; // Variable to store messages
  sortedMessages: any[] = []; // Variable to store sorted messages

  laptop: any; // Variable to storbody: { engineCapacity: string; modelYear: string; mileage: number; company: string; variant: string; engineType: string; transmission: string; bodyType: string; }, any: anye laptop data
  car: any; 
  inspectionResult: any

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
            this.userIdPosterAd=response.userId
            this.car=''
          } else if (this.categoryName === 'cars') {
            this.car = response;
            this.laptop=''
            this.userIdPosterAd=response.userId

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
  

  showChat: boolean = false;

  toggleChat() {
    this.showChat = !this.showChat;
    if (this.showChat) {
      // Fetch messages for the current sender when the chat is toggled on
      this.fetchMessages();
    }
  }

  getCarInspection(engineCapacity:string, modelYear:string,Mileage:number,Company:string,Vaarient:string,EngineType:string,Transmission:string,BodyType:string)
  {
    const body = 
    {
      "engineCapacity":engineCapacity,
      "modelYear":modelYear,
      "mileage":Mileage,
      "company":Company,
      "variant":Vaarient,
      "engineType":EngineType,
      "transmission":Transmission,
      "bodyType":BodyType

    }
    this.apiService.inspection(body).subscribe(
      (response) =>{
          this.inspectionResult = Math.round(response.price)
      }
    )
  }

  formatPriceWithCommas(price: number): string {
    if (price === null || isNaN(price)) {
      return ''; // Handle null or NaN values
    }
    const priceString = price.toString();
    const parts = priceString.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

 

  fetchMessages() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const senderId = userData.userId;

      // Call the API service to fetch messages for the current sender
      this.apiService.getMessagesBySenderId(senderId).subscribe(
        (response) => {
          // Handle the response from the API
          this.messages = response;
          console.log('Messages:', this.messages);
          this.sortedMessages = this.messages.sort((a, b) => {
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          });
          
        },
        (error) => {
          // Handle errors
          console.error('Error fetching messages:', error);
        }
      );
    }
  }


  closeChat() {
    this.showChat = false; // Set showChat to false to hide the chat
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.userId;
      console.log(userData,userId)
    }
  }

  sendMessage(messageInput: HTMLInputElement) {
    const message = messageInput.value;
    const receiverId = this.userIdPosterAd; // Replace 'receiverUserId' with the actual receiver's user ID
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const senderId = userData.userId;

      // Send the message using the API service
      this.apiService.sendMessage(senderId, receiverId, message).subscribe(
        response => {
          console.log('Message sent successfully');
          // Optionally, update the UI or display a confirmation message here
        },
        error => {
          console.error('Error sending message:', error);
          // Handle error scenario here
        }
      );
    }

    // Clear the input field
    messageInput.value = '';
  }
  

}
