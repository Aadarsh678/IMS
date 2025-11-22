import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../core/services';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout {
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

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
