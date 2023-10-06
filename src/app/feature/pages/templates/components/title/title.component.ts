import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
    <h1 [ngClass]="isSubtitle ? 'subtitle' : 'title'">{{name}}</h1>
    <ng-content></ng-content>
  `,
  styles: [`
    .title {
      margin-left: 30px;
      font-size: 20px
    }
    .subtitle {
      margin-left: 60px;
      font-size: 15px
    }
  `]
})
export class TitleComponent {
  @Input() name!: string;
  @Input() isSubtitle: boolean = false;
}
