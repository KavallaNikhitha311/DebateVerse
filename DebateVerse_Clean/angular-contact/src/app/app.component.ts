import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header style="border-bottom: 1px solid var(--border-light); padding: 1rem 0; background: #fff;">
      <div style="max-width: 860px; margin: 0 auto; padding: 0 1rem; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: #4F46E5; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #FFFFFF;">D</div>
          <span style="font-weight: bold; font-size: 1.15rem; color: #0F172A;">DebateVerse <span style="color: #64748B; font-weight: normal; font-size: 0.85rem;">&bull; Feedback</span></span>
        </div>
        <a href="http://localhost:5173" style="text-decoration: none; color: #475569; font-size: 0.85rem; padding: 6px 12px; border: 1px solid #E2E8F0; border-radius: 8px; background: #F8FAFC;">&larr; Back to DebateVerse App</a>
      </div>
    </header>

    <main style="padding: 3rem 1rem; background-color: #F8FAFC; min-height: 80vh;">
      <div style="max-width: 680px; margin: 0 auto;">
        <app-contact-form></app-contact-form>
      </div>
    </main>

    <footer style="border-top: 1px solid var(--border-light); padding: 2rem 0; text-align: center; color: var(--text-muted); font-size: 0.85rem; background: #fff;">
      DebateVerse Community Feedback Module
    </footer>
  `
})
export class AppComponent {}
