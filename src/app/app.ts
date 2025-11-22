import { Component, OnInit } from "@angular/core"
import { RouterOutlet, Router, NavigationEnd } from "@angular/router"
import { CommonModule } from "@angular/common"
import { Auth } from "./core/services/auth"
import { User } from "./shared"
import { filter } from "rxjs"


@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./app.html",
  styleUrls: ["./app.scss"],
})
export class AppComponent implements OnInit {
  currentUser: User | null = null
  isAuthPage = false
  showMenu = false

  constructor(
    private authService: Auth,
    private router: Router,
  ) {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
    })
  }

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.isAuthPage = event.urlAfterRedirects.includes("auth")
    })
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/", "auth", "login"]) // Updated navigation path
  }

  navigateTo(route: string): void {
    this.showMenu = false
    this.router.navigate([route])
  }

  isAdmin(): boolean {
    return this.authService.isAdmin()
  }
}
