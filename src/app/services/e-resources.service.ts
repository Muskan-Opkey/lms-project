import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EResourcesService {
  private apiUrl = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) {}

  /**
   * Search for books using the Open Library API
   * @param query - Search term (book title, author, subject, etc.)
   * @param limit - Maximum number of results to return (default: 20)
   */
  searchBooks(query: string, limit: number = 20): Observable<any> {
    const params = new HttpParams()
      .set('q', query)
      .set('limit', limit.toString())
      .set('fields', 'key,title,author_name,first_publish_year,cover_i,edition_count,isbn');

    return this.http.get(this.apiUrl, { params });
  }

  /**
   * Search books by subject/topic
   * @param subject - Subject/topic to search for
   */
  searchBySubject(subject: string, limit: number = 20): Observable<any> {
    const params = new HttpParams()
      .set('subject', subject)
      .set('limit', limit.toString())
      .set('fields', 'key,title,author_name,first_publish_year,cover_i,edition_count');

    return this.http.get(this.apiUrl, { params });
  }

  /**
   * Search books by author
   * @param author - Author name to search for
   */
  searchByAuthor(author: string, limit: number = 20): Observable<any> {
    const params = new HttpParams()
      .set('author', author)
      .set('limit', limit.toString())
      .set('fields', 'key,title,author_name,first_publish_year,cover_i,edition_count');

    return this.http.get(this.apiUrl, { params });
  }
}
