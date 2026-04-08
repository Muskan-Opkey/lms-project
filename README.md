# LMS Platform - Learning Management System

A responsive Learning Management System (LMS) Home Page built with Angular and Bootstrap 5.

## Features

- **Responsive Navigation Bar**: Mobile-friendly navbar with collapse menu
- **Hero Section**: Eye-catching landing section with call-to-action
- **Course Catalog**: Browse all available courses with filtering options
- **Course Cards**: Display courses using Bootstrap grid system with *ngFor
- **Registration Form**: User-friendly registration form with validation
- **Contact Form**: Get in touch form with contact information
- **Footer**: Complete footer with links and copyright information
- **Routing**: Clean URL routing between different pages

## Technologies Used

- **Angular 17**: Modern web application framework
- **Bootstrap 5.3**: Responsive CSS framework
- **TypeScript**: Type-safe programming
- **RxJS**: Reactive programming library

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/           # Navigation component
│   │   ├── home/             # Home page component
│   │   ├── courses/          # All courses page
│   │   ├── registration/     # Registration form
│   │   ├── contact/          # Contact page
│   │   └── footer/           # Footer component
│   ├── app.component.*       # Root component
│   ├── app.module.ts         # Main module
│   └── app-routing.module.ts # Routing configuration
├── assets/                   # Static assets
├── styles.css               # Global styles
└── index.html              # Main HTML file
```

## Routing Configuration

- `/` - Home Page
- `/courses` - All Courses
- `/registration` - Registration Form
- `/contact` - Contact Us

## Installation & Setup

### Prerequisites

- Node.js (v18.19 or higher)
- npm (Node Package Manager)
- Angular CLI

### Steps to Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Angular CLI (if not already installed)**
   ```bash
   npm install -g @angular/cli
   ```

3. **Start Development Server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open Browser**
   Navigate to `http://localhost:4200/`

## Components Overview

### NavbarComponent
- Responsive Bootstrap navbar
- Active route highlighting
- Mobile hamburger menu

### HomeComponent
- Hero section with gradient background
- Featured courses display
- "Why Choose Us" section with benefits

### CoursesComponent
- Complete course catalog (9 sample courses)
- Filter courses by level (Beginner/Intermediate/Advanced)
- Course details: instructor, duration, price, rating

### RegistrationComponent
- Registration form with validation
- Fields: Name, Email, Phone, Course Selection, Message
- Success notification on submission

### ContactComponent
- Contact form (Name, Email, Subject, Message)
- Contact information display
- FAQ section

### FooterComponent
- Company information
- Quick navigation links
- Social media links
- Copyright with dynamic year

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

### Responsive Features:
- Collapsible navbar on mobile
- Stacking course cards on small screens
- Mobile-friendly forms
- Optimized spacing and typography

## Sample Data

The application includes sample data for 9 courses covering:
- Web Development
- Angular Framework
- Python & Data Science
- React.js
- Machine Learning
- UI/UX Design
- Node.js Backend
- Flutter Mobile Development
- Database & SQL

## Code Highlights

### Component-Based Architecture
Each feature is isolated in its own component for maintainability.

### Angular Forms
Uses Template-driven forms with two-way data binding (`[(ngModel)]`).

### Bootstrap Integration
Bootstrap CSS and JavaScript are integrated via `angular.json`.

### Routing
Clean URL routing with active link highlighting.

## Future Enhancements

- User authentication
- Course detail pages
- Video player integration
- Progress tracking
- Payment integration
- User dashboard
- Course search functionality
- Backend API integration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes.

## Author

LMS Platform Development Team

---

**Note**: This is a front-end demonstration project. For production use, integrate with a backend API and add proper authentication.
