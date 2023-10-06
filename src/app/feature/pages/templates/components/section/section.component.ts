import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  template: `
    <div class="section">
      <h1 class="title">{{title}}</h1>

      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .section {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px;
    }
    .title {
      font-size: 25px
    }
  `]
})
export class SectionComponent {
  @Input() title!: string;
}

