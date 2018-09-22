export class Task {
  id: number;
  taskName: string;
  notes?: string;
  startDate: Date;
  terminationDate?: Date;

  get isActive(): boolean {
    if (this.terminationDate) {
      return this.terminationDate.getTime() > Date.now();
    }
    else {
      return true;
    }
  }
}