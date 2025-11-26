// import { Routes } from "@angular/router";
// import { authGuard, adminGuard } from "./core/guards";  // Import your guards
// import { Login } from "./features/auth/login/login";
// import { Register } from "./features/auth/register/register";
// import { Layout } from "./features/layout/layout"; // Regular user layout
// import { HomeComponent } from "./features/home/home"; // The Home component to be used in both layouts
// import { List } from "./features/posts/list/list";
// import { Create } from "./features/posts/create/create";
// import { Details } from "./features/posts/details/details";
// import { AdminLayoutComponent } from "./features/admin/admin_layout/admin-layout"; // Admin layout
// import { AdminDashboardComponent } from "./features/admin/dashboard/dashboard"; // Admin Dashboard
// import { Approve } from "./features/admin/approve/approve"; // Admin Approve Posts component

// export const routes: Routes = [
//   // Default route (redirect to home)
//   { path: '', redirectTo: 'home', pathMatch: 'full' },

//   // Authentication routes
//   {
//     path: 'auth',
//     children: [
//       { path: 'login', component: Login },
//       { path: 'register', component: Register },
//     ],
//   },

//   // Main app layout (User routes)
//   {
//     path: '',
//     component: Layout,
//     canActivate: [authGuard],  // Ensure user is authenticated
//     children: [
//       { path: 'home', component: HomeComponent }, // User home route
//       { path: 'posts', children: [
//         { path: '', component: List },        // List all posts
//         { path: 'create', component: Create }, // Create new post
//         { path: ':id', component: Details },  // View post details by id
//       ]},
//     ]
//   },

//   // Admin routes (protected by adminGuard)
//   {
//     path: 'admin',
//     component: AdminLayoutComponent, // Admin layout for all admin routes
//     canActivate: [adminGuard], // Only admins can access
//     children: [
//       { path: 'home', component: HomeComponent },  // Use the same HomeComponent in admin layout
//       { path: 'dashboard', component: AdminDashboardComponent }, // Admin Dashboard
//       { path: 'approve', component: Approve },
//       { path: 'details/:id', component: Details },
//       { path: 'posts', children: [
//         { path: '', component: List },        // List all posts
//         { path: 'create', component: Create }, // Create new post
//         { path: ':id', component: Details },  // View post details by id
//       ]}
//     ],
//   },

//   // Catch-all: redirect unknown routes to login
//   { path: '**', redirectTo: 'auth/login' }
// ];
import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards';  // Import your guards
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Layout } from './features/layout/layout';  // Regular user layout
import { HomeComponent } from './features/home/home';  // The Home component to be used in both layouts
import { List } from './features/posts/list/list';
import { Create } from './features/posts/create/create';
import { Details } from './features/posts/details/details';
import { AdminLayoutComponent } from './features/admin/admin_layout/admin-layout';  // Admin layout
import { AdminDashboardComponent } from './features/admin/dashboard/dashboard';  // Admin Dashboard
import { Approve } from './features/admin/approve/approve'; 
import { ManageUsersComponent } from './features/admin/manage_user/manage_user';

export const routes: Routes = [
  // Default route (redirect to home)
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Authentication routes
  {
    path: 'auth',
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },

  // Main app layout (User routes)
  {
    path: '',
    component: Layout,  // Regular user layout
    canActivate: [authGuard],  // Ensure user is authenticated
    children: [
      { path: 'home', component: HomeComponent },  // User home route
      { path: 'posts', children: [
        { path: '', component: List },        // List all posts for user
        { path: 'create', component: Create }, // Create new post for user
        { path: ':id', component: Details },  // View post details by id for user
      ]},
    ]
  },

  // Admin routes (protected by adminGuard)
  {
    path: 'admin',
    component: AdminLayoutComponent,  // Admin layout for all admin routes
    canActivate: [adminGuard], // Only admins can access
    children: [
      { path: 'home', component: HomeComponent },  // Admin home route
      { path: 'dashboard', component: AdminDashboardComponent },  // Admin Dashboard
      { path: 'approve', component: Approve },  // Admin approve posts route
      {path:'manageUser', component: ManageUsersComponent},
      { path: 'posts', children: [
        { path: '', component: List },        // List all posts for admin
        { path: 'create', component: Create }, // Create new post for admin
        { path: ':id', component: Details },  // View post details by id for admin
      ]},
    ],
  },

  // Catch-all: redirect unknown routes to login
  { path: '**', redirectTo: 'auth/login' }
];
