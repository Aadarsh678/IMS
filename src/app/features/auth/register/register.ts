import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { Auth } from "../../../core/services/auth"
import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./register.html",
  styleUrls: ["./register.scss"],
})
export class Register {
  form: FormGroup
  loading = false
  error: string | null = null

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
  ) {
    this.form = this.fb.group(
      {
        username: ["", [Validators.required, Validators.minLength(3)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    )
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get("password")?.value
    const confirmPassword = group.get("confirmPassword")?.value
    return password === confirmPassword ? null : { passwordMismatch: true }
  }

  onSubmit(): void {
    if (this.form.invalid) return

    this.loading = true
    this.error = null

    this.authService.register(this.form.value.username, this.form.value.email, this.form.value.password).subscribe({
      next: () => {
        this.router.navigate(["/posts"])
      },
      error: (err) => {
        this.error = err.error.message || "Registration failed"
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

  getPasswordMismatchError(): boolean {
    return (this.form.hasError("passwordMismatch") && this.form.get("confirmPassword")?.touched) || false
  }
}
