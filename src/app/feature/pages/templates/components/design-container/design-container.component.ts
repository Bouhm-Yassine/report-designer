import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AddCommand } from '../../commands/add.command';
import { CommandManager } from '../../commands/command-manager';

@Component({
  selector: 'app-design-container',
  templateUrl: './design-container.component.html',
})
export class DesignContainerComponent {
  reportForm: FormGroup;
  private commandManager: CommandManager = new CommandManager(); // Create a new CommandManager

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
    const newSection = this.fb.group({
      name: [''],
      titles: this.fb.array([])
    })

    let addCommand = new AddCommand(this.getSections(), newSection);
    this.commandManager.execute(addCommand);
  }

  addTitle(sectionIndex: number) {
    const newTitle = this.fb.group({
      name: [''],
      subtitles: this.fb.array([])
    })

    const addCommand = new AddCommand(this.getTitles(sectionIndex), newTitle);
    this.commandManager.execute(addCommand);
  }

  addSubtitle(sectionIndex: number, titleIndex: number) {
    const newSubtitle = this.fb.group({
      name: ['']
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
