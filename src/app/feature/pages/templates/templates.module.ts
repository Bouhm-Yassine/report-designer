import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './components/section/section.component';
import { DesignContainerComponent } from './components/design-container/design-container.component';
import { RouterModule, Routes } from '@angular/router';
import { TitleComponent } from './components/title/title.component';

const routes: Routes = [
  {
    path: '',
    component: DesignContainerComponent,
  },
];

@NgModule({
  declarations: [SectionComponent, DesignContainerComponent, TitleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TemplatesModule { }
