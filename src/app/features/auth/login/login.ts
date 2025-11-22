import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { Auth } from "../../../core/services/auth"
import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: "./login.html",
  styleUrls: ["./login.scss"],
})
export class Login {
  form: FormGroup
  loading = false
  error: string | null = null

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(): void {
    if (this.form.invalid) return

    this.loading = true
    this.error = null

    this.authService.login(this.form.value.email, this.form.value.password).subscribe({
      next: () => {
        this.router.navigate(["/posts"])
      },
      error: (err) => {
        this.error = "Invalid email or password"
        this.loading = false
      },
    })
  }

  getFieldError(fieldName: string): string | null {
    const field = this.form.get(fieldName)
    if (!field || !field.errors || !field.touched) return null

    if (field.errors["required"]) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
    if (field.errors["email"]) return "Invalid email format"
    if (field.errors["minlength"])
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors["minlength"].requiredLength} characters`

    return null
  }
}
