import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // ============================================================
  // 🔧 CONFIGURATION REQUIRED - Add your EmailJS credentials here
  // ============================================================
  // Get these from: https://dashboard.emailjs.com/admin
  
  // 1. Service ID - From "Email Services" section
  private serviceId = 'service_vq1wedd';  // ✅ Configured
  
  // 2. Template ID - From "Email Templates" section
  private templateId = 'template_j89ofdl';  // ✅ Configured
  
  // 3. Public Key - From "Account" → "API Keys"
  private publicKey = '-guJ0G_BCYrb60w4X';  // ✅ Configured
  
  // 4. Admin Email - Your email to receive registration notifications
  private adminEmail = 'muskan.shori@opkey.com';  // ✅ Configured
  
  // ============================================================

  constructor() {
    // Initialize EmailJS with your public key
    if (this.publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(this.publicKey);
      console.log('✅ EmailJS initialized');
    } else {
      console.warn('⚠️ EmailJS not configured. Please update credentials in email.service.ts');
    }
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
   * Send registration confirmation email
   * @param registration - Registration details (name, email, course, designation, location)
   * @param userEmail - Email address (if available)
   * @returns Promise<boolean> - Success status
   */
  async sendRegistrationEmail(registration: any, userEmail?: string): Promise<boolean> {
    try {
      // Send email to the user
      const templateParams = {
        to_name: registration.name,
        to_email: userEmail || this.adminEmail,
        from_name: 'LMS Platform',
        user_name: registration.name,
        user_email: registration.email,
        course: registration.course,
        designation: registration.designation,
        location: registration.location,
        message: `Thank you for registering for ${registration.course}! We will contact you soon with more details.`,
        subject: 'Course Registration Confirmation'
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log('✅ Registration email sent to:', userEmail);
      
      // Also send notification to admin
      await this.sendAdminNotification(registration);
      
      return response.status === 200;
    } catch (error) {
      console.error('❌ Failed to send registration email:', error);
      throw error;
    }
  }

  /**
   * Send admin notification about new registration
   * @param registration - Registration details
   * @returns Promise<boolean> - Success status
   */
  async sendAdminNotification(registration: any): Promise<boolean> {
    try {
      const adminParams = {
        to_name: 'Admin',
        to_email: this.adminEmail,
        from_name: 'LMS Platform - New Registration',
        user_name: registration.name,
        user_email: registration.email,
        course: registration.course,
        designation: registration.designation,
        location: registration.location,
        message: `New registration alert:\n\nName: ${registration.name}\nEmail: ${registration.email}\nCourse: ${registration.course}\nDesignation: ${registration.designation}\nLocation: ${registration.location}`,
        subject: `New Registration: ${registration.name} - ${registration.course}`
      };

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        adminParams
      );

      console.log('✅ Admin notification sent to:', this.adminEmail);
      return response.status === 200;
    } catch (error) {
      console.error('⚠️ Failed to send admin notification:', error);
      // Don't throw error, admin notification is optional
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
