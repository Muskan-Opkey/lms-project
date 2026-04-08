import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { 
  Registration, 
  ApiResponse, 
  PaginatedResponse, 
  RegistrationStats 
} from '../models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private readonly API_URL = 'http://localhost:3000/api/v1/registrations';
  private readonly RETRY_COUNT = 2;

  constructor(private http: HttpClient) { }

  /**
   * Create a new registration
   * @param registration - Registration data
   * @returns Observable of API response
   */
  createRegistration(registration: Registration): Observable<ApiResponse<Registration>> {
    console.log('Creating registration:', registration);
    
    return this.http.post<ApiResponse<Registration>>(this.API_URL, registration)
      .pipe(
        retry(this.RETRY_COUNT),
        tap(response => {
          console.log('Registration created successfully:', response);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Get all registrations with pagination
   * @param page - Page number (default: 1)
   * @param limit - Records per page (default: 10)
   * @returns Observable of paginated registrations
   */
  getAllRegistrations(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Registration>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<Registration>>(this.API_URL, { params })
      .pipe(
        tap(response => {
          console.log('Fetched registrations:', response);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Get registration by ID
   * @param id - Registration ID
   * @returns Observable of registration
   */
  getRegistrationById(id: number): Observable<ApiResponse<Registration>> {
    return this.http.get<ApiResponse<Registration>>(`${this.API_URL}/${id}`)
      .pipe(
        tap(response => {
          console.log('Fetched registration by ID:', response);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Update registration by ID
   * @param id - Registration ID
   * @param registration - Updated registration data
   * @returns Observable of API response
   */
  updateRegistration(id: number, registration: Registration): Observable<ApiResponse<Registration>> {
    return this.http.put<ApiResponse<Registration>>(`${this.API_URL}/${id}`, registration)
      .pipe(
        retry(this.RETRY_COUNT),
        tap(response => {
          console.log('Registration updated successfully:', response);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Delete registration by ID
   * @param id - Registration ID
   * @returns Observable of API response
   */
  deleteRegistration(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${id}`)
      .pipe(
        tap(response => {
          console.log('Registration deleted successfully:', response);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Get registration statistics
   * @returns Observable of statistics
   */
  getRegistrationStats(): Observable<ApiResponse<RegistrationStats>> {
    return this.http.get<ApiResponse<RegistrationStats>>(`${this.API_URL}/stats`)
      .pipe(
        tap(response => {
          console.log('Fetched registration statistics:', response);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Check if backend is healthy
   * @returns Observable of health check response
   */
  checkHealth(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/health')
      .pipe(
        tap(response => {
          console.log('Backend health check:', response);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   * @param error - HTTP error response
   * @returns Observable error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = error.error?.error?.message || error.message || errorMessage;
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`
      );

      // Log validation errors if present
      if (error.error?.error?.details) {
        console.error('Validation errors:', error.error.error.details);
      }
    }

    // Return user-friendly error message
    return throwError(() => ({
      message: errorMessage,
      status: error.status,
      details: error.error?.error?.details || null,
      timestamp: error.error?.timestamp || new Date().toISOString()
    }));
  }
}
