import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostAddComponent } from '../post-add/post-add.component';

@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.component.html',
  styleUrls: ['./sell-item.component.css']
})
export class SellItemComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PostAddComponent, {
      minWidth:'800px',
      // width: '500px', // Adjust the width as needed
      disableClose: true, // Prevent closing by clicking outside the dialog
      minHeight:'500px'

    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed
    });
  }


}
