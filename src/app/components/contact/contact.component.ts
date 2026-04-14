import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';

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
  errorMsg = '';

  constructor(private emailService: EmailService) {}
  
  // Handle form submission
  async onSubmit() {
    if (this.contactData.name && this.contactData.email && this.contactData.message) {
      this.isSubmitting = true;
      this.errorMsg = '';
      try {
        // Send contact form data to admin/owner via EmailJS
        const params = {
          from_name: this.contactData.name,
          from_email: this.contactData.email,
          subject: this.contactData.subject || 'Contact Form Submission',
          message: this.contactData.message,
        };
        const sent = await this.emailService.sendAdminNotification(params);
        if (sent) {
          this.submitted = true;
          // Reset form after 5 seconds
          setTimeout(() => {
            this.submitted = false;
            this.resetForm();
          }, 5000);
        } else {
          this.errorMsg = 'Failed to send your message. Please try again later.';
        }
      } catch (err) {
        this.errorMsg = 'An error occurred while sending your message.';
      } finally {
        this.isSubmitting = false;
      }
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
    this.errorMsg = '';
  }
}
