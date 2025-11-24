import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../core/services';
import { Post, CreatePostRequest } from '../../shared/models';
import { Comments } from '../posts/comments/comments';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  imports: [ReactiveFormsModule, Comments, CommonModule],
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  postForm: FormGroup;

  constructor(
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPosts();
  }

  // Load only approved posts of all users
  loadPosts() {
    this.postService.getAllApprovedPosts().subscribe({
      next: res => this.posts = res,
      error: err => console.error('Error loading posts', err)
    });
  }

  // addPost() {
  //   if (this.postForm.invalid) return;

  //   const req: CreatePostRequest = this.postForm.value;
  //   this.postService.createPost(req).subscribe({
  //     next: () => {
  //       this.postForm.reset();
  //       this.loadPosts();
  //     },
  //     error: err => console.error(err)
  //   });
  // }

  // Placeholder for future post type filter
  filterByType(postType?: string) {
    console.log('Filter by post type:', postType);
    // TODO: Implement API call when post type filtering is added
  }
}
