import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Learning Management System';
  showScrollButton = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Scroll to top on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  // Listen to scroll events
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Show button when page is scrolled down 300px
    this.showScrollButton = window.pageYOffset > 300;
  }

  // Scroll to top function with smooth behavior
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
