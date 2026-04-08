import { Component } from '@angular/core';

interface DemoVideo {
  id: number;
  title: string;
  description: string;
  technology: string;
  videoUrl: string;
  thumbnail: string;
  instructor: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  demoVideos: DemoVideo[] = [
    {
      id: 1,
      title: 'Python Programming Fundamentals',
      description: 'Learn Python basics with hands-on examples. Includes assignments and mentor reviews.',
      technology: 'Python',
      videoUrl: 'YOUR_PYTHON_VIDEO_URL_HERE',
      thumbnail: 'assets/thumbnails/python-demo.jpg',
      instructor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      title: 'Java Enterprise Development',
      description: 'Master Java with practical projects. Get 30% off on your first course!',
      technology: 'Java',
      videoUrl: 'YOUR_JAVA_VIDEO_URL_HERE',
      thumbnail: 'assets/thumbnails/java-demo.jpg',
      instructor: 'Prof. Michael Chen'
    },
    {
      id: 3,
      title: 'JavaScript Modern Development',
      description: 'Explore JavaScript with interactive assignments reviewed by expert mentors.',
      technology: 'JavaScript',
      videoUrl: 'YOUR_JS_VIDEO_URL_HERE',
      thumbnail: 'assets/thumbnails/js-demo.jpg',
      instructor: 'Emily Rodriguez'
    },
    {
      id: 4,
      title: '.NET Core Development',
      description: 'Build modern applications with .NET Core. Practice with real-world assignments.',
      technology: '.NET Core',
      videoUrl: 'YOUR_DOTNET_VIDEO_URL_HERE',
      thumbnail: 'assets/thumbnails/dotnet-demo.jpg',
      instructor: 'John Anderson'
    },
    {
      id: 5,
      title: 'MEAN Stack Complete Guide',
      description: 'Full-stack development with MongoDB, Express, Angular, Node.js. Mentor-reviewed projects.',
      technology: 'MEAN Stack',
      videoUrl: 'YOUR_MEAN_VIDEO_URL_HERE',
      thumbnail: 'assets/thumbnails/mean-demo.jpg',
      instructor: 'David Kumar'
    },
    {
      id: 6,
      title: 'MERN Stack Masterclass',
      description: 'Build React applications with MERN stack. Get 30% off your first course!',
      technology: 'MERN Stack',
      videoUrl: 'YOUR_MERN_VIDEO_URL_HERE',
      thumbnail: 'assets/thumbnails/mern-demo.jpg',
      instructor: 'Lisa Wang'
    }
  ];

  constructor() { }
}
