export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  dateType: string;
  scheduledDate?: string|Date;
}
