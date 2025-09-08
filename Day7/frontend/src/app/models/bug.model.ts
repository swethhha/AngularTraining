export interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdOn?: Date;
  projectId?: number;
  assignedTo?: number;
}