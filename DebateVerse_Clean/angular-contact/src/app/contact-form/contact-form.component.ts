import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  template: `
    <div class="dv-card" style="padding: 2.5rem;">
      <div style="margin-bottom: 1.5rem; text-align: center;">
        <div class="dv-badge-primary" style="margin-bottom: 8px;">Community Feedback</div>
        <h2 style="margin: 4px 0 8px 0; color: #0F172A; font-weight: bold;">DebateVerse Feedback & Suggestions</h2>
        <p style="color: #64748B; font-size: 0.9rem; margin: 0;">
          Submit suggestions, topic proposals, or feedback directly to the team.
        </p>
      </div>

      <div *ngIf="submitSuccess" style="background: #DCFCE7; border: 1px solid #BBF7D0; color: #166534; padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; font-size: 0.9rem;">
        ✓ Thank you for reaching out! Your message was received and saved to the database.
      </div>

      <div *ngIf="submitError" style="background: #FEE2E2; border: 1px solid #FECACA; color: #991B1B; padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; font-size: 0.9rem;">
        {{ submitError }}
      </div>

      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" style="display: flex; flex-direction: column; gap: 1.25rem;">
        <!-- Name Field -->
        <div>
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 4px; color: #0F172A;">Your Name *</label>
          <input
            type="text"
            formControlName="name"
            class="dv-input"
            [class.is-invalid]="isFieldInvalid('name')"
            placeholder="e.g., Aarav Sharma"
          />
          <div *ngIf="isFieldInvalid('name')" class="error-text">
            Name is required (minimum 2 characters).
          </div>
        </div>

        <!-- Email Field -->
        <div>
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 4px; color: #0F172A;">Email Address *</label>
          <input
            type="email"
            formControlName="email"
            class="dv-input"
            [class.is-invalid]="isFieldInvalid('email')"
            placeholder="student@university.edu"
          />
          <div *ngIf="isFieldInvalid('email')" class="error-text">
            Please enter a valid email address.
          </div>
        </div>

        <!-- Subject Field -->
        <div>
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 4px; color: #0F172A;">Subject *</label>
          <input
            type="text"
            formControlName="subject"
            class="dv-input"
            [class.is-invalid]="isFieldInvalid('subject')"
            placeholder="e.g., Topic Suggestion: School Uniforms"
          />
          <div *ngIf="isFieldInvalid('subject')" class="error-text">
            Subject is required (minimum 4 characters).
          </div>
        </div>

        <!-- Message Field -->
        <div>
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 4px; color: #0F172A;">Message *</label>
          <textarea
            formControlName="message"
            rows="5"
            class="dv-input"
            [class.is-invalid]="isFieldInvalid('message')"
            placeholder="Enter your message or debate suggestion (minimum 10 characters)..."
          ></textarea>
          <div *ngIf="isFieldInvalid('message')" class="error-text">
            Message must be at least 10 characters long.
          </div>
        </div>

        <!-- Submit Button -->
        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px; margin-top: 8px;">
          <button type="button" (click)="onReset()" style="background: none; border: none; color: #64748B; cursor: pointer; font-size: 0.85rem;">Reset Form</button>
          <button type="submit" [disabled]="contactForm.invalid || isSubmitting" class="btn-dv-primary">
            {{ isSubmitting ? 'Sending Message...' : 'Submit Feedback' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required, Validators.minLength(4)]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    const formData = this.contactForm.value;

    this.http.post<any>('http://localhost:5000/api/feedback', formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = err.error?.message || 'Could not connect to DebateVerse server on http://localhost:5000.';
      }
    });
  }

  onReset(): void {
    this.contactForm.reset();
    this.submitSuccess = false;
    this.submitError = '';
  }
}
