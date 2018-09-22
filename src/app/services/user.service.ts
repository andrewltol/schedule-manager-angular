import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from 'src/app/models/user';

@Injectable()
export class UserService {

  private users: User[];

  constructor() { 
    this.createDummyUsers();
  }

  private createDummyUsers() {
    this.users = [];
    let user = new User();
    user.id = 1;
    user.firstName = 'Fred';
    user.lastName = 'Flintstone';
    user.startDate = new Date(2001, 7, 9);
    this.users.push(user);

    user = new User();
    user.id = 2;
    user.firstName = 'Wilma';
    user.lastName = 'Flintstone';
    user.startDate = new Date(2005, 1, 19);
    this.users.push(user);

    user = new User();
    user.id = 3;
    user.firstName = 'Barney';
    user.lastName = 'Rubble';
    user.startDate = new Date(2003, 6, 11);
    this.users.push(user);

    user = new User();
    user.id = 4;
    user.firstName = 'Betty';
    user.lastName = 'Rubble';
    user.startDate = new Date(2015, 11, 31);
    this.users.push(user);
  }

  getAllUsers(): Observable<User[]> {
    return of(this.users);
  }

  deleteUser(userId: number) {
    const userIndex = this.users.findIndex(user => user.id === userId);
    this.users.splice(userIndex, 1);
  }
}
