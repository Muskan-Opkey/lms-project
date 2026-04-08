import { Component } from '@angular/core';

// Interface for Course model
interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Sample course data for featured courses on home page
  featuredCourses: Course[] = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      description: 'Learn HTML, CSS, and JavaScript from scratch to build modern websites',
      instructor: 'John Smith',
      duration: '8 weeks',
      level: 'Beginner',
      image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=Web+Development'
    },
    {
      id: 2,
      title: 'Angular Framework Mastery',
      description: 'Build modern, scalable web applications with Angular and TypeScript',
      instructor: 'Sarah Johnson',
      duration: '10 weeks',
      level: 'Intermediate',
      image: 'https://via.placeholder.com/400x250/764ba2/ffffff?text=Angular'
    },
    {
      id: 3,
      title: 'Python for Data Science',
      description: 'Master Python programming and data analysis with real-world projects',
      instructor: 'Michael Chen',
      duration: '12 weeks',
      level: 'Intermediate',
      image: 'https://via.placeholder.com/400x250/f093fb/ffffff?text=Python'
    }
  ];

  // Enroll in a course
  enrollCourse(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    // Add your enrollment logic here
    // For now, navigate to registration
    window.location.href = '/registration';
  }
}
