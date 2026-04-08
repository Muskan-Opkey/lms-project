import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Email.js credentials - Replace these with your actual credentials from emailjs.com
  private serviceId = 'YOUR_SERVICE_ID';
  private templateId = 'YOUR_TEMPLATE_ID';
  private publicKey = 'YOUR_PUBLIC_KEY';

  constructor() {
    // Initialize EmailJS with your public key
    emailjs.init(this.publicKey);
  }

  /**
   * Send welcome email to new user
   * @param userName - Name of the user
   * @param userEmail - Email address of the user
   * @returns Promise<boolean> - Success status
   */
  async sendWelcomeEmail(userName: string, userEmail: string): Promise<boolean> {
    try {
      const templateParams = {
        to_name: userName,
        to_email: userEmail,
        from_name: 'LMS Platform',
        message: `Welcome to our Learning Management System! We're excited to have you join our community.`,
        subject: 'Welcome to LMS Platform'
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log('Email sent successfully:', response);
      return response.status === 200;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  /**
   * Update Email.js credentials
   * @param serviceId - Your EmailJS Service ID
   * @param templateId - Your EmailJS Template ID
   * @param publicKey - Your EmailJS Public Key
   */
  setEmailCredentials(serviceId: string, templateId: string, publicKey: string): void {
    this.serviceId = serviceId;
    this.templateId = templateId;
    this.publicKey = publicKey;
    emailjs.init(this.publicKey);
  }
}
