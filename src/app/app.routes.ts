// import { RouterModule, type Routes } from "@angular/router";
// import { authGuard, adminGuard } from "./core/guards";
// import { Login } from "./features/auth/login/login";
// import { Register } from "./features/auth/register/register";
// import { List } from "./features/posts/list/list";
// import { Details } from "./features/posts/details/details";
// import { Create } from "./features/posts/create/create";
// import { HomeComponent } from "./features/home/home";
// import { NgModule } from "@angular/core";

// export const routes: Routes = [
//   // Default landing: redirect to home
//   { path: '', redirectTo: '/home', pathMatch: 'full' },

//   // Home / feed (protected)
//   { path: 'home', component: HomeComponent, canActivate: [authGuard] },

//   // Authentication routes
//   {
//     path: 'auth',
//     children: [
//       { path: 'login', component: Login },
//       { path: 'register', component: Register },
//     ],
//   },

//   // Posts routes (protected)
//   {
//     path: 'posts',
//     canActivate: [authGuard],
//     children: [
//       { path: '', component: List },           // /posts
//       { path: 'create', component: Create },   // /posts/create
//       { path: ':id', component: Details },     // /posts/:id
//     ],
//   },

//   // Example for future admin routes (protected by adminGuard)
//   // {
//   //   path: 'admin',
//   //   canActivate: [adminGuard],
//   //   children: [
//   //     { path: 'approve', component: ApprovePosts },
//   //     { path: 'promote', component: PromoteUser },
//   //   ],
//   // },

//   // Catch-all: redirect unknown routes to login
//   { path: '**', redirectTo: '/auth/login' },
// ];
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
import { Routes } from "@angular/router";
import { authGuard } from "./core/guards";
import { Login } from "./features/auth/login/login";
import { Register } from "./features/auth/register/register";
import { Layout } from "./features/layout/layout";
import { HomeComponent } from "./features/home/home";
import { List } from "./features/posts/list/list";
import { Create } from "./features/posts/create/create";
import { Details } from "./features/posts/details/details";

export const routes: Routes = [
  // Default: redirect to home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Authentication
  {
    path: 'auth',
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },

  // Main app inside layout
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'posts', children: [
        { path: '', component: List },
        { path: 'create', component: Create },
        { path: ':id', component: Details },
      ]},
    ]
  },

  { path: '**', redirectTo: 'auth/login' }
];
