import { Component, OnInit } from '@angular/core';

interface Language {
  id: number;
  name: string;
  icon: string;
  description: string;
  topics: string[];
  category: string;
  level: string;
  levelColor: string;
  courses: number;
  students: string;
  rating: number;
  popularity: number;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  searchTerm = '';
  selectedCategory = 'all';
  sortBy = 'popularity';

  languages: Language[] = [
    {
      id: 1,
      name: 'Java',
      icon: '☕',
      description: 'Learn Java development from basics to enterprise applications',
      topics: ['Core Java', 'Advanced Java', 'Spring Boot', 'Hibernate'],
      category: 'programming',
      level: 'All Levels',
      levelColor: 'success',
      courses: 45,
      students: '15K+',
      rating: 4.8,
      popularity: 9
    },
    {
      id: 2,
      name: 'Python',
      icon: '🐍',
      description: 'Master Python for web development and data science',
      topics: ['Python Basics', 'Django', 'Flask', 'Data Science'],
      category: 'data',
      level: 'Beginner',
      levelColor: 'primary',
      courses: 52,
      students: '20K+',
      rating: 4.9,
      popularity: 10
    },
    {
      id: 3,
      name: 'JavaScript',
      icon: '💻',
      description: 'Build modern web applications with JavaScript',
      topics: ['Fundamentals', 'React', 'Angular', 'Node.js'],
      category: 'web',
      level: 'All Levels',
      levelColor: 'warning',
      courses: 60,
      students: '25K+',
      rating: 4.7,
      popularity: 10
    },
    {
      id: 4,
      name: 'C++',
      icon: '⚡',
      description: 'Master system programming and competitive coding',
      topics: ['C++ Basics', 'Advanced C++', 'Data Structures', 'STL'],
      category: 'programming',
      level: 'Intermediate',
      levelColor: 'danger',
      courses: 38,
      students: '12K+',
      rating: 4.6,
      popularity: 7
    },
    {
      id: 5,
      name: 'C#',
      icon: '🔷',
      description: 'Build Windows and web applications with .NET',
      topics: ['C# Fundamentals', 'ASP.NET Core', '.NET Framework', 'Entity Framework'],
      category: 'web',
      level: 'Intermediate',
      levelColor: 'info',
      courses: 35,
      students: '10K+',
      rating: 4.5,
      popularity: 6
    },
    {
      id: 6,
      name: 'Ruby',
      icon: '💎',
      description: 'Elegant programming with Ruby and Rails',
      topics: ['Ruby Basics', 'Ruby on Rails', 'Web Development', 'Testing'],
      category: 'web',
      level: 'Beginner',
      levelColor: 'danger',
      courses: 28,
      students: '8K+',
      rating: 4.4,
      popularity: 5
    },
    {
      id: 7,
      name: 'Go',
      icon: '🚀',
      description: 'Build fast, scalable applications with Go',
      topics: ['Go Basics', 'Concurrency', 'Microservices', 'Cloud Native'],
      category: 'programming',
      level: 'Advanced',
      levelColor: 'primary',
      courses: 22,
      students: '6K+',
      rating: 4.7,
      popularity: 8
    },
    {
      id: 8,
      name: 'R',
      icon: '📊',
      description: 'Statistical computing and data visualization',
      topics: ['R Basics', 'Statistics', 'Data Viz', 'Machine Learning'],
      category: 'data',
      level: 'Intermediate',
      levelColor: 'info',
      courses: 30,
      students: '9K+',
      rating: 4.5,
      popularity: 6
    },
    {
      id: 9,
      name: 'TypeScript',
      icon: '📘',
      description: 'Typed superset of JavaScript for large applications',
      topics: ['TS Basics', 'Type System', 'Angular', 'React'],
      category: 'web',
      level: 'Intermediate',
      levelColor: 'primary',
      courses: 25,
      students: '11K+',
      rating: 4.8,
      popularity: 9
    }
  ];

  filteredLanguages: Language[] = [];

  ngOnInit(): void {
    this.filteredLanguages = [...this.languages];
    this.sortCourses();
  }

  filterCourses(): void {
    let result = [...this.languages];

    // Filter by search term
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      result = result.filter(lang =>
        lang.name.toLowerCase().includes(search) ||
        lang.description.toLowerCase().includes(search) ||
        lang.topics.some(topic => topic.toLowerCase().includes(search))
      );
    }

    // Filter by category
    if (this.selectedCategory !== 'all') {
      result = result.filter(lang => lang.category === this.selectedCategory);
    }

    this.filteredLanguages = result;
    this.sortCourses();
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filterCourses();
  }

  sortCourses(): void {
    this.filteredLanguages.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popularity':
          return b.popularity - a.popularity;
        case 'level':
          const levels = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'All Levels': 0 };
          return (levels[a.level as keyof typeof levels] || 0) - (levels[b.level as keyof typeof levels] || 0);
        default:
          return 0;
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterCourses();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.filterCourses();
  }

  exploreCourse(courseId: number): void {
    console.log('Exploring course:', courseId);
    // Navigate to course details or show course info
  }
}
