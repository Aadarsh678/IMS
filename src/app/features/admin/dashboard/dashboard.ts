import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services';
import { PostStatistics, PostStatus } from '../../../shared';
import { Router, RouterModule } from '@angular/router'; // Import Router

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [RouterModule, CommonModule],
  standalone: true, // Make this component standalone
})
export class AdminDashboardComponent implements OnInit {
  PostStatus = PostStatus;
  statistics: PostStatistics = {
    totalActiveUsers: 0,
    totalApprovedPosts: 0,
    totalRejectedPosts: 0,
    totalPendingPosts: 0,
    totalClosedPosts: 0
  };
  loading: boolean = true;
  error: string = '';

  constructor(
    private adminService: AdminService, 
    private router: Router // Inject Router service
  ) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (data: PostStatistics) => {
        this.statistics = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading dashboard stats:', err);
        this.error = 'Failed to load dashboard stats.';
        this.loading = false;
      }
    });
  }

  navigateTo(url: string, filter?: PostStatus) {
    const queryParams = filter ? { filter } : {};
    this.router.navigate([url], { queryParams });
  }
}
