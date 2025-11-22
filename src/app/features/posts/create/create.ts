import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { PostService } from "../../../core/services"

@Component({
  selector: "app-create-post",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./create.html",
  styleUrls: ["./create.scss"],
})
export class Create {
  form: FormGroup
  loading = false
  error: string | null = null

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(5)]],
      description: ["", [Validators.required, Validators.minLength(10)]],
    })
  }

  onSubmit(): void {
    if (this.form.invalid) return

    this.loading = true
    this.error = null

    this.postService.createPost(this.form.value).subscribe({
      next: (post) => {
        this.router.navigate(["/posts", post.id])
      },
      error: (err) => {
        this.error = "Failed to create post"
        this.loading = false
      },
    })
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
