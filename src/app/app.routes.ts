import type { Routes } from "@angular/router";
import { authGuard, adminGuard } from "./core/guards";
import { Login } from "./features/auth/login/login";
import { Register } from "./features/auth/register/register";
import { List } from "./features/posts/list/list";
import { Details } from "./features/posts/details/details";
import { Create } from "./features/posts/create/create";

export const routes: Routes = [
  // Default landing: redirect to login
  { path: "", redirectTo: "auth/login", pathMatch: "full" },

  // Authentication routes
  {
    path: "auth",
    children: [
      { path: "login", component: Login },
      { path: "register", component: Register },
    ],
  },

  // Posts routes (protected)
  {
    path: "posts",
    canActivate: [authGuard],
    children: [
      { path: "", component: List },           // /posts
      { path: "create", component: Create },   // /posts/create
      { path: ":id", component: Details },     // /posts/123
    ],
  },

  // Example for future admin routes
  // {
  //   path: "admin",
  //   canActivate: [adminGuard],
  //   children: [
  //     { path: "approve", component: ApprovePosts },
  //     { path: "promote", component: PromoteUser },
  //   ],
  // },

  // Catch-all: redirect to login
  { path: "**", redirectTo: "auth/login" },
];
