import { FormArray } from "@angular/forms";
import { Command } from "./command.interface";

export class AddCommand implements Command {
  constructor(
    private formArray: FormArray,
    private componentData: any
  ) { }

  do() {
    console.log('===== FORM ARRAY', this.formArray)
    this.formArray.push(this.componentData);
  }

  undo() {
    this.formArray.removeAt(this.formArray.length - 1);
  }
}
