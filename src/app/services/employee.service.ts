import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Employee } from 'src/app/models/employee';

@Injectable()
export class EmployeeService {

  private employees: Employee[];

  constructor() { 
    this.createDummyEmployees();
  }

  private createDummyEmployees() {
    this.employees = [];
    let employee = new Employee();
    employee.id = 1;
    employee.firstName = 'Fred';
    employee.lastName = 'Flintstone';
    employee.hireDate = new Date(2001, 7, 9);
    this.employees.push(employee);

    employee = new Employee();
    employee.id = 2;
    employee.firstName = 'Wilma';
    employee.lastName = 'Flintstone';
    employee.hireDate = new Date(2005, 1, 19);
    this.employees.push(employee);

    employee = new Employee();
    employee.id = 3;
    employee.firstName = 'Barney';
    employee.lastName = 'Rubble';
    employee.hireDate = new Date(2003, 6, 11);
    this.employees.push(employee);

    employee = new Employee();
    employee.id = 4;
    employee.firstName = 'Betty';
    employee.lastName = 'Rubble';
    employee.hireDate = new Date(2015, 11, 31);
    this.employees.push(employee);
  }

  getAllEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  deleteEmployee(employeeId: number) {
    const employeeIndex = this.employees.findIndex(employee => employee.id === employeeId);
    this.employees.splice(employeeIndex, 1);
  }
}
