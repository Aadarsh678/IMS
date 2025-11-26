import { Component, OnInit } from '@angular/core';
import { PostService, AdminService, Auth } from '../../../core/services';
import { Router, RouterLink } from '@angular/router';
import { Post, PostStatus } from '../../../shared';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-approve-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './approve.html',
  styleUrls: ['./approve.scss']
})
export class Approve implements OnInit {
  posts: Post[] = [];  // Change this from Post | null to Post[]
  postId: number = 0;  // Assuming you will pass or determine the postId
  loading: boolean = true;
  error: string = '';

  constructor(
    private postService: PostService,
    private router: Router,
    private authService: Auth,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadSubmittedPosts();
  }

  loadSubmittedPosts(): void {
    this.loading = true;
    this.adminService.getAllSubmittedPosts().subscribe({
      next: (data: Post[]) => {  // Explicitly type the response as Post[]
        this.posts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.error = 'Failed to load submitted posts.';
        this.loading = false;
      }
    });
  }

  approvePost(postId: number): void {
    this.adminService.approvePost({ id: postId }).subscribe({
      next: (updated) => {
        // Handle successful approval
        this.loadSubmittedPosts(); // Reload the list after approving the post
      },
      error: (err) => {
        console.error('Error approving post:', err);
        alert('Failed to approve the post');
      }
    });
  }

  rejectPost(postId: number): void {
    this.adminService.rejectPost({ id: postId }).subscribe({
      next: (updated) => {
        this.loadSubmittedPosts(); // Reload the list after rejecting the post
      },
      error: (err) => {
        console.error('Error rejecting post:', err);
        alert('Failed to reject the post');
      }
    });
  }
  navigateTo(url: string, filter?: PostStatus) {
    const queryParams = filter ? { filter } : {};
    this.router.navigate([url], { queryParams });
  }
}
