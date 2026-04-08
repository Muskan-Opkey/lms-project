import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { EmailService } from '../../../services/email.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;
  errorMessage = '';
  validationErrors: { field: string; message: string; value?: string }[] = [];
  showPassword = false;
  isLoading = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private emailService: EmailService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      ]]
    });
  }

  // Getter for form controls
  get f() {
    return this.signupForm.controls;
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Check password strength
  getPasswordStrength(): string {
    const password = this.f['password'].value;
    if (!password) return '';
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
  }

  // Handle form submission
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.validationErrors = [];

    // Stop if form is invalid
    if (this.signupForm.invalid) {
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Start loading
    this.isLoading = true;

    // Create user object
    const newUser: User = {
      id: this.userService.generateId(),
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password, // In production, hash this!
      registeredAt: new Date()
    };

    // Add user to localStorage AND MySQL database
    this.userService.addUser(newUser).subscribe({
      next: (success) => {
        if (success) {
          this.successMessage = 'Account created successfully! Data saved to database.';
          console.log('User registered successfully:', newUser.email);

          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/user-management/dashboard']);
          }, 2000);
        } else {
          this.errorMessage = 'Email already exists. Please use a different email.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating user:', error);
        
        // Check for validation errors from backend
        if (error.error?.error?.details && Array.isArray(error.error.error.details)) {
          this.validationErrors = error.error.error.details;
          this.errorMessage = error.error.error.message || 'Validation failed. Please check the errors below.';
        } else {
          this.errorMessage = error.error?.error?.message || 'Failed to create account. Please try again.';
        }
        
        this.isLoading = false;
      }
    });
  }
}
