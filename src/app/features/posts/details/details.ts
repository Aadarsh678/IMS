// import { Component, OnInit } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { ActivatedRoute, Router } from "@angular/router";
// import { RouterLink } from "@angular/router";
// import { PostService, CommentService, Auth } from "../../../core/services";
// import { Post, PostType, PostUpdateRequest } from "../../../shared";
// import { PostComment } from "../../../shared";
// import { Comments } from "../comments/comments";
// import { FormsModule } from "@angular/forms";
// import { MatIcon } from "@angular/material/icon";

// @Component({
//   selector: "app-post-details",
//   standalone: true,
//   imports: [CommonModule, RouterLink, Comments, FormsModule],
//   templateUrl: "./details.html",
//   styleUrls: ["./details.scss"],
// })
// export class Details implements OnInit {
//   post: Post | null = null;
//   loading = true;
//   postId = 0;
//   currentUserId: number | null = null;
//   updatedTitle: string = '';
//   updatedDescription: string = '';
//   updatedPostType: PostType = PostType.ISSUE;
//   postTypes: PostType[] = Object.values(PostType);  // Get enum values for select options
//   isUpdatePopupVisible: boolean = false; // Flag to control visibility of update popup

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private postService: PostService,
//     private commentService: CommentService,
//     private authService: Auth
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.postId = params["id"];
//       this.loadPost();
//     });
//     this.currentUserId = this.authService.getCurrentUserId();
//   }

//   loadPost(): void {
//     this.loading = true;
//     this.postService.getPostById(this.postId).subscribe({
//       next: (post: Post) => {
//         this.post = post;
//         this.updatedTitle = post.title || '';  // Initialize updated values
//         this.updatedDescription = post.description || '';
//         this.updatedPostType = post.postType || ''; 
//         this.loadComments();
//       },
//       error: (err: any) => {
//         console.error("Error loading post:", err);
//         this.post = null;
//         this.loading = false;
//       }
//     });
//   }

//   loadComments(): void {
//     if (!this.post) return;

//     this.commentService.getCommentsByPost(this.post.id).subscribe({
//       next: (comments) => {
//         if (this.post) {
//           this.post.comments = comments;
//         }
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error("Error loading comments:", err);
//         this.loading = false;
//       }
//     });
//   }

//   onCommentAdded(comment: PostComment): void {
//     if (this.post) {
//       if (!this.post.comments) {
//         this.post.comments = [];
//       }
//       this.post.comments.push(comment);
//     }
//   }

//   submitPost(): void {
//     if (this.post) {
//       this.postService.submitPost({ id: this.post.id }).subscribe({
//         next: (updated) => {
//           this.post = updated;
//         },
//         error: (err) => console.error("Error submitting post:", err),
//       });
//     }
//   }

//   closePost(): void {
//     if (this.post) {
//       this.postService.closePost({ id: this.post.id }).subscribe({
//         next: (updated) => {
//           this.post = updated;
//         },
//         error: (err) => console.error("Error closing post:", err),
//       });
//     }
//   }

//   deletePost(id: number): void {
//     if (confirm("Are you sure you want to delete this Post?")) {
//       this.postService.deletePost(id).subscribe({
//         next: () => {
//           this.router.navigate(['/posts']);
//         },
//         error: (err) => console.error("Error deleting post:", err),
//       });
//     }
//   }

//   canDeletePost(post: Post): boolean {
//     return this.currentUserId === post.createdBy || this.authService.isAdmin();
//   }

//   formatDate(date: string): string {
//     return new Date(date).toLocaleDateString();
//   }

//   // Show update popup and initialize updated values
//   openUpdatePopup(): void {
//     if (this.post) {
//       this.updatedTitle = this.post.title;
//       this.updatedDescription = this.post.description;
//       this.updatedPostType = this.post.postType;
//       this.isUpdatePopupVisible = true;
//     }
//   }

//   // Hide the update popup
//   closeUpdatePopup(): void {
//     this.isUpdatePopupVisible = false;
//   }


  
//   // Update the post with the new values
//   updatePost(): void {
//     if (this.post) {
//       const updatedPost: PostUpdateRequest = {
//         title: this.updatedTitle || this.post.title,
//         description: this.updatedDescription || this.post.description,
//         postType: this.updatedPostType || this.post.postType,
//       };

