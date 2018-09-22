import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface RouteMenuItem {
  displayName: string;
  routeLink: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  menuItems: RouteMenuItem[] = [
    {
      displayName: 'Schedule',
      routeLink: '/scheduler'
    },
    {
      displayName: 'Users',
      routeLink: '/users'
    },
    {
      displayName: 'Tasks',
      routeLink: '/tasks'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isActiveLink(menuItem: RouteMenuItem): boolean {
    return this.router.url === menuItem.routeLink;
  }
}
