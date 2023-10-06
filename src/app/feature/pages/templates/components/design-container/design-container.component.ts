import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-design-container',
  templateUrl: './design-container.component.html',
})
export class DesignContainerComponent {
  reportForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      sections: this.fb.array([])
    });
  }

  getSections(): FormArray {
    return this.reportForm.get('sections') as FormArray;
  }

  getTitles(sectionIndex: number): FormArray {
    return (this.getSections().at(sectionIndex).get('titles') as FormArray);
  }

  getSubtitles(sectionIndex: number, titleIndex: number): FormArray {
    return (this.getTitles(sectionIndex).at(titleIndex).get('subtitles') as FormArray);
  }

  addSection() {
    this.getSections().push(this.fb.group({
      name: [''],
      titles: this.fb.array([
        this.fb.group({
          name: [''],
          subtitles: this.fb.array([])
        })
      ])
    }));
  }

  addTitle(sectionIndex: number) {
    const titles = this.getTitles(sectionIndex);
    titles.push(this.fb.group({
      name: [''],
      subtitles: this.fb.array([])
    }));
  }

  addSubtitle(sectionIndex: number, titleIndex: number) {
    const subtitles = this.getSubtitles(sectionIndex, titleIndex)
    subtitles.push(this.fb.group({
      name: ['']
    }));
  }

  submitForm() {
    console.log('==== FORM', this.reportForm.value)
  }

}