//       this.postService.updatePost(this.post.id, updatedPost).subscribe({
//         next: (updated) => {
//           this.post = updated;
//           this.closeUpdatePopup();  // Close the popup after successful update
//         },
//         error: (err) => console.error("Error updating post:", err),
//       });
//     }
//   }
// }
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterLink } from "@angular/router";
import { PostService, CommentService, Auth } from "../../../core/services";
import { Post, PostType, PostUpdateRequest } from "../../../shared";
import { PostComment } from "../../../shared";
import { Comments } from "../comments/comments";
import { FormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef

@Component({
  selector: "app-post-details",
  standalone: true,
  imports: [CommonModule, RouterLink, Comments, FormsModule],
  templateUrl: "./details.html",
  styleUrls: ["./details.scss"],
})
export class Details implements OnInit {
  post: Post | null = null;
  loading = true;
  postId = 0;
  currentUserId: number | null = null;
  updatedTitle: string = '';
  updatedDescription: string = '';
  updatedPostType: PostType = PostType.ISSUE;
  postTypes: PostType[] = Object.values(PostType);
  isUpdatePopupVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService,
    private authService: Auth,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef to force change detection
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = params["id"];
      this.loadPost();
    });
    this.currentUserId = this.authService.getCurrentUserId();
  }

  loadPost(): void {
    this.loading = true;
    this.postService.getPostById(this.postId).subscribe({
      next: (post: Post) => {
        this.post = post;
        this.updatedTitle = post.title ?? '';
        this.updatedDescription = post.description ?? '';
        this.updatedPostType = post.postType ?? PostType.ISSUE; 
        this.loadComments();
      },
      error: (err: any) => {
        console.error("Error loading post:", err);
        this.post = null;
        this.loading = false;
      }
    });
  }

  loadComments(): void {
    if (!this.post) return;

    this.commentService.getCommentsByPost(this.post.id).subscribe({
      next: (comments) => {
        if (this.post) {
          this.post.comments = comments ?? [];  // Safe default to empty array if undefined
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading comments:", err);
        this.loading = false;
      }
    });
  }

  onCommentAdded(comment: PostComment): void {
    if (this.post) {
      if (!this.post.comments) {
        this.post.comments = [];
      }
      this.post.comments.push(comment);
    }
  }

  onCommentUpdated(updatedComment: PostComment): void {
  if (this.post?.comments) {
    const index = this.post.comments.findIndex(c => c.id === updatedComment.id);
    if (index > -1) {
      // Replace the comment in the parent's array
      this.post.comments = [
        ...this.post.comments.slice(0, index),
        updatedComment,  // Update the comment with the new one
        ...this.post.comments.slice(index + 1)
      ];
      this.cdr.detectChanges();  // Ensure the change is reflected in the UI
    }
  }
}


  submitPost(): void {
    if (this.post) {
      this.postService.submitPost({ id: this.post.id }).subscribe({
        next: (updated) => {
          this.post = updated;
        },
        error: (err) => console.error("Error submitting post:", err),
      });
    }
  }

  closePost(): void {
    if (this.post) {
      this.postService.closePost({ id: this.post.id }).subscribe({
        next: (updated) => {
          this.post = updated;
        },
        error: (err) => console.error("Error closing post:", err),
      });
    }
  }

  deletePost(id: number): void {
    if (confirm("Are you sure you want to delete this Post?")) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.router.navigate(['/posts']);
        },
        error: (err) => console.error("Error deleting post:", err),
      });
    }
  }

  canDeletePost(post: Post): boolean {
    return this.currentUserId === post.createdBy || this.authService.isAdmin();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  openUpdatePopup(): void {
    if (this.post) {
      this.updatedTitle = this.post.title;
      this.updatedDescription = this.post.description;
      this.updatedPostType = this.post.postType;
      this.isUpdatePopupVisible = true;
    }
  }

  closeUpdatePopup(): void {
    this.isUpdatePopupVisible = false;
  }

  updatePost(): void {
    if (this.post) {
      const updatedPost: PostUpdateRequest = {
        title: this.updatedTitle || this.post.title,
        description: this.updatedDescription || this.post.description,
        postType: this.updatedPostType || this.post.postType,
      };

      this.postService.updatePost(this.post.id, updatedPost).subscribe({
        next: (updated) => {
          this.post = updated;
          this.closeUpdatePopup();  // Close the popup after successful update
        },
        error: (err) => console.error("Error updating post:", err),
      });
    }
  }
}
