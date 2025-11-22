import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms"
import { CommentService } from "../../../core/services"
import { PostComment } from "../../../shared"

@Component({
  selector: "app-comments",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./comments.html",
  styleUrls: ["./comments.scss"],
})
export class Comments implements OnInit {
  @Input() postId!: number
  @Output() commentAdded = new EventEmitter<PostComment>()

  form: FormGroup
  comments: PostComment[] = []
  loading = false

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
  ) {
    this.form = this.fb.group({
      content: ["", [Validators.required, Validators.minLength(5)]],
    })
  }

  ngOnInit(): void {
    this.loadComments()
  }

  loadComments(): void {
    this.commentService.getCommentsByPost(this.postId).subscribe({
      next: (data) => {
        this.comments = data
      },
      error: (err) => console.error("Error loading comments:", err),
    })
  }

  onSubmit(): void {
    if (this.form.invalid || !this.postId) return

    this.loading = true

    this.commentService
      .addComment({
        content: this.form.value.content,
        postId: this.postId,
      })
      .subscribe({
        next: (comment) => {
          this.comments.push(comment)
          this.commentAdded.emit(comment)
          this.form.reset()
          this.loading = false
        },
        error: (err) => {
          console.error("Error adding comment:", err)
          this.loading = false
        },
      })
  }

  deleteComment(id: number): void {
    if (confirm("Are you sure you want to delete this comment?")) {
      this.commentService.deleteComment(id).subscribe({
        next: () => {
          this.comments = this.comments.filter((c) => c.id !== id)
        },
        error: (err) => console.error("Error deleting comment:", err),
      })
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString()
  }

  getFieldError(fieldName: string): string | null {
    const field = this.form.get(fieldName)
    if (!field || !field.errors || !field.touched) return null

    if (field.errors["required"]) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
    if (field.errors["minlength"])
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors["minlength"].requiredLength} characters`

    return null
  }
}
