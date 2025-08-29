import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bugs',
  imports: [CardModule, TableModule, TagModule, ButtonModule, TooltipModule, CommonModule],
  templateUrl: './bugs.html',
  styleUrl: './bugs.css'
})
export class BugsComponent {
  bugs = [
    { id: 1, title: 'Login page not responsive', severity: 'High', status: 'Open', assignee: 'John Doe' },
    { id: 2, title: 'Dashboard loading slow', severity: 'Medium', status: 'In Progress', assignee: 'Jane Smith' },
    { id: 3, title: 'Button alignment issue', severity: 'Low', status: 'Resolved', assignee: 'Mike Johnson' },
    { id: 4, title: 'Data not saving', severity: 'Critical', status: 'Open', assignee: 'Sarah Wilson' }
  ];

  getSeverityClass(severity: string) {
    switch(severity) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'info';
    }
  }

  getStatusClass(status: string) {
    switch(status) {
      case 'Open': return 'danger';
      case 'In Progress': return 'warning';
      case 'Resolved': return 'success';
      default: return 'info';
    }
  }
}
