import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent {
  list: any[] = [];
  addTask(name: string, time: string, place: string) {
    if (!name || !time || !place) {
      alert("doppelgänger!");
      return;
    }
    const id = this.list.length;
    this.list.push({ id, name, time, place, progress: 0 });
  }

  private laura: HTMLAudioElement = new Audio('assets/audios/laura.mp3');
  removeTask(id: number) {
    const index = this.list.findIndex(item => item.id === id);
    if (index !== -1) {
      const item = this.list[index];
      item.fadeOut = true;
      setTimeout(() => {
        this.list.splice(index, 1);
        this.laura.play();
      }, 500);
    }
  }

  private dale: HTMLAudioElement = new Audio('assets/audios/dale.mp3');
  counter = 0
  completeTask(id: number) {
    const index = this.list.findIndex(item => item.id === id);
    if (index !== -1) {
      const item = this.list[index];
      item.fadeOut = true;
      setTimeout(() => {
        this.list.splice(index, 1);
        this.counter++;
        this.dale.play();
      }, 500);
    }
  }

  updateProgress(item: any, amount: number) {
    item.progress += amount;
    if (item.progress === 100) {
      this.completeTask(item.id)
    }
  }

  sortByTime: boolean = false;
  sortByPlace: boolean = false;
  sortTasks() {
    if (this.sortByTime) {
      this.list.sort((a, b) => {
        const timeUnits = ["minutes", "hours", "days"];
        const timeA = timeUnits.indexOf(a.timeunit);
        const timeB = timeUnits.indexOf(b.timeunit);
        if (timeA < timeB) return -1;
        if (timeA > timeB) return 1;
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        return 0;
      });
    } else if (this.sortByPlace) {
      this.list.sort((a, b) => {
        if (a.place < b.place) return -1;
        if (a.place > b.place) return 1;
        return 0;
      });
    }
  }
}