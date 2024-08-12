import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <a [routerLink]="['/']" class="app-title">
          <span class="app-title-text">Todo-list</span>
        </a>
      </header>
      <section class="app-content">
        <div class="content-container">
          <router-outlet></router-outlet>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
