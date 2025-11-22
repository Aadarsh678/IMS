import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../core/services';
import { Post, CreatePostRequest, PostStatus } from '../../shared/models';
import { Comments } from '../posts/comments/comments';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  imports: [ReactiveFormsModule, Comments],
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  postForm: FormGroup;
  filter: 'all' | PostStatus = 'all';
  PostStatus = PostStatus;

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filter = params['filter'] || 'all';
      this.loadPosts();
    });
  }

  loadPosts() {
    if (this.filter === 'all' || this.filter === PostStatus.APPROVED) {
      this.postService.getAllApprovedPosts().subscribe({
        next: res => this.posts = res,
        error: err => console.error(err)
      });
    } else {
      this.postService.getUserPosts().subscribe({
        next: res => {
          this.posts = res.filter(p => p.status === this.filter);
        },
        error: err => console.error(err)
      });
    }
  }

  addPost() {
    if (this.postForm.invalid) return;

    const req: CreatePostRequest = this.postForm.value;
    this.postService.createPost(req).subscribe({
      next: () => {
        this.postForm.reset();
        this.loadPosts();
      },
      error: err => console.error(err)
    });
  }
}
