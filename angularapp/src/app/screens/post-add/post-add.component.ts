import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css'],
  animations: [
    trigger('customCard', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ],
})
export class PostAddComponent {
  postForm: FormGroup;
  uploadedImages: File[] = [];


  constructor(public dialogRef: MatDialogRef<PostAddComponent>, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      selectedCategory: ['cars', Validators.required],
      // Add default form controls for laptop and car details
      company: [''],
      typeName: [''],
      Ram:[''],
      Weight:[''],
      Touchscreen:[''],
      Ips:[''],
      ppi:[''],
      Cpubrand:[''],
      HDD:[''],
      SSD:[''],
      Gpubrand:[''],
      os:[''],


      // Add other laptop details form controls here
      engineCapacity: [''],
      modelYear: [''],  
      Mileage:[''],
      Company:[''],
      Vaarient:[''],
      EngineType:[''],
      Transmission:[''],
      BodyType:[''],
      // Add other car details form controls here

      description: [''],

    });

    // this.postForm.valueChanges.subscribe((formValues) => {
    //   console.log('Form Values:', formValues);
    // });
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.uploadedImages.push(files[i]);
      }
    }
  }

  removeImage(index: number): void {
    this.uploadedImages.splice(index, 1);
  }

  saveImages(): void {
    // Implement the logic to save images to the database
    // You can use this.uploadedImages array to access the selected images
    // and this.postForm.value.description for the description
  }


  selectedTabIndex = 0;

  nextTab() {
    this.selectedTabIndex = Math.min(this.selectedTabIndex + 1, 2); // 2 is the index of the last tab
  }

  prevTab() {
    this.selectedTabIndex = Math.max(this.selectedTabIndex - 1, 0);
  }

  updateFormControls(): void {
    const selectedCategory = this.postForm.value.selectedCategory;

    if (selectedCategory === 'laptops') {
      // Set laptop details form controls
      this.postForm.patchValue({
        company: '',
        typeName: '',
        Ram:'',
        Weight:'',
        Touchscreen:'',
        Ips:'',
        ppi:'',
        Cpubrand:'',
        HDD:'',
        SSD:'',
        Gpubrand:'',
        os:'',

        // Set other laptop details form controls here
      });
    } else if (selectedCategory === 'cars') {
      // Set car details form controls
      this.postForm.patchValue({
        engineCapacity: '',
        modelYear: '',
        Mileage:'',
        Company:'',
        Vaarient:'',
        EngineType:'',
        Transmission:'',
        BodyType:'',
        // Set other car details form controls here
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
