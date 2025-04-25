import { Component, OnInit } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { TaskListService }      from '../services/task-list.service';
import { TaskService, TaskUpsert } from '../services/task.service';
import { TagService }            from '../services/tag.service';
import { AuthService }           from '../auth/auth.service';

import { Task }      from '../models/task.model';
import { Tag }       from '../models/tag.model';
import { TaskList }  from '../models/task-list.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  lists: TaskList[] = [];
  listId!: number;

  tags: Tag[] = [];
  filterTagId: number | null = null;

  allTasks: Task[] = [];
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  // формы
  newListName = '';
  editingList: TaskList | null = null;
  editingListName = '';

  newTaskTitle = '';
  newTaskDescription = '';
  newTaskDate = '';
  selectedTagIds: number[] = [];

  newTagName = '';

  editingTask: Task | null = null;
  editDate = '';

  constructor(
    public auth: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private listService: TaskListService,
    private taskService: TaskService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.tagService.getAll().subscribe(tags => this.tags = tags);
    this.loadTags();

    this.route.paramMap.subscribe(pm => {
      const id = pm.get('id');
      this.listId = id ? +id : undefined!;
      this.loadLists();
    });
  }

  private loadLists(): void {
    this.listService.getAll().subscribe(lists => {
      this.lists = lists;
      const target = lists.find(l => l.id === this.listId) || lists[0];
      if (target) this.selectList(target);
    });
  }

  createList(): void {
    const name = this.newListName.trim();
    if (!name) return;
    this.listService.create(name).subscribe(list => {
      this.lists.push(list);
      this.newListName = '';
      this.selectList(list);
    });
  }

  startEdit(list: TaskList): void {
    this.editingList = list;
    this.editingListName = list.name;
  }

  saveEdit(): void {
    if (!this.editingList) return;
    const name = this.editingListName.trim();
    if (!name) return;
    this.listService.update(this.editingList.id, name)
      .subscribe(updated => {
        const i = this.lists.findIndex(l => l.id === updated.id);
        this.lists[i] = updated;
        if (this.listId === updated.id) this.selectList(updated);
        this.cancelEdit();
      });
  }

  cancelEdit(): void {
    this.editingList = null;
    this.editingListName = '';
  }

  deleteList(list: TaskList): void {
    if (!confirm(`Удалить список «${list.name}»?`)) return;
    this.listService.delete(list.id).subscribe(() => {
      this.lists = this.lists.filter(l => l.id !== list.id);
      if (this.listId === list.id && this.lists.length) {
        this.selectList(this.lists[0]);
      }
    });
  }

  selectList(list: TaskList): void {
    this.listId = list.id;
    this.filterTagId = null;
    this.loadTasks(list.id);
    this.router.navigate(['/lists', list.id], { replaceUrl: true });
  }

  private loadTasks(listId: number): void {
    console.log('allTasks:', this.allTasks);
    this.taskService.getAll(listId).subscribe(tasks => {
      this.allTasks = tasks;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const filtered = this.filterTagId
      ? this.allTasks.filter(t => t.tags?.includes(this.filterTagId!))
      : this.allTasks;
  
    this.todo       = filtered.filter(t => t.status === 'P');
    this.inProgress = filtered.filter(t => t.status === 'I');
    this.done       = filtered.filter(t => t.status === 'D');
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title) return;

    const dto: TaskUpsert = {
      title,
      description: this.newTaskDescription.trim() || undefined,
      status: 'P',
      due_date: this.newTaskDate || undefined,   // только YYYY-MM-DD
      task_list: this.listId,
      tags: this.selectedTagIds.length ? this.selectedTagIds : undefined
    };

    this.taskService.create(dto).subscribe(() => {
      this.newTaskTitle = '';
      this.newTaskDescription = '';
      this.newTaskDate = '';
      this.selectedTagIds = [];
      this.loadTasks(this.listId);
    });
  }

  deleteTask(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => this.loadTasks(this.listId));
  }

  startEditTask(task: Task): void {
    this.editingTask = { ...task };
    this.editDate = task.due_date ?? '';
  }

  saveEditTask(): void {
    if (!this.editingTask) return;

    const dto: TaskUpsert = {
      title: this.editingTask.title,
      description: this.editingTask.description || undefined,
      status: this.editingTask.status,
      due_date: this.editDate || undefined,
      task_list: this.listId,
      tags: this.editingTask.tags?.length ? this.editingTask.tags : undefined
    };

    this.taskService.update(this.editingTask.id, dto).subscribe(updated => {
      const i = this.allTasks.findIndex(t => t.id === updated.id);
      this.allTasks[i] = updated;
      this.applyFilter();
      this.cancelEditTask();
    });
  }

  cancelEditTask(): void {
    this.editingTask = null;
    this.editDate = '';
  }

  markInProgress(task: Task): void {
    this.taskService
      .update(task.id, { title: task.title, status: 'I', task_list: task.task_list })
      .subscribe(() => this.loadTasks(this.listId));
  }

  markDone(task: Task): void {
    this.taskService
      .update(task.id, { title: task.title, status: 'D', task_list: task.task_list })
      .subscribe(() => this.loadTasks(this.listId));
  }

  createTag(): void {
    const name = this.newTagName.trim();
    if (!name) return;
  
    this.tagService.create(name).subscribe({
      next: tag => {
        this.tags.push(tag);
        this.newTagName = '';
      },
      error: err => {
        console.error('Не удалось создать тег', err);
      }
    });
  }
  loadTags(): void {
    this.tagService.getAll().subscribe({
      next: tags => {
        console.log('Loaded tags:', tags);
        this.tags = tags;
      },
      error: err => {
        console.error('Не удалось загрузить теги', err);
      }
    });
  }
  
  deleteTag(tag: Tag): void {
    if (!confirm(`Удалить тег «${tag.name}»?`)) {
      return;
    }
    this.tagService.delete(tag.id).subscribe({
      next: () => {
        this.tags = this.tags.filter(t => t.id !== tag.id);
        // при желании можно сбросить фильтр:
        if (this.filterTagId === tag.id) {
          this.filterTagId = null;
          this.applyFilter();
        }
      },
      error: err => {
        console.error('Не удалось удалить тег', err);
      }
    });
  }

  logout(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/login']));
  }
}
