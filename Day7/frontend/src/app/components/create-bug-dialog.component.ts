import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Bug } from '../models/bug.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-bug-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  template: `
    <div *ngIf="visible" class="dialog-overlay" (click)="onCancel()">
      <div class="dialog-container" (click)="$event.stopPropagation()">
        <div class="dialog-header">
          <h2>{{isEditMode ? 'Edit Bug' : 'Create New Bug'}}</h2>
          <button class="close-btn" (click)="onCancel()">
            <i class="pi pi-times"></i>
          </button>
        </div>
        
        <div class="dialog-content">
          <form class="bug-form">
            <div class="form-group">
              <label class="form-label">Title *</label>
              <input 
                type="text" 
                class="form-input"
                [(ngModel)]="bug.title" 
                name="title"
                [disabled]="isStatusOnlyMode"
                placeholder="Enter bug title" />
            </div>

            <div class="form-group">
              <label class="form-label">Description *</label>
              <textarea 
                class="form-textarea"
                [(ngModel)]="bug.description" 
                name="description"
                rows="4" 
                [disabled]="isStatusOnlyMode"
                placeholder="Describe the bug in detail">
              </textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Status</label>
                <select 
                  class="form-select"
                  [(ngModel)]="bug.status" 
                  name="status">
                  <option value="Open">Open</option>
                  <option value="In-Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Priority</label>
                <select 
                  class="form-select"
                  [(ngModel)]="bug.priority" 
                  name="priority"
                  [disabled]="isStatusOnlyMode">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div class="dialog-footer">
          <button class="btn btn-secondary" (click)="onCancel()">
            <i class="pi pi-times"></i> Cancel
          </button>
          <button 
            class="btn btn-primary" 
            (click)="onSave()"
            [disabled]="!isValid()">
            <i class="pi" [ngClass]="isEditMode ? 'pi-check' : 'pi-plus'"></i>
            {{isEditMode ? 'Update Bug' : 'Create Bug'}}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
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
    .dialog-container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow: hidden;
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .dialog-header h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background 0.2s ease;
    }
    .close-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .dialog-content {
      padding: 2rem;
      max-height: 60vh;
      overflow-y: auto;
    }
    .bug-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .form-label {
      font-weight: 600;
      color: #374151;
      font-size: 0.9rem;
    }
    .form-input, .form-textarea, .form-select {
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .form-input:focus, .form-textarea:focus, .form-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    .form-input:disabled, .form-textarea:disabled, .form-select:disabled {
      background: #f9fafb;
      color: #6b7280;
    }
    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding: 1.5rem;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn-secondary {
      background: #6b7280;
      color: white;
    }
    .btn-secondary:hover {
      background: #4b5563;
    }
    .btn-primary {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }
  `]
})
export class CreateBugDialogComponent implements OnChanges {
  @Input() visible = false;
  @Input() editBug: Bug | null = null;
  @Input() mode: 'create' | 'edit' | 'status-only' = 'create';
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() bugSaved = new EventEmitter<Bug>();

  bug: Bug = {
    id: 0,
    title: '',
    description: '',
    status: 'Open',
    priority: 'Medium',
    projectId: 1
  };

  constructor(private authService: AuthService) {}

  get isEditMode(): boolean {
    return this.mode === 'edit' || this.mode === 'status-only';
  }

  get isStatusOnlyMode(): boolean {
    return this.mode === 'status-only';
  }

  ngOnChanges() {
    if (this.editBug && this.visible) {
      this.bug = { ...this.editBug };
    } else if (!this.editBug) {
      this.resetForm();
    }
  }

  statusOptions = [
    { label: 'Open', value: 'Open' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Resolved', value: 'Resolved' },
    { label: 'Closed', value: 'Closed' }
  ];

  priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Critical', value: 'Critical' }
  ];

  isValid(): boolean {
    return this.bug.title.trim() !== '' && this.bug.description.trim() !== '';
  }

  onSave() {
    if (this.isValid()) {
      this.bugSaved.emit({ ...this.bug });
      this.resetForm();
      this.visible = false;
      this.visibleChange.emit(false);
    }
  }

  onCancel() {
    this.resetForm();
    this.visible = false;
    this.visibleChange.emit(false);
  }

  private resetForm() {
    this.bug = {
      id: 0,
      title: '',
      description: '',
      status: 'Open',
      priority: 'Medium',
      projectId: 1
    };
  }
}