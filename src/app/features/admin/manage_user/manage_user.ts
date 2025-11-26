import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services';
import { Auth } from '../../../core/services';
import { User, UserRole } from '../../../shared';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage_user.html',
   imports: [CommonModule,FormsModule],
  styleUrls: ['./manage_user.scss']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];  
  loading = true;
  UserRole = UserRole;


  constructor(private adminService: AdminService, private auth: Auth) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (users: any) => {
        this.users = users;
        this.loading = false;
      },
      error: (err:any) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  promoteUser(userId: number): void {
    this.adminService.promoteUser(userId).subscribe({
      next: (user) => {
        alert(`User ${userId} has been promoted to Admin.`);
        this.loadUsers();  // Reload users list after the role update
      },
      error: (err) => {
        console.error('Error promoting user:', err);
      }
    });
  }

  demoteUser(userId: number): void {
    this.adminService.demoteUser(userId).subscribe({
      next: (user) => {
        alert(`User ${userId} has been demoted to regular user.`);
        this.loadUsers();  // Reload users list after the role update
      },
      error: (err) => {
        console.error('Error demoting user:', err);
      }
    });
  }

  isSuperAdmin(): boolean {
    return this.auth.isSuperAdmin();
  }
}
