// import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { CommentService } from "../../../core/services";
// import { PostComment } from "../../../shared";
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef

// @Component({
//   selector: "app-comments",
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
//   templateUrl: "./comments.html",
//   styleUrls: ["./comments.scss"],
// })
// export class Comments implements OnInit {
//   @Input() postId!: number;
//   @Output() commentAdded = new EventEmitter<PostComment>();
//   @Output() commentUpdated = new EventEmitter<PostComment>();
  
//   addForm: FormGroup;        // Form for adding a new comment
//   editForm: FormGroup;       // Form for editing a comment
//   comments: PostComment[] = [];
//   visibleComments: PostComment[] = [];
//   loading = false;
//   showAllComments = false;
  
//   isEditMode: boolean = false;         // Flag to track edit mode
//   editingComment: PostComment | null = null; // Current comment being edited

//   constructor(
//     private fb: FormBuilder,
//     private commentService: CommentService,
//     private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
//   ) {
//     // Form for adding a new comment
//     this.addForm = this.fb.group({
//       content: ["", [Validators.required, Validators.minLength(5)]],
//     });

//     // Form for editing a comment
//     this.editForm = this.fb.group({
//       content: ["", [Validators.required, Validators.minLength(5)]],
//     });
//   }

//   ngOnInit(): void {
//     this.loadComments();
//   }

//   loadComments(): void {
//     this.commentService.getCommentsByPost(this.postId).subscribe({
//       next: (data) => {
//         this.comments = data;
//         this.updateVisibleComments();
//       },
//       error: (err) => console.error("Error loading comments:", err),
//     });
//   }

//   onSubmitAddComment(): void {
//     if (this.addForm.invalid || !this.postId) return;

//     this.loading = true;

//     this.commentService
//       .addComment({
//         content: this.addForm.value.content,
//         postId: this.postId,
//       })
//       .subscribe({
//         next: (comment) => {
//           this.comments.push(comment);
//           this.commentAdded.emit(comment);
//           this.addForm.reset();
//           this.loading = false;
//           this.updateVisibleComments();
//           this.cdr.markForCheck(); // Trigger change detection
//         },
//         error: (err) => {
//           console.error("Error adding comment:", err);
//           this.loading = false;
//         },
//       });
//   }

//   onSubmitEditComment(): void {
//     if (this.editForm.invalid || !this.editingComment) return;

//     this.loading = true;

//     this.commentService
//       .updateComment(this.editingComment.id, { content: this.editForm.value.content })
//       .subscribe({
//         next: (updatedComment) => {
//           const index = this.comments.findIndex(c => c.id === updatedComment.id);
//           if (index > -1) {
//             this.comments[index] = updatedComment;
//             this.commentUpdated.emit(updatedComment); // Emit the updated comment
//             this.cancelEdit();
//           }
//           this.loading = false;
//         },
//         error: (err) => {
//           console.error("Error updating comment:", err);
//           this.loading = false;
//         },
//       });
//   }

//   deleteComment(id: number): void {
//     if (confirm("Are you sure you want to delete this comment?")) {
//       this.commentService.deleteComment(id).subscribe({
//         next: () => {
//           this.comments = this.comments.filter((c) => c.id !== id);
//           this.updateVisibleComments();
//         },
//         error: (err) => console.error("Error deleting comment:", err),
//       });
//     }
//   }

//   updateVisibleComments(): void {
//     this.visibleComments = this.showAllComments ? this.comments : this.comments.slice(0, 2);
//   }

//   toggleComments(): void {
//     this.showAllComments = !this.showAllComments;
//     this.updateVisibleComments();
//   }

//   formatDate(date: string): string {
//     return new Date(date).toLocaleDateString();
//   }

//   // Start editing a comment
//   editComment(comment: PostComment): void {
//     this.isEditMode = true;
//     this.editingComment = comment;
//     this.editForm.setValue({ content: comment.content });
//   }

//   // Cancel the edit mode
//   cancelEdit(): void {
//     this.isEditMode = false;
//     this.editingComment = null;
//     this.editForm.reset();
//   }

