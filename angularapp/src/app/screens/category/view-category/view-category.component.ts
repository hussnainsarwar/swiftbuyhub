import { Component, OnInit,HostListener,OnDestroy   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiConfigServiceService } from 'src/app/api-config-service.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit,OnDestroy {
  categoryId: string | undefined;
  categoryName: string | undefined;
  userIdPosterAd: string | any;
  messages: any[] = []; // Variable to store messages
  sortedMessages: any[] = []; // Variable to store sorted messages
  curentUserId: string | undefined;
  userNamePosterAd: string | any;
  private socket: any; // Declare a private variable for the socket

  laptop: any; // Variable to store laptop data
  car: any; 

  constructor(private apiService: ApiConfigServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.socket = io('http://localhost:3001');

    this.socket.on('chat message', (data: any) => {
      console.log('Message from server:');
      this.fetchMessages()
    });

    this.socket.on('message', (data: any) => {
      console.log('Message from server:'); 
      this.fetchMessages() 
    });

    // Retrieve the ID and category name from the route snapshot
    this.categoryId = this.route.snapshot.params['id'];
    this.categoryName = this.route.snapshot.params['name'];

    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const senderId = userData.userId;
      this.curentUserId=senderId
    }

    if (this.categoryName && this.categoryId) {
      this.apiService.getCategoryData(this.categoryName, this.categoryId).subscribe(
        (response) => {
          // Handle the response from the API
          if (this.categoryName === 'laptops') {
            this.laptop = response;
            this.userIdPosterAd=response.userId
            this.car=''
            this.getUserName(this.userIdPosterAd); // Call method to get user_name
           

          } else if (this.categoryName === 'cars') {
            this.car = response;
            this.laptop=''
            this.userIdPosterAd=response.userId
            this.getUserName(this.userIdPosterAd); // Call method to get user_name

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

  ngOnDestroy(): void {
    // Disconnect the socket when the component is destroyed
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  getUserName(userId: string): void {
    this.apiService.getUserName(userId).subscribe(
      (response) => {
        this.userNamePosterAd = response.user_name;
        console.log(this.userNamePosterAd,'this.userNamePosterAd')
      },
      (error) => {
        console.error('Error fetching user name:', error);
      }
    );
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


  fetchMessages() {
    const userDataString = localStorage.getItem('userData');
  
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const senderId = userData.userId;
      const adId = this.categoryId || ''; // Assuming categoryId is available in the component
      this.curentUserId=senderId
      // Call the API service to fetch messages for the current sender and adId
      this.apiService.getMessagesBySenderIdAndAdId(senderId, adId).subscribe(
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
    const receiverId = this.userIdPosterAd;
    const adId = this.categoryId || ''; // Use empty string as default value if categoryId is undefined
    const userDataString = localStorage.getItem('userData');
  
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const senderId = userData.userId;

      
      this.socket.emit('chat message', {
        senderId,
        receiverId,
        message,
        adId
      });
  
      // Send the message using the API service
      this.apiService.sendMessage(senderId, receiverId, message, adId).subscribe(
        response => {
          console.log('Message sent successfully');
          this.fetchMessages()
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
