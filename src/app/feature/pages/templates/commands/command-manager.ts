import { Command } from './command.interface';

export class CommandManager {
  commands: Command[] = [];
  index: number = -1;

  execute(command: Command) {
    command.do();
    if (this.index < this.commands.length - 1) {
      this.commands.splice(this.index + 1);
    }
    this.commands.push(command);
    this.index++;
  }

  undo(): void {
    if (!this.isUndo()) return;
    console.log('============ INDEX', this.index, this.commands)
    this.commands[this.index--].undo();
  }

  redo(): void {
    if (!this.isRedo()) return;
    this.commands[this.index + 1].do();
    this.index++;
  }

  isUndo(): boolean {
    return this.commands.length > 0 && this.index > -1;
  }

  isRedo(): boolean {
    return this.index < this.commands.length - 1;
  }
}
