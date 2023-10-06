import { Component } from '@angular/core';

@Component({
  selector: 'app-design-container',
  templateUrl: './design-container.component.html',
  styleUrls: ['./design-container.component.scss']
})
export class DesignContainerComponent {
  report = {
    sections: [
      {
        name: 'Section 1',
        titles: [
          {
            name: 'Title 1.1',
            subtitles: [
              { name: 'Subtitle 1.1.1' },
              { name: 'Subtitle 1.1.2' }
            ]
          }
        ]
      }
    ]
  };
}
