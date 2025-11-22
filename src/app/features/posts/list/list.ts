import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { PostService } from "../../../core/services"
import { Post } from "../../../shared"

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

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts()
  }

  loadPosts(): void {
    this.postService.getAllApprovedPosts().subscribe({
      next: (data) => {
        this.posts = data
        this.loading = false
      },
      error: (err) => {
        console.error("Error loading posts:", err)
        this.loading = false
      },
    })
  }

  deletePost(id: number): void {
    if (confirm("Are you sure you want to delete this post?")) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter((p) => p.id !== id)
        },
        error: (err) => console.error("Error deleting post:", err),
      })
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString()
  }
}
