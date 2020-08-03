import { Status } from '../types/index';

class TodoApp implements Todo.TodoApp {
  lastId = 0;
  taskList: Todo.Task[] = [];

  command(job: string) {
    const command = job.split('$');
    switch (command[0]) {
      case 'add':
        this.addTodo(command[1]);
        break;
      case 'show':
        this.showStatus(command[1] as Status);
        break;
      case 'update':
        this.updateToStatus(Number(command[1]), command[2] as Status);
        break;
    }
  }

  addTodo(title: string) {
    this.lastId += 1;
    this.taskList.push({
      title,
      id: this.lastId,
      status: Status.Todo
    });
    console.log(`id: ${this.lastId},  "${title}" 항목이 새로 추가됐습니다.`);

    this.showAllList();
  }

  showAllList() {
    const todo = this.getStatus(Status.Todo);
    const doing = this.getStatus(Status.Doing);
    const done = this.getStatus(Status.Done);

    console.log(`현재 상태: todo ${todo.length}개, doing ${doing.length}개, done ${done.length}개`);
  }

  showStatus(status: Status) {
    const tasks = this.getStatus(status);
    tasks.forEach(task => console.log(`${task.id}, ${task.title}`));
  }

  updateToStatus(id: number, status: Status) {
    this.taskList.forEach((task) => {
      if (task.id === id) {
        task.status = status;
      }
    });
    this.showAllList();
  }

  getStatus(status: Status): Todo.Task[] {
    return this.taskList.filter(task => task.status === status);
  }
}

const todo = new TodoApp();
todo.command('add$Test1');
todo.command('add$Test2');
todo.command('show$todo');
todo.command('update$1$doing');
todo.command('update$2$done');
