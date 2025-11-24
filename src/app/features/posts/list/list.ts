import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink, ActivatedRoute } from "@angular/router"
import { PostService } from "../../../core/services"
import { Post, PostStatus } from "../../../shared"

@Component({
  selector: "app-posts-list",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./list.html",
  styleUrls: ["./list.scss"],
})
export class List implements OnInit {
  posts: Post[] = []
  loading = true
  filter?: PostStatus
  PostStatus = PostStatus

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const f = params['filter']
      this.filter = f && f !== 'all' ? (f as PostStatus) : undefined
      this.loadPosts()
    })
  }

  loadPosts(): void {
  this.loading = true;

  if (!this.filter) {
    // No filter → get all posts
    this.postService.getUserPosts().subscribe({
      next: allPosts => {
        this.posts = allPosts;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  } else {
    // Filter is set → fetch posts for that status
    let statusForApi = this.filter;

    // Map PENDING_APPROVAL to SUBMITTED if needed
    if (statusForApi === PostStatus.PENDING_APPROVAL) {
      statusForApi = PostStatus.PENDING_APPROVAL; // or 'SUBMITTED' depending on API
    }

    this.postService.getUserPosts(statusForApi).subscribe({
      next: filteredPosts => {
        this.posts = filteredPosts;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}




  deletePost(id: number): void {
    if (confirm("Are you sure you want to delete this post?")) {
      this.postService.deletePost(id).subscribe({
        next: () => this.posts = this.posts.filter(p => p.id !== id),
        error: err => console.error(err)
      })
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString()
  }
}
