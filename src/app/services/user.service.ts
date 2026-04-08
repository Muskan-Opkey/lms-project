import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'lms_users';
  private readonly API_URL = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) { }

  // Add a new user to localStorage AND MySQL database
  addUser(user: User): Observable<boolean> {
    return from(this.addUserAsync(user));
  }

  private async addUserAsync(user: User): Promise<boolean> {
    try {
      // First, check localStorage for duplicate
      const users = this.getUsers();
      const emailExists = users.some(u => u.email === user.email);
      if (emailExists) {
        console.error('Email already exists in localStorage');
        return false;
      }

      // Send to backend API
      const response = await this.http.post<any>(`${this.API_URL}/signup`, user).toPromise();
      
      if (response && response.success) {
        // Also store in localStorage for offline access
        users.push(user);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
        console.log('User saved to both MySQL and localStorage');
        return true;
      }
      
      return false;
    } catch (error: any) {
      // If backend fails, still store in localStorage
      console.error('Error saving to backend, storing in localStorage only:', error);
      
      if (error.error?.error?.message === 'Email already exists') {
        return false;
      }
      
      try {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
        return true;
      } catch (localError) {
        console.error('Error adding user to localStorage:', localError);
        return false;
      }
    }
  }

  // Get all users from localStorage
  getUsers(): User[] {
    try {
      const usersJson = localStorage.getItem(this.STORAGE_KEY);
      if (usersJson) {
        return JSON.parse(usersJson);
      }
      return [];
    } catch (error) {
      console.error('Error retrieving users:', error);
      return [];
    }
  }

  // Get all users from database via API
  getUsersFromDB(): Observable<User[]> {
    return this.http.get<any>(`${this.API_URL}`).pipe(
      tap(response => {
        console.log('Fetched users from database:', response.data?.length || 0);
      }),
      catchError(error => {
        console.error('Error fetching users from database:', error);
        throw error;
      })
    );
  }

  // Get user by ID
  getUserById(id: string): User | undefined {
    const users = this.getUsers();
    return users.find(u => u.id === id);
  }

  // Get user by email
  getUserByEmail(email: string): User | undefined {
    const users = this.getUsers();
    return users.find(u => u.email === email);
  }

  // Update user details
  updateUser(id: string, updatedUser: Partial<User>): boolean {
    try {
      const users = this.getUsers();
      const index = users.findIndex(u => u.id === id);
      
      if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }

  // Delete user by ID from localStorage
  deleteUser(id: string): boolean {
    try {
      const users = this.getUsers();
      const filteredUsers = users.filter(u => u.id !== id);
      
      if (filteredUsers.length < users.length) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredUsers));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  // Delete user by ID from database via API
  deleteUserFromDB(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`).pipe(
      tap(response => {
        console.log('User deleted from database:', id);
      }),
      catchError(error => {
        console.error('Error deleting user from database:', error);
        throw error;
      })
    );
  }

  // Generate unique ID
  generateId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
