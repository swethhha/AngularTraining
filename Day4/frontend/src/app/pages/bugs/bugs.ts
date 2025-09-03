import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';

import { BugService, Bug } from '../../services/bug.service';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    ProgressSpinnerModule,
    MessageModule
  ],
  templateUrl: './bugs.html',
  styleUrls: ['./bugs.css']
})
export class BugsComponent implements OnInit {
  bugs: Bug[] = [];
  error = '';
  loading = true;

  constructor(private bugService: BugService) {}

  ngOnInit() {
    this.bugService.getBugs().subscribe({
      next: (data) => {
        this.bugs = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load bugs';
        this.loading = false;
      }
    });
  }
}
