import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, Router } from "@angular/router"
import { RouterLink } from "@angular/router"
import { PostService,CommentService } from "../../../core/services"
import { Post} from "../../../shared"
import { PostComment } from "../../../shared"
import { Comments } from "../comments/comments"


@Component({
  selector: "app-post-details",
  standalone: true,
  imports: [CommonModule, RouterLink, Comments],
  templateUrl: "./details.html",
  styleUrls: ["./details.scss"],
})
export class Details implements OnInit {
  post: Post | null = null
  loading = true
  postId = 0

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = params["id"]
      this.loadPost()
    })
  }

  loadPost(): void {
    this.postService.getUserPosts().subscribe({
      next: (posts) => {
        this.post = posts.find((p) => p.id === this.postId) || null
        if (this.post) {
          this.loadComments()
        } else {
          this.loading = false
        }
      },
      error: (err) => {
        console.error("Error loading post:", err)
        this.loading = false
      },
    })
  }

  loadComments(): void {
    if (!this.post) return

    this.commentService.getCommentsByPost(this.post.id).subscribe({
      next: (comments) => {
        if (this.post) {
          this.post.comments = comments
        }
        this.loading = false
      },
      error: (err) => {
        console.error("Error loading comments:", err)
        this.loading = false
      },
    })
  }

  onCommentAdded(comment: PostComment): void {
    if (this.post) {
      if (!this.post.comments) {
        this.post.comments = []
      }
      this.post.comments.push(comment)
    }
  }

  submitPost(): void {
    if (this.post) {
      this.postService.submitPost({ id: this.post.id }).subscribe({
        next: (updated) => {
          this.post = updated
        },
        error: (err) => console.error("Error submitting post:", err),
      })
    }
  }

  closePost(): void {
    if (this.post) {
      this.postService.closePost({ id: this.post.id }).subscribe({
        next: (updated) => {
          this.post = updated
        },
        error: (err) => console.error("Error closing post:", err),
      })
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString()
  }
}
