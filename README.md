
# LMS Platform - Learning Management System

A fully responsive, SEO-optimized Learning Management System (LMS) built with Angular 17 and Bootstrap 5.

## Features

- **Responsive Navigation Bar**: At least five primary menu options, multi-level dropdowns, and mobile-friendly collapse menu
- **SPA Architecture**: Seamless navigation using Angular Router
- **Bootstrap Slider**: Responsive carousel/slider on the homepage
- **Hero Section**: Eye-catching landing section with call-to-action
- **Featured Courses**: Highlighted courses with cards
- **Featured Products & Services**: Dedicated section for top offerings
- **Course Catalog**: Browse all available courses with filtering options
- **Registration Form**: Comprehensive, validated form for course registration (client & server validation)
- **Contact Form**: User-friendly form with embedded Google Map, EmailJS integration for secure admin delivery, and validation
- **Gallery**: Demo video gallery for course previews
- **E-Resources**: Section for e-learning resources
- **User Management**: Sign Up and Dashboard with validation and statistics
- **Footer**: Complete footer with links and copyright information
- **SEO Optimized**: Meta tags and best practices for search engine discoverability
- **Cross-Browser Compatible**: Tested on all major browsers
- **Fully Responsive**: Mobile-first design, works on all devices

## Technologies Used

- **Angular 17**: Modern web application framework
- **Bootstrap 5.3**: Responsive CSS framework
- **TypeScript**: Type-safe programming
- **RxJS**: Reactive programming library
- **EmailJS**: Secure email delivery for contact form

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/               # Navigation component
│   │   ├── home/                 # Home page component (with slider)
│   │   ├── featured-products/    # Featured products/services section
│   │   ├── courses/              # All courses page
│   │   ├── registration/         # Registration form
│   │   ├── contact/              # Contact page (with map & EmailJS)
│   │   ├── gallery/              # Video gallery
│   │   ├── e-resources/          # E-learning resources
│   │   ├── user-management/      # Sign Up & Dashboard
│   │   └── footer/               # Footer component
│   ├── app.component.*           # Root component
│   ├── app.module.ts             # Main module
│   └── app-routing.module.ts     # Routing configuration
├── assets/                       # Static assets
├── styles.css                    # Global styles
└── index.html                    # Main HTML file
```

## Routing Configuration

- `/` - Home Page
- `/courses` - All Courses
- `/registration` - Registration Form
- `/contact` - Contact Us
- `/gallery` - Video Gallery
- `/e-resources` - E-Learning Resources
- `/user-management/signup` - User Sign Up
- `/user-management/dashboard` - User Dashboard

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
