import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from 'src/app/models/employee';
import { HttpRestService } from './http-rest.service';

@Injectable()
export class EmployeeService extends HttpRestService {

  private employees: Employee[];

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  addEmployee(employee: Employee) {
    return this.httpPost('employees', employee);
  }

  deleteEmployee(employeeId: number) {
    return this.httpDelete(`employees/${employeeId}`);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.httpGet<Employee[]>('employees');
  }

  updateEmployee(employee: Employee) {
    return this.httpPut(`employees/${employee.id}`, employee);
  }
}
