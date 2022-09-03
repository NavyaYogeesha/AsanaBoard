export class Task {
  constructor(data = {}) {
    this.id = data.id || Math.random();
    this.title = data.title || "";
    this.desc = data.desc || "";
    this.dueDate = data.dueDate || "";
    this.prio = data.prio || 1;
  }
}
