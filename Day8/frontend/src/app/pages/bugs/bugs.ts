import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BugService } from '../../services/bug.service';
import { AuthService } from '../../services/auth.service';
import { Bug } from '../../models/bug.model';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bugs-container">
      <!-- Header -->
      <div class="page-header">
        <h1><i class="pi pi-bug"></i> Bug Management</h1>
        <p>Track and manage project bugs efficiently</p>
      </div>

      <!-- Filters Card -->
      <div class="filter-card">
        <div class="card-header">
          <h3><i class="pi pi-filter"></i> Filters & Sorting</h3>
        </div>
        <div class="filter-grid">
          <div class="filter-group">
            <label>Status</label>
            <select [(ngModel)]="statusFilter" (change)="applyFilters()" class="filter-select">
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Priority</label>
            <select [(ngModel)]="priorityFilter" (change)="applyFilters()" class="filter-select">
              <option value="">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Sort By</label>
            <select [(ngModel)]="sortField" (change)="applySorting()" class="filter-select">
              <option value="id">ID</option>
              <option value="title">Title</option>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="createdOn">Created Date</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Order</label>
            <select [(ngModel)]="sortOrder" (change)="applySorting()" class="filter-select">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="results-summary">
        <div class="summary-stats">
          <div class="stat-item">
            <span class="stat-number">{{paginatedBugs.length}}</span>
            <span class="stat-label">Showing</span>
          </div>
          <div class="stat-divider">of</div>
          <div class="stat-item">
            <span class="stat-number">{{filteredBugs.length}}</span>
            <span class="stat-label">Total</span>
          </div>
          <div class="stat-divider">•</div>
          <div class="stat-item">
            <span class="stat-number">{{currentPage}}</span>
            <span class="stat-label">Page</span>
          </div>
        </div>
      </div>

      <!-- Bug Cards -->
      <div class="bugs-grid">
        <div *ngFor="let bug of paginatedBugs" class="bug-card">
          <div class="bug-header">
            <div class="bug-id">#{{bug.id}}</div>
            <div class="bug-badges">
              <span class="badge status-{{bug.status.toLowerCase().replace(' ', '-')}}">{{bug.status}}</span>
              <span class="badge priority-{{bug.priority.toLowerCase()}}">{{bug.priority}}</span>
            </div>
          </div>
          <div class="bug-content">
            <h4 class="bug-title">{{bug.title}}</h4>
            <p class="bug-description">{{bug.description}}</p>
          </div>
          <div class="bug-footer">
            <div class="bug-date">
              <i class="pi pi-calendar"></i>
              {{bug.createdOn | date:'MMM dd, yyyy'}}
            </div>
            <div class="bug-actions">
              <button *ngIf="canEdit()" (click)="editBug(bug)" class="action-btn edit-btn">
                <i class="pi pi-pencil"></i> Edit
              </button>
              <button *ngIf="canEditStatus()" (click)="editStatus(bug)" class="action-btn status-btn">
                <i class="pi pi-refresh"></i> Status
              </button>
              <button *ngIf="canDelete()" (click)="deleteBug(bug.id)" class="action-btn delete-btn">
                <i class="pi pi-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
        
        <div *ngIf="paginatedBugs.length === 0" class="no-results">
          <i class="pi pi-search"></i>
          <h3>No bugs found</h3>
          <p>Try adjusting your filters to see more results</p>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination-card" *ngIf="totalPages > 1">
        <div class="pagination-controls">
          <button (click)="goToPage(currentPage - 1)" [disabled]="currentPage === 1" class="page-btn">
            <i class="pi pi-chevron-left"></i> Previous
          </button>
          <div class="page-info">
            <span>Page {{currentPage}} of {{totalPages}}</span>
          </div>
          <button (click)="goToPage(currentPage + 1)" [disabled]="currentPage === totalPages" class="page-btn">
            Next <i class="pi pi-chevron-right"></i>
          </button>
        </div>
        <div class="pagination-info">
          {{itemsPerPage}} items per page • {{filteredBugs.length}} total items
        </div>
      </div>

      <!-- Edit Modal -->
      <div *ngIf="showEditModal" class="modal-overlay" (click)="closeEditModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Edit Bug</h3>
            <button (click)="closeEditModal()" class="close-btn">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Title</label>
              <input [(ngModel)]="editingBug.title" class="form-input">
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea [(ngModel)]="editingBug.description" class="form-input" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Status</label>
              <select [(ngModel)]="editingBug.status" class="form-input">
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div class="form-group">
              <label>Priority</label>
              <select [(ngModel)]="editingBug.priority" class="form-input">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button (click)="closeEditModal()" class="btn-cancel">Cancel</button>
            <button (click)="saveEdit()" class="btn-save">Save Changes</button>
          </div>
        </div>
      </div>

      <!-- Status Modal -->
      <div *ngIf="showStatusModal" class="modal-overlay" (click)="closeStatusModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Update Status</h3>
            <button (click)="closeStatusModal()" class="close-btn">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Bug: {{editingBug.title}}</label>
            </div>
            <div class="form-group">
              <label>New Status</label>
              <select [(ngModel)]="newStatus" class="form-input">
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button (click)="closeStatusModal()" class="btn-cancel">Cancel</button>
            <button (click)="saveStatus()" class="btn-save">Update Status</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bugs-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: #f8fafc;
      min-height: 100vh;
    }

    .page-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      color: #1e293b;
      font-size: 2.5rem;
      margin: 0;
      font-weight: 700;
    }

    .page-header p {
      color: #64748b;
      font-size: 1.1rem;
      margin: 0.5rem 0 0 0;
    }

    .filter-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
      overflow: hidden;
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .filter-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      padding: 1.5rem;
    }

    .filter-group label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .filter-select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 0.875rem;
      transition: all 0.2s;
      background: white;
    }

    .filter-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .results-summary {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .summary-stats {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-divider {
      color: #cbd5e1;
      font-weight: 500;
    }

    .bugs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .bug-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: all 0.2s;
      overflow: hidden;
    }

    .bug-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.15);
    }

    .bug-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }

    .bug-id {
      font-weight: 700;
      color: #475569;
      font-size: 0.875rem;
    }

    .bug-badges {
      display: flex;
      gap: 0.5rem;
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .status-open { background: #dbeafe; color: #1d4ed8; }
    .status-in-progress { background: #fef3c7; color: #d97706; }
    .status-resolved { background: #d1fae5; color: #059669; }
    .status-closed { background: #f3f4f6; color: #6b7280; }

    .priority-low { background: #ecfdf5; color: #065f46; }
    .priority-medium { background: #fef3c7; color: #92400e; }
    .priority-high { background: #fee2e2; color: #dc2626; }
    .priority-critical { background: #fecaca; color: #991b1b; }

    .bug-content {
      padding: 1.5rem;
    }

    .bug-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 0.75rem 0;
      line-height: 1.4;
    }

    .bug-description {
      color: #64748b;
      line-height: 1.6;
      margin: 0;
    }

    .bug-footer {
      padding: 1rem 1.5rem;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .bug-date {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #64748b;
      font-size: 0.875rem;
    }

    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem 2rem;
      color: #64748b;
    }

    .no-results i {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .no-results h3 {
      margin: 0 0 0.5rem 0;
      color: #374151;
    }

    .pagination-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .pagination-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .page-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .page-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-info {
      font-weight: 600;
      color: #374151;
    }

    .pagination-info {
      text-align: center;
      color: #64748b;
      font-size: 0.875rem;
    }

    .bug-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.5rem 0.75rem;
      border: none;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .edit-btn {
      background: #3b82f6;
      color: white;
    }

    .edit-btn:hover {
      background: #2563eb;
    }

    .status-btn {
      background: #f59e0b;
      color: white;
    }

    .status-btn:hover {
      background: #d97706;
    }

    .delete-btn {
      background: #ef4444;
      color: white;
    }

    .delete-btn:hover {
      background: #dc2626;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #e2e8f0;
    }

    .modal-header h3 {
      margin: 0;
      color: #1e293b;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #64748b;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 0.875rem;
      transition: border-color 0.2s;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding: 1.5rem;
      border-top: 1px solid #e2e8f0;
    }

    .btn-cancel {
      padding: 0.75rem 1.5rem;
      background: #f1f5f9;
      color: #475569;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-save {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .bugs-container {
        padding: 1rem;
      }
      
      .filter-grid {
        grid-template-columns: 1fr;
      }
      
      .bugs-grid {
        grid-template-columns: 1fr;
      }
      
      .pagination-controls {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `]
})
export class BugsComponent implements OnInit {
  bugs: Bug[] = [];
  filteredBugs: Bug[] = [];
  paginatedBugs: Bug[] = [];
  
  statusFilter = '';
  priorityFilter = '';
  sortField = 'id';
  sortOrder = 'asc';
  
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  showEditModal = false;
  showStatusModal = false;
  editingBug: any = {};
  newStatus = '';

  constructor(private bugService: BugService, private authService: AuthService) {}

  ngOnInit() {
    this.loadBugs();
  }

  loadBugs() {
    this.bugService.getBugs().subscribe({
      next: (bugs) => {
        this.bugs = bugs;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading bugs:', error);
      }
    });
  }

  applyFilters() {
    this.filteredBugs = this.bugs.filter(bug => {
      const statusMatch = !this.statusFilter || bug.status === this.statusFilter;
      const priorityMatch = !this.priorityFilter || bug.priority === this.priorityFilter;
      return statusMatch && priorityMatch;
    });
    
    this.applySorting();
  }

  applySorting() {
    this.filteredBugs.sort((a, b) => {
      const aVal = a[this.sortField as keyof Bug];
      const bVal = b[this.sortField as keyof Bug];
      
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      
      if (this.sortOrder === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });
    
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredBugs.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBugs = this.filteredBugs.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  canEdit(): boolean {
    const role = this.authService.getUserRole();
    return role === 'Admin' || role === 'Developer';
  }

  canEditStatus(): boolean {
    const role = this.authService.getUserRole();
    return role === 'Admin' || role === 'Tester';
  }

  canDelete(): boolean {
    const role = this.authService.getUserRole();
    return role === 'Admin';
  }

  canCreate(): boolean {
    const role = this.authService.getUserRole();
    return role === 'Admin';
  }

  editBug(bug: Bug) {
    this.editingBug = { ...bug };
    this.showEditModal = true;
  }

  editStatus(bug: Bug) {
    this.editingBug = { ...bug };
    this.newStatus = bug.status;
    this.showStatusModal = true;
  }

  deleteBug(id: number) {
    if (confirm('Are you sure you want to delete this bug?')) {
      this.bugService.deleteBug(id).subscribe({
        next: () => {
          this.loadBugs();
        },
        error: (error) => {
          console.error('Error deleting bug:', error);
        }
      });
    }
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingBug = {};
  }

  closeStatusModal() {
    this.showStatusModal = false;
    this.editingBug = {};
    this.newStatus = '';
  }

  saveEdit() {
    this.bugService.updateBug(this.editingBug.id, this.editingBug).subscribe({
      next: () => {
        this.closeEditModal();
        this.loadBugs();
      },
      error: (error) => {
        console.error('Error updating bug:', error);
      }
    });
  }

  saveStatus() {
    this.bugService.updateBugStatus(this.editingBug.id, this.newStatus).subscribe({
      next: () => {
        this.closeStatusModal();
        this.loadBugs();
      },
      error: (error) => {
        console.error('Error updating status:', error);
      }
    });
  }
}