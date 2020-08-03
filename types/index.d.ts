export const enum Status {
  Todo = 'todo',
  Doing = 'doing',
  Done = 'done'
}

declare global {
  namespace Todo {
    interface TodoApp {
      lastId: number;
      taskList: Task[];

      command(title: string): void;
      addTodo(todo: string): void;
      showAllList(): void;
      showStatus(status: Status): void;
      updateToStatus(id: number, status: Status): void;
      getStatus(status: Status): Task[];
    }

    interface Task {
      id: number;
      title: string;
      status: Status;
    }
  }
}
