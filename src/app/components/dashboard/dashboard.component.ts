import { Component } from '@angular/core';
import { Config } from 'datatables.net';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  dtOptions: Config = {};

  ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json',
      columns: [{
        title: 'First Name',
        data: 'firstName'
      }, {
        title: 'Last Name',
        data: 'lastName'
      },{
        title: 'Email',
        data: 'email'
      }]
    };
  }
}
