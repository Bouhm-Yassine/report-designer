import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCommand } from '../../commands/add.command';
import { CommandManager } from '../../commands/command-manager';

@Component({
  selector: 'app-design-container',
  templateUrl: './design-container.component.html',
})
export class DesignContainerComponent {
  reportForm!: FormGroup;
  private commandManager: CommandManager = new CommandManager(); // Create a new CommandManager

  apiReport = {
    "sections": [
      {
        "name": "S1",
        "titles": [
          {
            "name": "T1",
            "subtitles": [
              {
                "name": "ST1"
              }
            ]
          }
        ]
      },
      {
        "name": "S2",
        "titles": [
          {
            "name": "T2",
            "subtitles": [
              {
                "name": "ST2"
              }
            ]
          }
        ]
      }
    ]
  }

  constructor(private fb: FormBuilder) {
    this.buildReportForm()
    this.patchReportForm()
  }

  buildReportForm() {
    this.reportForm = this.fb.group({
      sections: this.fb.array([])
    });
  }

  patchReportForm() {
    const sectionsArray = this.reportForm.get('sections') as FormArray;

    for (const section of this.apiReport.sections) {
      const newSection = this.fb.group({
        name: section.name,
        titles: this.fb.array([])
      });

      const titlesArray = newSection.get('titles') as FormArray;

      for (const title of section.titles) {
        const newTitle = this.fb.group({
          name: title.name,
          subtitles: this.fb.array([])
        });

        const subtitlesArray = newTitle.get('subtitles') as FormArray;

        for (const subtitle of title.subtitles) {
          const newSubtitle = this.fb.group({
            name: subtitle.name
          });

          subtitlesArray.push(newSubtitle);
        }

        titlesArray.push(newTitle);
      }

      sectionsArray.push(newSection);
    }
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
    const newSection = this.fb.group({
      name: ['', Validators.required],
      titles: this.fb.array([])
    })

    let addCommand = new AddCommand(this.getSections(), newSection);
    this.commandManager.execute(addCommand);
  }

  addTitle(sectionIndex: number) {
    const newTitle = this.fb.group({
      name: ['', Validators.required],
      subtitles: this.fb.array([])
    })

    const addCommand = new AddCommand(this.getTitles(sectionIndex), newTitle);
    this.commandManager.execute(addCommand);
  }

  addSubtitle(sectionIndex: number, titleIndex: number) {
    const newSubtitle = this.fb.group({
      name: ['', Validators.required]
    })

    const addCommand = new AddCommand(this.getSubtitles(sectionIndex, titleIndex), newSubtitle);
    this.commandManager.execute(addCommand);
  }

  submitForm() {
    console.log('==== FORM', this.reportForm.value)
  }


  undo() {
    this.commandManager.undo()
  }

  redo() {
    this.commandManager.redo()
  }

}
