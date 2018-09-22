import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

export interface TaskRowData {
  isHovered: boolean;
  taskData: Task;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  selectedRow: TaskRowData;
  rowData = new MatTableDataSource<TaskRowData>();
  taskColumns: string[] = [ 'name', 'active', 'edit', 'delete' ];

  constructor(private matDialog: MatDialog,
    private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe((tasks: Task[]) => {
      this.rowData.data = tasks.map(t => {
        return <TaskRowData>{
          isHovered: false,
          taskData: t
        }
      })
    });
  }

  clickAddTask() {

  }

  clickEditTask(task: Task) {

  }

  clickDeleteTask(task: Task) {
    this.matDialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: <ConfirmDialogData>{
        confirmAction: () => {
          this.deleteTask(task);
        },
        confirmText: 'Delete',
        rejectText: 'Cancel',
        prompt: `Are you sure you want to delete Task ${task.taskName}?`,
        title: 'Delete Task'
      }
    });
  }
  
  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);

    const taskData = this.rowData.data;
    const deleteIndex = taskData.findIndex(t => t.taskData.id === task.id);
    taskData.splice(deleteIndex, 1);
    this.rowData.data = taskData;
  }

  onMouseEnter(row: TaskRowData) {
    row.isHovered = true;
  }

  onMouseLeave(row: TaskRowData) {
    row.isHovered = false;
  }

  selectRow(row: TaskRowData) {
    this.selectedRow = row;
  }

  showEditButtons(row: TaskRowData): boolean {
    return (row === this.selectedRow) || row.isHovered;
  }
}
