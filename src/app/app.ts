import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './core/services';
import { User } from './shared';
import { RouterModule } from '@angular/router'; 
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,MatIconModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private router: Router, private auth: Auth) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
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
