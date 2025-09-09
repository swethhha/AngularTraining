import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BugStats, BugService } from '../../services/bug.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  stats: BugStats = {
    openvsResolved: { open: 0, resolved: 0 },
    priorityDistribution: { low: 0, medium: 0, high: 0 },
    bugsByStatus: {},
    bugsPerProject: {},
    openCount: 0,
    resolvedCount: 0,
    inProgressCount: 0,
    closedCount: 0,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
    totalCount: 0,
    todayCount: 0,
    weekCount: 0,
    monthCount: 0
  };

  constructor(private authService: AuthService, private bugService: BugService) {}

  get userRole(): string | null {
    return this.authService.getUserRole();
  }

  get isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  ngOnInit() {
    if (this.isAdmin) {
      this.bugService.getBugStats().subscribe({
        next: (stats: BugStats) => {
          this.stats = stats;
        },
        error: (err) => console.error("Error loading stats:", err)
      });
    }
  }
}