//   getFieldError(fieldName: string): string | null {
//     const field = this.addForm.get(fieldName) || this.editForm.get(fieldName);
//     if (!field || !field.errors || !field.touched) return null;

//     if (field.errors["required"]) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
//     if (field.errors["minlength"])
//       return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors["minlength"].requiredLength} characters`;

//     return null;
//   }
// }
import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommentService } from "../../../core/services";
import { PostComment } from "../../../shared";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';  

@Component({
  selector: "app-comments",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: "./comments.html",
  styleUrls: ["./comments.scss"],
})
export class Comments implements OnInit {
  @Input() postId!: number;
  @Output() commentAdded = new EventEmitter<PostComment>();
  @Output() commentUpdated = new EventEmitter<PostComment>();  // Emit updated comment to parent

  addForm: FormGroup;
  editForm: FormGroup;
  comments: PostComment[] = [];
  visibleComments: PostComment[] = [];
  loading = false;
  showAllComments = false;
  
  isEditMode: boolean = false;
  editingComment: PostComment | null = null;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {
    this.addForm = this.fb.group({
      content: ["", [Validators.required, Validators.minLength(5)]],
    });

    this.editForm = this.fb.group({
      content: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getCommentsByPost(this.postId).subscribe({
      next: (data) => {
        this.comments = data ?? [];  // Safe default to an empty array if data is undefined
        this.updateVisibleComments();
      },
      error: (err) => console.error("Error loading comments:", err),
    });
  }

  onSubmitAddComment(): void {
    if (this.addForm.invalid || !this.postId) return;

    this.loading = true;

    this.commentService
      .addComment({
        content: this.addForm.value.content,
        postId: this.postId,
      })
      .subscribe({
        next: (comment) => {
          this.comments?.push(comment);  // Use safe optional chaining
          this.commentAdded.emit(comment);
          this.addForm.reset();
          this.loading = false;
          this.updateVisibleComments();
          this.cdr.detectChanges();  // Trigger change detection in parent
        },
        error: (err) => {
          console.error("Error adding comment:", err);
          this.loading = false;
        },
      });
  }

  onSubmitEditComment(): void {
  if (this.editForm.invalid || !this.editingComment) return;

  this.loading = true;

  this.commentService
    .updateComment(this.editingComment.id, { content: this.editForm.value.content })
    .subscribe({
      next: (updatedComment) => {
        const index = this.comments.findIndex(c => c.id === updatedComment.id);

        if (index > -1) {
          // Replace the comment in the array (immutable update)
          this.comments = [
            ...this.comments.slice(0, index),
            updatedComment,  // Update the comment with the new one
            ...this.comments.slice(index + 1)
          ];

          this.commentUpdated.emit(updatedComment);  // Emit the updated comment to the parent
          this.cancelEdit();
        }

        this.loading = false;

        // Manually trigger change detection
        this.cdr.detectChanges();  // Ensure the change is reflected in the UI
      },
      error: (err) => {
        console.error("Error updating comment:", err);
        this.loading = false;
      },
    });
}


  deleteComment(id: number): void {
    if (confirm("Are you sure you want to delete this comment?")) {
      this.commentService.deleteComment(id).subscribe({
        next: () => {
          this.comments = this.comments.filter((c) => c.id !== id);
          this.updateVisibleComments();
        },
        error: (err) => console.error("Error deleting comment:", err),
      });
    }
  }

  updateVisibleComments(): void {
    this.visibleComments = this.showAllComments ? this.comments : this.comments.slice(0, 2);
  }

  toggleComments(): void {
    this.showAllComments = !this.showAllComments;
    this.updateVisibleComments();
    this.cdr.detectChanges();  // Trigger change detection when comments visibility changes
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  editComment(comment: PostComment): void {
    this.isEditMode = true;
    this.editingComment = comment;
    this.editForm.setValue({ content: comment.content });
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.editingComment = null;
    this.editForm.reset();
  }

  getFieldError(fieldName: string): string | null {
    const field = this.addForm.get(fieldName) || this.editForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return null;

    if (field.errors["required"]) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    if (field.errors["minlength"])
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors["minlength"].requiredLength} characters`;

    return null;
  }
}
