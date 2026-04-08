# LMS Platform - Angular Application Documentation

A fully responsive Learning Management System (LMS) built with Angular 17, Bootstrap 5, Node.js/Express backend, and PostgreSQL database.

## Current Implementation Status

### Project Structure (Point-wise)

- **src/app/**  
  - **components/** – All UI components  
    - **navbar/** – Multi-level navigation bar with dropdown menus
    - **home/** – Landing page with hero section & course showcase  
    - **courses/** – Course listing and detailed view components  
    - **contact/** – Contact form component with basic validation
    - **footer/** – Footer component across the site  
    - **e-resources/** – Section for e-learning resources  
    - **gallery/** – Demo video gallery with course previews
    - **registration/** – Course registration form with comprehensive validation
    - **user-management/** – User Management module  
      - **signup/** – Sign Up form component  
      - **dashboard/** – Dashboard component to view registered users  
  - **services/** – Shared services across components  
    - **e-resources.service.ts** – Manages e-learning resources  
    - **user.service.ts** – Handles user registration and retrieval from localStorage  
    - **registration.service.ts** – HTTP service for course registration API calls
    - **email.service.ts** – EmailJS integration for sending emails
  - **models/** – TypeScript interfaces & models  
    - **user.model.ts** – User interface definition  
    - **registration.model.ts** – Registration, API response, pagination, and statistics interfaces
  - **app-routing.module.ts** – Application routing configuration  
  - **app.module.ts** – Main Angular module imports & declarations  
  - **app.component.ts** – Root app component  

- **backend/** – Node.js/Express REST API server
  - **server.js** – Main Express server with middleware configuration
  - **config/** – Configuration files
    - **database.js** – MySQL connection pooling and initialization
    - **logger.js** – Winston logger configuration
  - **controllers/** – Request handlers
    - **registrationController.js** – Registration CRUD operations
  - **middleware/** – Express middleware
    - **errorHandler.js** – Global error handling and 404 handler
    - **rateLimiter.js** – Rate limiting for API protection
    - **validator.js** – Request validation with express-validator
  - **routes/** – API route definitions
    - **index.js** – API documentation and health check routes
    - **registrationRoutes.js** – Registration endpoint routes
  - **.env** – Environment configuration (not in repo)
  - **README.md** – Backend setup and API documentation
  - **MYSQL_SETUP_GUIDE.md** – Comprehensive MySQL setup and migration guide  

---

## Features Implemented

### 1. Navigation (NavbarComponent)
- Responsive Bootstrap navbar with hamburger menu
- **Main Menu Items:**
  - Home
  - Courses (Multi-level dropdown)
  - E-Resources
  - Gallery
  - Registration
  - User Management (Dropdown)
  - Contact Us
- **Multi-level dropdown menus for course categories:**
  - Java (Core Java, Advanced Java, Spring, Hibernate)
  - Python (Basics, Django, Flask, Data Science)
  - Web Development (HTML/CSS, JavaScript, Angular, React)
- **User Management dropdown** with two sub-items:
  - Sign Up
  - Dashboard
- Bootstrap Icons integration
- Active route highlighting with `routerLinkActive`

### 2. Routing Configuration
- `/` → HomeComponent
- `/courses` → CoursesComponent
- `/contact` → ContactComponent
- `/e-resources` → EResourcesComponent
- `/gallery` → GalleryComponent
- `/registration` → RegistrationComponent
- `/user-management/signup` → SignUpComponent
- `/user-management/dashboard` → DashboardComponent
- `/**` → Redirects to home

### 3. Forms Implementation

#### ContactComponent
- Fields: Name, Email, Subject, Message
- Basic validation with visual feedback
- Form submission simulation with loading states
- Success message display

#### SignUpComponent
- Fields: Name, Email, Password
- Validation:
  - Required fields
  - Email format validation
  - Password strength check
- Form submission:
  - Stores user data in **localStorage**
  - Prevents submission until validations pass
- On successful signup:
  - Redirects to **DashboardComponent**

#### RegistrationComponent (Course Registration)
- **Comprehensive Reactive Form** with FormBuilder
- **Fields:**
  - Name (min 2, max 255 chars, alphabetic with spaces)
  - Designation (Student, Professional, Developer, Engineer, etc.)
  - Course Selection (15+ courses including Python, Java, Angular, React, MEAN/MERN Stack, .NET Core)
  - Location (25+ locations worldwide including US cities, Indian cities, and international hubs)
- **Advanced Validation:**
  - Required field validation
  - Pattern validation for name field
  - Min/max length validation
  - Real-time validation feedback
- **Form Features:**
  - Loading states during submission
  - Success/Error message display with auto-hide
  - Validation error details display
  - Form reset after successful submission
- **Backend Integration:**
  - HTTP POST to Node.js/Express API
  - Error handling with retry logic (2 retries)
  - Detailed error messages for debugging

### 4. Gallery Component (GalleryComponent)
- **Demo Video Gallery** for course previews
- **Video Information Cards** with:
  - Course title and description
  - Technology/category tags
  - Instructor name
  - Video thumbnail placeholders
  - Video URL integration ready
- **Featured Courses:**
  - Python Programming Fundamentals
  - Java Enterprise Development
  - JavaScript Modern Development
  - .NET Core Development
  - MEAN Stack Complete Guide
  - MERN Stack Masterclass
- Responsive grid layout for video cards
- Bootstrap card components with hover effects
- Promotional messaging (assignments, mentor reviews, discounts)

### 5. User Dashboard (DashboardComponent)
- **Header with Logout Button** - Logout option prominently displayed in header
- Fetches all registered users from localStorage
- **Statistics Cards** showing:
  - Total users count
  - Active users count
  - Search results count
- **Search Functionality** - Filter users by name or email in real-time
- **Sortable Table** - Click column headers to sort data
- Displays user data in a **tabular format**:
  - Name (with avatar icon)
  - Email
  - Registration date/time
- **User Management Actions**:
  - View button - View user details
  - Edit button - Edit user information
  - Delete button - Delete user (with confirmation)
- **Logout Functionality** - Logout button with confirmation prompt
- Responsive table design for mobile and desktop
- Empty state handling when no users exist

### 6. Backend API (Node.js + Express + MySQL)
- **Production-ready REST API** with Express.js
- **Database Integration:**
  - MySQL with connection pooling (mysql2 driver)
  - Automatic table initialization
  - Graceful shutdown handling
  - Table name: `mysqlTable`
- **API Endpoints:**
  - `POST /api/v1/registrations` - Create new registration
  - `GET /api/v1/registrations` - Get all registrations (with pagination)
  - `GET /api/v1/registrations/:id` - Get registration by ID
  - `PUT /api/v1/registrations/:id` - Update registration
  - `DELETE /api/v1/registrations/:id` - Delete registration
  - `GET /api/v1/registrations/stats` - Get registration statistics
  - `GET /api/v1/health` - Health check endpoint
- **Security Features:**
  - Helmet.js security headers
  - CORS protection with configurable origins
  - Rate limiting (100 requests per 15 minutes)
  - Input validation and sanitization
  - SQL injection prevention
- **Middleware:**
  - Request compression
  - JSON body parsing (10mb limit)
  - Morgan HTTP request logger
  - Custom error handling
  - 404 handler
- **Logging:**
  - Winston logger integration
  - Separate log files (error.log, combined.log)
  - Console logging in development
  - Structured log format
- **Configuration:**
  - Environment variables with .env
  - Configurable PORT, HOST, DATABASE credentials
  - Development/Production modes

### 7. Services Implementation

#### RegistrationService (`registration.service.ts`)
- HTTP client service for backend API communication
- **Methods:**
  - `createRegistration(registration)` → Submits new course registration
  - `getAllRegistrations(page, limit)` → Fetches paginated registrations
  - `getRegistrationById(id)` → Retrieves single registration
  - `updateRegistration(id, registration)` → Updates existing registration
  - `deleteRegistration(id)` → Deletes registration
  - `getRegistrationStats()` → Fetches statistics
  - `searchRegistrations(query)` → Searches registrations
- **Features:**
  - Automatic retry logic (2 retries)
  - Error handling with descriptive messages
  - RxJS operators (tap, catchError, retry)
  - Console logging for debugging
  - TypeScript strongly-typed responses

#### UserService (`user.service.ts`)
- Stores and retrieves users from **localStorage**
- **Methods:**
  - `addUser(user: User)` → Adds new user
  - `getUsers()` → Retrieves all users
  - `deleteUser(id: string)` → Deletes a user
  - `updateUser(id: string, updatedUser: User)` → Updates user details

#### EmailService (`email.service.ts`)
- **EmailJS Integration** for transactional emails
- **Methods:**
  - `sendWelcomeEmail(userName, userEmail)` → Sends welcome email to new users
  - `setEmailCredentials(serviceId, templateId, publicKey)` → Configure EmailJS credentials
- **Features:**
  - Promise-based async/await pattern
  - Error handling with fallback
  - Console logging for debugging
  - Configurable email templates
- **Use Cases:**
  - Welcome emails for new signups
  - Course registration confirmations
  - Contact form submissions

#### EResourcesService (`e-resources.service.ts`)
- Manages e-learning resources and materials
- Provides access to learning content

### 8. Data Models (TypeScript Interfaces)

#### User Model (`user.model.ts`)
```typescript
interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}
```

#### Registration Model (`registration.model.ts`)
```typescript
interface Registration {
  id?: number;
  name: string;
  designation: string;
  course: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: { message: string; details?: any[] };
  timestamp: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
  };
  timestamp: string;
}

interface RegistrationStats {
  overview: {
    total_registrations: number;
    total_courses: number;
    total_locations: number;
    total_designations: number;
  };
  courseBreakdown: Array<{
    course: string;
    count: number;
  }>;
}
```

### 9. Modules & Dependencies

#### Frontend (Angular)
- `BrowserModule`
- `AppRoutingModule`
- `FormsModule` (Template-driven forms)
- `ReactiveFormsModule` (Reactive forms)
- `HttpClientModule` (HTTP requests)
- Bootstrap 5.3.2
- Bootstrap Icons
- EmailJS Browser SDK

#### Backend (Node.js)
- `express` - Web framework
- `mysql2` - MySQL client
- `dotenv` - Environment variables
- `cors` - CORS middleware
- `helmet` - Security headers
- `express-validator` - Input validation
- `express-rate-limit` - Rate limiting
- `morgan` - HTTP logger
- `compression` - Response compression
- `winston` - Logging library

### 10. Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Collapsible navbar for mobile
- Responsive forms, tables, and cards
- Touch-friendly UI
- Responsive video gallery grid
- Mobile-optimized registration form

---

## Development Guidelines

### Adding New Features
1. **Components** → `src/app/components/`
2. **Services** → `src/app/services/`
3. **Models** → `src/app/models/`
4. **Routing** → Update `app-routing.module.ts`
5. **Module Registration** → Add to `app.module.ts` declarations
6. **Backend APIs** → Add to `backend/routes/` and `backend/controllers/`

### Form Development
- Use `ReactiveFormsModule` for complex forms with validation
- Use `FormsModule` for simple two-way binding
- Proper validation with visual feedback (`is-valid`, `is-invalid`)
- FormBuilder for reactive forms with validators
- Real-time validation feedback

### Backend Development
- Follow RESTful API conventions
- Use middleware for cross-cutting concerns
- Implement proper error handling
- Add input validation and sanitization
- Use connection pooling for database
- Log all important operations
- Handle graceful shutdown

### Styling Standards
- Bootstrap 5 utility classes first
- Component-specific CSS for custom styles
- Bootstrap Icons for all icons
- Maintain dark navbar theme
- Ensure mobile responsiveness

### Code Quality
- Type-safe TypeScript
- Component-based architecture
- Reusable services
- Clean, commented code
- Proper error handling
- Async/await for promises
- RxJS operators for observables
- Environment-based configuration

---

## Next Steps / Planned Features
- Authentication & Authorization (JWT tokens)
- Role-based access control (Admin, Instructor, Student)
- Course management system (CRUD operations)
- Progress tracking for enrolled courses
- Certificate generation upon course completion
- Quiz and assignment submission features
- Real-time notifications
- Payment gateway integration
- File upload functionality for course materials
- Video streaming integration
- Chat/Forum for student collaboration

---

## Development Commands

### Frontend
```bash
ng serve              # Start dev server (http://localhost:4200)
ng build              # Build for production
ng generate component # Create new component
ng generate service   # Create new service
ng test               # Run unit tests
ng lint               # Lint the code
```

### Backend
```bash
cd backend
npm install           # Install dependencies
npm start             # Start production server
npm run dev           # Start development server with nodemon
node server.js        # Start server directly
```

### Database
```bash
# MySQL commands
mysql -u mysql -p              # Connect to MySQL
SHOW DATABASES;                # List databases
USE mysqldb;                   # Connect to database
SHOW TABLES;                   # List tables
DESCRIBE mysqlTable;           # Describe table structure
SELECT * FROM mysqlTable;      # View all registrations
```

---

## Environment Setup

### Frontend (.env or environment files)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
  emailServiceId: 'YOUR_EMAILJS_SERVICE_ID',
  emailTemplateId: 'YOUR_EMAILJS_TEMPLATE_ID',
  emailPublicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
};
```

### Backend (.env)
```env
# Server Configuration
PORT=3000
HOST=localhost
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mysqldb
DB_USER=mysql
DB_PASSWORD=mysql

# Security
ALLOWED_ORIGINS=http://localhost:4200
```

---

## Project Documentation Files
- **README.md** - Main project documentation
- **SETUP_GUIDE.md** - Complete setup instructions
- **INSTALLATION_SUMMARY.md** - Quick installation guide
- **QUICK_START.md** - Quick start guide
- **EMAILJS_SETUP.md** - EmailJS configuration guide
- **backend/README.md** - Backend API documentation
- **backend/MYSQL_SETUP_GUIDE.md** - Comprehensive MySQL setup and migration guide
- **backend/API_TESTING_GUIDE.md** - API testing guide
- **src/app/components/gallery/VIDEO_SETUP_GUIDE.md** - Video gallery setup

---

## Testing

### Frontend Testing
```bash
ng test               # Run Karma unit tests
ng e2e                # Run end-to-end tests
```

### Backend Testing
Use tools like:
- **Postman** - API testing
- **Thunder Client** (VS Code) - API testing
- **curl** - Command-line API testing

### Sample API Test
```bash
# Create registration
curl -X POST http://localhost:3000/api/v1/registrations \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","designation":"Student","course":"Angular","location":"New York"}'

# Get all registrations
curl http://localhost:3000/api/v1/registrations

# Get statistics
curl http://localhost:3000/api/v1/registrations/stats
```