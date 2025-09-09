export interface Comment {
  id: number;
  author: string;
  message: string;
  createdAt: string;
}

export interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  projectId?: number;
  assignedTo?: string;
  comments?: Comment[];
  createdOn?: string;
}

export interface BugRequest {
  Title: string;
  Description: string;
  Status?: string;
  Priority?: string;
  ProjectId: number;
  AssignedTo?: number;
}

export interface BugStatusUpdate {
  Status: string;
}