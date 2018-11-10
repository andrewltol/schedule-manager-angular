export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  notes?: string;
  hireDate: Date;
  terminationDate?: Date;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get isActive(): boolean {
    if (this.terminationDate) {
      return this.terminationDate.getTime() > Date.now();
    }
    else {
      return true;
    }
  }

  loadProperties(employee: Employee) {
    for (const prop in employee) {
      if (employee.hasOwnProperty(prop)) {
        this[prop] = employee[prop];
      }
    }
  }
}