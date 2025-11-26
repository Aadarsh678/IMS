// import { Component } from '@angular/core';
// import { Router, ActivatedRoute, RouterOutlet } from '@angular/router'; // Import ActivatedRoute
// import { Auth } from '../../../core/services';
// import { CommonModule } from '@angular/common';
// import { PostStatus } from '../../../shared';

// @Component({
//   selector: 'app-admin-layout',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet],
//   templateUrl: './admin-layout.html',
//   styleUrls: ['./admin-layout.scss'],
// })
// export class AdminLayoutComponent {
//   PostStatus = PostStatus;

//   constructor(private router: Router, 
//               private activatedRoute: ActivatedRoute, // Inject ActivatedRoute
//               public auth: Auth) {}

//   // Get the current logged-in user from the authentication service
//   get currentUser() {
//     return this.auth.getCurrentUser();
//   }

//   // Check if the current user is an admin
//   isAdmin(): boolean {
//     return this.auth.isAdmin();
//   }

//   // Logout functionality
//   logout() {
//     this.auth.logout();
//     this.router.navigate(['/auth/login']);
//   }

//   // Function to navigate to different pages with optional filters (PostStatus)
//   navigateTo(url: string, filter?: PostStatus) {
//     const queryParams = filter ? { filter } : {};
//     this.router.navigate([url], { 
//       relativeTo: this.activatedRoute, // Ensure relative navigation
//       queryParams 
//     });
//   }

//   // Function to set the filter for the posts page
//   setFilter(status?: PostStatus) {
//     const queryParams = status ? { filter: status } : {};
//     this.router.navigate(['/posts'], { queryParams });
//   }
// }

import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '../../../core/services';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatIconModule],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss']
})
export class AdminLayoutComponent {
  constructor(private router: Router, public auth: Auth) {}

  get currentUser() {
    return this.auth.getCurrentUser();
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  isSuperAdmin(): boolean {
    return this.auth.isSuperAdmin();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
