import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  sortColumn: string = 'registeredAt';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load all users from database
  loadUsers(): void {
    this.userService.getUsersFromDB().subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          // Map database fields to User model
          this.users = response.data.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: '********', // Don't expose password
            registeredAt: new Date(user.registered_at)
          }));
          this.filteredUsers = [...this.users];
          this.sortUsers();
          console.log('Loaded users from database:', this.users.length);
        }
      },
      error: (error) => {
        console.error('Error loading users from database:', error);
        alert('Failed to load users from database. Please try again.');
      }
    });
  }

  // Search users by name or email
  searchUsers(): void {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term) {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
      );
    }
    this.sortUsers();
  }

  // Sort users by column
  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortUsers();
  }

  // Perform sorting
  private sortUsers(): void {
    this.filteredUsers.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (this.sortColumn) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'email':
          valueA = a.email.toLowerCase();
          valueB = b.email.toLowerCase();
          break;
        case 'registeredAt':
          valueA = new Date(a.registeredAt).getTime();
          valueB = new Date(b.registeredAt).getTime();
          break;
        default:
          return 0;
      }

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Delete user
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUserFromDB(userId).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('User deleted successfully');
            this.loadUsers(); // Reload users from database
          }
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user. Please try again.');
        }
      });
    }
  }

  // Format date
  formatDate(date: Date): string {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get sort icon
  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return 'bi-arrow-down-up';
    }
    return this.sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down';
  }

  // Logout - Clear session and redirect to home
  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      // Clear any session data if needed
      // For now, just redirect to home page
      this.router.navigate(['/']);
    }
  }
}
