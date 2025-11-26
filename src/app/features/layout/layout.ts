import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../core/services';
import { CommonModule } from '@angular/common';
import { PostStatus } from '../../shared';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,CommonModule,MatIcon],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout {
PostStatus = PostStatus;
  constructor(private router: Router, public auth: Auth) {}

  // Use getter to access current user safely
  get currentUser() {
    return this.auth.getCurrentUser();
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

    navigateTo(url: string, filter?: PostStatus) {
  const queryParams = filter ? { filter } : {};
  this.router.navigate([url], { queryParams });
}

  setFilter(status?: PostStatus) {
    // Pass query param 'filter' only if status is provided
    const queryParams = status ? { filter: status } : {};
    this.router.navigate(['/posts'], { queryParams });
  }

}
