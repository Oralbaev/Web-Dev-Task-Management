export type TaskStatus = 'P' | 'I' | 'D';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  status_display: string;
  due_date: string | null;    
  task_list: number;      
  created_at: string;         
  updated_at: string;
  
  tags?: number[];
}
