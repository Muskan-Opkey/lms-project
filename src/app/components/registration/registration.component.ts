import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { Registration } from '../../models/registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';
  validationErrors: any[] = [];

  // Course options
  courses = [
    'Python Basics',
    'Django',
    'Flask',
    'Data Science',
    'Core Java',
    'Advanced Java',
    'Spring Framework',
    'Hibernate',
    'HTML & CSS',
    'JavaScript',
    'Angular',
    'React',
    '.NET Core',
    'MEAN Stack',
    'MERN Stack'
  ];

  // Designation options
  designations = [
    'Student',
    'Professional',
    'Developer',
    'Engineer',
    'Manager',
    'Consultant',
    'Freelancer',
    'Other'
  ];

  // Location options
  locations = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'London',
    'Paris',
    'Berlin',
    'Tokyo',
    'Singapore',
    'Dubai',
    'Other'
  ];

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initialize the registration form
   */
  initializeForm(): void {
    this.registrationForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(/^[a-zA-Z\s.'-]+$/)
      ]],
      designation: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]],
      course: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]],
      location: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]]
    });
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    // Reset status messages
    this.submitSuccess = false;
    this.submitError = false;
    this.errorMessage = '';
    this.validationErrors = [];

    // Validate form
    if (this.registrationForm.invalid) {
      this.markFormGroupTouched(this.registrationForm);
      this.submitError = true;
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    // Prepare registration data
    const registration: Registration = this.registrationForm.value;
    this.isSubmitting = true;

    // Submit to backend
    this.registrationService.createRegistration(registration).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.registrationForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.isSubmitting = false;
        this.submitError = true;
        this.errorMessage = error.message || 'Failed to submit registration. Please try again.';
        this.validationErrors = error.details || [];

        // Hide error message after 8 seconds
        setTimeout(() => {
          this.submitError = false;
          this.validationErrors = [];
        }, 8000);
      }
    });
  }

  /**
   * Mark all form fields as touched to show validation errors
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Check if field has error
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }

  /**
   * Get field error message
   */
  getErrorMessage(fieldName: string): string {
    const field = this.registrationForm.get(fieldName);
    if (!field || (!field.dirty && !field.touched)) {
      return '';
    }

    if (field.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (field.hasError('minlength')) {
      const minLength = field.getError('minlength').requiredLength;
      return `${this.getFieldLabel(fieldName)} must be at least ${minLength} characters`;
    }
    if (field.hasError('maxlength')) {
      const maxLength = field.getError('maxlength').requiredLength;
      return `${this.getFieldLabel(fieldName)} must not exceed ${maxLength} characters`;
    }
    if (field.hasError('pattern')) {
      return `${this.getFieldLabel(fieldName)} contains invalid characters`;
    }

    return '';
  }

  /**
   * Get field label for error messages
   */
  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      designation: 'Designation',
      course: 'Course',
      location: 'Location'
    };
    return labels[fieldName] || fieldName;
  }

  /**
   * Reset form
   */
  resetForm(): void {
    this.registrationForm.reset();
    this.submitSuccess = false;
    this.submitError = false;
    this.errorMessage = '';
    this.validationErrors = [];
  }
}
