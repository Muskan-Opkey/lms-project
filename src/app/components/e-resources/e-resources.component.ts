import { Component, OnInit } from '@angular/core';
import { EResourcesService } from '../../services/e-resources.service';

@Component({
  selector: 'app-e-resources',
  templateUrl: './e-resources.component.html',
  styleUrls: ['./e-resources.component.css']
})
export class EResourcesComponent implements OnInit {
  books: any[] = [];
  searchQuery: string = 'programming';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private eResourcesService: EResourcesService) {}

  ngOnInit(): void {
    this.searchBooks();
  }

  searchBooks(): void {
    if (!this.searchQuery.trim()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.eResourcesService.searchBooks(this.searchQuery).subscribe({
      next: (response: any) => {
        if (response.docs && response.docs.length > 0) {
          this.books = response.docs.slice(0, 12); // Limit to 12 books
        } else {
          this.books = [];
          this.errorMessage = 'No books found. Try a different search term.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.errorMessage = 'Failed to load books. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  getCoverUrl(coverId: number): string {
    if (coverId) {
      return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
    }
    return 'https://via.placeholder.com/180x270?text=No+Cover';
  }

  getAuthors(authors: any[]): string {
    if (authors && authors.length > 0) {
      return authors.slice(0, 2).map((author: any) => author.name || author).join(', ');
    }
    return 'Unknown Author';
  }

  getPublishYear(firstPublishYear: number): string {
    return firstPublishYear ? firstPublishYear.toString() : 'N/A';
  }

  onSearch(): void {
    this.searchBooks();
  }
}
