import { Component, OnInit,HostListener,OnDestroy   } from '@angular/core';
import { ApiConfigServiceService } from 'src/app/api-config-service.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit,OnDestroy  {
  adIds: string[] = [];
  messagesByAdId: { [adId: string]: any[] } = {};
    selectedAdId: string | null = null;
    senderId: string | null = null;
    userNames: { [userId: string]: string } = {}; // Map to store user names
    private socket: any; // Declare a private variable for the socket


  constructor(private apiService: ApiConfigServiceService) {}

  ngOnInit(): void {
    this.socket = io('http://localhost:3001');


    this.socket.on('chat message', (data: any) => {
      console.log('Message from server:');
      this.fetchMessage()
      // console.log('updated mesagea',this.messagesByAdId)

    });
    // Example: Listen for 'message' event from the server

    this.socket.on('message', (data: any) => {
      console.log('Message from server:');
      this.fetchMessage()
      
    
    });

   this.fetchMessage()
  }

  fetchMessage(){
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const senderId1 = userData.userId;
      this.senderId=senderId1
      this.apiService.getMessagesBySenderId(senderId1).subscribe(messages => {
        // Group messages by adId
        this.groupMessagesByAdId(messages);
        this.fetchUserNames();
        console.log(this.userNames)

      }, error => {
        console.error('Error fetching messages:', error);
        // Handle error if necessary
      });
    }
  }

 
  ngOnDestroy(): void {
    // Disconnect the socket when the component is destroyed
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  
  messagesBySenderId: { [key: string]: any[] } = {}; 

  groupMessagesByAdId(messages: any[]): void {
    messages.forEach(message => {
      const senderId = message.senderId;
      const receiverId = message.receiverId;
      const adId = message.adId;

      const key1 = `${senderId}_${receiverId}_${adId}`; // Unique key for sender-receiver pair
      const key2 = `${receiverId}_${senderId}_${adId}`; // Unique key for receiver-sender pair
  
      if (!this.messagesByAdId[key1] && !this.messagesByAdId[key2]) {
        this.messagesByAdId[key1] = []; // Initialize array if not exists for key1
        this.adIds.push(key1);
      }
  
      if (this.messagesByAdId[key1]) {
        this.messagesByAdId[key1].push(message); // Push message to corresponding array for key1
      } else {
        this.messagesByAdId[key2].push(message); // Push message to corresponding array for key2
      }
    });
  
    console.log(this.messagesByAdId);
  }
  
  

  openChat(adId: string): void {
    this.selectedAdId = adId;
  }


  isLoggedIn(): boolean {
    return !localStorage.getItem('userData');
  }

  newMessage: string = '';

  sendMessage(message: string): void {
    if(this.selectedAdId){
      const receiverId = this.getChatPartnerId(this.selectedAdId) || ''; // Assuming selectedAdId represents the receiver's ID
      const adId = this.getThirdValue(this.selectedAdId) || ''; // Use empty string as default value if selectedAdId is undefined
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
            this.newMessage = ''; 
            // Optionally, update the UI or display a confirmation message here
          },
          error => {
            console.error('Error sending message:', error);
            // Handle error scenario here
          }
        );
      }
    }
   
  }

  getThirdValue(input: string): string {
    const parts = input.split('_');
    if (parts.length >= 3) {
      return parts[2];
    } else {
      return '';
    }
  }
  
    onKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
        this.sendMessage(this.newMessage);
      }
    }
   
   
    getChatPartnerId(adId: string): string {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const senderId1 = userData.userId;
        const [senderId, receiverId, _] = adId.split('_');
        // return senderId === senderId1 ? receiverId : senderId;
         const userId = senderId === senderId1 ? receiverId : senderId;

           return userId
      }
      return '';
    }

   
    fetchUserNames(): void {
      const userIds = new Set<string>(); // Use a set to avoid duplicate user IDs
      for (const adId of this.adIds) {
        const userId = this.getChatPartnerId(adId);
        if (userId) {
          userIds.add(userId);
        }
      }
      userIds.forEach(userId => {
        this.apiService.getUserName(userId).subscribe(
          (response) => {
            this.userNames[userId] = response.user_name;
          },
          (error) => {
            console.error('Error fetching user name:', error);
          }
        );
      });
    }
  
    
    getChatPartnerName(adId: string): string {
      const userId = this.getChatPartnerId(adId);
      const userName = this.userNames[userId];
      return userName || ''; // Return empty string if user name is not found
    }

    getLastMessage(adId: string): string {
      const messages = this.messagesByAdId[adId];
      if (messages && messages.length > 0) {
        // Sort messages by timestamp to get the latest message
        const sortedMessages = messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        return sortedMessages[0].message; // Access the last element of the sorted array
      }
      return 'No messages'; // Return a default message if no messages exist
    }


    toggleBackground(event: any): void {
      const isChecked = event.target.checked;
      if (isChecked) {
        document.body.style.backgroundColor = 'black'; 
        document.querySelector('.chat-list')?.classList.add('lightBlackBackground'); // Add lightBlackBackground class
        document.querySelector('.chat-heading')?.classList.add('whitetext'); // Add lightBlackBackground class
        document.querySelector('.chat-details')?.classList.add('whitetext'); // Add lightBlackBackground class
        document.querySelector('.nameChat')?.classList.add('whitetext'); // Add lightBlackBackground class
 
      } else {
        document.body.style.backgroundColor = 'white'; 
        document.querySelector('.chat-list')?.classList.remove('lightBlackBackground'); // Remove lightBlackBackground class
        // document.querySelector('.chat-heading')?.classList.add('whitetext'); // Add lightBlackBackground class
        // document.querySelector('.chat-details')?.classList.add('whitetext'); // Add lightBlackBackground class
        // document.querySelector('.nameChat')?.classList.add('whitetext'); // Add lightBlackBackground class
        document.querySelector('.nameChat')?.classList.remove('whitetext'); // Remove lightBlackBackground class
        document.querySelector('.chat-details')?.classList.remove('whitetext'); // Remove lightBlackBackground class
        document.querySelector('.chat-heading')?.classList.remove('whitetext'); // Remove lightBlackBackground class

      }
    }
    
    
}
