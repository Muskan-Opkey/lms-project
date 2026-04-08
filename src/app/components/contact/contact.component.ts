import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // Contact form model
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Form submission status
  submitted = false;
  isSubmitting = false;
  
  // Handle form submission
  onSubmit() {
    if (this.contactData.name && this.contactData.email && this.contactData.message) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Contact Data:', this.contactData);
        this.submitted = true;
        this.isSubmitting = false;
        
        // Reset form after 5 seconds
        setTimeout(() => {
          this.submitted = false;
          this.resetForm();
        }, 5000);
      }, 1500);
    }
  }
  
  // Reset form
  resetForm() {
    this.contactData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
